import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { Observable, of } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-housing-management',
  templateUrl: './housing-management.component.html',
  styleUrls: ['./housing-management.component.css']
})
export class HousingManagementComponent implements OnInit {

  // houses: any[] = [];
  housingForm: FormGroup;
  houses$: Observable<any[]> = of([]);
  constructor(
    private housingService: HousingService,
    private fb: FormBuilder
  ) {
    this.housingForm = this.fb.group({
      address: this.fb.group({
        buildingAptNum: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required]
      }),
      landlord: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required]
      }),
      furniture: this.fb.group({
        bed: ['', Validators.required],
        mattress: ['', Validators.required],
        table: ['', Validators.required],
        chair: ['', Validators.required]
      })
    });
  }


  displayedColumns: string[] = ['buildingAptNum', 'street', 'city', 'stateZip', 'landlord', 'phone'];

  trackByHouseId(index: number, house: any): string {
    return house._id;
  }

  ngOnInit(): void {
    
    this.houses$ = this.housingService.getAllHousing().pipe();
    this.houses$.subscribe(houses => {
      // console.log(houses)
      houses = houses.reverse();
  });

    
  }


  onSubmit(): void {
    // Check if the form is valid
    if (this.housingForm.valid) {
      const formValue = {
        ...this.housingForm.value,
        address: {
          ...this.housingForm.value.address,
          buildingAptNum: parseInt(this.housingForm.value.address.buildingAptNum, 10)
        },
        furniture: {
          bed: parseInt(this.housingForm.value.furniture.bed, 10),
          mattress: parseInt(this.housingForm.value.furniture.mattress, 10),
          table: parseInt(this.housingForm.value.furniture.table, 10),
          chair: parseInt(this.housingForm.value.furniture.chair, 10),
        },
        residentIds: [],
        facilityReportsIds: []
      };
  
      if (isNaN(formValue.address.buildingAptNum) ||
          isNaN(formValue.furniture.bed) ||
          isNaN(formValue.furniture.mattress) ||
          isNaN(formValue.furniture.table) ||
          isNaN(formValue.furniture.chair)) {
        alert("Please enter valid numbers for building/apt number, bed, mattress, table, and chairs.");
        return;
      }
  

      this.housingService.addHousing(formValue).subscribe({
        next: (response) => {
          console.log('Housing added successfully', response);
          this.loadHouses();
          this.housingForm.reset();
        },
        error: (error) => {
          console.error('Failed to add housing', error);
          alert('Failed to submit form. Please try again.');
        }
      });
    } else {
      alert('Form is not valid, please check your entries.');
    }
  
    this.houses$ = this.housingService.getAllHousing().pipe();
  }
  

  loadHouses() {
    this.houses$ = this.housingService.getAllHousing().pipe();
  }
  deleteHousing(id: string): void {
    this.housingService.deleteHousing(id).subscribe({
      next: () => {
        alert('Housing deleted successfully!');
        this.loadHouses();  // Reload the list to reflect the changes
      },
      error: () => alert('Failed to delete housing.')
    });
  }


}
