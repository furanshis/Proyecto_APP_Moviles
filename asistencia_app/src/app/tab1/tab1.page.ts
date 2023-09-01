import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StateService } from '../state.service'; // Ajusta la ruta según la ubicación real del servicio


let navigationExtras: NavigationExtras = {};

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private stateService: StateService // Inyecta el servicio aquí
  ) {}

  login() {
    // Verificar las credenciales (esto es solo un ejemplo)
    
    if (this.username === 'admin' && this.password === 'hola') {
      // Guardar el nombre de usuario en el servicio de estado
      this.stateService.setUsername(this.username);

      this.router.navigate(['/tabs/tab2'], navigationExtras); // Redirigir a la Tab 2
      // O puedes usar navCtrl para redirigir:
      // this.navCtrl.navigateForward('/tabs/tab2');
    } else {
      // Mostrar algún mensaje de error
    }
  }

  registrarse(){
    this.router.navigate(['/tabs/tab3']);
  }
}
