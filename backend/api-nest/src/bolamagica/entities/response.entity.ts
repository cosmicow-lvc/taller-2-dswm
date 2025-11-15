import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('responses') // El nombre de la tabla en PostgreSQL
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reading: string;

  @Column()
  category: string;

  @Column()
  locale: string;
}