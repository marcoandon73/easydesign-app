import { Injectable, PipeTransform} from '@nestjs/common';

@Injectable()
export class SlugifyPipe implements PipeTransform {
  transform(value: string) {
    return value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/^-+|-+$/g, '');
  }
}
