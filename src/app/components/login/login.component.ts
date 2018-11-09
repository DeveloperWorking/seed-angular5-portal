// Angular plugins
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { LoginModel } from '../../models/login.model';

// Services
import { LoginService } from '../../services/login.service';
import { NotificacaoService } from '../../services/notificacao.service';

//Inicialização da variável mRefresh do plugin material-refresh
declare var mRefresh: any;

/**
 * @description Componente responsável por implementar a lógica do Login na aplicação
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * @description Contém as informações necessárias para o login
   */
  loginModel: LoginModel;

  /**
   * @description Contém a mensagem de erro, para feedback do usuário
   */
  errorMsg: string;

  /**
   * @description Inícia o spinner
   */
  carregando: Boolean;

  /**
   * @description Contrutor
   * 
   * @param loginService {LoginService} LoginService
   * @param router {Router} Router
   * @param notificacaoService {NotificacaoService} NotificacaoService
   */
  constructor(
    private loginService: LoginService,
    public router: Router,
    private notificacaoService: NotificacaoService
  ) {
    this.loginModel = new LoginModel();
  }

  /**
   * @description Metódo que se inícia juntamente com o componente
   */
  ngOnInit() {
    this.carregando = false;

    //Controle do "enter" do celular
    $("input").on('keyup', function (e) {
      if (e.keyCode == 13) {

        var email = $('#email').val();
        var senha = $('#senha').val();

        if (email == "")
          $(e.currentTarget.previousElementSibling).focus();
        else if (senha == "")
          $(e.currentTarget.nextElementSibling).focus();
        else
          $('button.entrar').click();
      }
    });

    //Verificação se a div do plugin do Pull to Refresh está criada
    var divRefresh = $('#muiRefresh');

    //Se estiver, destroy
    if (divRefresh.length > 0)
      mRefresh.destroy();
  }

  /**
   * @description Metódo responsável por realizar o login do usuário na aplicação
   */
  login() {
    if (this.loginModel.Password == "" || this.loginModel.UserName == "") {
      this.errorMsg = "Todos os campos devem ser preenchidos.";
    } else {
      this.carregando = true;
      this.loginService.login(this.loginModel, $('#manterLogado').is(':checked'))
        .subscribe(
          (response) => {

            this.notificacaoService.InitNotification();
            
            this.router.navigate(['home']);
          },
          (err) => {
            this.carregando = false;
            
            throw err;
          },
      );
    }
  }
}
