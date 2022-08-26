import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

// export interface Invitee {
//   fname: string;
//   lname: string;
// }

// TODO: REMOVE
export interface Item { name: string; }

@Component({
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css'],
})
export class RsvpComponent implements OnInit {
  customForm!: FormGroup;

  // TODO: REMOVE
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit(): void {
    this.customForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
    });
  }

  // TODO: REMOVE
  item: Item = {
    name: "Grant James Risk"
  }
  save() {
    console.log(this.customForm);
    console.log('Saved: ' + JSON.stringify(this.customForm.value));
    this.itemsCollection.add(this.item);
    console.log("Submitted Item")
  }
}
