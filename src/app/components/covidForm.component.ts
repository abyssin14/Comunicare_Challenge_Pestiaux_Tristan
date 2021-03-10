import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'
import { CovidFormService } from '../services/covidForm.service'


@Component({
  selector: 'covid-form',
  templateUrl: './covidForm.component.html',
  styleUrls: ['./covidForm.component.scss'],
  providers: [ CovidFormService ]
})
export class CovidFormComponent {
  constructor(private covidFormService: CovidFormService){}

  public risks = [
    {
      "name": "Diabète",
      "code": "fr_diabete",
      "value": false
    },
    {
      "name": "Maladie cardiovasculaire",
      "code": "fr_maladie_cardiovasculaire",
      "value": false
    },
    {
      "name": "Asthme",
      "code": "fr_asthme",
      "value": false
    },
    {
      "name": "BPCO",
      "code": "fr_bpco",
      "value": false
    },
    {
      "name": "Néoplasie",
      "code": "fr_neoplasie",
      "value": false
    },
    {
      "name": "Obésité",
      "code": "fr_obese",
      "value": false
    }
  ]

  public symptoms = [
    {
      "name": "Fièvre",
      "code": "symp_fievre",
      "value": false
    },
    {
      "name": "Difficultés respiratoires",
      "code": "symp_dyspnee",
      "value": false
    },
    {
      "name": "Douleurs musculaires",
      "code": "symp_myalgies",
      "value": false
    },
    {
      "name": "Mal de tête",
      "code": "symp_cephalees,",
      "value": false
    },
    {
      "name": "Toux",
      "code": "symp_toux,",
      "value": false
    },
    {
      "name": "Troubles digestifs",
      "code": "symp_digestifs",
      "value": false
    }
  ]
  isFormValid(form: NgForm){
    var isRequiredFielValid = form.valid;
    var isRisksNotEmpty = false;
    var isSymptomsNotEmpty = false
    this.risks.forEach(risk => {
      if(risk.value) isRisksNotEmpty = true;
    });
    this.symptoms.forEach(symptom => {
      if(symptom.value) isSymptomsNotEmpty = true;
    });
    if(isRequiredFielValid && isRisksNotEmpty && isSymptomsNotEmpty) return true;
    return false
  }
  onSubmitForm(form: NgForm){
    let dataFihrFormat = this.covidFormService.formatToFhir(form.value, this.risks, this.symptoms);
    this.covidFormService.postForm(dataFihrFormat);

  }
}
