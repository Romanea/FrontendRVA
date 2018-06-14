import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Smer } from 'src/app/models/smer';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material';

import {SmerService}from 'src/app/services/smer.service';
import {SmerDialogComponent} from '../dialogs/smer-dialog/smer-dialog.component'

@Component({
  selector: 'app-smer',
  templateUrl: './smer.component.html',
  styleUrls: ['./smer.component.css']
})
export class SmerComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'oznaka', 'actions'];
  dataSource: Observable<Smer[]>;

  constructor(public smerService: SmerService, public dialog : MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData(){
    this.dataSource = this.smerService.getAllSmer();
  }

  public openDialog(flag: number, id:number, naziv:string, oznaka: string){
    const dialogRef= this.dialog.open(SmerDialogComponent, {data: {id:id, naziv : naziv, oznaka : oznaka}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
       this.loadData();
    })
  }
    
}
