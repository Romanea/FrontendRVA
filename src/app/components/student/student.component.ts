import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { MatDialog } from '@angular/material';
import { Student } from '../../models/student';
import { Observable } from 'rxjs';
import { Grupa } from '../../models/grupa';
import { Projekat } from '../../models/projekat';
import {StudentDialogComponent}  from '../dialogs/student-dialog/student-dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  displayedColumns = ['id', 'ime', 'prezime', 'broj_indeksa', 'grupa', 'smer', 'projekat', 'actions'];
  dataSource: Observable<Student[]>;
  
  @Input() selektovanaGrupa: Grupa;

  constructor(public studentService: StudentService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.selektovanaGrupa.id) {
      this.loadData();
    }
  }

  public loadData() {
    this.dataSource = this.studentService.getStudentiGrupe(this.selektovanaGrupa.id);
    
  }

 public openDialog(flag: number, id: number, ime: string, prezime: string, broj_indeksa : number, grupa : Grupa, projekat : Projekat) {
    const dialogRef = this.dialog.open(StudentDialogComponent, {
      data: { id: id, ime: ime, prezime: prezime, broj_indeksa : broj_indeksa, grupa : grupa, projekat : projekat
      }
    });
    dialogRef.componentInstance.flag = flag;
    if (flag == 1)
      dialogRef.componentInstance.data.grupa = this.selektovanaGrupa;
    dialogRef.afterClosed().subscribe(result => {
       this.loadData();
    });
  }
}