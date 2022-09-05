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
import { Observable } from 'rxjs';

export interface Invitee {
  docId?: string;
  fname: string;
  lname: string;
  group_name: string;
  rsvped: boolean;
  attending: boolean;
  meal_otion?: MealOption;
}

export enum MealOption {
  chicken,
  beef,
  vegeterian,
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
  // TODO: REMOVE
  invitee$: Observable<Invitee[]>;
  searchedInvitees: Invitee[];
  firestore: Firestore;
  sent_invitee: Invitee;
  this_is_me: boolean = false;
  inviteeArray: Invitee[];

  constructor(private fb: FormBuilder, firestore: Firestore) {
    this.firestore = firestore;
    this.myCollection = collection(firestore, Constants.invitees_collection);
    this.invitee$ = collectionData(this.myCollection) as Observable<Invitee[]>;
    // TODO: remove this object
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
    // this.searchedInvitees = new Array({
    //   fname: 'Grant',
    //   lname: 'Risk',
    //   group_name: 'Group1',
    //   attending: true,
    //   rsvped: false,
    // });
    // // TODO: fix this.sent_invitee
    // this.sent_invitee = {
    //   fname: 'Grant',
    //   lname: 'Risk',
    //   group_name: 'Group1',
    //   attending: true,
    //   rsvped: false,
    // };
    // this.inviteeArray = new Array(
    //   {
    //     fname: 'Aidan',
    //     lname: 'Boman',
    //     group_name: 'Group1',
    //     attending: true,
    //     rsvped: false,
    //   },
    //   {
    //     fname: 'Emma',
    //     lname: 'Shipmaster',
    //     group_name: 'Group1',
    //     attending: true,
    //     rsvped: true,
    //   }
    // );
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
    if (this.searchedInvitees.length > 0) {
      console.log('Found Some!');
    } else {
      console.log('Huh?');
    }
  }

  delete() {
    console.log('Deleted!');
    const id = 'FjJ9i45OLRsE9F0bOnkE';
    const inviteeDocumentReference = doc(
      this.firestore,
      `${Constants.invitees_collection}/${id}`
    );
    const result = deleteDoc(inviteeDocumentReference);
    console.log(result);
    return result;
  }

  create() {
    console.log(this.customForm);
    console.log('Saved: ' + JSON.stringify(this.customForm.value));

    const first_name = this.customForm.value.fname;
    const last_name = this.customForm.value.lname;

    const test_invitee: Invitee = {
      fname: first_name,
      lname: last_name,
      group_name: 'Group2',
      attending: true,
      rsvped: false,
    };

    addDoc(this.myCollection, test_invitee);

    console.log('Submitted Invitee');
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
      console.log(doc.id);
      console.log(typeof doc.id);
    });
  }
}
