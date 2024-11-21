import { PartialType } from '@nestjs/mapped-types';
import { CreateLanguageDto } from './create-language.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateLanguageDto extends PartialType(CreateLanguageDto) {
  @IsInt()
  idu_lenguaje: number;
}
