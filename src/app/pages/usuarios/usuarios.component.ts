import { Component, ViewChild, AfterViewInit, OnInit, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from '../../core/services/usuarios.service';
import { Usuario } from '../../core/models/usuarios.model';
import { MatDialog } from '@angular/material/dialog';
import { UsarioDialogsComponent } from '../dialogs/usario-dialogs/usario-dialogs.component';
import { MaterialModule } from '../../shared/material.module';
import { map } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'name', 'username', 'rol', 'obra', 'activo', 'action'];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  selectdRow: Usuario = new Usuario();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly srvUsuario = inject(UsuariosService)
  private readonly dialog = inject(MatDialog)

  ngOnInit(): void {
    this.loadData();

  }
  loadData() {
    this.srvUsuario.obtenerUsuarios().subscribe((users: any) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UsarioDialogsComponent, {
      width: '450px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

  onRowClicked(row: any) {
    this.selectdRow = row;
  }

  editarUsuario() {
    const dialogRef = this.dialog.open(UsarioDialogsComponent, {
      width: '450px',
      data: this.selectdRow,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

  activarUsuario() {
    let mensaje = this.selectdRow.activo ? 'desactivado' : 'activado';
    this.selectdRow.activo = !this.selectdRow.activo
    this.srvUsuario.actualizarUsuarios(this.selectdRow).pipe(map(data => {
      this.loadData();
      toastr.success(`El usuario <b>${this.selectdRow.name}</b> ha sido ${mensaje} correctamente`, '',
        {
          "progressBar": true,
          "positionClass": "toast-bottom-right"
        });
    })).subscribe()
  }

  validarNombreUsuario(usuario: string): boolean {
    return /^\S*$/.test(usuario);
  }
}

