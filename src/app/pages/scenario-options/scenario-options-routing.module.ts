import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScenarioOptionsPage } from './scenario-options.page';

const routes: Routes = [
  {
    path: '',
    component: ScenarioOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScenarioOptionsPageRoutingModule {}
