import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/interfaces/employee';

@Component({
  selector: 'app-employee-entire-profile',
  templateUrl: './employee-entire-profile.component.html',
  styleUrls: ['./employee-entire-profile.component.css'],
})
export class EmployeeEntireProfileComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EmployeeEntireProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {}
  ngOnInit(): void {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
