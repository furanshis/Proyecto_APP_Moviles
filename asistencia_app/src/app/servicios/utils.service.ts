import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { Asistencia } from '../interfaces/asistencia.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController)
  router = inject(Router)


  loading(){
    return this.loadingCtrl.create({ spinner: 'crescent' })
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts)
    toast.present();
  }

  routerLink(url: string){
    return this.router.navigateByUrl(url)
  }

  // Guarga elemento en local storage //

  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }

  // obtiene elemento en local storage //

  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key)!)
  }

  //obtener el porsentaje de asistencia
  getProcentaje(asistencia: Asistencia){
    let porcentaje = (100 * asistencia.clases_asistidas) / asistencia.total_clases

    return parseInt(porcentaje.toString())
  }
}



