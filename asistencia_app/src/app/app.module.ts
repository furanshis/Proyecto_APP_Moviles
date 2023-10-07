import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat'; // Para Angular 16
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Para Angular 16
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'; // Para Angular 16

import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [AppComponent],
  imports: [

    // modulos de firebase

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
  
    
    BrowserModule, IonicModule.forRoot(), IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],




})
export class AppModule {}
