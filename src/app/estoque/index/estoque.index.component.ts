import { Component } from '@angular/core';
import { ObrasService } from '../../obras/obras.service';
import { PedidosService } from '../../pedidos/pedidos.service';
import { Router } from '@angular/router';
import { EstoqueService } from '../estoque.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.index.component.html',
  styleUrls: ['./estoque.index.component.css']
})
export class EstoqueIndexComponent {
  public obras: any = [];
  public pedidos: any = [];
  public carregando: boolean = false;

  constructor(
    public obrasService : ObrasService,
    public pedidosService : PedidosService,
    public router : Router,
    public estoqueService : EstoqueService
  ) {}

  ngOnInit() {
    this.listarObras();
  }

  listarObras() {
    this.carregando = true;
    this.obrasService.getObras().subscribe((obras) => {
      this.obras = obras;
      this.carregando = false;
    });
  }

  listarPedidos() {
    this.pedidosService.getPedidos().subscribe((resp: any) => {
      this.pedidos = resp
    })
  }

  verEstoque(obra: any) {
    this.estoqueService.obraSelecionada = obra;
    this.router.navigate(['estoque-view']);
  }
}
