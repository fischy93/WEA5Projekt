import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Contact } from '../shared/contact';
import { ContactType } from '../shared/contact-type';
import { DummyContactService } from '../dummyData/dummy-contact';

import { ContactList } from './contact-list/contact-list';

@Component({
  selector: 'contact-management',
  standalone: true,
  templateUrl: './contact-managment.html',
  imports: [CommonModule, FormsModule, ContactList]
})
export class ContactManagement implements OnInit {

  // Enum im Template nutzbar machen
  ContactType = ContactType;

  // Hier hielfe durch ChatGpt (contactTypes)  da ich es mit den darstellungen von briefumschlag und telefon nicht geschaft hätte
  // Enum -> Liste aus { label, value }
  contactTypes = Object.keys(ContactType)
    .filter(k => isNaN(Number(k)))        // nur Texte ("Email", "Phone")
    .map(k => ({
      label: k,
      value: ContactType[k as keyof typeof ContactType]
    }));

  contacts: Contact[] = [];
  newContact: Contact = new Contact();

  constructor(private dummy: DummyContactService) { }

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.contacts = this.dummy.getAll();
  }

  addContact() {
    if (!this.newContact.data || this.newContact.cType === undefined) {
      return;
    }

    this.dummy.add(this.newContact);
    this.newContact = new Contact();
    this.loadContacts();
  }

  deleteContact(id: number) {
    this.dummy.delete(id);
    this.loadContacts();
  }
}
