import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return []; // Return empty array if input is null
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(
      (it) =>
        it.firstName.toLowerCase().includes(searchText) ||
        it.lastName.toLowerCase().includes(searchText) ||
        (it.preferredName &&
          it.preferredName.toLowerCase().includes(searchText))
    );
  }
}
