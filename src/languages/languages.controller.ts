import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@Controller()
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @MessagePattern('createLanguage')
  create(@Payload() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.create(createLanguageDto);
  }

  @MessagePattern('findAllLanguages')
  findAll() {
    return this.languagesService.findAll();
  }

  @MessagePattern('findOneLanguage')
  findOne(@Payload() id: number) {
    return this.languagesService.findOne(id);
  }

  @MessagePattern('updateLanguage')
  update(@Payload() updateLanguageDto: UpdateLanguageDto) {
    return this.languagesService.update(updateLanguageDto.idu_lenguaje, updateLanguageDto);
  }

  @MessagePattern('removeLanguage')
  remove(@Payload() id: number) {
    return this.languagesService.remove(id);
  }
}
