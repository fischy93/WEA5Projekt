import { Routes } from '@angular/router';

import { CustomerList } from './customer-list/customer-list';
import { ContactList } from './contact-managment/contact-list/contact-list';
import { ShipmentList } from './shipment-list/shipment-list';
import { PriceCalculator } from './price-calculator/price-calculator';
import { ShipmentCreate } from './shipment-create/shipment-create';
import { Status } from './status/status';
import { ContactManagement } from './contact-managment/contact-managment';

export const routes: Routes = [
    { path: 'customers', component: CustomerList },
    { path: 'contacts', component: ContactList },
    { path: 'shipments', component: ShipmentList },
    { path: 'price', component: PriceCalculator },
    { path: 'ship', component: ShipmentCreate },
    { path: 'status', component: Status },
    { path: 'contactManager', component: ContactManagement }
];
