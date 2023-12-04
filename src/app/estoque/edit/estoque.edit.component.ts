import { Component } from '@angular/core';
import { EstoqueService } from '../estoque.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estoque.edit',
  templateUrl: './estoque.edit.component.html',
  styleUrls: ['./estoque.edit.component.css']
})
export class EstoqueEditComponent {
  public formData: any = {};
  public estoque: any = [];

  constructor(
    public estoqueService : EstoqueService,
    public toastr : ToastrService,
    public router : Router
  ) {}

  ngOnInit() {
    if (!this.estoqueService.estoqueSelecionado) {
      this.router.navigate(['estoque-view'])
    } else {
      this.listarFormEstoque();
    }
  }

  listarFormEstoque() {
    this.formData = this.estoqueService.estoqueSelecionado;
  }

  editarEstoque() {
    this.estoqueService.editEstoque(this.formData.id, this.formData).then(() => {
      this.estoqueService.estoqueSelecionado = null;
      this.formData = {};
      this.toastr.success('Estoque editado com sucesso');
      this.router.navigate(['estoque-view']);
    })
  }
}
