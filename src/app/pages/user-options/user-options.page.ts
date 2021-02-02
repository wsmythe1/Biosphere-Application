import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.page.html',
  styleUrls: ['./user-options.page.scss'],
})
export class UserOptionsPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  setUser(userType: string) {
    console.log("userType: ", userType);
    // set global variable for user type....we'll figure this out later
    this.navCtrl.navigateForward('/location-options');
  }

}
