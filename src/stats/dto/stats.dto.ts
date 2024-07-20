import {  IsNotEmpty, IsNumber } from 'class-validator';

export class SettingsDto {
  @IsNotEmpty()
  id: string;

  @IsNumber()
  nbr_whatsapp_submits: number;

  @IsNumber()
  nbr_email_submits: boolean;

  @IsNumber()
  nbr_facebook_submits: string;

  @IsNumber()
  nbr_ask_phone_submits: string;

  @IsNumber()
  business_id: boolean;

}
