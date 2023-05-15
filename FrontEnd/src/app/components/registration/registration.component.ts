import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/autentificazione.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  username: string = '';
  password: string = '';
  status: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService ) {}

  ngOnInit() {}

  registerPerson() {
    if (this.username && this.password && this.status) {
      const newPerson = {
        username: this.username,
        password: this.password,
        status: this.status,
      };
      
      this.authService.registration(newPerson).subscribe({
        next:(data: any) => {
          this.successMessage = 'Registration successful!';
          this.errorMessage = '';
          this.username = '';
          this.password = '';
          this.status = '';
        },
        error:(error) => {
          this.errorMessage = 'Registration failed. Please try again.';
          this.successMessage = '';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all fields.';
      this.successMessage = '';
    }
  }
}
