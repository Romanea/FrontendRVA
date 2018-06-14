import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Projekat } from 'src/app/models/projekat';
import { HttpClient } from '@angular/common/http';
import { ProjekatService } from 'src/app/services/projekat.service';
import {MatDialog,MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {ProjekatDialogComponent} from '../dialogs/projekat-dialog/projekat-dialog.component'


@Component({
  selector: 'app-projekat',
  templateUrl: './projekat.component.html',
  styleUrls: ['./projekat.component.css']
})
export class ProjekatComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'oznaka', 'opis', 'actions'];
  dataSource : MatTableDataSource<Projekat>;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public projekatService: ProjekatService,public dialog : MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData(){
    this.projekatService.getAllProjekat().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);

      //case ignore
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'id': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id:number, naziv:string, oznaka: string, opis:string){
    const dialogRef= this.dialog.open(ProjekatDialogComponent, {data: {id:id, naziv : naziv, oznaka : oznaka, opis:opis}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
       this.loadData();
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
