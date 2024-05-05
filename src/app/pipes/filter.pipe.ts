import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../interfaces/employee';
import { MatTableDataSource } from '@angular/material/table';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    dataSource: MatTableDataSource<Employee>,
    searchTerm: string
  ): MatTableDataSource<Employee> {
    if (!dataSource || !searchTerm) {
      return dataSource;
    }
    const filteredData = dataSource.data.filter(
      (employee: Employee) =>
        employee.firstName.toLowerCase().includes(searchTerm) ||
        employee.lastName.toLowerCase().includes(searchTerm) ||
        employee.preferredName?.toLowerCase().includes(searchTerm)
    );
    return new MatTableDataSource(filteredData);
  }
}
