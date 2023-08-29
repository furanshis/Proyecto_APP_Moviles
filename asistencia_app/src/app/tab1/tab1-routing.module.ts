import { NgModule } from '@angular/core';
import { RouterModule, NavigationExtras, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
let navigationExtras: NavigationExtras = {
  state: {user: "admin"}
}
const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
