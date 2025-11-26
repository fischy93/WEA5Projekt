import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Contact } from '../../shared/contact';
import { ContactType } from '../../shared/contact-type';
import { ContactList } from './contact-list/contact-list';
import { ContactService } from '../../services/contact.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'contact-management',
  standalone: true,
  templateUrl: './contact-managment.html',
  imports: [CommonModule, FormsModule, ContactList]
})
export class ContactManagement implements OnInit {
  constructor(
    private contactService: ContactService,
    private session: SessionService
  ) { }


  customerId: number = 0;

  // Enum für Template
  ContactType = ContactType;

  // Für Dropdown
  contactTypes = Object.keys(ContactType)
    .filter(k => isNaN(Number(k)))
    .map(k => ({
      label: k,
      value: ContactType[k as keyof typeof ContactType]
    }));

  contacts: Contact[] = [];
  newContact: Contact = new Contact();
  error: string | null = null;  // hinzugefügt


  ngOnInit() {
    const interval = setInterval(() => {
      if (this.session.customerId > 0) {
        this.customerId = this.session.customerId;
        this.loadContacts();
        clearInterval(interval);
      }
    }, 100);
  }





  loadContacts() {
    this.error = null;

    this.contactService.getAllForCustomer(this.customerId).subscribe(res => {
      if (!res) {
        this.error = 'Laden fehlgeschlagen';
        return;
      }

      this.contacts = res;
    });
  }

  addContact() {
    this.error = null;

    // CustomerID setzen
    this.newContact.customerID = this.customerId;

    if (!this.newContact.data || this.newContact.cType === undefined) {
      this.error = 'Bitte gültige Kontaktinformationen eingeben';
      return;
    }

    this.contactService.create(this.newContact).subscribe(res => {
      if (!res) {
        this.error = 'Speichern fehlgeschlagen';
        return;
      }

      // sofort lokal hinzufügen → kein Reload nötig
      this.contacts.push(res);

      // neu initialisieren
      this.newContact = new Contact();
    });
  }

  deleteContact(id: number) {
    this.error = null;

    this.contactService.delete(id).subscribe(() => {
      this.loadContacts();
    });
  }


}
