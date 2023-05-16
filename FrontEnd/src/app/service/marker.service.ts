import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './popup.service';
import { AuthService } from './autentificazione.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals: string = '/assets/data/usa-capitals.geojson';
  private backEndUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private popupService: PopupService, private authService : AuthService) { }

  makeCapitalMarkers(map: L.Map): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);

        marker.bindPopup(this.popupService.makeCapitalPopup(c.properties));
        
        marker.addTo(map);
      }
    });
   }

  addPoint(lat: number, lng: number, userId: number) {
    const headers = this.authService.getHttpHeaders();
    const body = { lat, lng, userId };
    return this.http.post(`${this.backEndUrl}/api/point/createPoint`, body, { headers });
  }
  
  removePoint(pointId: number) {
    const headers = this.authService.getHttpHeaders();
    return this.http.delete(`${this.backEndUrl}/api/point/deletePoint/${pointId}`, { headers });
  }
  
  getAllPoints() {
    const headers = this.authService.getHttpHeaders();
    return this.http.get(`${this.backEndUrl}/api/point/getAllPoints`, { headers });
  }
}
