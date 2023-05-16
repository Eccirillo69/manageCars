import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './autentificazione.service';

@Injectable({
  providedIn: 'root'
})
export class GestioneService {

  private backEndUrl = "http://localhost:3000";

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllPersons(): Observable<any> {
    return this.http.get<any>(`${this.backEndUrl}/api/person/getAllPersons`, {
      headers: this.authService.getHttpHeaders(),
    });
    
  }

  getAllCarsByPerson(username: string): Observable<any> {
    return this.http.get<any>(`${this.backEndUrl}/api/person/${username}/cars`, { 
      headers: this.authService.getHttpHeaders()
    });
  }

  changeUsername(username: string, newUsername: string): Observable<any> {
    return this.http.put<any>(`${this.backEndUrl}/api/person/changeUsername/${username}/${newUsername}`, {
      headers: this.authService.getHttpHeaders()
    });
  }
  
  addPerson(username: string, status: string): Observable<any> {
    return this.http.post<any>(`${this.backEndUrl}/api/person/addPerson`, { username, status }, {
      headers: this.authService.getHttpHeaders()
    });
  }
  
  addCar(model: string, plates: string, username: string): Observable<any> {
    return this.http.post<any>(`${this.backEndUrl}/api/car/addCar`, { model, plates, username }, {
      headers: this.authService.getHttpHeaders()
    });
  }

  deleteCarByPlates(plates: string): Observable<any> {
    return this.http.delete<any>(`${this.backEndUrl}/api/car/deleteCarByPlates/${plates}`, {
      headers: this.authService.getHttpHeaders()
    });
  }

  changeCarPlatesByPlates(currentPlates: string, newPlates: string): Observable<any> {
    return this.http.put<any>(`${this.backEndUrl}/api/car/changeCarPlatesByPlates/${currentPlates}`, { newPlates: newPlates }, {
      headers: this.authService.getHttpHeaders()
    });
  }

  searchPersons(searchTerm: string): Observable<any> {
    return this.http.get<any>(`${this.backEndUrl}/api/person/search?term=${searchTerm}`, {
      headers: this.authService.getHttpHeaders()
    });
  }
  
}
