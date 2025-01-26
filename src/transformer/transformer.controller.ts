import { Controller, Post, Body } from '@nestjs/common';
import { TransformerService } from './transformer.service';

@Controller('transform')
export class TransformerController {
  constructor(private readonly transformerService: TransformerService) {}

  @Post()
  transformText(
    @Body('text') text: string,
    @Body('action') action: string,
  ): { result: string } {
    if (!text || !action) {
      throw new Error('Text and action are required');
    }

    let result: string;

    switch (action) {
      case 'UPPER':
        result = this.transformerService.toUpperCase(text);
        break;
      case 'LOWER':
        result = this.transformerService.toLowerCase(text);
        break;
      case 'TITLE':
        result = this.transformerService.toTitleCase(text);
        break;
      case 'RANDOM':
        result = this.transformerService.toRandomCase(text);
        break;
      default:
        throw new Error('Invalid action');
    }

    return { result };
  }
}
