import { Component, OnInit } from '@angular/core';
import { Contact } from '../shared/contact';
import { ContactType } from '../shared/contact-type';
import { CommonModule } from '@angular/common';
import { DummyContactService } from '../dummyData/dummy-contact';

@Component({
  selector: 'contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.html'
})
export class ContactList implements OnInit {

  contacts: Contact[] = [];

  constructor(private dummyContacts: DummyContactService) { }

  ngOnInit() {
    this.contacts = this.dummyContacts.getAll();
  }
}
