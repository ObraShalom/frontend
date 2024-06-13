import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-grupo-adultos',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './grupo-adultos.component.html',
  styleUrl: './grupo-adultos.component.scss'
})
export class GrupoAdultosComponent implements OnInit {

  data: any[] = [
    { id: '1', name: 'Hydrogen' , username: 'hydrogen'},
    { id: '2', name: 'Helium' , username: 'hydrogen'},
    { id: '3', name: 'Lithium' , username: 'hydrogen'},
    // ... more data here
  ];

  displayedColumns: string[] = ['id', 'name', 'username'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
