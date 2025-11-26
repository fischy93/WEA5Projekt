import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../../shared/contact';
import { ContactType } from '../../../shared/contact-type';


@Component({
  selector: 'contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.html'
})
export class ContactList {
  ContactType = ContactType;

  @Input() contacts: Contact[] = [];
  @Output() deleteContact = new EventEmitter<number>();

  onDelete(id: number) {
    this.deleteContact.emit(id);
  }
}
