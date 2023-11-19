import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { NgCircleProgressModule } from 'ng-circle-progress';

import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';


import { Tab2PageRoutingModule } from './tab2-routing.module';


LOAD_WASM().subscribe();

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    NgxScannerQrcodeModule,
    Tab2PageRoutingModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
