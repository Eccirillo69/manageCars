import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { ChangeCarByPlatesComponent } from './components/change-car-plates-by-plates/change-car-plates-by-plates.component';
import { ChangeUsernameComponent } from './components/change-username/change-username.component';
import { DeleteCarByPlatesComponent } from './components/delete-car-by-plates/delete-car-by-plates.component';
import { GetAllCarsByPersonComponent } from './components/get-all-cars-by-person/get-all-cars-by-person.component';
import { GetAllPersonsComponent } from './components/get-all-persons/get-all-persons.component';
import { LoginComponent } from './components/login/login.component'; // Importa LoginComponent
import { RegistrationComponent } from './components/registration/registration.component'; // Importa RegistrationComponent
import { AuthGuard } from './guards/auth.guard'; // Importa AuthGuard
import { AdminGuard } from './guards/admin.guard';
import { MapComponent } from './components/map/map.component';




const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/login" },
  { path: "login", component: LoginComponent },
  { path: "registration", component: RegistrationComponent },
  {
    path: "home",
    component: MenuComponent,
    canActivate: [AuthGuard], 
  },
  // OPERAZIONI
  {
    path: "addPerson",
    component: AddPersonComponent,
    canActivate: [AuthGuard, AdminGuard], 
  },
  {
    path: "map",
    component: MapComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "addCar",
    component: AddCarComponent,
    canActivate: [AuthGuard, AdminGuard], 
  },
  {
    path: "changeCarPlatesByPlates",
    component: ChangeCarByPlatesComponent,
    canActivate: [AuthGuard, AdminGuard], 
  },
  {
    path: "changeUsername",
    component: ChangeUsernameComponent,
    canActivate: [AuthGuard, AdminGuard], 
  },
  {
    path: "deleteCar",
    component: DeleteCarByPlatesComponent,
    canActivate: [AuthGuard, AdminGuard], 
  },
  {
    path: "getAllCarsByPerson",
    component: GetAllCarsByPersonComponent,
    canActivate: [AuthGuard], 
  },
  {
    path: "getAllPersons",
    component: GetAllPersonsComponent,
    canActivate: [AuthGuard], 
  },

  // 404
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "/404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

