import { Injectable } from '@angular/core';
import { Contact } from '../../shared/contact';
import { ContactType } from '../../shared/contact-type';

@Injectable({
  providedIn: 'root',
})
export class DummyContactService {

  private contacts: Contact[] = [
    new Contact(1, 1, ContactType.Email, 'max.mustermann@fh.at'),
    new Contact(2, 1, ContactType.Phone, '0664 1234567'),
    new Contact(3, 2, ContactType.Email, 'anna.berger@fh.at'),
    new Contact(4, 3, ContactType.Phone, '07742 55555')
  ];

  private nextId = 5;

  /** Alle Kontakte des aktuellen Users laden */
  getAll(): Contact[] {
    return [...this.contacts];
  }

  /** Kontakte nach User ID */
  getByUserId(userId: number): Contact[] {
    return this.contacts.filter(c => c.customerID === userId);
  }

  /** Einzelkontakt holen */
  getById(id: number): Contact | undefined {
    return this.contacts.find(c => c.id === id);
  }

  /** Kontakt hinzufügen */
  add(contact: Contact): void {
    contact.id = this.nextId++;
    // FÜR PROJEKT: später muss customerID = loggedInUser kommen
    contact.customerID = 1;

    this.contacts.push(contact);
  }

  /** Kontakt löschen */
  delete(id: number): void {
    this.contacts = this.contacts.filter(c => c.id !== id);
  }
}
