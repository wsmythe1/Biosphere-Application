import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisualizeResultsPage } from './visualize-results.page';

describe('VisualizeResultsPage', () => {
  let component: VisualizeResultsPage;
  let fixture: ComponentFixture<VisualizeResultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizeResultsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizeResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
