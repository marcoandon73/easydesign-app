import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import {Transform, Type} from 'class-transformer';

// todo

// super - admin - manager - guest
// manager can manage products and backgrounds
// admin can manage products, backgrounds, users, businesses, settings
// superadmin can manage products, backgrounds, users, businesses, settings, roles

// get all/one roles
// give all access to superadmin to all businesses
// send email to the business owner

//linking to frontend

export class AddBusinessDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description;

  @IsOptional()
  logo;

  @IsOptional()
  @IsString()
  messenger_link;

  @IsOptional()
  @IsString()
  phone;

  @IsOptional()
  @IsString()
  address;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  location_id;

  @IsOptional()
  @IsEmail()
  email: string;

}
