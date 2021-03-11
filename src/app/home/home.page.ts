import { Component, OnInit } from '@angular/core';
import { CovidFormService } from '../services/covidForm.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  constructor(private covidFormService: CovidFormService){}
  isFormVisible: boolean = true;
  ngOnInit(){
    this.covidFormService.isFormVisibleSubject.subscribe(value=>{
      this.isFormVisible=value
    })
  }

}
