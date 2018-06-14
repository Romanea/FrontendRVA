import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { MatDialog,MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
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
  dataSource: MatTableDataSource<Student>;
  
  @Input() selektovanaGrupa: Grupa;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public studentService: StudentService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.selektovanaGrupa.id) {
      this.loadData();
    }
  }

  public loadData() {
    this.studentService.getStudentiGrupe(this.selektovanaGrupa.id).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      //pretraga po nazivu ugnježdenog objekta
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'grupa' ? currentTerm + data.grupa.oznaka : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

       //sortiranje po nazivu ugnježdenog objekta
       this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'grupa': return data.grupa.oznaka.toLocaleLowerCase();
          default: return data[property];
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}