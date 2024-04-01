import { PartialType } from '@nestjs/mapped-types';
import { CreateCvDto } from './create-cv.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCvDto extends PartialType(CreateCvDto) {
  @IsNumber()
  @IsNotEmpty()
  cv_id: number;

  @IsString()
  @IsNotEmpty()
  cv_experience: string;

  @IsString()
  @IsNotEmpty()
  cv_education: string;

  @IsString()
  @IsNotEmpty()
  cv_action: string;

  @IsString()
  @IsNotEmpty()
  cv_cartificate: string;

  @IsString()
  @IsNotEmpty()
  cv_fullnName: string;

  @IsString()
  @IsNotEmpty()
  cv_avata: string;

  @IsString()
  @IsNotEmpty()
  cv_job: string;

  @IsString()
  @IsNotEmpty()
  cv_brirthday: string;

  @IsString()
  @IsNotEmpty()
  cv_address: string;

  @IsString()
  @IsNotEmpty()
  cv_email: string;

  @IsString()
  @IsNotEmpty()
  cv_phone: string;

  @IsString()
  @IsNotEmpty()
  cv_target: string;

  @IsString()
  @IsNotEmpty()
  cv_skill: string;

  @IsString()
  @IsNotEmpty()
  cv_date: string;
}
