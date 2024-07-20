import { Injectable, PipeTransform} from '@nestjs/common';

@Injectable()
export class ToLowerCasePipe implements PipeTransform {
  transform(value: string) {
    return value.toLowerCase();
  }
}
