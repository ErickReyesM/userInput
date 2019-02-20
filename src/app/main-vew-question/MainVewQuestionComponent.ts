import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DataService } from 'src/services/data.service';


@Component({
  selector: 'app-main-vew-question',
  templateUrl: './main-vew-question.component.html',
  styleUrls: ['./main-vew-question.component.css']
})

export class MainVewQuestionComponent implements OnInit {

  surveyId: string = '';
  collectionFB: string = 'surveys';
  questions: any[] = [];
  questionCount: number = 0;
  questionText: string = '';
  questionType: string = '';
  numberOfQuestion: number;
  optionsInQuestion: any[] = [];
  optionSelected: string = '';

  constructor(private data:DataService) { }
  ngOnInit() {
    this.data.currentMessage.subscribe(message => { this.surveyId = message; });
    firebase.firestore().collection(this.collectionFB).doc(this.surveyId).get()
      .then((doc) => {
        this.questions = doc.get('questions');
      }).catch((err) => {
        //TODO
      });
  }
  getQuestionLenght(): number {
    return this.questions.length;
  }
  getQuestionText(): string {
    return this.questions[this.questionCount].questionTxt;
  }
  getQuestionNumber(): number {
    return this.questions[this.questionCount].numberOrd;
  }
  getQuestionOptions(): any[] {
    return this.questions[this.questionCount].options;
  }
  nextQuestion() {
    this.questionCount += 1;
  }
}
