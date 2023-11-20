import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-menu-alumno',
  templateUrl: './menu-alumno.page.html',
  styleUrls: ['./menu-alumno.page.scss'],
})
export class MenuAlumnoPage implements OnInit {
  categories: Category[] = [];
  constructor() { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categories = [
      {
        id: 1,
        label: 'Yo',
        image: 'asistencia_app/src/assets/icon/business-people.png',
        active: true,
      },
      {
        id: 2,
        label: 'Asignaturas',
        image: 'asistencia_app/src/assets/icon/libros.png',
        active: false,
      },
      {
        id: 3,
        label: 'Asistencia',
        image: 'asistencia_app/src/assets/icon/lista-de-verificacion.png',
        active: false,
      },
      {
        id: 2,
        label: 'Notas',
        image: 'asistencia_app/src/assets/icon/nota.png',
        active: false,
      }
    ]
  }



}
