//Angular plugins
import { CanActivate, Router  } from '@angular/router';
import { Injectable } from '@angular/core';

//Services
import { LoginService } from './login.service';

/**
 * @description Serviço responsável pela lógica de controle de acesso do usuário à aplicação.
 */
@Injectable()
export class AuthGuardService implements CanActivate {

  /**
   * @description Construtor
   * 
   * @param loginService {LoginService} obrigatório - Serviço que contém a logica de controle de sessão do usuário
   * @param router {Router} obrigatório - Serviço do angular que controla as rotas da aplicação
   */
  constructor(
    public loginService: LoginService, 
    public router: Router
  ) {}

  /**
   * @description Metódo responsável por verificar se o usuário está logado. 
   * Caso não esteja, o usuário é redirecionado para o a tela de login.
   * 
   * ### Exemplo
   * 
   * @example
   * 
   * this.router.events.subscribe((evt) => {
   *   if (evt instanceof NavigationEnd) {
   *     this.isLogged = this.loginService.isLoggedIn();
   *   }
   * });
   * 
   * @returns {boolean} boolean
   */
  canActivate(): boolean {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}