import { Injectable } from '@angular/core';
import {Grupa} from "src/app/models/grupa";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {BehaviorSubject} from "rxjs"
import { Observable } from "rxjs";

@Injectable()
export class GrupaService {
  private readonly API_URL = 'http://localhost:8083/grupe';
  dataChange: BehaviorSubject<Grupa[]> = new BehaviorSubject<Grupa[]>([]);


  constructor(private httpClient: HttpClient) { }

public getAllGrupa(): Observable<Grupa[]> {
  this.httpClient.get<Grupa[]>(this.API_URL).subscribe(data => {
    this.dataChange.next(data);
    }, (error: HttpErrorResponse)=> {
    console.log(error.name + ' '+ error.message)
    });
  return this.dataChange.asObservable();
  }

  public addGrupa(grupa: Grupa) : void {
    this.httpClient.post(this.API_URL, grupa).subscribe(data=> {});
  }

  public updateGrupa(grupa: Grupa):void {
    this.httpClient.put(this.API_URL, grupa).subscribe(data=> {});
  }

  public deleteGrupa(id: number):void {
    this.httpClient.delete(this.API_URL+id).subscribe(data=> {});
  }
}
