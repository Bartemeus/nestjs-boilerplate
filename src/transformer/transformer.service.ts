import { Injectable } from '@nestjs/common';

@Injectable()
export class TransformerService {
  toUpperCase(text: string): string {
    return text.toUpperCase();
  }

  toLowerCase(text: string): string {
    return text.toLowerCase();
  }

  toTitleCase(text: string): string {
    return text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  toRandomCase(text: string): string {
    return text
      .split('')
      .map((char) =>
        Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase(),
      )
      .join('');
  }
}
