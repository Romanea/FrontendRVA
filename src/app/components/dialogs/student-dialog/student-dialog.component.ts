import { Component, OnInit, Inject} from '@angular/core';
import {MatSnackBar, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Grupa} from '../../../models/grupa';
import {Student} from '../../../models/student';
import {Projekat} from '../../../models/projekat';

import {StudentService} from '../../../services/student.service';
import {GrupaService} from '../../../services/grupa.service';
import {ProjekatService} from '../../../services/projekat.service';



@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {

  public flag: number;
  grupe: Grupa[];
  projekti: Projekat[];
  studenti:Student[];
  
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StudentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Student,
              public grupaService: GrupaService,
              public projekatService: ProjekatService,
              public studentService : StudentService) { }

  ngOnInit() {
    this.grupaService.getAllGrupa().subscribe(grupe => this.grupe=grupe);
    this.projekatService.getAllProjekat().subscribe(projekti => this.projekti=projekti);
    this.studentService.getAllStudent().subscribe(studenti => this.studenti=studenti);


  }

  public add() : void {
    try{
    this.data.id=-1;
    this.studentService.addStudent(this.data);
    this.snackBar.open("Grupa uspesno dodata", "OK", {duration:2500});
  } catch (Error){
    console.log(Error.message());
  }
  
}


  public update():void{
    this.studentService.updateStudent(this.data);
    this.snackBar.open("Student uspesno izmenjen", "OK", {duration:2500});
  }

  public delete():void{
    this.studentService.deleteStudent(this.data.id);
    this.snackBar.open("Student uspesno obrisan","OK", {duration:2500});
  }

  public cancel():void{
    this.dialogRef.close();
    this.snackBar.open("Odustali ste ", "OK", {duration:2500});
  }

}
