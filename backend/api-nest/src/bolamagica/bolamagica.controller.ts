import {Controller,Get,Query,Param,Post,Body,DefaultValuePipe,ParseBoolPipe,} from '@nestjs/common';
import { ballService } from './bolamagica.service';
import { BiasedBodyDto } from './dto/biased-body.dto';

@Controller()
export class ballController{
  constructor(private readonly ballService: ballService) {}

  /**
   * GET /bola_magica
   * Retorna una respuesta aleatoria.
   */
  @Get()
  getRandomFortune(@Query('locale') locale: string) {
    return this.ballService.getRandomFortune(locale);
  }

  /**
   * GET /bola_magica/categories
   * Retorna todas las respuestas agrupadas por categoría.
   */
  @Get('categories')
  getCategories(@Query('locale') locale: string) {
    return this.ballService.getCategories(locale);
  }

  /**
   * GET /bola_magica/biased
   * Retorna una respuesta "sesgada".
   */
  @Get('biased')
  getBiasedFortune(
    @Query('question') question: string,
    @Query('locale') locale?: string,
    @Query('lucky', new DefaultValuePipe(false), ParseBoolPipe)
    lucky?: boolean,
  ) {
    if (!question) {
      return { error: 'A question is required.' };
    }
    return this.ballService.getBiasedFortune(question, lucky, locale);
  }

  /**
   * POST /bola_magica/biased
   * Método alternativo para obtener respuesta sesgada.
   */
  @Post('biased')
  postBiasedFortune(@Body() biasedBodyDto: BiasedBodyDto) {
    return this.ballService.getBiasedFortuneFromPost(biasedBodyDto);
  }

  /**
   * GET /api/[category]
   * Retorna una respuesta aleatoria de una categoría específica.
   */
  @Get(':category')
  getSpecificCategory(
    @Param('category') category: 'positive' | 'negative' | 'neutral',
    @Query('locale') locale: string,
  ) {
    return this.ballService.getSpecificCategory(category, locale);
  }
}