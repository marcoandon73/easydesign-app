import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SettingsDto {
  @IsNotEmpty()
  id: string;

  @IsBoolean()
  multipleProductsByOrder: boolean;

  @IsBoolean()
  customizableLogo: boolean;

  @IsString()
  primaryColor: string;

  @IsString()
  secondaryColor: string;

  @IsBoolean()
  showWhatsapp: boolean;

  @IsBoolean()
  showFacebook: boolean;

  @IsBoolean()
  showGmail: boolean;

  @IsBoolean()
  showAskPhone: boolean;

  @IsBoolean()
  showFirstStep: boolean;

  @IsBoolean()
  showSecondStep: boolean;

  @IsBoolean()
  showThirdStep: boolean;

  @IsBoolean()
  showShadow: boolean;

  @IsString()
  unit: string;

  @IsBoolean()
  startupStep: '1' | '2' | '3';

  @IsBoolean()
  lang: string;

  @IsNumber()
  businessId: number;
}
