import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetOneSettingDto } from '../dto/getOneSetting.dto';
import { AddSettingDto } from '../dto/addSetting.dto';
import { Parameters } from '../entities/parameters.entity';
import { EditSettingDto } from '../dto/editSetting.dto';
import { GetAllSettingDto } from '../dto/getAllSetting.dto';

@Injectable()
export class SettingsService {
  constructor(
      @InjectRepository(Parameters) private settingsRepository: Repository<Parameters>,
              ) {}

  async getOne(params: GetOneSettingDto) {
    const setting = await this.settingsRepository.findOne({ where: { business_id: params.business_id } });
    if(!setting) {
      await this.settingsRepository.save({ business_id: params.business_id });
      return await this.settingsRepository.findOne({ where: { business_id: params.business_id } });
    }
    return setting;
  }

  async edit(params: EditSettingDto) {
    const setting = await this.settingsRepository.findOne({ where: { business_id: +params.business_id } });
    return await this.settingsRepository.save({ ...setting, ...params });
  }

}


// todo
// make logo for business
// Update documentation
// Update screens
// payoneer to paypal to digital ocean
// Buy VPS and deplooy in it
// buy domain and connect it to VPS
// make a video for the app
// make website for the app
// upload to codecanyon
// fix super statistics + payment
// promote on instagram
// make it public
