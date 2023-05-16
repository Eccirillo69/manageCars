import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MarkerService } from './service/marker.service';
import { PopupService } from './service/popup.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { ChangeCarByPlatesComponent } from './components/change-car-plates-by-plates/change-car-plates-by-plates.component';
import { DeleteCarByPlatesComponent } from './components/delete-car-by-plates/delete-car-by-plates.component';
import { GetAllPersonsComponent } from './components/get-all-persons/get-all-persons.component';
import { GetAllCarsByPersonComponent } from './components/get-all-cars-by-person/get-all-cars-by-person.component';
import { ChangeUsernameComponent } from './components/change-username/change-username.component';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    NotFoundComponent,
    AddCarComponent,
    ChangeCarByPlatesComponent,
    DeleteCarByPlatesComponent,
    GetAllPersonsComponent,
    GetAllCarsByPersonComponent,
    ChangeUsernameComponent,
    AddPersonComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    MarkerService,
    PopupService
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
