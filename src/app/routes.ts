// Services
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

// Components
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';
import { Routes } from '@angular/router';
import { SolicitarAcessoComponent } from './components/solicitar-acesso/solicitar-acesso.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'primeiro-acesso', component: SolicitarAcessoComponent },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];