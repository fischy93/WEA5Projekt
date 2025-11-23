import { Routes } from '@angular/router';

import { CustomerList } from './customer-list/customer-list';
import { ContactList } from './contact-list/contact-list';
import { ShipmentList } from './shipment-list/shipment-list';
import { PriceCalculator } from './price-calculator/price-calculator';
import { Tracking } from './tracking/tracking';
import { ShipmentCreate } from './shipment-create/shipment-create';
import { Status } from './status/status';

export const routes: Routes = [
    { path: 'customers', component: CustomerList },
    { path: 'contacts', component: ContactList },
    { path: 'shipments', component: ShipmentList },
    { path: 'price', component: PriceCalculator },
    { path: 'tracking', component: Tracking },
    { path: 'ship', component: ShipmentCreate },
    { path: 'status', component: Status },
];
