import { Component } from '@angular/core';
import { PedidosService } from '../pedidos.service';
import { Router } from '@angular/router';
import { ObrasService } from 'src/app/obras/obras.service';
import { MateriaisService } from 'src/app/materiais/materiais.service';
import { ToastrService } from 'ngx-toastr';
import { EstoqueService } from 'src/app/estoque/estoque.service';

@Component({
  selector: 'app-pedidos.edit',
  templateUrl: './pedidos.edit.component.html',
  styleUrls: ['./pedidos.edit.component.css']
})
export class PedidosEditComponent {
  public pedidos: any = []
  public pedidoSelecionado: any;
  public obras: any = []
  public materiais: any = [];
  public estoque : any = [];
  public formData: any = {};
  public avisoStatus: boolean = false;

  constructor(
    public pedidosService : PedidosService,
    public router : Router,
    public obrasService : ObrasService,
    public materiaisService : MateriaisService,
    public toastr : ToastrService,
    public estoqueService : EstoqueService,
  ) {}

  ngOnInit() {
    if (!this.pedidosService.pedidoSelecionado) {
      this.router.navigate(['pedidos'])
    } else {
      this.listarObras();
      this.listarMateriais();
      this.listarFormPedido();
      this.listarEstoque();
    }
  }

  alterarAvisoStatus() {
    if (this.formData.status == 2) {
      this.avisoStatus = true;
    } else {
      this.avisoStatus = false;
    }
  }

  listarFormPedido() {
    this.formData = this.pedidosService.pedidoSelecionado;
  }

  listarObras() {
    this.obrasService.getObras().subscribe((resp: any) => {
      this.obras = resp
    })
  }

  listarMateriais() {
    this.materiaisService.getMateriais().subscribe((resp: any) => {
      this.materiais = resp;
      this.atualizarMaterial();
    });
  }

  atualizarMaterial() {
    this.materiais.forEach((material: any)=> {
      if (material.id == this.formData.idMaterial) {
        this.formData.unidadeMaterial = material.unidade;
        this.formData.idObraMaterial = material.obra;
        this.formData.nomeObraMaterial = material.nomeObra;
        this.formData.nomeMaterial = material.nome;
      }
    });
  }

  listarEstoque () {
    this.estoqueService.getEstoque().subscribe((resp) => {
      this.estoque = resp;
    })
  }

  atualizaEstoque() {
    this.estoque.forEach((est: any) => {
      if (est.idMaterial == this.formData.idMaterial) {
        this.estoqueService.editEstoque(est.id, {
          nomeMaterial : this.formData.nomeMaterial,
          idMaterial : this.formData.idMaterial,
          quantidadeMaterial : est.quantidadeMaterial + this.formData.quantidade,
          unidadeMaterial : this.formData.unidadeMaterial,
          idObraMaterial : this.formData.idObraMaterial,
          nomeObraMaterial : this.formData.nomeObraMaterial,
        })
      }
    })
  }

  editarPedido() {
    this.pedidosService.editPedido(this.formData.id, this.formData).then(() => {
      if (this.formData.status == 2) {
        this.atualizaEstoque();
      }
      this.pedidoSelecionado = null;
      this.formData = {};
      this.toastr.success('Pedido editado com sucesso')
      this.router.navigate(['pedidos'])
    })
  }
}
