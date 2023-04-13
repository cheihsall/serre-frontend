import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HistoriqueComponent } from './historique/historique.component';
import { MapComponent } from './map/map.component';
import { SystemeComponent } from './systeme/systeme.component';

import {NgxPaginationModule} from 'ngx-pagination';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const config: SocketIoConfig= {
  url: 'http://localhost:3000',
  options: {
    transports: ['websocket']
  }
}

@NgModule({
  declarations: [
    AppComponent,
    FormulaireComponent,
    DashbordComponent,
    HistoriqueComponent,
    MapComponent,
    SystemeComponent,




  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
   ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
