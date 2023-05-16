import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backEndUrl = 'http://localhost:3000';
  private isAuthenticatedSource = new BehaviorSubject<boolean>(this.checkIsAuthenticated());
  isAuthenticated$ = this.isAuthenticatedSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  setIsAuthenticated(value: boolean) {
    this.isAuthenticatedSource.next(value);
  }

  checkIsAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  registration(personData: any): Observable<any> {
    return this.http
      .post<any>(`${this.backEndUrl}/api/auth/registration`, personData)
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    const headers = this.getHttpHeaders();
    console.log('Headers:', headers); // Aggiungi questo log per verificare l'header di autorizzazione
  
    return this.http
      .post<any>(`${this.backEndUrl}/api/auth/login`, credentials)
      .pipe(
        tap((response) => {
          console.log('login response:', response); // aggiungi questo log
          localStorage.setItem('token', response.token);
          
          // Estrai il ruolo dal token e salvalo nel localStorage
          const payload = JSON.parse(atob(response.token.split('.')[1]));
          const role = payload.role;
          localStorage.setItem('role', role);
          console.log('stored role:', localStorage.getItem('role')); // aggiungi questo log
          this.setIsAuthenticated(true);
        })
      );
  }
  
  logout(): void {
    localStorage.clear();
    this.setIsAuthenticated(false);
    this.router.navigate(['/login']);
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }
  
  getHttpHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getRole(): string {
    const token = localStorage.getItem('token');
    if (!token) {
      return '';
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('decoded role:', payload.role); // aggiungi questo log
    return payload.role;
  }  

  getUserId(): number {
    const token = localStorage.getItem('token');
    if (!token) {
      return 0;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('decoded user id:', payload.id); // aggiungi questo log
    return payload.id;
  } 
  
  getUsername(): string {
    const token = localStorage.getItem('token');
    if (!token) {
      return "nessuno";
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('decoded user id:', payload.username); // aggiungi questo log
    return payload.username;
  }



  // isTokenExpired(token: string): boolean {
  //   const payload = JSON.parse(atob(token.split('.')[1]));
  //   const expiry = payload.exp;
  //   if (Date.now() >= expiry * 1000) {
  //     return true;
  //   }
  //   return false;
  // }
}


