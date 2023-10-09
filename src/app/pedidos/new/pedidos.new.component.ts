import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ObrasService } from 'src/app/obras/obras.service';
import { PedidosService } from '../pedidos.service';
import { MateriaisService } from 'src/app/materiais/materiais.service';
import { EstoqueService } from 'src/app/estoque/estoque.service';

@Component({
  selector: 'app-pedidos.new',
  templateUrl: './pedidos.new.component.html',
  styleUrls: ['./pedidos.new.component.css']
})
export class PedidosNewComponent {
  public formData: any = {};
  public obras: any = [];
  public materiais: any = [];
  public estoque: any[] = [];
  public avisoStatus: boolean = false;

  constructor(
    public obrasService: ObrasService,
    public router: Router,
    public toastr: ToastrService,
    public pedidosService: PedidosService,
    public materiaisService : MateriaisService,
    public estoqueService : EstoqueService
  ) {}

  ngOnInit() {
    this.listarObras();
    this.listarMateriais();
    this.listarEstoque();
  }

  alteraAvisoStatus() {
    if (this.formData.status = 2) {
      this.avisoStatus = true;
    } else {
      this.avisoStatus = false;
    }
  }

  listarObras() {
    this.obrasService.getObras().subscribe((resp: any) => {
      this.obras = resp
      if (this.obras && this.obras.length > 0) {
        this.formData.obra = this.obras[0].id;
        this.formData.nomeObra = this.obras[0].cliente;
      } else {
        this.formData.obra = '';
        this.formData.nomeObra = '';
      }
    })
  }

  listarMateriais() {
    this.materiaisService.getMateriais().subscribe((resp: any) => {
      this.materiais = resp;
      if (this.materiais && this.materiais.length > 0) {
        this.formData.idMaterial = this.materiais[0].id;
        this.formData.nomeMaterial = this.materiais[0].nome;
        this.formData.idObraMaterial = this.materiais[0].obra;
        this.formData.nomeObraMaterial = this.materiais[0].nomeObra;
      } else {
        this.formData.idMaterial = '';
        this.formData.nomeMaterial = '';
        this.formData.idObraMaterial = '';
        this.formData.nomeObraMaterial = '';
      }
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

  cadastrarPedido() {
    if (
      this.formData.idMaterial &&
      this.formData.quantidade &&
      this.formData.valorTotal &&
      this.formData.unidadeMaterial &&
      this.formData.nomeObraMaterial &&
      this.formData.fornecedor &&
      this.formData.dataPedido &&
      this.formData.obra &&
      this.formData.status
    ) {
      let pedidoData = {
        idMaterial: this.formData.idMaterial,
        quantidade: this.formData.quantidade,
        valorTotal: this.formData.valorTotal,
        fornecedor: this.formData.fornecedor,
        dataPedido: this.formData.dataPedido,
        idObraMaterial: this.formData.idObraMaterial,
        nomeObraMaterial : this.formData.nomeObraMaterial,
        status: this.formData.status,
        nomeMaterial: this.formData.nomeMaterial,
        unidadeMaterial: this.formData.unidadeMaterial,
      };
      this.pedidosService.newPedido(pedidoData)
        .then(() => {
          this.toastr.success('Pedido de Material cadastrado com sucesso')
          this.router.navigate(['pedidos']);
          if (this.formData.status == 2) {
            this.atualizaEstoque();
          }
        })
        .catch((error: any) => {
          this.toastr.error('Ocorreu um erro ao cadastrar o pedido')
        });
    } else {
      this.toastr.warning('Preencha todos os campos do formulário')
    }
  }
}
