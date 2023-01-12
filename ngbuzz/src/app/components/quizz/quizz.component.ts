import { Component } from '@angular/core';
import quizz_questions from 'src/assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent {

  title: string = 'Título';

  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected: string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
      this.questionSelected = this.questions[this.questionIndex];

    }

  }

  optionOnClick(alias: string): void {
    this.answers.push(alias);
    this.nextStep();
  }

  nextStep(): void {
    this.questionIndex++;
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    }
    else {
      const finalAnswer: string = this.checkResult(this.answers);
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
      this.finished = true;

    }
  }

  checkResult(answers: string[]): string {
    const result = answers.reduce(
      (previous, current, i, arr) => {
        if (
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ) {
          return previous;
        }
        else {
          return current;
        }
      }
    )
    return result;
  }

}
