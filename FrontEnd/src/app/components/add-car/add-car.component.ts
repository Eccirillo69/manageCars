import { Component } from '@angular/core';
import { GestioneService } from 'src/app/service/gestione.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css'],
})
export class AddCarComponent {
  username: string = '';
  model: string = '';
  plates: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private gestioneService: GestioneService) {}

  addCar() {
    this.errorMessage = '';
    this.successMessage = '';
  
    // Controllo se tutti i campi sono stati inseriti
    if (!this.username || !this.model || !this.plates) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
  
    // Rimuovo eventuali spazi bianchi iniziali e finali dai campi
    this.username = this.username.trim();
    this.model = this.model.trim();
    this.plates = this.plates.trim();
  
    // Controllo se i campi model e plates non sono vuoti
    if (!this.model || !this.plates) {
      this.errorMessage = 'Please enter a valid car model and plates.';
      return;
    }
  
    this.gestioneService.addCar(this.model, this.plates, this.username).subscribe({
      next: (data) => {
        this.successMessage = 'Car added successfully!';
        this.errorMessage = '';
  
        // Reset form fields
        this.username = '';
        this.model = '';
        this.plates = '';
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = error.error.message;
        this.successMessage = '';
      },      
    });
  } 
}
