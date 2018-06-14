import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Smer } from 'src/app/models/smer';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatTableDataSource, MatPaginator, MatSort} from '@angular/material';

import {SmerService}from 'src/app/services/smer.service';
import {SmerDialogComponent} from '../dialogs/smer-dialog/smer-dialog.component'

@Component({
  selector: 'app-smer',
  templateUrl: './smer.component.html',
  styleUrls: ['./smer.component.css']
})
export class SmerComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'oznaka', 'actions'];
  dataSource: MatTableDataSource<Smer>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public smerService: SmerService, public dialog : MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData(){
   this.smerService.getAllSmer().subscribe(data => {
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
 });;
  }

  public openDialog(flag: number, id:number, naziv:string, oznaka: string){
    const dialogRef= this.dialog.open(SmerDialogComponent, {data: {id:id, naziv : naziv, oznaka : oznaka}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
       this.loadData();
    })
  }
    
}
