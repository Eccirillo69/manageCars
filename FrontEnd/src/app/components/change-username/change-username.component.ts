import { Component } from '@angular/core';
import { GestioneService } from 'src/app/service/gestione.service';

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.css'],
})
export class ChangeUsernameComponent {
  currentUsername: string = '';
  newUsername: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private gestioneService: GestioneService) {}

  changeUsername() {
    this.gestioneService
      .changeUsername(this.currentUsername, this.newUsername)
      .subscribe({
        next: (data) => {
          this.successMessage = 'Username changed successfully';
          this.errorMessage = '';
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = error.error.message;
          this.successMessage = '';
        },
      });
  }
}



