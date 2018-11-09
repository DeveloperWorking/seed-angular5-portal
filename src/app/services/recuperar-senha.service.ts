 // Angular plugins
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Environment - Configuração de acesso à API
import { environment } from '../../environments/environment';

/**
 * @description Serviço responsável pela lógica de comunicação com a API para solicitação da recuperação de senha.
 */
@Injectable()
export class RecuperarSenhaService {
  
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
  ) {
  }

  /**
   * @description Metétodo que realiza a solicitação de recuperação de senha do usuário à API. É obrigatório que o usuário passe seu login 
   * 
   * ### Exemplo
   * 
   * @example
   * 
   * this.recuperarSenhaService.redefinir(this.UserName).subscribe(res => {
   *   this.Modal.MensagemSucesso = "Solicitação realizada com sucesso! Um e-mail foi enviado para sua caixa de e-mail.";
   *   this.Modal.Titulo = "Sucesso!";
   * 
   *   this.carregando = false;
   *   this.Modal.ShowMensagem = true;
   * }, err => {
   *   this.Modal.MensagemSucesso = "Usuário não encontrado!";
   *   this.Modal.Titulo = "Opa!";
   * 
   *   this.carregando = false;
   *   this.Modal.ShowMensagem = true;
   *   this.erroCallBack = true;
   * });
   * 
   * @param username {string} obrigatório - Login do usuário
   * 
   * @returns {Observable} Observable<any>
   */
  redefinir(username: string) : Observable<any> {
    let url = environment.baseUrl[environment.currentEnvironment].urlApi + 'Account/ForgotPassword';

    return this.http.post<any>(url, "UserName=" + username, this.httpOptions);
  }
}
