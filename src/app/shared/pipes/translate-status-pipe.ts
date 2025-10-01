import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateStatus',
})
export class TranslateStatusPipe implements PipeTransform {
  transform(value: string): string {
    // let newStatus = '';
    switch (value) {
      case 'заправлений':
        value = 'filled';
        break;
      case 'на заправці':
        value = 'on-filler';
        break;
      case 'в принтері':
        value = 'in-printer';
        break;
      case 'закінчився':
        value = 'ended';
        break;
      case 'в ремонті':
        value = 'on-repair';
        break;
      case 'неробочий':
        value = 'non-working';
        break;
      default:
        value;
    }
    return value;
  }
}
