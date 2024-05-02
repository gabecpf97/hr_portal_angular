import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-hiring-application',
  templateUrl: './hiring-application.component.html',
  styleUrls: ['./hiring-application.component.css']
})
export class HiringApplicationComponent implements OnInit {
  applicationId: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.applicationId = params.get('applicationId')??"";
    });
    this.fetchData()
  }

  fetchData() {
    const token = localStorage.getItem('authToken'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  
    });

    this.http.get<{application: any[]}>('http://localhost:3000/application/'+this.applicationId, { headers })
    .subscribe({
      next: (response) => {
        console.log(response.application)
      },
      error: (error) => {
        console.error('Error fetching application data:', error);
      }
    });
  }

}
