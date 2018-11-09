// Angular plugins
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

// Models
import { LoginModel } from '../models/login.model';

// Environment - Configuração de acesso à API
import { environment } from '../../environments/environment';

/**
 * @description Serviço responsável pela lógica de comunicação com a API para realizar o login do usuário na aplicação.
 */
@Injectable()
export class LoginService {

  /**
   * @description Variável de configuração do protocolo HTTP
   * 
   * @type {any}
   */
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  /**
   * @description Construto
   * 
   * @param http {HttpClient} obrigatório
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * @description Metódo responsável por guardar as insformações do usuário na sessão
   * 
   * ### Exemplo
   * 
   * @example
   * 
   * return this.http.post<any>(url, dataStr, this.httpOptions)
   *   .pipe(
   *     tap((response) => {
   *       this.saveLoginInformation(response, manterLogado);
   *     })
   *   );
   * 
   * @param response {any} obrigatório - Resposta da API
   * @param manterLogado {boolean} obrigatório - Variavél que verifica se o usuário irá permanecer connectado
   */
  private saveLoginInformation(response, manterLogado: boolean) {

    if (manterLogado) {
      localStorage.setItem('_manterLogado', 'true');
      localStorage.setItem('_User', JSON.stringify(response));
    } else {
      sessionStorage.setItem('_User', JSON.stringify(response));
    }
  }

  /**
   * @description Metódo responsável por verificar se o usuário está logado na aplicação
   * 
   * ### Exemplo
   * 
   * @example
   * 
   * if(this.loginService.isLoggedIn()){
   *    //Faça algo
   * }
   * 
   * @returns {boolean} boolean
   */
  isLoggedIn(): boolean {
    if (localStorage.getItem('_manterLogado') != null) {
      return localStorage.getItem('_User') != null;
    } else {
      return sessionStorage.getItem('_User') != null;
    }
  }

  /**
   * @description Metódo responsável por obter o usuário logado na aplicação
   * 
   * ### Exemplo
   * 
   * @example 
   * 
   * let user = this.loginService.getCurrentUser();
   * 
   * @returns {any} any
   */
  getCurrentUser() {
    if (this.isLoggedIn()) {
      let user;

      if (localStorage.getItem('_manterLogado') != null) {
        user = localStorage.getItem('_User');
      } else {
        user = sessionStorage.getItem('_User');
      }

      return JSON.parse(user);
    }
    return null;
  }

  /**
   * @description Metódo responsável pela lógica de login do usuário na aplicação
   * 
   * ### Exemplo
   * 
   * @example
   * 
   * this.carregando = true; //Inícia o spinner
   *   this.loginService.login(this.loginModel, $('#manterLogado').is(':checked'))
   *     .subscribe(
   *       (response) => {
   * 
   *         this.notificacaoService.InitNotification();
   *         
   *         // SUCCESSFUL LOGIN
   *         this.router.navigate(['home']);
   *       },
   *       (err) => {
   *         if (response.error && response.error.error_description) {
   *           this.errorMsg = response.error.error_description;
   *           this.carregando = false; //Finaliza o spinner
   *         }
   *       },
   *   );
   * 
   * @param loginModel {LoginModel} obrigatório - Formulário de login
   * @param manterLogado {boolean} obrigatório - Verificação se é para manter o usuário logado
   * 
   * @returns {any} any 
   */
  login(loginModel: LoginModel, manterLogado: boolean) {
    let url = environment.baseUrl[environment.currentEnvironment].urlApi + 'login';
    loginModel.grant_type = 'password';

    var str = [];
    for (var key in loginModel) {
      if (loginModel.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key) + "=" + encodeURIComponent(loginModel[key]))
      }
    }
    let dataStr = str.join("&");

    return this.http.post<any>(url, dataStr, this.httpOptions)
      .pipe(
        tap((response) => {
          this.saveLoginInformation(response, manterLogado);
        })
      );
  }

  /**
   * @description Metódo responsável por realizar o Logout do usuário
   * 
   * ### Exemplo
   * 
   * @example
   * 
   * this.loginService.logout();
   */
  logout() {

    if (localStorage.getItem('_manterLogado') != null) {
      localStorage.removeItem('_User');
      localStorage.removeItem('_manterLogado');
    } else {
      sessionStorage.removeItem('_User');
    }

  }
}