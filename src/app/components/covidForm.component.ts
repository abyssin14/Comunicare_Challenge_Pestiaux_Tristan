import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { CovidFormService } from '../services/covidForm.service'


@Component({
  selector: 'covid-form',
  templateUrl: './covidForm.component.html',
  styleUrls: ['./covidForm.component.scss'],
})
export class CovidFormComponent implements OnInit{

  constructor(private covidFormService: CovidFormService){}

  risks: any;
  symptoms: any;

  ngOnInit(){
    this.risks = this.covidFormService.risks;
    this.symptoms = this.covidFormService.symptoms;
  }

  isFormValid(form: NgForm){
    var isRequiredFielValid = form.valid;
    var isRisksNotEmpty = false;
    var isSymptomsNotEmpty = false;

    this.risks.forEach(risk => {
      if(risk.value) isRisksNotEmpty = true;
    });

    this.symptoms.forEach(symptom => {
      if(symptom.value) isSymptomsNotEmpty = true;
    });

    if(isRequiredFielValid && isRisksNotEmpty && isSymptomsNotEmpty) return true;

    return true
  }
  async onSubmitForm(form: NgForm){
    let dataFihrFormat = this.covidFormService.formatToFhir(form.value);
    this.covidFormService.postForm(dataFihrFormat)

  }
}
