import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  collection:string = 'surveys';
  surveyId:string = '';
  exist:string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe( async (param) => {
      console.log( this.getDocFromFireStore(this.collection, param['id']));
    });
  }

  getDocFromFireStore(collection:string, docId:string){
    firebase.firestore().collection(collection).doc(docId).get()
    .then((doc)=>{
        if(doc.exists){
          this.exist = "documento existente";
        }else{
          this.exist = "documento inexistente";
        }
      })
    .catch((err) =>{
      console.log('***'+err);
    });
  }

}
