import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewProgramPage } from './view-program.page';

describe('ViewProgramPage', () => {
  let component: ViewProgramPage;
  let fixture: ComponentFixture<ViewProgramPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProgramPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewProgramPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
