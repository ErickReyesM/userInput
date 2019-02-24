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
  exist:boolean = false;
  existMessage:string = '';
  questions: any[] = [];
  questionCount:number = 0; 
  myColor:string = 'primary';
  messageBtn:string = 'Siguiente';
  isLoadingResults:boolean;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.route.queryParams.subscribe( async (param) => {
      this.getDocFromFireStore(this.collection, param['id']);
    });
  }

  getDocFromFireStore(collection:string, docId:string){
    firebase.firestore().collection(collection).doc(docId).get()
    .then((doc)=>{
        if(doc.exists){
          this.questions = doc.get('questions');
          this.exist = true;
          this.isLoadingResults = false;
        }else{
          this.existMessage = "documento inexistente";
        }
      })
    .catch((err) =>{
      console.log('***'+err);
    });
  }

  getQuestionLenght():number{
    return this.questions.length;
  }

  getQuestionText():string{
    return this.questions[this.questionCount].questionTxt;
  }

  getQuestionNumber():number{
    return this.questions[this.questionCount].numberOrd;
  }

  getQuestionOptions():string[]{
    return this.questions[this.questionCount].options;
  }

  getInputType():string{
    return this.questions[this.questionCount].type;
  }

  nextQuestion(){
    this.questionCount +=1;
    if (this.getQuestionLenght() === (this.questionCount + 1)){
      this.myColor = 'warn';
      this.messageBtn = 'Terminar Encuesta'
    }
  }

}
