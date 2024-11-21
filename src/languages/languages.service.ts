import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class LanguagesService {

  private readonly logger = new Logger('LanguagesService');

  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>
  ){}

  async create(createLanguageDto: CreateLanguageDto) {
    try {
        
      const language = this.languageRepository.create(createLanguageDto);
      await this.languageRepository.save(language);

      return language;

   } catch (error) {

      this.handleDBExceptions( error );
   }
  }

  async findAll() {
    try {

      const languages = await this.languageRepository.find();
  
      return languages ;

    } catch (error) {
      this.handleDBExceptions( error ); 
    }
  }

  async findOne(id: number) {
    const language = await this.languageRepository.findOneBy({ idu_lenguaje:id });
    console.log(language)
    if( !language ){
      throw new RpcException({ 
        status: HttpStatus.NOT_FOUND, 
        message: `Lenguaje con ID ${id} no encontrado`
      });
    }
    // language.nom_lenguaje = this.encryptionService.decrypt(language.nom_lenguaje);
    
    return language; 
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    const language = await this.languageRepository.preload({
      idu_lenguaje: id,
      ...updateLanguageDto
    });

    if( !language ){
      throw new RpcException({ 
        status: HttpStatus.NOT_FOUND, 
        message: `Lenguaje con ID ${id} no encontrado`
      });
    }

    try {

      // language.nom_lenguaje = this.encryptionService.encrypt(language.nom_lenguaje);
      await this.languageRepository.save( language );

      // language.nom_lenguaje = this.encryptionService.decrypt(language.nom_lenguaje);
      return language;

    } catch (error) {
      this.handleDBExceptions(error);
    }

    return language;
  }

  async remove(id: number) {
    const language = await this.findOne( id );

    if (!language) {

      throw new RpcException({ 
        status: HttpStatus.NOT_FOUND, 
        message: `Lenguaje con ID ${id} no encontrado`
      });

    }

    const nom_lenguaje = language.nom_lenguaje;

    await this.languageRepository.remove( language );

    return { message: `Lenguaje ${nom_lenguaje} eliminado correctamente` };
  }

  private handleDBExceptions(error: any) {
    const logger = new Logger('DatabaseExceptions'); // Opcional, pero útil para registrar los errores
  
    if (error.code === '23505') {
      logger.warn(`Database error: ${error.detail}`);
      throw new RpcException({ status: 'error', message: error.detail });
    }
  
    logger.error(error); // Log más detallado para errores no previstos
    throw new RpcException({ 
      status: 'error', 
      message: 'Unexpected error, check server logs' 
    });
  }

}
