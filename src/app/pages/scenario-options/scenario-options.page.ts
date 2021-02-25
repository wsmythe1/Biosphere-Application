import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../../modals/test-modal/test-modal.component';

@Component({
  selector: 'app-scenario-options',
  templateUrl: './scenario-options.page.html',
  styleUrls: ['./scenario-options.page.scss'],
})
export class ScenarioOptionsPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  animal: string;
  name: string;

  private setScenario(scenarioType: string) {
    console.log("scenariotype: ", scenarioType);
    this.openModal();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent
    });
    return await modal.present();
  }

}

