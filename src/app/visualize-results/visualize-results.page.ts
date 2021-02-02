import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-visualize-results',
  templateUrl: './visualize-results.page.html',
  styleUrls: ['./visualize-results.page.scss'],
})
export class VisualizeResultsPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }


  backToOptions() {
    this.navCtrl.navigateForward('/scenario-options');
  }
}
