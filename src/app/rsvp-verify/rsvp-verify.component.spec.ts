import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpVerifyComponent } from './rsvp-verify.component';

describe('RsvpVerifyComponent', () => {
  let component: RsvpVerifyComponent;
  let fixture: ComponentFixture<RsvpVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RsvpVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RsvpVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
