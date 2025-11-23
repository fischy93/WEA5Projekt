import { Component } from '@angular/core';
import { Customer } from '../shared/customer';

@Component({
  selector: 'customer-list',
  standalone: true,
  templateUrl: './customer-list.html'
})
export class CustomerList {
  customers: Customer[] = [
    new Customer(1, 'Max', 'Mustermann', "maxiMuster"),
    new Customer(2, 'Anna', 'Berger', "Annanas"),
    new Customer(3, 'Lukas', 'Gruber', "Lukas1234")
  ];
}
