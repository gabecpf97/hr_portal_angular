import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take, tap } from 'rxjs/operators';
import { HousingService } from 'src/app/services/housing.service';
import { Observable, of, Subscription } from 'rxjs';
import { Report ,Housing,Resident} from '../../interfaces/housing';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-housing-detail',
  templateUrl: './housing-detail.component.html',
  styleUrls: ['./housing-detail.component.css']
})
export class HousingDetailComponent implements OnInit {
  house$: Observable<any> = of([]);
  newComment = '';
  currentPage: number = 1;
  itemsPerPage: number = 4;
  numberOfPages: number = 0;
  public newComments: {[reportId: string]: string} = {};
  reports: Report[] = [];
  private subscriptions = new Subscription();
  residents: Resident[] = [];
  userInfo: any = {};
  comments: Comment[] = [];
  applicationid: string = '';
  isEditing: boolean = false;
  newDescription: string = '';
  localusername: string | null = '';
  
  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.localusername = window.localStorage.getItem('username');
    this.house$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return id ? this.housingService.getHouseById(id) : of(null); // Handling null case
      }),
      tap(house => {
        if (house) {
          this.reports = house.houseInfo.facilityReportsIds.reverse();
          this.updateCommentsWithUserInfo(this.reports);
          this.reports.forEach(report => {
            this.housingService.getUserInfo(report.createdBy).subscribe(
              userInfo => {
                report.username = userInfo.userInfo.username; // Add user info to the report
                // console.log(userInfo.userInfo.username);
                // console.log('Updated Report with User Info:', report);
              },
              error => {
                console.error('Error fetching user info:', error);
              }
            );
          });

          console.log(this.reports);
          this.residents = house.residents.filter((resident:Resident) => resident !== null);
          this.updateUserCardWithApplicationId(this.residents);

          // console.log("here----------------------------",this.residents);
          this.numberOfPages = Math.ceil(house.houseInfo.facilityReportsIds.length / this.itemsPerPage);
        }
      })
    );
  }


  updateUserCardWithApplicationId(residents: Resident[]): void {
    residents.forEach(resident => {
      this.housingService.getUserDetails(resident.userId).subscribe(
        data => {
          resident.applicationId = data.applicationId;
        }
      )
    });
  }
  updateCommentsWithUserInfo(reports: Report[]): void {
    reports.forEach(report => {
      report.comments.forEach(comment => {
        this.housingService.getUserInfo(comment.createdBy).subscribe(
          userInfo => {
            comment.username = userInfo.userInfo.username; // Assign user details to the comment
          },
          error => console.error('Error fetching user info for comment:', error)
        );
      });
    });
  }

  changePage(page: number): void {
    if (page < 1 || page > this.numberOfPages) {
      return;
    }
    this.currentPage = page;
  }

  getUserInfo(id: string){
    this.housingService.getUserInfo(id).subscribe(
      data => {
        this.userInfo = data;
        console.log('User Info:', data);
      },
      error => console.error('Error fetching user info:', error)
    );
    return this.userInfo.username;
  }

  addComment(reportId: string): void {
    const commentText = this.newComments[reportId].trim();
    if (!commentText) {
      alert('Please enter a comment');
      return;
    }

    this.housingService.addComment(reportId, commentText).subscribe({
      next: (response) => {
        if (!response || !response.newReport) {
          console.error('Invalid response or newReport data:', response);
          alert('Failed to add the comment due to invalid data.');
          return;
        }

        console.log('Comment added successfully', response);
        const reportIndex = this.reports.findIndex(r => r._id === reportId);
        if (reportIndex !== -1) {
          // Update local report data
          this.reports[reportIndex] = response.newReport;

          // Fetch user info for each comment if not provided
          this.reports[reportIndex].comments.forEach(comment => {
            if (!comment.username) {
              this.housingService.getUserInfo(comment.createdBy).subscribe(userInfo => {
                comment.username = userInfo.userInfo.username;
                this.changeDetectorRef.markForCheck();
              });
            }
          });
          this.reports = [...this.reports];
        }
        this.newComments[reportId] = '';
      },
      error: (error) => {
        console.error('Failed to add comment', error);
        alert('Failed to add the comment. Please try again.');
      }
    });
  }

  updateReportStatus(reportId: string, newStatus: string): void {
    this.housingService.updateReportStatus(reportId, newStatus).subscribe({
      next: response => {
        // Handle response, e.g., show a message or update local data
        console.log('Status updated successfully');
      },
      error: error => {
        console.error('Error updating status:', error);
      }
    });
  }

  enableEdit(reportItem: any): void {
    reportItem.isEditing = true;
    reportItem.newDescription = reportItem.description;
  }

  submitEdit(reportId:any,reportItem: any): void {
    if (!reportItem.newDescription) {
      alert('Please enter a comment.');
      return;
    }
    // const update = {
    //   commentId: reportItem._id,
    //   newComment: reportItem.newDescription
    // };
    // Call a service method to update the comment in the backend
    this.housingService.updateComment(reportItem.newDescription,reportId, reportItem._id).subscribe({
      next: () => {
        reportItem.description = reportItem.newDescription;
        reportItem.isEditing = false; // Turn off editing mode
      },
      error: (error) => console.error('Error updating comment:', error)
    });
  }


}
