import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {GeolocationService } from "./geolocation.service"
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DataService} from "./data.service";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input"; 
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from "@angular/material/slider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatSlideToggleModule} from "@angular/material/slide-toggle";

import 'hammerjs';
import { ListComponent } from './list/list.component';
import { CoffeeComponent } from './coffee/coffee.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatSnackBarModule } from "@angular/material/snack-bar";

const routes : Routes =[
  {path : '', component: ListComponent},
  {path : 'coffee', component : CoffeeComponent},
  {path : 'coffee/:id', component : CoffeeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CoffeeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserModule,
    // AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatToolbarModule,
    MatCardModule,
    MatSlideToggleModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [GeolocationService, DataService],
  bootstrap: [AppComponent]
})

export class AppModule { }