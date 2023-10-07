import { Component, OnInit } from '@angular/core';
import { TareasService } from '../servicios/tareas.service';

// Define la interfaz Student aquí o importala desde un archivo donde esté definida
interface Student {
  direccion: string;
  edad: number;
  nombre: string;
}

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  studentname: string = '';
  studentage: number = 0;
  address: string = '';

  constructor(private crudService: TareasService) { }

  ngOnInit() {
  }

  createRecord() {
    let record = {
      direccion: this.address,
      edad: this.studentage,
      nombre: this.studentname
    };
  
    // Agregar a la colección "Student" en Firebase
    this.crudService.createStudent(record).then(resp => {
      // Manejar la respuesta o realizar acciones adicionales si es necesario
      console.log('Estudiante agregado correctamente', resp);
  
      // Puedes limpiar los campos del formulario aquí si lo deseas
      this.studentname = '';
      this.studentage = 0;
      this.address = '';
    }).catch(error => {
      // Manejar cualquier error que pueda ocurrir al agregar el estudiante
      console.error('Error al agregar estudiante', error);
    });
  }
  
}
