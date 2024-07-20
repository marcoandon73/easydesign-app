import {AddRuleDto} from "../dto/AddRule.dto";
import {Businesses} from "../../businesses/entities/businesses.entity";
import {UsersEntity} from "../../users/entities/users.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {RulesEntity} from "../entities/rules.entity";
import {Repository} from "typeorm";
import {BackgroundsEntity} from "../../backgrounds/entities/backgrounds.entity";
import {time} from "cron";
import {GetAllRulesDto} from "../dto/getAllRules.dto";


export class RulesService {
  constructor(
    @InjectRepository(RulesEntity) private rulesRepository: Repository<RulesEntity>,
    @InjectRepository(BackgroundsEntity) private backgroundRepository: Repository<BackgroundsEntity>,
  ) {}

  async getAll(params: GetAllRulesDto, business: Businesses, user: UsersEntity) {
    const queryBuilder = this.rulesRepository.createQueryBuilder('rules');
    queryBuilder.where('rules.name IS NOT NULL');
    queryBuilder.leftJoin('rules.backgrounds', 'backgrounds');
    queryBuilder.where('backgrounds.business_id=:id', { id: params.business_id });

    return await queryBuilder.getMany();
  }

  async getOne() {

  }

  async delete() {

  }

  async store(params: AddRuleDto, business: Businesses, user: UsersEntity) {
    const background = await this.backgroundRepository.findOne({ where: { id: +params.background_id, business_id: params.business_id } })
    console.log('background', background, params.background_id);
    if (background) {
      if(!background.rule_id){
        if(params.x <= 0 && params.y <= 0){
          return true;
        }
        const name = params.is_favorite ? 'favorite_rule_' + '_' + new Date().getTime(): null;
        const newRule = await this.rulesRepository.save({
          ...params,
          name
        });
        return await this.backgroundRepository.save({
          ...background,
          rule_id: newRule.id,
        });
       } else{
        const rule = await this.rulesRepository.findOne({ where: { id: background.rule_id } });
        if(params.x <= 0 && params.y <= 0){
          await this.backgroundRepository.save({
            ...background,
            rule_id: null,
          });
          return await this.rulesRepository.delete({ id: rule.id });
        } else {
          const name = params.is_favorite ? 'favorite_rule_' + '_' + new Date().getTime(): null;
          return await this.rulesRepository.save({
            ...rule,
            ...params,
            background_id: background.id,
            name,
          });
        }
      }
    }
    return true;
  }
}
