import { Injectable, UploadedFile } from '@nestjs/common';
import * as fs from 'fs';
import path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageActionsEntity } from '../../storage-consumption/entites/storage-actions.entity';
import { UsersEntity } from '../../users/entities/users.entity';
import { Businesses } from '../../businesses/entities/businesses.entity';
import sharp from 'sharp';

interface UploadFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: string;
  size: number;
}

const storage_path = process.cwd() + '/src/storage/';

@Injectable()
export class ImagesService {
  constructor(@InjectRepository(StorageActionsEntity) private readonly storageActionsRepository: Repository<StorageActionsEntity>) {}

  async uploadPhoto(file, prefix = '', user: UsersEntity, business: Businesses) {
    let photoPath = storage_path;
    if (prefix?.length > 0) {
      photoPath = photoPath + `${prefix}/`;
    }
    if (!fs.existsSync(photoPath)) {
      fs.mkdirSync(photoPath, { recursive: true });
    }
    // remove dots from originalname
    // const basename = path.basename(file.originalname, path.extname(file.originalname));
    // const basename_thumb = 'thumb_' + path.basename(file.originalname, path.extname(file.originalname));
    const extname = path.extname(file.originalname);
    const newDate = new Date().getTime().toString();
    const storename = newDate + '' + extname;
    const storename_thumb = 'thumb_' + newDate + '' + extname;
    const photoPath_thumb = photoPath + `${storename_thumb}`;
    photoPath = photoPath + `${storename}`;
    try {
      let thumbnailSize = 0;
      if (business && (prefix.indexOf('backgrounds') >= 0 || prefix.indexOf('products') >= 0)) {
        const thumbnail = await this.generateThumbnail(file.buffer, 200, 200);
        await fs.promises.writeFile(photoPath_thumb, thumbnail);
        thumbnailSize = await this.getFileSize(photoPath_thumb);
      }

      await fs.promises.writeFile(photoPath, file.buffer);
      const filesize = await this.getFileSize(photoPath);

      this.storeActionToDatabase(prefix + '/' + storename, filesize + (thumbnailSize || 0), user, business);

      return {
        path: storename,
        thumbnail: storename_thumb,
        storage_size: (filesize || 0) + (thumbnailSize || 0),
        dominating_color: await this.getDominantColor(file.buffer),
      };
    } catch (e) {
      throw new Error(e);
      return { path: null, thumbnail: null, size: null, dominating_color: null };
    }
  }

  async removePhoto(path, prefix = '', user: UsersEntity, business: Businesses) {
    try {
      // check if exists first
      await fs.promises
        .access(storage_path + prefix + '/' + path, fs.constants.F_OK)
        .then(async () => {
          const size = await this.getFileSize(storage_path + prefix + '/' + path);
          await fs.promises.unlink(storage_path + prefix + '/' + path);
          await this.removeActionToDatabase(path, size, user, business);
        })
        .catch(() => false);
    } catch (error) {
      console.error(error);
    }
  }

  private async getFileSize(filePath) {
    const stats = await fs.promises.stat(filePath);
    return stats.size / (1024 * 1024);
  }

  private async storeActionToDatabase(storename, size, user, business) {
    let message = null;
    if (business) {
      message =
        (user?.name || 'A guest') +
        ' uploaded a file (' +
        size +
        ' MB) in ' +
        business.name +
        ' business at ' +
        new Date().toISOString().slice(0, 19).replace('T', ' ');
    } else {
      message =
        (user?.name || 'A guest') +
        ' uploaded a file (' +
        size?.toFixed(4) +
        ' MB) - profile picture at ' +
        new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    const newStorageAction = await this.storageActionsRepository.create({
      action: 'upload',
      file_name: storename,
      file_size: size,
      created_by: user?.id || null,
      message,
      business_id: business?.id || null,
    });
    return await this.storageActionsRepository.save(newStorageAction);
  }

  private async removeActionToDatabase(storename, size, user, business) {
    let message = null;
    if (business) {
      message =
        user.name +
        ' removed a file (' +
        size?.toFixed(4) +
        ' MB) in ' +
        business.name +
        ' business at ' +
        new Date().toISOString().slice(0, 19).replace('T', ' ');
    } else {
      message =
        user.name +
        ' removed a file (' +
        size?.toFixed(4) +
        ' MB) - profile picture at ' +
        new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
    const removedStorageAction = await this.storageActionsRepository.create({
      action: 'remove',
      file_name: storename,
      file_size: size,
      created_by: user.id,
      message,
      business_id: business?.id || null,
    });
    return await this.storageActionsRepository.save(removedStorageAction);
  }

  private async generateThumbnail(input: Buffer, width: number, height: number) {
    return sharp(input).resize(width, height).toBuffer();
  }

  private async getDominantColor(imageBuffer) {
    // Load the image buffer with sharp
    const image = sharp(imageBuffer);

    // Resize the image to 1x1 pixel to get the average color
    const { data } = await image.resize(1, 1).raw().toBuffer({ resolveWithObject: true });

    // Calculate the average color of the image
    const r = data[0];
    const g = data[1];
    const b = data[2];

    // Return the average color as a CSS color string
    return `rgb(${r}, ${g}, ${b})`;
  }
}

// todo
// create rules table
// every background has one rule or nothing
// a rule can be applied to multiple backgrounds
// role hasMany background
// background hasOne rule
