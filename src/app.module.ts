import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { LanguagesModule } from './languages/languages.module';
import { envs } from './config';

@Module({
  imports: [
  
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: envs.DB_HOST,
      port: envs.port,
      database: envs.DB_NAME,
      username: envs.DB_USERNAME,
      password: envs.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize:false
    }),

    LanguagesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
