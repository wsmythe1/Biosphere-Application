import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-scenario-options',
  templateUrl: './scenario-options.page.html',
  styleUrls: ['./scenario-options.page.scss'],
})
export class ScenarioOptionsPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  runSimulation() {
    this.navCtrl.navigateForward('/visualize-results');
  }

}
