// Angular plugins
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { RecuperarSenhaService } from './../../services/recuperar-senha.service';

// Models
import { ModalModel } from './../../models/Modal.model';

/**
 * @description Componente que implementa a lógica de recuperação de senha
 */
@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  /**
   * @description Inícia o spinner
   */
  carregando: boolean;

  /**
   * @description Contém informações para exibição da modal
   */
  Modal: ModalModel = new ModalModel();

  /**
   * @description Variável para apresentação de feedback para o usuário
   */
  errorMsg: string;

  /**
   * @description Contém o login do usuário para acessar a aplicação
   */
  UserName: string = "";

  /**
   * @description Varável para apresentação de feedback da API
   */
  erroCallBack: boolean;

  constructor(
    public router: Router,
    private recuperarSenhaService: RecuperarSenhaService
  ) {
    this.carregando = false;
  }

  /**
   * @description Metódo que se inícia juntamente com o componente
   */
  ngOnInit() {

    //Controla a tecla "Enter" do celular
    $("input").on('keyup', function (e) {
      if (e.keyCode == 13) {

        var userName = $('#userName').val();

        if (userName == "")
          $('#userName').focus();

        else
          $('button').click();
      }
    });
  }

  /**
   * @description Metódo que recebe a chama do evento de click no "Ok" do modal
   */
  Ok() {
    if(this.erroCallBack)
      this.Modal.ShowMensagem = false;
    else
      this.router.navigate(['login']);
  }

  /**
   * @description Metódo responsável por realizar a comunicação com a API a fim de solicitar a 
   * redefinição de senha do usuário
   */
  Redefinir() {

    if(this.UserName.length <= 0){
      this.errorMsg = "O preenchimento do campo é obrigatório.";
      return;
    }

    this.carregando = true;
    this.erroCallBack = false;
    this.errorMsg = "";

    this.recuperarSenhaService.redefinir(this.UserName)
    .subscribe(res => {
      this.Modal.MensagemSucesso = "Solicitação realizada com sucesso! Um e-mail foi enviado para sua caixa de e-mail.";
      this.Modal.Titulo = "Sucesso!";

      this.carregando = false;
      this.Modal.ShowMensagem = true;
    }, err => {
      this.Modal.MensagemSucesso = "Usuário não encontrado!";
      this.Modal.Titulo = "Opa!";

      this.carregando = false;
      this.Modal.ShowMensagem = true;
      this.erroCallBack = true;
    });
  }

}