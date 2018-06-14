import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Projekat } from 'src/app/models/projekat';
import { HttpClient } from '@angular/common/http';
import { ProjekatService } from 'src/app/services/projekat.service';
import {MatDialog} from '@angular/material';
import {ProjekatDialogComponent} from '../dialogs/projekat-dialog/projekat-dialog.component'


@Component({
  selector: 'app-projekat',
  templateUrl: './projekat.component.html',
  styleUrls: ['./projekat.component.css']
})
export class ProjekatComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'oznaka', 'opis', 'actions'];
  dataSource : Observable<Projekat[]>;

  constructor(public projekatService: ProjekatService,public dialog : MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData(){
    this.dataSource = this.projekatService.getAllProjekat();
  }

  public openDialog(flag: number, id:number, naziv:string, oznaka: string, opis:string){
    const dialogRef= this.dialog.open(ProjekatDialogComponent, {data: {id:id, naziv : naziv, oznaka : oznaka, opis:opis}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
       this.loadData();
    })
  }
}
