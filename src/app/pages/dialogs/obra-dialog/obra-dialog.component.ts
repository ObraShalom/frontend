import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MaterialModule } from '../../../shared/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Obra } from '../../../core/models/obra.model';
import { ObraService } from '../../../core/services/obra.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-obra-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,],
  templateUrl: './obra-dialog.component.html',
  styleUrl: './obra-dialog.component.scss'
})
export class ObraDialogComponent implements OnInit {

  tituloBoton: string = 'Guardar';
  titulo = 'Crear Obra';

  frmObra!: FormGroup;
  obra = new Obra();

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ObraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Obra,
    private srvObra: ObraService
  ) { }

  ngOnInit(): void {
    this.frmObra = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      activo: [true, Validators.required]
    });

    this.obra = this.data;
    if (this.data !== null) {
      this.frmObra.patchValue(this.obra);
      console.log(this.frmObra.value);
      this.titulo = 'Editar Obra';
      this.tituloBoton = 'Editar';

    } else {
      this.titulo = 'Crear Obra';
      this.tituloBoton = 'Guardar';
    }


  }

  submit() {
    if (this.tituloBoton === 'Guardar') {
      this.srvObra.guardarObras(this.frmObra.value).pipe(map(data => {
        console.log(data);
        this.dialogRef.close({ value: data });
        toastr.success('La Obra ha sido guardada correctamente', '',
          {
            "progressBar": true,
            "positionClass": "toast-bottom-right"
          });
      })).subscribe(
        (res : any) => console.log('HTTP response', res),
        err => {console.log('HTTP Error', err);
          toastr.error('Error al editar, es posible que ya exista otra Obra con el mismo nombre', '',
            {
              "progressBar": true,
              "positionClass": "toast-bottom-right"
            });
        },
        () => console.log('HTTP request completed.')
      );
    } else {
      this.srvObra.editarObra(this.frmObra.value).pipe(map(data => {
        console.log(data);
        this.dialogRef.close({ value: data });
        toastr.success('La Obra ha sido editada correctamente', '',
          {
            "progressBar": true,
            "positionClass": "toast-bottom-right"
          });
      })).subscribe(
        (res : any) => console.log('HTTP response', res),
        err => {console.log('HTTP Error', err);
          toastr.error('Error al editar, es posible que ya exista otra Obra con el mismo nombre', '',
            {
              "progressBar": true,
              "positionClass": "toast-bottom-right"
            });
        },
        () => console.log('HTTP request completed.')
      );
    }
  }

  close() {
    this.dialogRef.close({ value: this.frmObra.value });
  }

}
