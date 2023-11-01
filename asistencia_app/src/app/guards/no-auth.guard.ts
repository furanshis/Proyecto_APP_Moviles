import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlumnosService } from '../servicios/alumnos.service';
import { UtilsService } from '../servicios/utils.service';
import { resolve } from 'dns';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  alumnosSvc = inject(AlumnosService)
  utilsSvc = inject(UtilsService)

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      return new Promise((resolve) =>{

        this.alumnosSvc.getAuth().onAuthStateChanged((auth) =>{
          if(!auth) resolve(true)
          
          else{
            this.utilsSvc.routerLink('/tabs/tab2')
            resolve(false)
          }
        })
      });
  }
  
}
