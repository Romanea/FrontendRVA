import { Component, OnInit, Inject } from '@angular/core';
import {MatSnackBar, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ProjekatService} from 'src/app/services/projekat.service'
import {Projekat} from 'src/app/models/projekat';

@Component({
  selector: 'app-projekat-dialog',
  templateUrl: './projekat-dialog.component.html',
  styleUrls: ['./projekat-dialog.component.css']
})
export class ProjekatDialogComponent implements OnInit {

  public flag : number;

  constructor(public snackBar :MatSnackBar,
              public dialogRef: MatDialogRef<ProjekatDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data : Projekat,
              public smerService:ProjekatService) { }

  ngOnInit() {
  }

  public add() : void {
    try{
    this.data.id=-1;
    this.smerService.addProjekat(this.data);
    this.snackBar.open("Projekat uspesno dodat", "OK", {duration:2500});
  } catch (Error){
    console.log(Error.message());
  }
  
}


  public update():void{
    this.smerService.updateProjekat(this.data);
    this.snackBar.open("Projekat uspesno izmenjen", "OK", {duration:2500});
  }

  public delete():void{
    this.smerService.deleteProjekat(this.data.id);
    this.snackBar.open("Projekat uspesno obrisan","OK", {duration:2500});
  }

  public cancel():void{
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "OK", {duration:2500});
  }

}
