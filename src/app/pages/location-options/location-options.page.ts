import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Router} from '@angular/router';
import {NavigationExtras} from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-location-options',
  templateUrl: './location-options.page.html',
  styleUrls: ['./location-options.page.scss'],
})
export class LocationOptionsPage implements OnInit {
  lat: any = 0;
  lng: any = 0;
  curlocation: any;
  constructor( private navCtrl: NavController, private geolocation: Geolocation, private router: Router) {

  }

  ngOnInit() {
  }

  openMap() {
    this.geolocation.getCurrentPosition().then(
        (location) => {
          this.lat = location.coords.latitude

          this.lng = location.coords.longitude

          this.curlocation =
              {
                lat: this.lat,
                lng: this.lng
              };

          console.log(this.curlocation.lat);
          console.log(this.curlocation.lng);

          const navigationExtras: NavigationExtras =
              {
                queryParams:
                    {
                      lat: this.lat,
                      lng: this.lng
                    }
              }
          console.log(navigationExtras);
          this.router.navigate(['/map'], navigationExtras);

        }, er =>
        {alert('Error: Please turn on Location Access and try again.'); }).catch((error) => alert('error'));
    /*this.navCtrl.navigateForward('/map');*/
  }

  useDeviceLocation() {
    // set location stuff here (most-liekly to globabl variables)
    this.navCtrl.navigateForward('/scenario-options');
  }


}
