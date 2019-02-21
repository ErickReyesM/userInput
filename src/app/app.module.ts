import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatRadioModule 
,MatCheckboxModule, MatIconModule, MatInputModule} from '@angular/material';
import * as firebase from 'firebase';
import { MainVewQuestionComponent } from './main-vew-question/main-vew-question.component';
import { DataService } from 'src/services/data.service';

const appRoutes: Routes = [
  { path: 'start-survey', component: MainVewQuestionComponent },
];


var config = {
  apiKey: "AIzaSyCMsiQRCVEa-qzxA-bnt-Jk5FXyOQgFrBw",
  authDomain: "sondaggio-ea6bf.firebaseapp.com",
  databaseURL: "https://sondaggio-ea6bf.firebaseio.com",
  projectId: "sondaggio-ea6bf",
  storageBucket: "",
  messagingSenderId: "22946728796"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    AppComponent,
    MainVewQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
