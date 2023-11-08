import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosService } from '../pedidos.service';
import { ObrasService } from 'src/app/obras/obras.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.index.component.html',
  styleUrls: ['./pedidos.index.component.css']
})
export class PedidosIndexComponent {
  public pedidos: any;
  public obras: any;
  public carregando: boolean = false;

  constructor(
    public router: Router,
    public pedidosService: PedidosService,
    public obrasService : ObrasService,
    public toastr : ToastrService
  ){}
  
  ngOnInit() {
    this.listarPedidos();
    this.listarObras();
  }

  listarPedidos() {
    this.carregando = true;
    this.pedidosService.getPedidos().subscribe((resp: any) => {
      this.pedidos = resp
      this.carregando = false;
    })
  }

  listarObras() {
    this.obrasService.getObras().subscribe((obras) => {
      this.obras = obras;
    });
  }

  editarPedido(pedido: any) {
    this.pedidosService.pedidoSelecionado = pedido
    this.router.navigate(['pedidos-edit'])
  }

  excluirPedido(pedido: any) {
    this.pedidosService.deletePedido(pedido.id).then(() => {
      this.toastr.success('Pedido excluído com sucesso');
    })
  }
}
