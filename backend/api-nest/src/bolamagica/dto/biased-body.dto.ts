import { IsBoolean, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class BiasedBodyDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsBoolean()
  @IsOptional()
  lucky?: boolean = false; 

  @IsString()
  @IsOptional()
  locale?: string = 'en'; 
}