import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { NoAuthGuard } from './guards/no-auth.guard';
//import { AuthGuard } from './guards/auth.guard';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard'


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)//, canActivate:[NoAuthGuard]
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./alumnos/alumnos.module').then( m => m.AlumnosPageModule), 
    ...canActivate(() => redirectUnauthorizedTo(['/tabs/tab1/']))
  },
  {
    path: 'contrasena',
    loadChildren: () => import('./contrasena/contrasena.module').then( m => m.ContrasenaPageModule),
    ...canActivate(() => redirectLoggedInTo(['/tabs/tab2']))
  },
  {
    path: 'codigo',
    loadChildren: () => import('./codigo/codigo.module').then( m => m.CodigoPageModule),
    ...canActivate(() => redirectLoggedInTo(['/tabs/tab2']))
  },
  {
    path: 'menu-alumno',
    loadChildren: () => import('./menu-alumno/menu-alumno.module').then( m => m.MenuAlumnoPageModule)
  },  {
    path: 'codigoqr',
    loadChildren: () => import('./codigoqr/codigoqr.module').then( m => m.CodigoqrPageModule)
  },


  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
