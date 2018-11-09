 // Angular plugins
import { Injectable } from '@angular/core';

/**
 * @description Serviço responsável pela lógica de realizar o carregamento dos dados durante uma paginação.
 */
@Injectable()
export class LoadMoreService {
  
  /**
   * @description Construtor
   */
  constructor(
  ) {
  }

  /**
   * @description Metódo responsável por realizar o carregamento dos dados durante uma paginação
   * 
   * ### Exemplo
   * 
   * @example
   * 
   * VerMais() {
   * this.carregando = true; //Inícia o spinner
   * 
   * this.page++;
   * 
   * this.servicoService.lista(this.page)
   *   .subscribe((servicos) => {
   *     this.servicos = this.loadMoreService.VerMais<Servico>(servicos, this.servicos);
   * 
   *     if (servicos.length <= 0 || servicos.length <= 9){
   *       this.carregarMais = false; //Esconde o botão para carregar mais
   *     }
   * 
   *     this.carregando = false; //Finaliza o spinner
   *   });
   * }
   * 
   * @param resultadoBanco {T} obrigatório - Resposta de dados da API
   * @param listaAtual {T} obrigatório - Lista atual em exibição
   */
  VerMais<T>(resultadoBanco: T[], listaAtual: T[]) : T[] {
    let lista: T[] = [];

    for (let nota of resultadoBanco) {
      listaAtual.push(nota);
    }

    var aux = this.removeDuplicates(listaAtual, 'Id');

    for (let nota of aux) {
      lista.push(nota);
    }

    return lista;
  }

  /**
   * @description Metódo responsável por remover os registros duplicados em um Array
   * 
   * ### Exemplo
   * 
   * @example
   * 
   * var aux = this.removeDuplicates(listaAtual, 'Id');
   * 
   * @param myArr {T} obrigatório - Lista a ser removido as duplicatas
   * @param prop {T} obrigatório - Propriedade a ser avaliada durante o filtro
   * 
   * @returns {T} T
   */
  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

}
