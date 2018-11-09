// Angular plugins
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Modelos
import { ModalModel } from './../../models/Modal.model';
import { SolicitarAcessoModel } from '../../models/solicitar-acesso.model';

// Servicos
import { SolicitarAcessoService } from '../../services/solicitar-acesso.service';

/**
 * @description Componente responsável por implementar a lógica de comunicação com a API
 * para solicitação do primeiro acesso do usuário na aplicação
 */
@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './solicitar-acesso.component.html',
  styleUrls: ['./solicitar-acesso.component.css']
})
export class SolicitarAcessoComponent implements OnInit {

  /**
   * @description Model da solicitação de acesso
   */
  SolicitarAcesso: SolicitarAcessoModel;
  
  /**
   * @description Variável que contém as mensagens de erro para feedback com o usuário
   */
  errorMsg: string;

  /**
   * @description Inícia o spinner caso seu valor seja true
   */
  carregando: Boolean;

  /**
   * @description Contém as informações para exibição da modal
   */
  Modal: ModalModel = new ModalModel();

  /**
   * @description Construtor
   * 
   * @param solicitarAcessoService {SolicitarAcessoService} SolicitarAcessoService
   * @param router {Router} Router
   */
  constructor(
    private solicitarAcessoService: SolicitarAcessoService,
    public router: Router,
  ) {
    this.SolicitarAcesso = new SolicitarAcessoModel();
    this.Modal.ShowMensagem = false;
  }

  /**
   * @description Metódo que inícia junto ao componente.
   */
  ngOnInit() {
    this.carregando = false;

    // Controla o "Enter" do celular.
    $("input").on('keyup', function (e) {
      if (e.keyCode == 13) {

        var nome = $('#nome').val();
        var email = $('#email').val();
        var cpf = $('#cpf').val();
        var telefone = $('#telefone').val();

        if (nome == "")
          $('#nome').focus();

        else if (email == "")
          $('#email').focus();

        else if (cpf == "")
          $('#cpf').focus();

        else if (telefone == "")
          $('#telefone').focus();

        else
          $('button').click();
      }
    });
  }

  /**
   * @description Metódo responsável por realizar a comunicação com a API a fim de realizar a solicitação
   */
  Solicitar() {

    if(this.SolicitarAcesso.Nome != null
      && this.SolicitarAcesso.Telefone != null
      && this.SolicitarAcesso.Email != null
      && this.SolicitarAcesso.CPF != null){

    this.carregando = true;
    this.solicitarAcessoService.solicitar(this.SolicitarAcesso)
      .subscribe((r) => {
        if (r.status == "Ok") {

          this.Modal.MensagemSucesso = "Solicitação enviada com sucesso!";
          this.Modal.Titulo = "Sucesso!";

        } else {

          this.Modal.MensagemSucesso = "Ocorreu um erro durante a requisição: " + r.mensagem;
          this.Modal.Titulo = "Opa!";

        }

        this.carregando = false;
        this.Modal.ShowMensagem = true;

      });
    } else {
      this.errorMsg = "Realize o preenchimento de todos os campos.";
    }
  } 

  /**
   * @description Metódo que recebe a chama do evento de click no "Ok" do modal
   */
  Ok(){
    this.router.navigate(['login']);
  }

}
