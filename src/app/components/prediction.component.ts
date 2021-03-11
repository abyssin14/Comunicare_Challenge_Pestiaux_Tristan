import { Component, OnInit } from '@angular/core';
import { CovidFormService } from '../services/covidForm.service'


@Component({
  selector: 'prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss'],
})
export class PredictionComponent implements OnInit{
  constructor(private covidFormService: CovidFormService){}
  
  prediction: number;

  ngOnInit(){
    this.covidFormService.predictionSubject.subscribe(value=>{
      this.prediction = Math.round(value*100)
    });
  }

  goToForm(){
    this.covidFormService.toggleIsFormVisible(true);
  }

}
