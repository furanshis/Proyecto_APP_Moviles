import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuAlumnoPageRoutingModule } from './menu-alumno-routing.module';

import { MenuAlumnoPage } from './menu-alumno.page';
import { SearchbarModule } from '../searchbar/searchbar.module';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { CategoryItemModule } from '../components/category-item/category-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuAlumnoPageRoutingModule,
    SearchbarModule,
    CategoryItemModule,
  ],
  declarations: [MenuAlumnoPage]
})
export class MenuAlumnoPageModule {}
