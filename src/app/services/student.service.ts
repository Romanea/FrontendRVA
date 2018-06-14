import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Student } from '../models/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly API_URL = 'http://localhost:8083/studenti/';
  dataChange: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);
  studentiGrupe: Student[];
  studenti: Student[];
  constructor(private httpClient: HttpClient) { }

  public getAllStudent() : Observable<Student[]> {
    this.httpClient.get<Student[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    }, (error: HttpErrorResponse)=> {
      console.log(error.name + ' '+ error.message)
    });
    return this.dataChange.asObservable();
  }

  public getStudentiGrupe(id_grupe : number) :  Observable<Student[]> {
    this.getAllStudent().subscribe(studenti => this.studenti = studenti ) ;
      for( var student in this.studenti) {
        if( JSON.stringify(student)["grupa"]["id"] == id_grupe)
          this.studentiGrupe.push(JSON.parse(student));
          console.log( student);
      }
      this.dataChange.next(this.studentiGrupe);
    
    return this.dataChange.asObservable();

  }

 /* public getStudentiGrupe(id_grupe : number) :  Observable<Student[]> {
    this.getAllStudent().subscribe(studenti =>
      for( var student in this.studenti) {
        if( JSON.stringify(student)["grupa"].id === id_grupe)
          this.studentiGrupe.push(JSON.parse(student));
      }
      console.log( this.studentiGrupe);
      this.dataChange.next(this.studentiGrupe); )};
    
    return this.dataChange.asObservable();

  }*/
 
  public addStudent(student: Student) : void {
    this.httpClient.post(this.API_URL, student).subscribe(data=> {});
  }
  
  public updateStudent(student: Student):void {
    this.httpClient.put(this.API_URL, student).subscribe(data=> {});
  }
  
  public deleteStudent(id: number):void {
    this.httpClient.delete(this.API_URL+id).subscribe(data=> {});
  }
}
