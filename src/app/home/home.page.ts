import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  onGoToCovidForm(){
    this.router.navigate(['/covid-form'])
  }

  toggleCard(){
    document.querySelector('.card').classList.toggle('is-flipped');
  }

}
