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
      host: envs.dbHost,
      port: envs.dbPort,
      database: envs.dbName,
      username: envs.dbUsername,
      password: envs.dbPassword,
      autoLoadEntities: true,
      synchronize:false
    }),

    LanguagesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
