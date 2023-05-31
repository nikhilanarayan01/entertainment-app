import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { InformationPage } from './information.page';

describe('InformationPage', () => {
  let component: InformationPage;
  let fixture: ComponentFixture<InformationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
