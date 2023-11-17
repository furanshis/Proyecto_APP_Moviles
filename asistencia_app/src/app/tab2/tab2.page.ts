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
  isSupported = false;
  barcodes: Barcode[] = [];
  
  


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

    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    
  }


  onClick() {
    this.alumnosService.logOut()
      
  }

  obtenerDato() {
    var val = localStorage.getItem('alumnos')!;
    var object = JSON.parse(val);
    console.log(object.name)
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}

  

