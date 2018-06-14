import { Injectable } from '@angular/core';
import {Smer} from 'src/app/models/smer';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {BehaviorSubject} from "rxjs"
import { Observable } from "rxjs";


@Injectable()
export class SmerService {
  private readonly API_URL = 'http://localhost:8083/smerovi/';
  dataChange: BehaviorSubject<Smer[]> = new BehaviorSubject<Smer[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllSmer() : Observable<Smer[]> {
    this.httpClient.get<Smer[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    }, (error: HttpErrorResponse)=> {
      console.log(error.name + ' '+ error.message)
    });
    return this.dataChange.asObservable();
  }

  public addSmer(smer: Smer) : void {
    this.httpClient.post(this.API_URL, smer).subscribe(data=> {});
  }
  
  public updateSmer(smer: Smer):void {
    this.httpClient.put(this.API_URL, smer).subscribe(data=> {});
  }
  
  public deleteSmer(id: number):void {
    this.httpClient.delete(this.API_URL+id).subscribe(data=> {});
  }
}
