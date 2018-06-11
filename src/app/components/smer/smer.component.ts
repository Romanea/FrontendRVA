import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Smer } from 'src/app/models/smer';
import { HttpClient } from '@angular/common/http';
import {SmerService}from 'src/app/services/smer.service';

@Component({
  selector: 'app-smer',
  templateUrl: './smer.component.html',
  styleUrls: ['./smer.component.css']
})
export class SmerComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'oznaka', 'actions'];
  dataSource: Observable<Smer[]>;

  constructor(public smerService: SmerService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData(){
    this.dataSource = this.smerService.getAllSmer();
  }
}
