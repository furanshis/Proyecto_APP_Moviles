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
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { Asistencia } from '../interfaces/asistencia.interfaces';




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
  
  asistencias: Asistencia[] = []


  //alumnos: Alumnos[];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alumnosService: AlumnosService,
    private stateService: StateService,
    private alertController: AlertController
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

  ionViewWillEnter() {
    this.getAsistencia()
  }

  onClick() {
    this.alumnosService.logOut()
      
  }

  obtenerDato() {
    var val = localStorage.getItem('alumnos')!;
    var object = JSON.parse(val);
    console.log(object.name)
  }

  getAsistencia(){
    var val = localStorage.getItem('alumnos')!;
    var object = JSON.parse(val);
    let path = `alumnos/${object.uid}`
    let sub = this.alumnosService.getSubcollection(path, 'asistencia').subscribe({
      next: (res: Asistencia[] | any) => {
        console.log(res)
        this.asistencias = res
        sub.unsubscribe()
      }
    })
  }

  
}

  

