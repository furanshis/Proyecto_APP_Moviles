import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { FormControl, FormGroup } from '@angular/forms';

import { NavController } from '@ionic/angular';
import { AlumnosService } from '../servicios/alumnos.service';
import { StateService } from '../state.service'; // Ajusta la ruta según la ubicación real del servicio
import { UtilsService } from '../servicios/utils.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.page.html',
  styleUrls: ['./codigo.page.scss'],
})
export class CodigoPage implements OnInit {

  form: FormGroup;

  constructor(
    private alumnosService: AlumnosService,
    private router: Router,
    private navCtrl: NavController,
    private stateService: StateService,
    private utilsService: UtilsService // Inyecta el servicio aquí
  ) {
    this.form = new FormGroup({
      email: new FormControl(),
    })
  }
  async onSubmit() {
    if (this.form.valid){

    const loading = await this.utilsService.loading();
    await loading.present();

    this.alumnosService.sendRecoveryEmail(this.form.value.email)
      .then(response => {
        this.utilsService.presentToast({
          message: 'Correo enviado con éxito',
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'mail-outline'
        })

        this.utilsService.routerLink('/tabs/tab1')
        this.form.reset()

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
  }

  ngOnInit() {
  }


}
