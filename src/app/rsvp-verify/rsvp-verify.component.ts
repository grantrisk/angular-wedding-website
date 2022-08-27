import { Component, Input, OnInit } from '@angular/core';
import { Invitee } from '../rsvp/rsvp.component';

@Component({
  selector: 'app-rsvp-verify',
  templateUrl: './rsvp-verify.component.html',
  styleUrls: ['./rsvp-verify.component.css'],
})
export class RsvpVerifyComponent implements OnInit {
  @Input() invitee!: Invitee;
  attending: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  willAttendSwitch() {
    if(!this.attending){
      this.attending = !this.attending;
    }
  }

  willNotAttendSwitch() {
    if(this.attending){
      this.attending = !this.attending;
    }
  }
}
