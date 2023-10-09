import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ObrasService } from '../obras.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-obras.new',
  templateUrl: './obras.new.component.html',
  styleUrls: ['./obras.new.component.css']
})
export class ObrasNewComponent {
  formData = {
    cliente: '',
    estado: '',
    cidade: '',
    dataInicio: '',
    dataEntrega: '',
  };

  constructor(
    public router: Router,
    public obrasService : ObrasService,
    public toastr: ToastrService
  ) {}

  cadastrarObra() {
    if (
      this.formData.cliente &&
      this.formData.estado &&
      this.formData.cidade &&
      this.formData.dataInicio &&
      this.formData.dataEntrega
    ) {
      this.obrasService.newObra(this.formData)
        .then(() => {
          this.toastr.success('Obra cadastrada com sucesso')
          this.router.navigate(['obras']);
        })
        .catch((error: any) => {
          this.toastr.error('Ocorreu um erro ao cadastrar a obra')
        });
    } else {
      this.toastr.warning('Preencha todos os campos do formulário')
    }
  }
}
