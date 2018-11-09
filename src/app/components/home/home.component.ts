// Angular plugins
import { Component, OnInit } from '@angular/core';

/**
 * @description Componente que implementa a lógica da Home
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * @description Inícia o spinner
   */
  carregando: Boolean;

  /**
   * @description Construtor
   */
  constructor(
  ) {
    this.carregando = false;
  }

  /**
   * @description Metódo que se inícia juntamente com a aplicação
   */
  ngOnInit() {
    this.carregando = false;
  }
}
