import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupa } from 'src/app/models/grupa';
import { HttpClient } from '@angular/common/http';
import { GrupaService } from 'src/app/services/grupa.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-grupa',
  templateUrl: './grupa.component.html',
  styleUrls: ['./grupa.component.css']
})
export class GrupaComponent implements OnInit {
  displayedColumns = ['id', 'oznaka', 'smer', 'actions'];
  dataSource: Observable<Grupa[]>;

  constructor(public grupaService: GrupaService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData(){
    this.dataSource = this.grupaService.getAllGrupa();
  }

  public openDialog(flag: number, id:number, oznaka:string, smer: string){
    
  }
}
