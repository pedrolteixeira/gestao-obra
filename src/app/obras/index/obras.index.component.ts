import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ObrasService } from '../obras.service';
import { ToastrService } from 'ngx-toastr';
import { EstoqueService } from 'src/app/estoque/estoque.service';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.index.component.html',
  styleUrls: ['./obras.index.component.css']
})


export class ObrasIndexComponent {
  public obras: any = [];
  public carregando: boolean = false;

  constructor(
    public router: Router,
    public obrasService: ObrasService,
    public toastr: ToastrService,
    public estoqueService : EstoqueService
  ) {}

  ngOnInit() {
    this.listarObras();
  }

  listarObras() {
    this.carregando = true;
    this.obrasService.getObras().subscribe((resp: any) => {
      this.obras = resp
      this.carregando = false;
    })
  }

  excluirObra(obra: any) {
    this.estoqueService.getEstoquesDaObra(obra.id).subscribe((estoques: any) => {
      estoques.forEach((estoque : any) => {
        this.estoqueService.deleteEstoque(estoque.id);
      });
      this.obrasService.deleteObra(obra.id).then(() => {
        this.toastr.success('Obra excluída com sucesso');
      });
    });
  }
}
