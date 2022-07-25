import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleArabicName'
})
export class TitleArabicNamePipe implements PipeTransform {

  transform(value: string, isMale: boolean): string {
    if (isMale) {
      return "السيد : " + value;
    }
    return "السيدة : " + value;
  }

}
