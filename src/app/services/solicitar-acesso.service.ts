 // Angular plugins
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Environment - Configuração de acesso à API
import { environment } from '../../environments/environment';

// Model
import { SolicitarAcessoModel } from '../models/solicitar-acesso.model';

/**
 * @description Serviço responsável pela lógica de comunicação com a API para solicitação de acesso dos usuários.
 */
@Injectable()
export class SolicitarAcessoService {
  
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
   * @description Metétodo que realiza a solicitação de acesso do usuário à API 
   * 
   * ### Exemplo
   * 
   * @example
   * 
   * this.carregando = true;
   * this.solicitarAcessoService.solicitar(this.SolicitarAcesso).subscribe((r) => {
   *     if (r.status == "Ok") {
   *
   *       this.Modal.MensagemSucesso = "Solicitação enviada com sucesso!";
   *       this.Modal.Titulo = "Sucesso!";
   *
   *     } else {
   *
   *       this.Modal.MensagemSucesso = "Ocorreu um erro durante a requisição: " + r.mensagem;
   *       this.Modal.Titulo = "Opa!";
   * 
   *     }
   *
   *     this.carregando = false;
   *     this.Modal.ShowMensagem = true;
   *   });
   * 
   * @param SolicitarAcesso {SolicitarAcessoModel} obrigatório
   * 
   * @returns {Observable} Observable<any>
   */
  solicitar(SolicitarAcesso: SolicitarAcessoModel) : Observable<any> {
    let url = environment.baseUrl[environment.currentEnvironment].urlApi + 'solicitar-acesso';

    var str = [];
    
    for (var key in SolicitarAcesso) {
      if (SolicitarAcesso.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key) + "=" + encodeURIComponent(SolicitarAcesso[key]))
      }
    }

    let dataStr = str.join("&");

    return this.http.post<any>(url, dataStr, this.httpOptions);
  }
}
