import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent {

  public email: any;

  constructor(
    public loginService: LoginService,
    public router : Router,
    public toastr : ToastrService,
    public afAuth : AngularFireAuth
  ){}
  
  recuperarSenha() {
    
  }
  
  
  
}
