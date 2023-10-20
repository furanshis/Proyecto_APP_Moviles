import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { StateService } from '../state.service'; // Ajusta la ruta según la ubicación real del servicio
import { NavController } from '@ionic/angular';
import { TareasService } from '../servicios/tareas.service';
import { AlumnosService } from '../servicios/alumnos.service';
import Alumnos from '../interfaces/alumnos.interfaces';


let navigationExtras: NavigationExtras = {};

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

  //alumnos: Alumnos[];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alumnosService: AlumnosService 
  ) {
    //this.alumnos = [{
     // name: 'asas',
    //  contrasena: 'asasa',
    //  correo: 'asasa',
    //}];
  }

  ngOnInit(): void {
    // Obtén el nombre de usuario almacenado en el servicio y asígnalo a la variable
    //this.alumnosService.getAlumnos().subscribe(alumnos => {
      //this.alumnos = alumnos;
    //})
    
  }

  onClick() {
    this.alumnosService.logOut()
      .then(() => {
        this.router.navigate(['/tabs/tab1']);
      })
      .catch(error => console.log(error));
  }

  navigateToAlumnosPage() {
    this.navCtrl.navigateForward('/alumnos'); // Redirige a la página de agregar alumno
  }
}
