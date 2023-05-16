import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from 'src/app/service/marker.service';
import { AuthService } from 'src/app/service/autentificazione.service';

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

      //CREAZIONE
    this.map.on('click', (e: any) => {
      // e.latlng contiene le coordinate (latitudine e longitudine) del punto su cui l'utente ha cliccato
      const marker = L.marker(e.latlng).addTo(this.map);

      // Aggiungiamo il punto al backend
      const point = {
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
        userId: this.authService.getUserId(),
      };
      this.markerService.addPoint(point.latitude, point.longitude, point.userId).subscribe({
          next:(response) => {
            console.log(response);
          },
          error:(error) => {
            console.log(error);
          }
      });

      const username = this.authService.getUsername();
      // Opzionalmente, puoi anche aggiungere un popup al marker
      marker.bindPopup(`Creato da: ${username}<br>LAT: ${e.latlng.lat}<br>LON: ${e.latlng.lng}`).openPopup();

      // ELIMINA MARKER
      marker.on('click', () => {
        this.map.removeLayer(marker);
      
        // Trova l'ID del punto associato al marker
        const pointId = this.markerPointIds.get(marker);
        console.log(pointId)
      
        if (pointId !== undefined) {
          console.log(pointId);
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
      }); 
    });
  }

  constructor(
    private markerService: MarkerService,
    private authService: AuthService
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
    
    // Carica tutti i punti dal backend dopo l'inizializzazione della mappa
    this.markerService.getAllPoints().subscribe((points: any) => {
      for (let point of points) {
        const marker = L.marker([point.latitude, point.longitude]).addTo(this.map);
        
        // Aggiungi l'ID del punto all'oggetto Map
        this.markerPointIds.set(marker, point.id);
  
        // Aggiungi un popup al marker
        marker.bindPopup(`Creato da: ${point.creatorUsername}<br>LAT: ${point.latitude}<br>LON: ${point.longitude}`).openPopup();
      }
    });
  }
  
  
}
