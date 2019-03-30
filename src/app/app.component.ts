import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { CountdownComponent } from 'ngx-countdown';

export interface SurveyInput{
  type: string,
  value?: string,
  options?: any[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(CountdownComponent) counter: CountdownComponent;

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
  surveyInputObject:{surveyID:string, input:SurveyInput[], created:any };
  surveyUserInput:SurveyInput[] = [];
  inputCollection:string = 'userInput';
  config = {leftTime: 120}

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
          this.counter.pause();
        }else{
          this.existMessage = "documento inexistente";
          this.isLoadingResults = false;
          this.counter.pause();
        }
      })
    .catch((err) =>{
      //TODO
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

  nextQuestion(value:string, type:string, qNumber: number){
    let input:SurveyInput = { type: type, value: value, };
    this.surveyUserInput.push(input);
    this.questionCount +=1;
    this.counter.restart();

    if(qNumber == this.getQuestionLenght()-1){
      this.messageBtn = 'Terminar Encuesta';
      this.myColor = 'warn';
    }
    if(qNumber == this.getQuestionLenght()){
      this.onFinishSurvey();
    }
  }

  nextQuestionWithMultiple(a:boolean,b:boolean,c:boolean,d:boolean,e:boolean,f:boolean,type:string, qNumber: number){
    let optionsInSurvey = this.getQuestionOptions();
    let options = [];
    let input:SurveyInput;
    if(a) { options.push(optionsInSurvey[0]); }
    if(b) { options.push(optionsInSurvey[1]); }
    if(c) { options.push(optionsInSurvey[2]); }
    if(d) { options.push(optionsInSurvey[3]); }
    if(e) { options.push(optionsInSurvey[4]); }
    if(f) { options.push(optionsInSurvey[5]); }

    options = options.filter(el => {
      return el != undefined;
    });

    input = { type: type, options: options };

    this.surveyUserInput.push(input);

    this.questionCount +=1;
    this.counter.restart();

    if(qNumber == this.getQuestionLenght()-1){
      this.messageBtn = 'Terminar Encuesta';
      this.myColor = 'warn';
    }
    if(qNumber == this.getQuestionLenght()){
      this.onFinishSurvey();
    }
    optionsInSurvey = [];
    options = [];
  }

  onFinishSurvey(){
    this.surveyInputObject = {
      surveyID: this.surveyId,
      input: this.surveyUserInput,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }
    firebase.firestore().collection(this.inputCollection).add(this.surveyInputObject)
    .then((doc)=>{
      this.surveyUserInput = [];
      window.location.assign('https://sondaggio-user.firebaseapp.com/?id='+this.surveyId);
    })
    .catch((err)=>{
      //TODO
    })
  }

  onFinished(){
    window.location.assign('https://sondaggio-user.firebaseapp.com/?id='+this.surveyId);
  }

}
