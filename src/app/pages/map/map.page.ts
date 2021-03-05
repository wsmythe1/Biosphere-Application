import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  latitude: any;
  longitude: any;
  map: any;
  data: any;

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  constructor( private navCtrl: NavController, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
  }
  ionViewDidEnter()
  {
    this.setLocation();
  }
  submitLocation(controlDiv, map) {
    // Set CSS for the control border.
    const controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to submit your current location';
    controlDiv.appendChild(controlUI);
    // Set CSS for the control interior.
    const controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Submit Location';
    controlUI.appendChild(controlText);
    // Setup the click event listeners: user submits location.
    controlUI.addEventListener('click', () => {
      this.router.navigate(['/scenario-options']);
    });
  }

  setLocation() {
    this.route.queryParams.subscribe(params => {

      if (params && params.location)
      {
        this.data = JSON.parse(params.location);
      }
      // CHANGE LONG and LAT HERE
      // Get current location
      const location = new google.maps.LatLng(params.lat, params.lng);
      const options =
          {
            center: location,

            // CHANGE DEFAULT ZOOM HERE
            zoom: 6,

            mapTypeId: 'terrain',

            // Disable certain parts of the UI so user can't switch to street mode,
            // select the map type, or enter fullscreen mode
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: true,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
          };
      this.map = new google.maps.Map(this.mapRef.nativeElement, options);

      const areaOfInterest = new google.maps.Circle({
        center: location,
        // default radius, but the user can adjust in the app
        radius: 100000,
        editable: true,
        draggable: true,
        geodesic: false,
      });

      areaOfInterest.setMap(this.map);
      const centerControlDiv = document.createElement('div');
      this.submitLocation(centerControlDiv, this.map);
      this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
    });

  }
}
