import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    ) { }

  ngOnInit() {
  }

  private runSimulation() {
    this.modalCtrl.dismiss();
    this.navCtrl.navigateForward('/visualize-results');
  }

}
