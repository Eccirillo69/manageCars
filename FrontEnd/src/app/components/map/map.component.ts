import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from 'src/app/service/marker.service';
import { AuthService } from 'src/app/service/autentificazione.service';
import { Router } from '@angular/router';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})

export class MapComponent implements AfterViewInit {
  private map: any;
  private markerPointIds = new Map<L.Marker, number>();

  private initMap(): void {
    this.map = L.map('map', {
      center: [41.91, 12.48],
      zoom: 6,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
    this.map.on('click', (e: any) => this.createPoint(e));
  }

  private username: string | null = null;

  constructor(private markerService: MarkerService, private authService: AuthService, private router: Router) {}

  private createAndConfigureMarker(latlng: L.LatLngExpression, username: string, id?: number): L.Marker {
    const marker = L.marker(latlng).addTo(this.map);
    
    // Se abbiamo un id, lo aggiungiamo all'oggetto Map
    if (id !== undefined) {
      this.markerPointIds.set(marker, id);
    }
    
    // Controlla se latlng è un oggetto o un array e crea il contenuto del popup di conseguenza
    let lat, lng;
    if (Array.isArray(latlng)) {
      [lat, lng] = latlng;
    } else {
      lat = latlng.lat;
      lng = latlng.lng;
    }
    
    const popupContent = `Creato da: <a id="link-${username}" href="#">${username}</a>
      <br>LAT: ${lat}
      <br>LON: ${lng}`;
    marker.bindPopup(popupContent);
    
    // Aggiungiamo gli event listener per il mouseover, mouseout e click
    marker.on('mouseover', () => this.handleMouseOver(marker, username));
    marker.on('mouseout', this.handleMouseOut);
  marker.on('click', () => this.handleClick(marker));
    
    return marker;
  }
  
  private createPoint(e: any): void {
    const point = {
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
      userId: this.authService.getUserId(),
    };
  
    this.markerService.addPoint(point.latitude, point.longitude, point.userId).subscribe({
      next: (response: any) => {
        const username = this.authService.getUsername();
        this.createAndConfigureMarker(e.latlng, username, response.id);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  private deletePoint(marker: L.Marker): void {
    this.map.removeLayer(marker);

    const pointId = this.markerPointIds.get(marker);
    if (pointId !== undefined) {
      // Se abbiamo un pointId, lo rimuoviamo dal backend
      this.markerService.removePoint(pointId).subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });

      // Rimuovi la voce dall'oggetto Map
      this.markerPointIds.delete(marker);
    } else {
      console.error('Could not find point ID for marker');
    }
  }

  private handleMouseOver(marker: L.Marker, username: string): void {
    marker.openPopup();

    this.username = username;
    const link = document.getElementById(`link-${username}`);
    if (link) {
      link.addEventListener('click', (e) => this.navigateToUser(e, username));
    }
  }
  
  private handleMouseOut(): void {
    const link = document.getElementById(`link-${this.username}`);
    if (link) {
      link.removeEventListener('click', (e) => this.navigateToUser(e, this.username));
    }
  }

  private navigateToUser(e: MouseEvent, username: string | null): void {
    e.preventDefault();
    if (username) {
      this.router.navigate(['/getAllPersons'], { queryParams: { searchTerm: username } });
    }
  }
  
  private handleClick(marker: L.Marker): void {
    this.deletePoint(marker);
  }

  ngAfterViewInit(): void {
    this.initMap();
  
    // Carica tutti i punti dal backend dopo l'inizializzazione della mappa
    this.markerService.getAllPoints().subscribe((points: any) => {
      for (let point of points) {
        this.createAndConfigureMarker([point.latitude, point.longitude], point.person.username, point.id);
      }
    });
  }
}
