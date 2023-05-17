import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/autentificazione.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(public authService: AuthService, public router: Router) {
    this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => this.isAuthenticated = isAuthenticated
    );
  }
  ngOnInit(): void {
    this.authService.logout();
    window.addEventListener('beforeunload', (event) => {
      this.authService.logout();
    });
  }

  title = 'Gestione Macchine';
}


