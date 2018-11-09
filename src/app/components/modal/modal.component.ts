// Angular plugins
import { 
  Component, 
  EventEmitter,
  Input, 
  OnInit, 
  Output
} from '@angular/core';

/**
 * @description Componente responsável por implementar a lógica da modal
 */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  /**
   * @description Obtém o titulo da modal
   */
  @Input() Titulo: string;

  /**
   * @description Obtém a mensagem da modal
   */
  @Input() Mensagem: string;

  /**
   * @description Se for necessário dentro daquele contesto, é possivel esconder ou mostrar o botão de cancelar
   */
  @Input() ShowCancelar: boolean;

  /**
   * @description Obtém um metódo de sucesso (clicar em ok)
   */
  @Output() onSuccess: EventEmitter<any> = new EventEmitter();

  /**
   * @description Obtém um metódo de cancelar (clicar em Cancelar)
   */
  @Output() onCancelar: EventEmitter<any> = new EventEmitter();
  
  /**
   * @description Construtor
   */
  constructor() { }

  /**
   * @description Metódo que se inícia juntamento ao componente
   */
  ngOnInit(){
    
  }

  /**
   * @description Metódo que recebe o click do OK
   */
  Ok(){
    this.onSuccess.emit();
  }

  /**
   * @description Metódo que recebe o click do Cancelar
   */
  Cancelar(){
    this.onCancelar.emit();
  }

}
