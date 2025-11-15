import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ballModule } from './bolamagica/bolamagica.module';
import { Response } from './bolamagica/entities/response.entity';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST!, 
        port: parseInt(process.env.DB_PORT!, 10) || 5432, 
        username: process.env.DB_USERNAME!, 
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME!,
        entities: [Response],
        synchronize: true,
      }),
    }),
    ballModule,
    SeederModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}