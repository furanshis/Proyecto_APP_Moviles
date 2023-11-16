import { Component, OnInit, inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { StateService } from '../state.service'; // Ajusta la ruta según la ubicación real del servicio
import { NavController } from '@ionic/angular';
import { TareasService } from '../servicios/tareas.service';
import { AlumnosService } from '../servicios/alumnos.service';
import Alumnos from '../interfaces/alumnos.interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UtilsService } from '../servicios/utils.service';
import { user } from '@angular/fire/auth';


let navigationExtras: NavigationExtras = {};



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

  angularfire = inject(AngularFirestore)
  utilService = inject(UtilsService)

  username = '';
  
  


  //alumnos: Alumnos[];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alumnosService: AlumnosService,
    private stateService: StateService
  ) {
    //this.alumnos = [{
     // name: 'asas',
    //  contrasena: 'asasa',
    //  correo: 'asasa',
    //}];
  }

  ngOnInit() {
    // Obtén el nombre de usuario almacenado en el servicio y asígnalo a la variable
    //this.alumnosService.getAlumnos().subscribe(alumnos => {
      //this.alumnos = alumnos;
    //})
    var val = localStorage.getItem('alumnos')!;
    var object = JSON.parse(val);
    this.username = object.name
    
  }


  onClick() {
    this.alumnosService.logOut()
      
  }

  obtenerDato() {
    var val = localStorage.getItem('alumnos')!;
    var object = JSON.parse(val);
    console.log(object.name)
  }

  
}
