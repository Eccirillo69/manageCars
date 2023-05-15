import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/autentificazione.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log("ON INIT");
    const token = localStorage.getItem('token');
    // const role = localStorage.getItem('role'); // recupera il ruolo dal local storage    
    if(token != null || token != undefined){
      this.isAuthenticated = true;
    }else {
      this.isAuthenticated = false;
    }

    console.log('Is Admin:', this.isAdmin());
  }
  
  logout(): void {
    this.authService.logout();
  }

  isAdmin(): boolean {
    return this.authService.getRole() === 'ADMIN';
  }
}

