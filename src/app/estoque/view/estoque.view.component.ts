import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ObrasService } from 'src/app/obras/obras.service';
import { PedidosService } from 'src/app/pedidos/pedidos.service';
import { EstoqueService } from '../estoque.service';
import { MateriaisService } from 'src/app/materiais/materiais.service';

@Component({
  selector: 'app-estoque.view',
  templateUrl: './estoque.view.component.html',
  styleUrls: ['./estoque.view.component.css']
})
export class EstoqueViewComponent {
  public pedidos: any = [];
  public pedidosEntregues: any = [];
  public estoque: any[] = [];
  public materiais: any[] = [];

  constructor(
    public obrasService : ObrasService,
    public pedidosService : PedidosService,
    public router : Router,
    public estoqueService : EstoqueService,
    public materiaisService : MateriaisService
  ) {
  }

  ngOnInit() {
    if (!this.estoqueService.obraSelecionada) {
      this.router.navigate(['estoque'])
    }
    this.listarMateriais();
  }

  listarMateriais() {
    this.estoqueService.getEstoque().subscribe((resp) => {
      resp.forEach((material) => {
        if (material.idObraMaterial == this.estoqueService.obraSelecionada) {
          this.estoque.push(material);
        }
      })
    })
  }

  editarEstoque(estoque: any) {
    this.estoqueService.estoqueSelecionado = estoque;
    this.router.navigate(['estoque-edit'])
  }
}
