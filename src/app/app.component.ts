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
  optionSelected:string = '';

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
          this.surveyId = docId;
        }else{
          this.existMessage = "documento inexistente";
          this.isLoadingResults = false;
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

  nextQuestion(value:string, type:string){
    console.log(value, type);
    this.questionCount +=1;
    if (this.questionCount + 1 == this.getQuestionLenght()){
      this.myColor = 'warn';
      this.messageBtn = 'Terminar Encuesta'
      this.onFinishSurvey();
    }
  }

  nextQuestionWithMultiple(a:boolean,b:boolean,c:boolean,d:boolean,e:boolean,f:boolean,type:string){
    let optionsInSurvey = this.getQuestionOptions();
    let options = [];
    if(a)
      options.push(optionsInSurvey[0]);
    if(b)
      options.push(optionsInSurvey[1]);
    if(c)
      options.push(optionsInSurvey[2]);
    if(d)
      options.push(optionsInSurvey[3]);
    if(e)
      options.push(optionsInSurvey[4]);
    if(f)
      options.push(optionsInSurvey[5]);
    options.filter(el => {
      return el != '';
    });
    this.questionCount +=1;
    if (this.questionCount + 1 == this.getQuestionLenght()){
      this.myColor = 'warn';
      this.messageBtn = 'Terminar Encuesta'
      this.onFinishSurvey();
    }
    console.log(options, type);
  }

  onFinishSurvey(){
    console.log('***Encuesta Terminada***')
  }
}
