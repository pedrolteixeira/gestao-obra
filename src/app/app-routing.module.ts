import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { authGuard, authGuardLogado } from './auth/auth.guard';
import { RegisterComponent } from './register/register.component';
import { ObrasIndexComponent } from './obras/index/obras.index.component';
import { LayoutComponent } from './layout/layout.component';
import { ObrasNewComponent } from './obras/new/obras.new.component';
import { PedidosIndexComponent } from './pedidos/index/pedidos.index.component';
import { PedidosNewComponent } from './pedidos/new/pedidos.new.component';
import { EstoqueIndexComponent } from './estoque/index/estoque.index.component';
import { MateriaisIndexComponent } from './materiais/index/materiais.index.component';
import { MateriaisNewComponent } from './materiais/new/materiais.new.component';
import { EstoqueViewComponent } from './estoque/view/estoque.view.component';
import { PedidosEditComponent } from './pedidos/edit/pedidos.edit.component';
import { EstoqueEditComponent } from './estoque/edit/estoque.edit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [authGuardLogado] },
  { path: 'register', component: RegisterComponent, canActivate: [authGuardLogado] },
  {
    path: '',
    redirectTo: '/pagina-inicial',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'pagina-inicial', component: PaginaInicialComponent, canActivate: [authGuard] },
      { path: 'obras', component: ObrasIndexComponent, canActivate: [authGuard] },
      { path: 'obras-new', component: ObrasNewComponent, canActivate: [authGuard] },
      { path: 'pedidos', component: PedidosIndexComponent, canActivate: [authGuard] },
      { path: 'pedidos-new', component: PedidosNewComponent, canActivate: [authGuard] },
      { path: 'pedidos-edit', component: PedidosEditComponent, canActivate: [authGuard] },
      { path: 'materiais', component: MateriaisIndexComponent, canActivate: [authGuard] },
      { path: 'materiais-new', component: MateriaisNewComponent, canActivate: [authGuard] },
      { path: 'estoque', component: EstoqueIndexComponent, canActivate: [authGuard] },
      { path: 'estoque-edit', component: EstoqueEditComponent, canActivate: [authGuard] },
      { path: 'estoque-view', component: EstoqueViewComponent, canActivate: [authGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
