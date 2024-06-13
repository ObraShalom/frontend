import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ObraService } from '../../core/services/obra.service';
import { map } from 'rxjs';
import { Obra } from '../../core/models/obra.model';
import { PrimeNGModule } from '../../shared/prime-ng.module';
import { MaterialModule } from '../../shared/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ObraDialogComponent } from '../dialogs/obra-dialog/obra-dialog.component';

@Component({
  selector: 'app-obra',
  standalone: true,
  imports: [PrimeNGModule, MaterialModule],
  templateUrl: './obra.component.html',
  styleUrl: './obra.component.scss'
})
export class ObraComponent implements OnInit {

  private readonly srvObra = inject(ObraService);

  displayedColumns: string[] = ['id', 'nombre', 'activo','action'];
  dataSource: MatTableDataSource<Obra> = new MatTableDataSource();
  selectdRow: Obra = new Obra();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly dialog = inject(MatDialog)

  obras: Obra[] = [];
  first = 0;
  rows = 10;


  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.srvObra.obtenerObras().pipe(map((data : any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })).subscribe();
  }

  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ObraDialogComponent, {
      width: '450px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.loadData();
    });
  }

  
  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
    this.selectdRow = row;
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  activarUsuario() {
    let mensaje = this.selectdRow.activo ? 'desactivada' : 'activada';
    this.selectdRow.activo = !this.selectdRow.activo
    this.srvObra.editarObra(this.selectdRow).pipe(map(data => {
      this.loadData();
      toastr.success(`La obra <b>${this.selectdRow.nombre}</b> ha sido ${mensaje} correctamente`, '',
        {
          "progressBar": true,
          "positionClass": "toast-bottom-right"
        });
    })).subscribe()
  }

  

  editarObra() {
    const dialogRef = this.dialog.open(ObraDialogComponent, {
      width: '450px',
      data: this.selectdRow,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }



}
