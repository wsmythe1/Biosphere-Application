import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-location-options',
  templateUrl: './location-options.page.html',
  styleUrls: ['./location-options.page.scss'],
})
export class LocationOptionsPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  openMap() {
    this.navCtrl.navigateForward('/map');
  }

  useDeviceLocation() {
    // set location stuff here (most-liekly to globabl variables)
    this.navCtrl.navigateForward('/scenario-options');
  }


}
