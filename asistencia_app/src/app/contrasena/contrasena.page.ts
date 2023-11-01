import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TareasService } from '../servicios/tareas.service';
import { AlumnosService } from '../servicios/alumnos.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { UtilsService } from '../servicios/utils.service';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage implements OnInit {

  formulario: FormGroup;

  constructor(
    private alumnosService: AlumnosService,
    private router: Router,
    private utilsService: UtilsService
  ) {
    this.formulario = new FormGroup({
      uid: new FormControl(''),
      email: new FormControl(),
      password: new FormControl(),
      name: new FormControl()
    })
  }

  ngOnInit(): void {
  }

 
  async onSubmit() {

    const loading = await this.utilsService.loading();
    await loading.present();

    this.alumnosService.register(this.formulario.value)
      .then(async response => {
        await this.alumnosService.updateUsuario(this.formulario.value.name)
        let uid = response.user.uid
        this.formulario.controls['uid'].setValue(uid)
        this.setUserInfo(uid)
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

  async setUserInfo(uid: string) {

    const loading = await this.utilsService.loading();
    await loading.present();

    let path = `alumnos/${uid}`;
    delete this.formulario.value.password

    this.alumnosService.setDocument(path, this.formulario.value)
      .then(async response => {
        this.utilsService.saveInLocalStorage('alumnos', this.formulario.value)
        this.utilsService.routerLink('/tabs/tab2')
        this.formulario.reset()

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


