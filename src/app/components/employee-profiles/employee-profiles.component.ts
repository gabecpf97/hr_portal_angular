import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interfaces/employee';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-employee-profiles',
  templateUrl: './employee-profiles.component.html',
  styleUrls: ['./employee-profiles.component.css'],
})
export class EmployeeProfilesComponent implements OnInit {
  searchInput: string = '';
  dataSource: MatTableDataSource<Employee>;
  displayedColumns: string[] = [
    'FullName',
    'SSN',
    'workAuthorization',
    'cellPhone',
    'email',
    'viewProfile',
  ];
  totalEmployees: number = 0;

  constructor(private employeeService: EmployeeService) {
    this.dataSource = new MatTableDataSource<Employee>();
  }
  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      if (employees) {
        employees.sort((a, b) => a.lastName.localeCompare(b.lastName)); // Sort employees by last name
        this.dataSource.data = employees;
        this.totalEmployees = employees.length;
      } else {
        this.dataSource.data = [];
        this.totalEmployees = 0;
      }
    });

    // this.employees$.subscribe({
    //   next: (employees) => {
    //     console.log('Employees:', employees);
    //   },
    //   error: (error) => {
    //     console.error('Error fetching employees:', error);
    //   },
    // });
  }

  onSearchInputChange(): void {
    const searchTerm = this.searchInput.toLowerCase().trim();
    this.dataSource.filter = searchTerm;
    this.totalEmployees = this.dataSource.filteredData.length;
  }
}
