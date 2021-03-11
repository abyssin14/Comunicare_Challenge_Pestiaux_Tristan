import { Component } from '@angular/core';
import { CovidFormService } from './services/covidForm.service'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [CovidFormService]
})
export class AppComponent {
  constructor() {}
}
