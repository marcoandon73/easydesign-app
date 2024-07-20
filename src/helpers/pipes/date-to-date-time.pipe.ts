import { Injectable, PipeTransform} from '@nestjs/common';

@Injectable()
export class DateToDateTimePipe implements PipeTransform {
  transform(date) {
    console.log('transform', date);
    // console.log('try transform', date.property, date['object'][date.property]);
    // const date = data['object'][data.property];
    const dateComponents = date.split('-');
    console.log('dateComponents?.length>1', dateComponents);
    if(dateComponents?.length>1){
      const retuurnvalue = new Date(Date.UTC(dateComponents[2], dateComponents[1] - 1, dateComponents[0], 0, 0, 0))
        .toISOString();
      console.log('retuurnvalue', retuurnvalue);
      return retuurnvalue;
    }
    // const formatted =  new Date(Date.parse(date.value)).toISOString().substring(0, 26);
    // console.log('formatted',formatted);
    return date;
  }
}
