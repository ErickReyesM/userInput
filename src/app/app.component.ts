import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { copyStyles } from '@angular/animations/browser/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  order: string;
  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(param => {
      let id = param['id'];
      console.log(id);
    });
  }

  ngOnInit() {
    
  }
/*
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
  }*/

}
