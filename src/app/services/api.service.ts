//Angular plugins
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Environment - Configuração de acesso à API
import { environment } from '../../environments/environment';

//Services
import { LoginService } from './login.service';

/**
 * @description Serviço responsável por realizar requisições HTTP à API
 */
@Injectable()
export class ApiService {
  
  /**
   * @description Variável de configuração do protocolo HTTP
   * 
   * @type {any}
   */
  private httpOptions = {};

  /**
   * @description Construtor
   * 
   * @param http {HttpClient} obrigatório - Serviço do angular para requisições HTTP
   * @param loginService {LoginService} obrigatório - Serviço que contém a logica de controle de sessão do usuário
   */
  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + loginService.getCurrentUser().access_token
      })
    };
  }

  /**
   * @description Metódo responsável por realizar requisições do tipo GET
   * 
   * ### Exemplo
   * 
   * @example
   * 
   * let url = 'eventos?page=' + page + '&homePage=' + homePage + '&proximaSemana=' + proximaSemana;
   * return this.api.get<Evento[]>(url);
   *  
   * @param url {string} obrigatório - URL a qual será realizada a requisição 
   * 
   * @returns {Observable<T>} Observable<T>
   */
  get<T>(url: string): Observable<T> {
    url = environment.baseUrl[environment.currentEnvironment].urlApi + url;
    return this.http.get<T>(url, this.httpOptions);
  }

  /**
   * @description  Metódo responsável por realizar requisições do tipo POST
   * 
   * ### Exemplo
   * 
   * @example
   * 
   * let url = 'curtidas';
   * return this.api.post<Noticia>(url, {noticiaId: id});
   * 
   * @param url {string} obrigatório - URL a qual será realizada a requisição
   * @param data {any} obrigatório - Dados da requisição
   * 
   * @returns {Observable<T>} Observable<T>
   */
  post<T>(url: string, data: any): Observable<T> {
    url = environment.baseUrl[environment.currentEnvironment].urlApi + url;
    return this.http.post<T>(url, data, this.httpOptions);
  }

  /**
   * @description  Metódo responsável por realizar requisições do tipo PUT
   * 
   * ### Exemplo
   * 
   * @example
   * 
   * let url = 'noticias';
   * return this.api.post<Noticia>(url, {noticiaId: id, titulo: titulo});
   * 
   * @param url {string} obrigatório - URL a qual será realizada a requisição
   * @param data {any} obrigatório - Dados da requisição
   * 
   * @returns {Observable<T>} Observable<T>
   */
  put<T>(url: string, data: any): Observable<T> {
    url = environment.baseUrl[environment.currentEnvironment].urlApi + url;
    return this.http.put<T>(url, data, this.httpOptions);
  }

  /**
   * @description  Metódo responsável por realizar requisições do tipo DELETE
   * 
   * ### Exemplo
   * 
   * @example
   * 
   * let url = 'noticias/' + id;
   * return this.api.delete<Noticia>(url);
   * 
   * @param url {string} obrigatório - URL a qual será realizada a requisição
   * 
   * @returns {Observable<T>} Observable<T>
   */
  delete<T>(url: string): Observable<T> {
    url = environment.baseUrl[environment.currentEnvironment].urlApi + url;
    return this.http.delete<T>(url, this.httpOptions);
  }
}
