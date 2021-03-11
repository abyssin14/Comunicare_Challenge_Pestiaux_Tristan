import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs'

@Injectable()
export class CovidFormService{
    constructor(
        private httpClient: HttpClient,
        public loadingController: LoadingController,
        ){}
    isFormVisibleSubject: Subject<boolean>  = new Subject<boolean>();
    predictionSubject: Subject<number> = new Subject<number>();
    risks = [
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
     symptoms = [
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
    async postForm(data: Array<any>){
        const loading = await this.loadingController.create({
            message: 'Calcul de la prédiction en cours...',
            duration: 5000
        });
        loading.present()
        this.httpClient
            .request('POST', 'https://canalytics.comunicare.io/api/predictionHospitalizationCovidFhir',{
                body: JSON.stringify(data),
            })
            .subscribe(response => {
                loading.dismiss()
                if(response['success']){
                    data = response['data'];
                    this.predictionSubject.next(data[0].prediction[data[0].prediction.length-1].probabilityDecimal);
                    this.toggleIsFormVisible(false);
                    
                }else{
                    alert("Erreur lors de l'envoi du formulaire : " + response['message']);
                }
            })
    }

    formatToFhir(form: object){
        let reference = "Pestiaux_Tristan_Challenge"
        let date = new Date().toLocaleDateString('fr-FR');
        let component= [];

        for(let key in form){
            if(form[key] == "age" || form[key] == 'sexe'){  //backend only uses age and gender (not temperature and saturation)
                component.push(this.getComponentFormat(key, form[key]));
            }
        }
        this.risks.forEach(risk => {
            if(risk.value){
                component.push(this.getComponentFormat(risk.code, 1))
            }
          });
          this.symptoms.forEach(symptom => {
            if(symptom.value){
                component.push(this.getComponentFormat(symptom.code, 1))
            }
          });
        
        return [
            {
                "subject": {
                    "reference": reference,
                    "display": reference 
                },
                "issued": date,
                "component": component
            }
        ];
    }
    private getComponentFormat(code: string, value: number){
        return {
            "valueQuantity": {
                "value": value
            },
            "code": {
                "coding": [
                    {
                        "code": code,
                        "display": code,
                        "system": "http://comunicare.io"
                    }
                ]
            }
        }
    }

    public toggleIsFormVisible(value: boolean){
      this.isFormVisibleSubject.next(value);
    }

}