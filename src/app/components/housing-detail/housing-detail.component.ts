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
  
  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.house$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return id ? this.housingService.getHouseById(id) : of(null); // Handling null case
      }),
      tap(house => {
        if (house) {
          this.reports = house.houseInfo.facilityReportsIds.reverse();
          console.log(this.reports);
          this.residents = house.residents.filter((resident:Resident) => resident !== null);
          // console.log("here----------------------------",this.residents);
          this.numberOfPages = Math.ceil(house.houseInfo.facilityReportsIds.length / this.itemsPerPage);
        }
      })
    );
  }

  changePage(page: number): void {
    if (page < 1 || page > this.numberOfPages) {
      return;
    }
    this.currentPage = page;
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
        this.reports[reportIndex] = response.newReport; // Replace the old report with the updated one
        this.reports = [...this.reports]; // Reassign the reports array to trigger change detection
        this.changeDetectorRef.markForCheck(); // Force change detection
      }
      this.newComments[reportId] = ''; // Clear the input field after adding
    },
    error: (error) => {
      console.error('Failed to add comment', error);
      alert('Failed to add the comment. Please try again.');
    }
  });
}




}
