import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { VisualizeResultsPageRoutingModule } from './visualize-results-routing.module';
import { ChartsModule } from 'ng2-charts';
import { VisualizeResultsPage } from "./visualize-results.page";

@NgModule
({
  imports: 
  [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizeResultsPageRoutingModule,
    ChartsModule,
    HttpClientModule
  ],
  declarations: [VisualizeResultsPage]
})
export class VisualizeResultsPageModule {}
