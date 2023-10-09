import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  public email: any;
  public senha: any;

  constructor(
    public loginService: LoginService,
    public router : Router,
    public toastr : ToastrService,
    public afAuth : AngularFireAuth
  ){}

  fazerLogin() {
    this.loginService.login(this.email, this.senha)
    .then((userCredential) => {
      const user: any = userCredential.user;
      const userName: any = user?.displayName;
      this.toastr.success('Bem-vindo, ' + userName.charAt(0).toUpperCase() + userName.slice(1))
    }, (error: any) => {
      this.toastr.error('E-mail ou senha inválida');
    })
  }
}
