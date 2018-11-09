// Angular plugins
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { LoginService } from '../../services/login.service';
import { NotificacaoService } from '../../services/notificacao.service';

/**
 * @description Componente responsável por implementar a lógica do Logout
 */
@Component({
  selector: 'app-logout',
  template: '<div></div>'
})
export class LogoutComponent implements OnInit {

  /**
   * @description Construtor
   * 
   * @param loginService {LoginService} LoginService
   * @param router {Router} Router
   * @param notificacaoService  {NotificacaoService} NotificacaoService
   */
  constructor(
    private loginService: LoginService,
    public router: Router,
    private notificacaoService: NotificacaoService
  ) {
    
  }

  /**
   * @description Metódo que se inicializa juntamente com o componente
   */
  ngOnInit() {
    this.loginService.logout();

    this.notificacaoService.onLogout();
    
    this.router.navigate(['login']);
  }
}
