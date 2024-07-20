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

export class AddOrderDto {

  @Transform((value: any) => Number(value))
  @Type(() => Number)
  @IsNumber()
  business_id;

  @Transform((value: any) => Number(value))
  @Type(() => Number)
  @IsNumber()
  price: number;

  @Transform((value: any) => Number(value))
  @Type(() => Number)
  @IsNumber()
  dimension_id: number;

  @IsOptional()
  @IsString()
  photo: string;

  @IsOptional()
  @IsString()
  custom_product_photo: string;

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

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DimensionProductDTO)
  products: DimensionProductDTO[];
}
