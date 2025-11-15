import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from '../bolamagica/entities/response.entity';
import { SEED_RESPONSES } from './seed.data';

@Injectable()
export class SeederService implements OnModuleInit{
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectRepository(Response)
    private readonly responseRepository: Repository<Response>,
  ) {}

  async onModuleInit(){
    this.logger.log('Iniciando el proceso de Seeding (poblar base de datos)...');
    await this.seed();
    this.logger.log('Seeding completado.');
  }

  /**
   * Lógica del Seeder.
   */
  async seed(){
    const count = await this.responseRepository.count();

    if (count === 0) {
      this.logger.log('La base de datos está vacía. Poblando respuestas...');
      const responses = this.responseRepository.create(SEED_RESPONSES);
      await this.responseRepository.save(responses);
      this.logger.log(`Se han insertado ${responses.length} registros.`);

    } else{
      this.logger.log(`La base de datos ya tiene ${count} registros. No se necesita seeding.`);
    }
  }
}