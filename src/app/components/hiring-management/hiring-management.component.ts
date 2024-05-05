import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-hiring-management',
  templateUrl: './hiring-management.component.html',
  styleUrls: ['./hiring-management.component.css']
})
export class HiringManagementComponent implements OnInit {
  registrationName: string = '';
  registrationEmail: string = '';

  dataSource = new MatTableDataSource<any>();
  pendingDataSource = new MatTableDataSource<any>();
  rejectedDataSource = new MatTableDataSource<any>();
  approvedDataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ['name', 'email', 'link', 'status']
  pendingColumns: string[] = ['name', 'email', 'action']

  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const token = localStorage.getItem('authToken'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  
    });

    this.http.get<{records: any[]}>('http://localhost:3000/hiring', { headers })
    .subscribe({
      next: (response) => {
        this.dataSource.data = response.records;
      },
      error: (error) => {
        console.error('Error fetching registration data:', error);
      }
    });

    this.http.get<{filteredApplications: any[]}>('http://localhost:3000/application/filter?status=pending', { headers })
    .subscribe({
      next: (response) => {
        this.pendingDataSource.data = response.filteredApplications;
      },
      error: (error) => {
        console.error('Error fetching pending applications:', error);
      }
    });

    this.http.get<{filteredApplications: any[]}>('http://localhost:3000/application/filter?status=rejected', { headers })
    .subscribe({
      next: (response) => {
        this.rejectedDataSource.data = response.filteredApplications;
        console.log(this.rejectedDataSource.data)
      },
      error: (error) => {
        console.error('Error fetching rejected applications:', error);
      }
    });

    this.http.get<{filteredApplications: any[]}>('http://localhost:3000/application/filter?status=approved', { headers })
    .subscribe({
      next: (response) => {
        this.approvedDataSource.data = response.filteredApplications;
        console.log(this.approvedDataSource.data)
      },
      error: (error) => {
        console.error('Error fetching approved applications:', error);
      }
    });
  }

  sendLink() {
    const token = localStorage.getItem('authToken'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  
    });
    if(!this.registrationName || !this.registrationEmail){
      alert('Please fill in name and email!')
      return
    }
    const re:RegExp = /\S+@\S+\.\S+/;
    if(!re.test(this.registrationEmail)){
      alert('Invalid Email!')
      return
    }
    const payload = {
      name: this.registrationName,
      email: this.registrationEmail
    };
    this.http.post<{records: any[]}>('http://localhost:3000/hiring', payload, { headers })
    .subscribe({
      next: () => {
        alert("You have send the link to the employee!")
        location.reload()
      },
      error: (error) => {
        console.error('Error fetching registration data:', error);
      }
    });
  }
}
