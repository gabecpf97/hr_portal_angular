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
      console.log(houses)
      houses = houses.reverse();
  });

    
  }

  onSubmit(): void {
    if (this.housingForm.valid) {
      console.log(this.housingForm.value);
      const formValue = {
        ...this.housingForm.value,
        buildingAptNum: parseInt(this.housingForm.value.address.buildingAptNum, 10),
        bed: parseInt(this.housingForm.value.furniture.bed, 10),
        mattress: parseInt(this.housingForm.value.furniture.mattress, 10),
        table: parseInt(this.housingForm.value.furniture.table, 10),
        chair: parseInt(this.housingForm.value.furniture.chair, 10),
        residentIds: [],
        facilityReportsIds: []

      }
      this.loadHouses();
      this.housingService.addHousing(this.housingForm.value).subscribe({
        next: (response) => console.log('Housing added successfully', response),
        error: (error) => console.error('Failed to add housing', error)
      });
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
