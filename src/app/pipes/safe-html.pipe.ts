import { DomSanitizer } from "@angular/platform-browser";
import { Pipe } from "@angular/core";

@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe {
  constructor(private sanitizer:DomSanitizer){}

  /**
   * @description Pipe para deixar valida a inserção de background de imagens externas dinamicamente
   * 
   * ### Exemplo
   * 
   * @example
   * 
   * <div class="galeria" [style.background-image]="galeria.ImgSrc | safeHtml">
   * 
   * @param style {any} any - obrigatório
   */
  transform(style) {
    // return this.sanitizer.bypassSecurityTrustStyle(style);
    return this.sanitizer.bypassSecurityTrustHtml(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - veja na documentação go angular
  }
}