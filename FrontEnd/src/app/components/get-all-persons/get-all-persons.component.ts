import { Component, OnInit } from '@angular/core';
import { GestioneService } from 'src/app/service/gestione.service';

@Component({
  selector: 'app-get-all-persons',
  templateUrl: './get-all-persons.component.html',
  styleUrls: ['./get-all-persons.component.css'],
})
export class GetAllPersonsComponent implements OnInit {
  persons: any[] = [];
  searchTerm: string = '';
  isUsernameAscending: boolean = true;
  isDateAscending: boolean = true;

  constructor(private gestioneService: GestioneService) {}

  ngOnInit() {
    this.getAllPersons();
  }

  getAllPersons() {
    this.gestioneService.getAllPersons().subscribe((data: any[]) => {
      console.log(data);
      this.persons = data;
    });
  }

  search() {
    if (this.searchTerm.length > 0) {
      this.gestioneService.searchPersons(this.searchTerm).subscribe((data: any[]) => {
        console.log(data);
        this.persons = data;
      });
    } else {
      this.getAllPersons();
    }
  }

  sortByUsername() {
    this.persons.sort((a, b) =>
      this.isUsernameAscending
        ? a.username.localeCompare(b.username)
        : b.username.localeCompare(a.username)
    );
    this.isUsernameAscending = !this.isUsernameAscending;
  }

  sortByDate() {
    this.persons.sort((a, b) =>
      this.isDateAscending
        ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    this.isDateAscending = !this.isDateAscending;
  }
}


