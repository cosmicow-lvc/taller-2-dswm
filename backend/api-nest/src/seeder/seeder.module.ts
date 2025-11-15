import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from '../bolamagica/entities/response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Response])],
  providers: [SeederService],
})
export class SeederModule {}