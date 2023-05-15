import { Component } from '@angular/core';
import { GestioneService } from 'src/app/service/gestione.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
})
export class AddPersonComponent {
  username: string = '';
  status: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private gestioneService: GestioneService) {}

  addPerson() {
    this.gestioneService.addPerson(this.username, this.status).subscribe({
      next: (data) => {
        this.successMessage = 'Person successfully created';
        this.errorMessage = '';
      },
      error: (error) => {
        if (error.status === 409) {
          this.errorMessage = 'Person already exists, please try again';
        } else {
          this.errorMessage = 'Error in creating person, please try again';
        }
        this.successMessage = '';
      },
    });
  }
  
}
