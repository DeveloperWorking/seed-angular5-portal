/**
 * App module da aplicação [App Name].
 * 
 * Versão de código: 1.0
 * Arquiteto responsável: Rutyelle dos Santos Brito
 * 
 * Observações do arquiteto:
 * 
 *    Favor manter a organização por blocos como apresentado abaixo;
 *    Favor manter a ordem alfabética de acordo com a categoria da importação.
 * 
 */

// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// /Angular Modules

// Rota da aplicação
import { appRoutes } from './routes';
// /Rota da aplicação

// Pipes
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
// /Pipes

// Components
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ModalComponent } from './components/modal/modal.component';
import { SolicitarAcessoComponent } from './components/solicitar-acesso/solicitar-acesso.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';
// /Components

// Services
import { ApiService } from './services/api.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HandleErrorService } from './services/handle-error-service';
import { LoadMoreService } from './services/loadMore.service';
import { LoginService } from './services/login.service'
import { NotificacaoService } from './services/notificacao.service';
import { SolicitarAcessoService } from './services/solicitar-acesso.service';
import { RecuperarSenhaService } from './services/recuperar-senha.service';
// /Services

// Bibliotecas de terceiros
import * as $ from 'jquery';
// /Bibliotecas de terceiros

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    ModalComponent,
    SafeHtmlPipe,
    SolicitarAcessoComponent,
    SpinnerComponent,
    RecuperarSenhaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ApiService,
    AuthGuardService,
    HandleErrorService,
    LoadMoreService,
    LoginService,
    NotificacaoService,
    SolicitarAcessoService,
    RecuperarSenhaService,
    { provide: HTTP_INTERCEPTORS, useClass: HandleErrorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
