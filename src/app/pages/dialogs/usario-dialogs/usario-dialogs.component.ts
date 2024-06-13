import { Component, Inject, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { ObraService } from '../../../core/services/obra.service';
import { Obra } from '../../../core/models/obra.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../../core/models/usuarios.model';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { catchError, map, of, throwError } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-usario-dialogs',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
  ],
  templateUrl: './usario-dialogs.component.html',
  styleUrl: './usario-dialogs.component.scss'
})
export class UsarioDialogsComponent implements OnInit {

  private readonly srvObra = inject(ObraService);
  private readonly srvUsuario = inject(UsuariosService);
  private readonly formBuilder = inject(FormBuilder);

  matcher = new MyErrorStateMatcher();

  obras: Obra[] = [];
  usuario!: Usuario;
  titulo: string = 'Crear Usuario';
  tituloBoton: string = 'Guardar';
  disabled: boolean = false;

  frmUsuarios!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UsarioDialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario
  ) { }


  ngOnInit(): void {
    this.frmUsuarios = this.formBuilder.group({
      id: [0],
      name: ['', Validators.required],
      username: [{ value: '', disabled: this.disabled }, Validators.required,],
      password: ['', Validators.required],
      idRol: [1, Validators.required],
      idObra: ['', Validators.required],
      activo: [true, Validators.required]
    });



    this.usuario = new Usuario()

    this.loadData();

  }
  loadData() {
    this.srvObra.obtenerObras().subscribe((data: any) => {
      this.obras = data;
    });

    console.log(this.data.name);

    this.usuario = this.data;

    if (this.data !== null) {
      this.frmUsuarios.patchValue(this.usuario);
      this.frmUsuarios.controls['username'].disable();
      console.log(this.frmUsuarios.value);
      this.titulo = 'Editar Usuario';
      this.tituloBoton = 'Editar';

    } else {
      this.titulo = 'Crear Usuario';
      this.tituloBoton = 'Guardar';
    }
  }

  submit(): void {


    this.usuario = this.frmUsuarios.value;

    this.usuario.name = this.frmUsuarios.controls['name'].value;
    this.usuario.username = this.frmUsuarios.controls['username'].value;
    this.usuario.password = this.frmUsuarios.controls['password'].value;
    this.usuario.idObra = this.frmUsuarios.controls['idObra'].value;
    this.usuario.idRol = this.frmUsuarios.controls['idRol'].value;
    this.usuario.activo = this.frmUsuarios.controls['activo'].value;

    if (this.tituloBoton === 'Guardar') {
      this.srvUsuario.guardarUsuarios(this.usuario).pipe(map(data => {
        console.log(data);
        this.dialogRef.close({ value: data });
        toastr.success('El usuario ha sido guardado correctamente', '',
          {
            "progressBar": true,
            "positionClass": "toast-bottom-right"
          });
      }), catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
      ).subscribe(
        (res : any) => console.log('HTTP response', res),
        err => {console.log('HTTP Error', err);
          toastr.error('Error al editar, es posible que ya exista otro usuario con el mismo nombre de usuario', '',
            {
              "progressBar": true,
              "positionClass": "toast-bottom-right"
            });
        },
        () => console.log('HTTP request completed.')
      );
    } else {
      this.srvUsuario.actualizarUsuarios(this.usuario).pipe(map(data => {
        console.log(data)
        this.dialogRef.close({ value: data });
        toastr.success('El usuario ha sido actualizado correctamente', '',
          {
            "progressBar": true,
            "positionClass": "toast-bottom-right"
          });
      }), catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      }) ).subscribe(
          (res : any) => console.log('HTTP response', res),
          err => {console.log('HTTP Error', err);
            toastr.error('Error al editar, es posible que ya exista otro usuario con el mismo nombre de usuario', '',
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
    this.dialogRef.close();
  }

}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}