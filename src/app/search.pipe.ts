import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: Array<any>, filter: { [key: string]: any }): any {
    return items.filter((item) => {
      if (filter) {
        const notMatchingField = Object.keys(filter).find(
          (key) => item[key] !== filter[key]
        );

        return !notMatchingField; // true if matches all fields
      } else {
        return items;
      }
    });
  }
}
