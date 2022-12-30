import { Component, OnInit } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getDocs,
  query,
  where
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

export interface Invitee {
  docId?: string;
  fname: string;
  lname: string;
  group_name: string;
  rsvped: boolean;
  attending: boolean;
}

export enum Constants {
  invitees_collection = 'invitees',
}

@Component({
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css'],
})
export class RsvpComponent implements OnInit {
  customForm!: FormGroup;
  private myCollection: CollectionReference<DocumentData>;
  invitee$: Observable<Invitee[]>;
  searchedInvitees: Invitee[];
  firestore: Firestore;
  sent_invitee: Invitee;
  this_is_me: boolean = false;
  inviteeArray: Invitee[];

  constructor(
    private fb: FormBuilder,
    firestore: Firestore,
    private titleService: Title
  ) {
    this.titleService.setTitle('RSVP | M&G Wedding');
    this.firestore = firestore;
    this.myCollection = collection(firestore, Constants.invitees_collection);
    this.invitee$ = collectionData(this.myCollection) as Observable<Invitee[]>;
    this.searchedInvitees = new Array();
    this.inviteeArray = new Array();
    this.sent_invitee = {
      docId: '',
      fname: '',
      lname: '',
      group_name: '',
      attending: true,
      rsvped: false,
    };
  }

  ngOnInit(): void {
    this.customForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
    });
  }

  async search() {
    this.searchedInvitees = []; // To remove any previous searches
    const first_name = this.customForm.value.fname;
    const last_name = this.customForm.value.lname;

    const q = query(
      collection(this.firestore, Constants.invitees_collection),
      where('fname', '==', first_name),
      where('lname', '==', last_name)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const foundInvitee = doc.data() as Invitee;
      this.searchedInvitees.push(foundInvitee);
    });
    if (this.searchedInvitees.length <= 0) {
      alert("Hmmm ... Could not find this name. Want to try again?")
    }
  }

  async setInvitee(invitee: Invitee) {
    this.sent_invitee = invitee;
    this.this_is_me = !this.this_is_me;

    this.inviteeArray = []; // To remove any previous searches

    const q = query(
      collection(this.firestore, Constants.invitees_collection),
      where('group_name', '==', invitee.group_name)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const foundInvitee = doc.data() as Invitee;
      foundInvitee.docId = doc.id;
      this.inviteeArray.push(foundInvitee);
    });
  }
}
