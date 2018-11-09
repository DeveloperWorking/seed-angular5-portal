// Angular plugins
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

// Models
import { ModalModel } from './../../models/Modal.model';

// Services
import { LoginService } from '../../services/login.service';

/**
 * @description Componente que inícia a aplicação
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /**
   * @description Propriedade para verificação se o usuário está ou não online
   */
  isLogged: Boolean;

  /**
   * @description Contém informações suficientes para inicialização da modal
   */
  Modal: ModalModel = new ModalModel();

  /**
   * @description Construtor
   * 
   * @param loginService {LoginService} LoginService
   * @param router {Router} Router
   */
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.isLogged = this.loginService.isLoggedIn();

    //A cada troca de rota, é verificado se o usuário continua online
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.isLogged = this.loginService.isLoggedIn();
      }
    });
  }

  /**
   * @description Metódo que faz a pergunta se o usuário deseja realmente sair da aplicação
   */
  onLogout() {
    this.Modal.Titulo = "Sair";
    this.Modal.MensagemSucesso = "Deseja sair?";
    this.Modal.ShowMensagem = true;
    this.Modal.ShowCancelar = true;
  }

  /**
   * @description Metódo que recebe a chamada do click "OK" da modal
   */
  Ok() {
    this.Modal.ShowMensagem = false;
    this.router.navigate(['logout']);
  }

  /**
   * @description Metódo que recebe a chamada do click "Cancelar" da modal
   */
  Cancelar() {
    this.Modal.ShowMensagem = false;
  }

  /**
   * @description Metódo que se inícia juntamente com o componente
   */
  ngOnInit() {
    this.Modal.ShowMensagem = false;
  }

}
