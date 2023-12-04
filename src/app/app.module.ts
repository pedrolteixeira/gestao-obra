import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire/compat";
import { firebaseConfig } from '../../firebase-config'
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { RegisterComponent } from "./register/register.component";
import { ObrasIndexComponent } from './obras/index/obras.index.component';
import { LayoutComponent } from './layout/layout.component';
import { ObrasNewComponent } from './obras/new/obras.new.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PedidosIndexComponent } from './pedidos/index/pedidos.index.component';
import { PedidosNewComponent } from './pedidos/new/pedidos.new.component';
import { EstoqueIndexComponent } from './estoque/index/estoque.index.component';
import { MateriaisIndexComponent } from './materiais/index/materiais.index.component';
import { MateriaisNewComponent } from './materiais/new/materiais.new.component';
import { EstoqueViewComponent } from './estoque/view/estoque.view.component';
import { PedidosEditComponent } from './pedidos/edit/pedidos.edit.component';
import { EstoqueEditComponent } from './estoque/edit/estoque.edit.component';
import { RecuperarSenhaComponent } from './login/recuperar-senha/recuperar-senha.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaginaInicialComponent,
    RegisterComponent,
    ObrasIndexComponent,
    LayoutComponent,
    ObrasNewComponent,
    PedidosIndexComponent,
    PedidosNewComponent,
    EstoqueIndexComponent,
    MateriaisIndexComponent,
    MateriaisNewComponent,
    EstoqueViewComponent,
    PedidosEditComponent,
    EstoqueEditComponent,
    RecuperarSenhaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
