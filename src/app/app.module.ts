import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { HomePage } from './home/home.page';
import { CovidFormComponent } from './components/covidForm.component'

@NgModule({
  declarations: [AppComponent, HomePage, CovidFormComponent],
  entryComponents: [],
  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      RouterModule.forRoot([
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: HomePage}
      ]),
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
