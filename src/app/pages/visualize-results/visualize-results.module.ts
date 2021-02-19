import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VisualizeResultsPageRoutingModule } from './visualize-results-routing.module';
import { VisualizeResultsPage } from './visualize-results.page';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizeResultsPageRoutingModule,
    ChartsModule
  ],
  declarations: [VisualizeResultsPage]
})
export class VisualizeResultsPageModule {}
