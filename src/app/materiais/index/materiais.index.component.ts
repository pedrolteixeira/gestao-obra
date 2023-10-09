import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MateriaisService } from '../materiais.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-materiais',
  templateUrl: './materiais.index.component.html',
  styleUrls: ['./materiais.index.component.css']
})
export class MateriaisIndexComponent {
  public materiais: any = [];
  constructor(
    public router : Router,
    public materiaisService : MateriaisService,
    public toastr : ToastrService
  ) {}

  ngOnInit() {
    this.listarMateriais()
  }

  listarMateriais() {
    this.materiaisService.getMateriais().subscribe((resp: any) => {
      this.materiais = resp
    })
  }

  excluirMaterial(material: string) {
    this.materiaisService.deleteMaterial(material).then(() => {
      this.listarMateriais();
      this.toastr.success('Material excluído com sucesso');
    }, (error) => {
      this.toastr.success('Ocorreu um erro ao excluir o material');
    })
  }
}
