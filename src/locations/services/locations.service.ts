import {InjectRepository} from "@nestjs/typeorm";
import {Locations} from "../entities/locations.entity";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";


@Injectable()
export class LocationsService{

  constructor(@InjectRepository(Locations) private readonly locationRepository: Repository<Locations>) {
  }


  async getAll() {
    return await this.locationRepository.find();
  }
}
