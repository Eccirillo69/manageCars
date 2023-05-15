import { Component } from '@angular/core';
import { GestioneService } from 'src/app/service/gestione.service';

@Component({
  selector: 'app-get-all-cars-by-person',
  templateUrl: './get-all-cars-by-person.component.html',
  styleUrls: ['./get-all-cars-by-person.component.css']
})
export class GetAllCarsByPersonComponent {
  username: string = "";
  cars: any[]= [];

  constructor(private gestioneService: GestioneService) { }

  getAllCarsByPerson() {
    this.gestioneService.getAllCarsByPerson(this.username)
      .subscribe(data => {
        this.cars = data;
      });
  }
}
