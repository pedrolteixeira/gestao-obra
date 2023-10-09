import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(
    public authService: LoginService,
    public router : Router
    ) {}

  sair() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login'])
    });
  }
}
