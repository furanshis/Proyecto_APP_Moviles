import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlumnosService } from '../servicios/alumnos.service';
import { StateService } from '../state.service'; // Ajusta la ruta según la ubicación real del servicio
import { UtilsService } from '../servicios/utils.service';


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
    private stateService: StateService,
    private utilsService: UtilsService // Inyecta el servicio aquí
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  async onSubmit() {

    const loading = await this.utilsService.loading();
    await loading.present();

    this.alumnosService.login(this.formLogin.value)
      .then(response => {
        console.log(response);

      }).catch(error => {
        console.log(error)

        this.utilsService.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

      }).finally(() => {
        loading.dismiss()
        //this.stateService.setUsername(this.formLogin.value.email);
        //this.router.navigate(['/tabs/tab2'], navigationExtras)
      })
  }
  

  registrarse(){
    this.router.navigate(['/contrasena']);
  }
}
