import { Type } from 'class-transformer';
import { Column } from 'typeorm';
import {IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import {OrdersService} from "../services/orders.service";
import {OrderStatus} from "../enums/enums";

export class EditOrderDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  business_id: number;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  photo: string;

  @IsOptional()
  @IsString()
  customer_phone: string;

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

  @IsOptional()
  @IsNotEmpty()
  order_type: string;

  @IsOptional()
  @IsString()
  customer_message: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  customer_email: string;


  @IsString()
  @IsOptional()
  customer_name: string;

}
