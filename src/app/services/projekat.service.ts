import { Injectable } from '@angular/core';
import {Projekat} from "src/app/models/projekat";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {BehaviorSubject} from "rxjs"
import { Observable } from "rxjs";

@Injectable()
export class ProjekatService {  private readonly API_URL = 'http://localhost:8083/projekti/';
  dataChange: BehaviorSubject<Projekat[]> = new BehaviorSubject<Projekat[]>([]);


  constructor(private httpClient: HttpClient) { }

  public getAllProjekat(): Observable<Projekat[]> {
    this.httpClient.get<Projekat[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    }, (error: HttpErrorResponse)=> {
      console.log(error.name + ' '+ error.message)
    });
    return this.dataChange.asObservable();
}


public addProjekat(projekat: Projekat) : void {
  this.httpClient.post(this.API_URL, projekat).subscribe(data=> {});
}

public updateProjekat(projekat: Projekat):void {
  this.httpClient.put(this.API_URL, projekat).subscribe(data=> {});
}

public deleteProjekat(id: number):void {
  this.httpClient.delete(this.API_URL+id).subscribe(data=> {});
}
}