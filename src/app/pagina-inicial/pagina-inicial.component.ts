import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { ObrasService } from '../obras/obras.service';
import { PedidosService } from '../pedidos/pedidos.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent {
  public obras: any = [];
  public pedidosEmAberto: any = [];
  public totalMateriais: any = 0;

  constructor(
    public obrasService : ObrasService,
    public pedidosService: PedidosService,
    public router : Router
  ){}
  
  ngOnInit() {
    this.listarObras();
    this.listarPedidos();
  }

  listarObras() {
    this.obrasService.getObras().subscribe((resp: any) => {
      this.obras = resp
    })
  }

  listarPedidos() {
    this.pedidosService.getPedidos().subscribe((resp: any) => {
      let pedidos = resp;
      pedidos.forEach((pedido: any) => {
        if (pedido.status == 1) {
          this.pedidosEmAberto.push(pedido);
        }
        if (pedido.status == 2) {
          this.totalMateriais = this.totalMateriais + pedido.quantidade
        }
      })
    })
  }
}
