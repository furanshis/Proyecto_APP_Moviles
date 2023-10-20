import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ContrasenaPageRoutingModule } from './contrasena-routing.module';

import { ContrasenaPage } from './contrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ContrasenaPageRoutingModule
  ],
  declarations: [ContrasenaPage]
})
export class ContrasenaPageModule {}
