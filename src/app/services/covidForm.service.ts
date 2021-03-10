import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CovidFormService{
    constructor(private httpClient: HttpClient){}

    postForm(data: Array<any>){
        this.httpClient
        .request('POST', 'https://canalytics.comunicare.io/api/predictionHospitalizationCovidFhir',{
            body: JSON.stringify(data),
        })
        .subscribe(
            response => {
                console.log(response)
            },
        )
    }

    formatToFhir(form: object, risks: Array<any>, symptoms: Array<any> ){
        let reference = "Pestiaux_Tristan_Challenge"
        let date = new Date().toLocaleDateString('fr-FR');
        let component= [];

        for(let key in form){
            if(form[key] == "age" || form[key] == 'sexe'){  //backend only uses age and gender (not temperature and saturation)
                component.push(this.getComponentFormat(key, form[key]));
            }
        }
        risks.forEach(risk => {
            if(risk.value){
                component.push(this.getComponentFormat(risk.code, 1))
            }
          });
          symptoms.forEach(symptom => {
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
    getComponentFormat(code: string, value: number){
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

}