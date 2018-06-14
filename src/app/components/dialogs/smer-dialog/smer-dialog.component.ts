import { Component, OnInit, Inject } from '@angular/core';
import {MatSnackBar, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SmerService} from 'src/app/services/smer.service'
import {Smer} from 'src/app/models/smer';

@Component({
  selector: 'app-smer-dialog',
  templateUrl: './smer-dialog.component.html',
  styleUrls: ['./smer-dialog.component.css']
})
export class SmerDialogComponent implements OnInit {

  public flag : number;

  constructor(public snackBar :MatSnackBar,
              public dialogRef: MatDialogRef<SmerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data : Smer,
              public smerService:SmerService) { }

  ngOnInit() {
  }

  public add() : void {
    try{
    this.data.id=-1;
    this.smerService.addSmer(this.data);
    this.snackBar.open("Smer uspesno dodat", "OK", {duration:2500});
  } catch (Error){
    console.log(Error.message());
  }
  
}


  public update():void{
    this.smerService.updateSmer(this.data);
    this.snackBar.open("Smer uspesno izmenjen", "OK", {duration:2500});
  }

  public delete():void{
    this.smerService.deleteSmer(this.data.id);
    this.snackBar.open("Smer uspesno obrisan","OK", {duration:2500});
  }

  public cancel():void{
    this.dialogRef.close();
    this.snackBar.open("Odustali ste od života.", "OK", {duration:2500});
  }

}
