import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';
import { HomeComponent } from './components/core/home/home.component';
import { SmerComponent } from './components/smer/smer.component';
import { GrupaComponent } from './components/grupa/grupa.component';
import { ProjekatComponent } from './components/projekat/projekat.component';
import { MatButtonModule, MatIconModule, MatSidenavModule, MatListModule,
          MatGridListModule, MatExpansionModule, MatSortModule, MatTableModule, 
          MatToolbarModule, MatSelectModule, MatOptionModule, MatSnackBarModule,
           MatDialogModule, MatInputModule
 } from '@angular/material';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { RouterModule, Routes } from '@angular/router';
 import { HttpClientModule } from '@angular/common/http';
 import { GrupaService } from 'src/app/services/grupa.service';
 import {SmerService} from 'src/app/services/smer.service';
 import {ProjekatService} from 'src/app/services/projekat.service';
import {FormsModule} from '@angular/forms';
import { GrupaDialogComponent } from './components/dialogs/grupa-dialog/grupa-dialog.component';
import { SmerDialogComponent } from './components/dialogs/smer-dialog/smer-dialog.component';
import { ProjekatDialogComponent } from './components/dialogs/projekat-dialog/projekat-dialog.component';
import { StudentComponent } from './components/student/student.component';
import { StudentDialogComponent } from './components/dialogs/student-dialog/student-dialog.component';



const Routes = [
    { path: 'smer', component: SmerComponent },
    { path: 'grupa', component: GrupaComponent },
    { path: 'projekat', component: ProjekatComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'author', component: AuthorComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
  ];
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AuthorComponent,
    HomeComponent,
    SmerComponent,
    GrupaComponent,
    ProjekatComponent,
    GrupaDialogComponent,
    SmerDialogComponent,
    ProjekatDialogComponent,
    StudentComponent,
    StudentDialogComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatSidenavModule, MatListModule,
    MatGridListModule, MatExpansionModule, MatSortModule, MatTableModule,
    MatToolbarModule, MatSelectModule, MatOptionModule, MatSnackBarModule, MatDialogModule, 
    MatInputModule, FormsModule,
    RouterModule.forRoot(Routes),
    HttpClientModule
  ],
  entryComponents: [GrupaDialogComponent, SmerDialogComponent, ProjekatDialogComponent, StudentDialogComponent],
  providers: [GrupaService, SmerService, ProjekatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
