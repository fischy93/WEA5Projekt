import { Component, OnInit, inject } from '@angular/core';
import { Customer } from '../../shared/customer';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'customer-list',
  standalone: true,
  templateUrl: './customer-list.html'
})
export class CustomerList implements OnInit {

  private customerService = inject(CustomerService);
  private route = inject(ActivatedRoute);



  customers: Customer[] = [];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // EINZELN
      this.customerService.getById(Number(id)).subscribe({
        next: c => this.customers = c ? [c] : []
      });
    } else {
      // ALLE
      this.customerService.getAll().subscribe({
        next: cs => this.customers = cs ?? []
      });
    }
  }
}
