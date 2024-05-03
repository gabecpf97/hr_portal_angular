import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from 'src/app/interfaces/employee';


@Component({
  selector: 'app-hiring-application',
  templateUrl: './hiring-application.component.html',
  styleUrls: ['./hiring-application.component.css']
})
export class HiringApplicationComponent implements OnInit {
  applicationId: string;
  applicationStatus: string;
  applicationData: Employee;
  feedback: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.applicationId = params.get('applicationId')??"";
    });
    this.fetchData()
    this.feedback = ""
  }

  fetchData() {
    const token = localStorage.getItem('authToken'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  
    });

    this.http.get<{application: Employee}>('http://localhost:3000/application/'+this.applicationId, { headers })
    .subscribe({
      next: (response) => {
        this.applicationStatus = response.application.status
        this.applicationData = response.application

        console.log(this.applicationData)
        console.log(this.applicationStatus)
      },
      error: (error) => {
        console.error('Error fetching application data:', error);
      }
    });
  }

  processApplication(action:string){
    const token = localStorage.getItem('authToken'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  
    });
    const payload = {
      status: action,
      feedback: this.feedback
    };
    this.http.put<{records: any[]}>('http://localhost:3000/application/hr/update/'+this.applicationId, payload, { headers })
    .subscribe({
      next: () => {
        alert("You have send the feedback to the employee!")
        location.reload()
      },
      error: (error) => {
        console.error('Error processing the onboarding application:', error);
      }
    });
  }

}
