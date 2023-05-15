import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(){};

  title= "Gestione macchine by ettore Cirillo";

  ngOnInit(): void {
    console.log("ngOnInIt");
  }

}
