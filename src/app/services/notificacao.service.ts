//Angular plugins
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

// Services
import { LoginService } from './login.service';

/**
 * @description Serviço responsável pela lógica de comunicação com a API do OneSignal para o serviço de push notifications.
 */
@Injectable()
export class NotificacaoService {

  /**
   * @description Construtor
   * 
   * @param router {Router} obrigatório - Controle de rotas do Angular
   * @param loginService {LoginService} obrigatório - Serviço que controla ações relativas ao login e sessão do usuário
   */
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  /**
   * @description Metódo responsável por iníciar o plugin de notificação. 
   * É aqui onde o aparelho do usuário é registrado na API do One signal.
   * Os usuários são identificados pelo Id da empresa. 
   * Assim que diferenciamos e segmentamos as mensagens de maneira correta para cara usuário.
   * 
   * ### Exemplo
   * 
   * @example
   * 
   * this.notificacaoService.InitNotification();
   */
  InitNotification() {

    if ((window as any).plugins) {
      (window as any).plugins.OneSignal
        .startInit("[Key HEre]")
        .handleNotificationOpened((jsonData) => {
          this.router.navigate(
            [
              jsonData.notification.payload.additionalData.rota + "/" + parseInt(jsonData.notification.payload.additionalData.valor)
            ]);

        })
        .endInit();

      //Segmenta os usuários em grupos. Assim, pode-se enviar notificações para determinado grupo apenas.
      (window as any).plugins.OneSignal.sendTag("GrupoId", this.loginService.getCurrentUser().GrupoId);
    } else {
      console.warn("Não está em um smartphone");
    }
  }

  /**
   * @description Metódo responsável por remover o usuário da API do OneSignal. 
   * Assim, quando o usuário realizar o logout da aplicação, o mesmo ira parar de receber notificações.
   * 
   * ### Exemplo
   * 
   * @example
   * 
   * this.notificacaoService.onLogout();
   */
  onLogout() {
    if ((window as any).plugins) {
      (window as any).plugins.OneSignal.deleteTag("GrupoId");
    } else {
      console.warn("Não está em um smartphone");
    }
  }
}