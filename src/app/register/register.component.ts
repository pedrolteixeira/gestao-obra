import { Component } from '@angular/core';
import { RegisterService } from './register.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  public nome: any;
  public email: any;
  public senha: any;
  constructor(
    public registerService : RegisterService,
    public toastr : ToastrService,
    public router : Router,
    public afAuth : AngularFireAuth
  ){}
  
  registrar() {
    this.registerService.register(this.nome, this.email, this.senha).then((userCredential) => {
      const user: any = userCredential.user;
      this.toastr.success('Bem-vindo, ' + user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1))
    }, (error: any) => {
      this.toastr.error('Ocorreu um erro ao realizar o registro do usuário');
    })
  }
}
