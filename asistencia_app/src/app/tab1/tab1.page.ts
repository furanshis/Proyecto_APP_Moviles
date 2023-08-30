import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private navCtrl: NavController) {}

  login() {
    // Verificar las credenciales (esto es solo un ejemplo)
    if (this.username === 'admin' && this.password === 'hola') {
      this.router.navigate(['/tabs/tab2']); // Redirigir a la Tab 2
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
