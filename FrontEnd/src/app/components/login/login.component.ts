import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { AuthService } from 'src/app/service/autentificazione.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter your username and password';
      return;
    }

    this.authService.login({username: this.username, password: this.password}).subscribe({
      next:(response) => {
        console.log(response);
        this.successMessage = 'Login successful';
        this.errorMessage = '';

        this.authService.setIsAuthenticated(true);
        this.router.navigate(['/home']);
        console.log("Questo utente si è autenticato: " + this.authService.checkIsAuthenticated());
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Login failed';
        this.successMessage = '';
      }
    });
  }
}

