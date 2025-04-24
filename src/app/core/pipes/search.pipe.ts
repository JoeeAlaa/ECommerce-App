import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObj:any[] , word:string): any[] {
    if (!arrayOfObj) return []; 
    if (!word) return arrayOfObj;
    return arrayOfObj.filter((item)=> (item.title || item.name).toLowerCase().includes(word.toLowerCase()) );
  }

}
