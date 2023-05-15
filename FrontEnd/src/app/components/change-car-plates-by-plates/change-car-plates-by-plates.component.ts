import { Component } from '@angular/core';
import { GestioneService } from 'src/app/service/gestione.service';

@Component({
  selector: 'app-change-car-by-plates',
  templateUrl: './change-car-plates-by-plates.component.html',
  styleUrls: ['./change-car-by-plates.component.css'],
})
export class ChangeCarByPlatesComponent {
  currentPlates: string = '';
  newPlates: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private gestioneService: GestioneService) {}

  changeCarByPlates() {
    console.log("currentPlates: ", this.currentPlates);
    console.log("newPlates: ", this.newPlates);

    this.gestioneService.changeCarPlatesByPlates(this.currentPlates, this.newPlates).subscribe({
      next: (data) => {
        this.successMessage = 'Car plates successfully changed';
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = 'Car not found or error in changing plates, please try again';
        this.successMessage = '';
      },
    });
  }
}
