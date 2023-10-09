import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MateriaisService } from '../materiais.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { EstoqueService } from 'src/app/estoque/estoque.service';
import { ObrasService } from 'src/app/obras/obras.service';

@Component({
  selector: 'app-materiais.new',
  templateUrl: './materiais.new.component.html',
  styleUrls: ['./materiais.new.component.css']
})
export class MateriaisNewComponent {
  public formData: any = {};
  public obras: any = [];

  constructor(
    public router: Router,
    public materiaisService: MateriaisService,
    public toastr: ToastrService,
    public estoqueService : EstoqueService,
    public obrasService : ObrasService
  ) {}

  ngOnInit() {
    this.listarObras()
  }

  cadastrarMaterial() {
    if (this.formData && this.formData.nome && this.formData.unidade) {
      let estoqueFormData = {
        nomeMaterial : this.formData.nome,
        idMaterial : '',
        quantidadeMaterial : 0,
        unidadeMaterial : this.formData.unidade,
        idObraMaterial : this.formData.obra,
        nomeObraMaterial : this.formData.nomeObra
      }
      this.materiaisService.newMaterial(this.formData).then((material: any) => {
        estoqueFormData.idMaterial = material.id;
        this.cadastrarEstoqueMaterial(estoqueFormData)
        this.toastr.success('Material cadastrado com sucesso')
        this.router.navigate(['materiais']);
      })
    }
  }

  cadastrarEstoqueMaterial(estoqueFormData: any) {
    this.estoqueService.newEstoque(estoqueFormData);
  }

  atualizarNomeObra() {
    const obraSelecionada = this.obras.find((obra: any) => obra.id === this.formData.obra);
    if (obraSelecionada) {
        this.formData.nomeObra = obraSelecionada.cliente;
    } else {
        this.formData.nomeObra = '';
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
}
