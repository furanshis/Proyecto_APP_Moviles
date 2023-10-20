import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat'; // Para Angular 16
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Para Angular 16
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'; // Para Angular 16

import { environment } from 'src/environments/environment';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';



@NgModule({
  declarations: [AppComponent],
  imports: [
    ReactiveFormsModule,

    // modulos de firebase

    
  
    
    BrowserModule, IonicModule.forRoot(), IonicModule.forRoot(), AppRoutingModule, HttpClientModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideFirestore(() => getFirestore()), provideAuth(() => getAuth())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],




})
export class AppModule {}
