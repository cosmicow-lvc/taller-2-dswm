import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './entities/response.entity';
import { BiasedBodyDto } from './dto/biased-body.dto';

type Category = 'positive' | 'negative' | 'neutral';

@Injectable()
export class ballService {
  constructor(
    @InjectRepository(Response)
    private responseRepository: Repository<Response>,
  ) {}

  async getRandomFortune(locale: string = 'en') {
    const response = await this.getRandomResponse(locale);
    return {
      reading: response.reading,
      locale: response.locale,
    };
  }

  async getCategories(locale: string = 'en') {
    const loc = this.validateLocale(locale);
    const allResponses = await this.responseRepository.find({
      where: { locale: loc },
    });

    const grouped = {
      positive: [],
      neutral: [],
      negative: [],
      locale: loc,
    };

    allResponses.forEach((res) => {
      if (grouped[res.category]) {
        grouped[res.category].push(res.reading);
      }
    });

    return grouped;
  }

  /**
   * Obtiene una respuesta aleatoria de una categoría específica.
   */
  async getSpecificCategory(category: Category, locale: string = 'en') {
    this.validateCategory(category);
    const loc = this.validateLocale(locale);

    const response = await this.getRandomResponse(loc, category);

    return {
      reading: response.reading,
      category: response.category,
      locale: response.locale,
    };
  }

  async getBiasedFortune(
    question: string,
    lucky: boolean = false,
    locale: string = 'en',
  ) {
    const loc = this.validateLocale(locale);

    const sentiment = this.mockSentimentAnalysis(question);
    let category: Category = 'neutral';

    if (lucky) {
      category = 'positive';
    } else if (sentiment.score > 0) {
      category = 'positive';
    } else if (sentiment.score < 0) {
      category = 'negative';
    } else {
      category = Math.random() > 0.5 ? 'neutral' : 'negative';
    }

    const response = await this.getRandomResponse(loc, category);

    return {
      reading: response.reading,
      question: question,
      sentiment: sentiment, 
      locale: loc,
      lucky: lucky,
    };
  }

  /**
   * Maneja la lógica del POST /bola_magica/biased
   */
  async getBiasedFortuneFromPost(dto: BiasedBodyDto) {
    return this.getBiasedFortune(dto.question, dto.lucky, dto.locale);
  }


  /**
   * Función de ayuda central para obtener una respuesta aleatoria de la BD.
   * Ordena por RANDOM() y toma 1.
   */
  private async getRandomResponse(
    locale: string,
    category?: Category,
  ): Promise<Response> {
    const query = this.responseRepository.createQueryBuilder('response');
    query.where('response.locale = :locale', { locale });

    if (category) {
      query.andWhere('response.category = :category', { category });
    }

    query.orderBy('RANDOM()').limit(1);

    const result = await query.getOne();

    if (!result) {
      // si no hay respuesta para ese idioma/categoría, busca en inglés
      if (locale !== 'en') {
        return this.getRandomResponse('en', category);
      }
      throw new NotFoundException(
        `No responses found for locale '${locale}' and category '${category}'.`,
      );
    }
    return result;
  }

  //Simulación 
  
  private mockSentimentAnalysis(question: string) {
    const positiveWords = ['win', 'succeed', 'love', 'good', 'lucky'];
    const negativeWords = ['lose', 'fail', 'hate', 'bad', 'unlucky'];

    let score = 0;
    const words = question.toLowerCase().replace('?', '').split(' ');
    const positive: string[] = [];
    const negative: string[] = [];

    words.forEach((word) => {
      if (positiveWords.includes(word)) {
        score++;
        positive.push(word);
      }
      if (negativeWords.includes(word)) {
        score--;
        negative.push(word);
      }
    });

    return {
      score: score,
      comparative: score / (words.length || 1),
      calculation: [], 
      tokens: words,
      words: [...positive, ...negative],
      positive: positive,
      negative: negative,
    };
  }

  private validateCategory(category: string): void {
    if (!['positive', 'negative', 'neutral'].includes(category)) {
      throw new NotFoundException(`Category '${category}' not found.`);
    }
  }

  private validateLocale(locale: string): string {
    //idiomas
    const supportedLocales = ['en', 'es', 'fr'];
    return supportedLocales.includes(locale) ? locale : 'en';
  }
}