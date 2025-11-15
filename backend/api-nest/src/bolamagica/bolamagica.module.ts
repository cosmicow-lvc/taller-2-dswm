import { Module } from '@nestjs/common';
import { ballService } from './bolamagica.service';
import { ballController } from './bolamagica.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from './entities/response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Response])],
  controllers: [ballController],
  providers: [ballService],
})
export class ballModule {}