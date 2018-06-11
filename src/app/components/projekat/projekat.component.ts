import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Projekat } from 'src/app/models/projekat';
import { HttpClient } from '@angular/common/http';
import { ProjekatService } from 'src/app/services/projekat.service';

@Component({
  selector: 'app-projekat',
  templateUrl: './projekat.component.html',
  styleUrls: ['./projekat.component.css']
})
export class ProjekatComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'oznaka', 'opis', 'actions'];
  dataSource : Observable<Projekat[]>;

  constructor(public projekatService: ProjekatService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData(){
    this.dataSource = this.projekatService.getAllProjekat();
  }
}
