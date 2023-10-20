import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlumnosService } from '../servicios/alumnos.service';
import { StateService } from '../state.service'; // Ajusta la ruta según la ubicación real del servicio


let navigationExtras: NavigationExtras = {};

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  formLogin: FormGroup;

  constructor(
    private alumnosService: AlumnosService,
    private router: Router,
    private navCtrl: NavController,
    private stateService: StateService // Inyecta el servicio aquí
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  onSubmit() {
    this.alumnosService.login(this.formLogin.value)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  }

  //onClick() {
    //this.alumnosService.loginWithGoogle()
      //.then(response => {
        //console.log(response);
        //this.router.navigate(['/main']);
      //})
      //.catch(error => console.log(error))
  //}

  registrarse(){
    this.router.navigate(['/tabs/tab3']);
  }
}
