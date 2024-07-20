import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OrdersService } from '../services/orders.service';

export class OrderDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  photo: string;

  @IsString()
  customer_phone: string;

  @IsString()
  customer_city: string;

  @IsString()
  customer_country: string;

  @IsString()
  customer_address: string;

  @IsEnum(OrdersService)
  status: OrdersService;

  @IsNotEmpty()
  business_id: number;

  @IsNotEmpty()
  order_type: string;

  @IsString()
  customer_message: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  customer_email: string;

  @IsNotEmpty()
  price: number;
}
