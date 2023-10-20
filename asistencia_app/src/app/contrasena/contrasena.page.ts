import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TareasService } from '../servicios/tareas.service';
import { AlumnosService } from '../servicios/alumnos.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage implements OnInit {

  formulario: FormGroup;

  constructor(
    private alumnosService: AlumnosService,
    private router: Router
  ) {
    this.formulario = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.alumnosService.register(this.formulario.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['/tabs/tab1'])
      })
      .catch(error => console.log(error));
  }

}


