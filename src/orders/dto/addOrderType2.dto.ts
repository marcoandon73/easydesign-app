import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';
import {Transform, Type} from 'class-transformer';
import { OrdersService } from '../services/orders.service';
import { OrderStatus } from '../enums/enums';
import {DimensionProductDTO} from "./dimensionProduct.dto";

export class AddOrderType2Dto {

  @Type(() => Number)
  @IsNumber()
  business_id;

  @IsOptional()
  @IsString()
  photo: string;

  @IsOptional()
  custom_product_photo;

  @IsOptional()
  @IsString()
  customer_phone: string;

  @IsOptional()
  @IsString()
  customer_name: string;

  @IsOptional()
  @IsString()
  customer_city: string;

  @IsOptional()
  @IsString()
  customer_country: string;

  @IsOptional()
  @IsString()
  customer_address: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsNotEmpty()
  order_type: string;

  @IsOptional()
  @IsString()
  customer_message: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  customer_email: string;

  // bg_id:"64"
  // bg_size_id:32
  // customer_address:"iuhl"
  // customer_name:"n,"
  // customer_phone:"789"
  // product_id:440

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  bg_id: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  bg_size_id: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  product_id: number;

}
