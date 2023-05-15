import { Component } from '@angular/core';
import { GestioneService } from 'src/app/service/gestione.service';

@Component({
  selector: 'app-delete-car-by-plates',
  templateUrl: './delete-car-by-plates.component.html',
  styleUrls: ['./delete-car-by-plates.component.css'],
})
export class DeleteCarByPlatesComponent {
  plates: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private gestioneService: GestioneService) {}

  deleteCarByPlates() {
    this.gestioneService.deleteCarByPlates(this.plates).subscribe({
      next: (data) => {
        this.successMessage = 'Car successfully deleted';
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = 'Car not found, please try again';
        this.successMessage = '';
      },
    });
  }
}
