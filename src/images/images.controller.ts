import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as mime from 'mime-types';
import { ToLowerCasePipe } from '../helpers/pipes/to-lower-case.pipe';


@Controller('images')
export class ImagesController {
  @Get('profiles/:filename')
  async getPhoto(@Res() response: Response, @Param('directory') directory, @Param('filename') filename) {
    try {
      const path = `${process.cwd()}/src/storage/profiles/${filename}`;
      const image = await fs.promises.readFile(path);
      const contentType = mime.lookup(path);
      response.setHeader('Content-Type', contentType);
      response.send(image);
    } catch (error) {
      console.log('error', error);
      response.sendStatus(error);
    }
  }

  @Get(':business_name/:type/:filename')
  async getBusinessPhoto(
    @Res() response: Response,
    @Param('business_name', ToLowerCasePipe) business_name,
    @Param('type', ToLowerCasePipe) type,
    @Param('filename', ToLowerCasePipe) filename,
  ) {
    try {
      if (type !== 'backgrounds' && type !== 'products' && type !== 'logos' && type !== 'orders') {
        response.sendStatus(404);
        return;
      }
      const path = `${process.cwd()}/src/storage/images/${business_name}/${type}/${filename}`;
      const image = await fs.promises.readFile(path);
      const contentType = mime.lookup(path);
      response.setHeader('Content-Type', contentType);
      response.send(image);
    } catch (error) {
      console.log('error', error);
      response.sendStatus(error);
    }
  }
}
