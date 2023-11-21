import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-codigoqr',
  templateUrl: './codigoqr.page.html',
  styleUrls: ['./codigoqr.page.scss'],
})
export class CodigoqrPage implements OnInit {

  qrString = 'fra.santanderv@duocuc.cl'

  constructor() { }

  ngOnInit() {
  }

}
