import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice'
})
export class SlicePipe implements PipeTransform {

  transform(value: any[], limit: number): any[] {
    if (!Array.isArray(value)) return value;
    return value.slice(0, limit);
  }

}

