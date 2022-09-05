import { Component, Input, OnInit } from '@angular/core';
import {
  doc, Firestore,
  updateDoc
} from '@angular/fire/firestore';
import { Constants, Invitee } from '../rsvp/rsvp.component';

@Component({
  selector: 'app-rsvp-verify',
  templateUrl: './rsvp-verify.component.html',
  styleUrls: ['./rsvp-verify.component.css'],
})
export class RsvpVerifyComponent implements OnInit {
  @Input() invitee!: Invitee;
  @Input() inviteeArray!: Invitee[];
  firestore: Firestore;

  constructor(firestore: Firestore) {
    this.firestore = firestore;
  }

  ngOnInit(): void {}

  attendSwitch(state: boolean, invitee: Invitee) {
    if (!state && invitee.attending) {
      invitee.attending = !invitee.attending;
    }
    if (state && !invitee.attending) {
      invitee.attending = !invitee.attending;
    }
  }

  submitForm() {
    this.inviteeArray.forEach((value) => {
      const person: Invitee = value;
      person.rsvped = true;
      const personDocRef = doc(
        this.firestore,
        `${Constants.invitees_collection}/${person.docId}`
      );
      updateDoc(personDocRef, {rsvped: person.rsvped, attending: person.attending});
      console.log(JSON.stringify(person));
    });
  }
}
