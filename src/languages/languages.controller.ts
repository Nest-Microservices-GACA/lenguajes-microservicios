import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@Controller()
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @MessagePattern('lenguaje.create')
  create(@Payload() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.create(createLanguageDto);
  }

  @MessagePattern('lenguaje.findAll')
  findAll() {
    return this.languagesService.findAll();
  }

  @MessagePattern('lenguaje.findOne')
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.languagesService.findOne(id);
  }

  @MessagePattern('lenguaje.update')
  update(@Payload() updateLanguageDto: UpdateLanguageDto) {
    return this.languagesService.update(updateLanguageDto.idu_lenguaje, updateLanguageDto);
  }

  @MessagePattern('lenguaje.remove')
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.languagesService.remove(id);
  }
}
