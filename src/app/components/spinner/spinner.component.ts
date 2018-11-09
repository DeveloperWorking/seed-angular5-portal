
// Angular plugins
import { Component, OnInit } from '@angular/core';

/**
 * @description Componente que implementa a lógica do loading da aplicação em momentos de chamadas à API
 */
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  /**
   * @description Construtor
   */
  constructor() { }

  /**
   * @description Metódo que inícia o spinner
   */
  ngOnInit() {
  }

}
