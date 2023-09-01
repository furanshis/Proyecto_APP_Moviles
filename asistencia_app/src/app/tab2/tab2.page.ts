import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service'; // Ajusta la ruta según la ubicación real del servicio


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  username: string = '';

  constructor(private stateService: StateService) {}

  ngOnInit() {
    // Obtén el nombre de usuario almacenado en el servicio y asígnalo a la variable
    this.username = this.stateService.getUsername();
  }
}