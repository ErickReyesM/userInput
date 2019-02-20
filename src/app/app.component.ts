import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  surveysInDB: any[] = [];
  pageSize:number = 10;
  isLoadingResults:boolean;
  collectionFB:string = 'surveys';
  isAboutToStart:boolean = true;

  constructor(private data:DataService) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.GetPost();
  }

  GetPost(){
    this.surveysInDB = [];
    firebase.firestore().collection(this.collectionFB).orderBy("created","desc").limit(this.pageSize).get()
    .then((docs)=>{
      docs.forEach((doc)=>{
        this.surveysInDB.push(doc);
      })
      this.isLoadingResults = false;
    }).catch((err)=>{
      //TODO
    })
  }

  onOpenSurvey(doc:any){
    this.data.changeMessage(doc.id);
    this.isAboutToStart = false;
  }

  ago(time){
    moment.locale("es-us")
    let difference = moment(time).diff(moment());
    return moment.duration(difference).humanize();
  }
}
