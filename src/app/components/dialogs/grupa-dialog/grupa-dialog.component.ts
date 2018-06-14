import { Component, OnInit, Inject } from '@angular/core';
import {MatSnackBar, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {GrupaService} from 'src/app/services/grupa.service';
import {Grupa} from 'src/app/models/grupa';
import {Smer} from 'src/app/models/smer';
import {SmerService} from 'src/app/services/smer.service';

@Component({
  selector: 'app-grupa-dialog',
  templateUrl: './grupa-dialog.component.html',
  styleUrls: ['./grupa-dialog.component.css']
})
export class GrupaDialogComponent implements OnInit {

  public flag: number;
  smerovi: Smer[];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<GrupaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public  data: Grupa,
              public grupaService: GrupaService,
            public smerService :SmerService) { }

  ngOnInit() {
    this.smerService.getAllSmer().subscribe(smerovi => this.smerovi=smerovi);
  }



  public add() : void {
    try{
    this.data.id=-1;
    this.grupaService.addGrupa(this.data);
    this.snackBar.open("Grupa uspesno dodata", "OK", {duration:2500});
  } catch (Error){
    console.log(Error.message());
  }
  
}


  public update():void{
    this.grupaService.updateGrupa(this.data);
    this.snackBar.open("Grupa uspesno izmenjena", "OK", {duration:2500});
  }

  public delete():void{
    this.grupaService.deleteGrupa(this.data.id);
    this.snackBar.open("Grupa uspesno obrisana","OK", {duration:2500});
  }

  public cancel():void{
    this.dialogRef.close();
    this.snackBar.open("Odustali ste ", "OK", {duration:2500});
  }
}
