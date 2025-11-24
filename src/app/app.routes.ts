import { Routes } from '@angular/router';

import { PriceCalculator } from './price-calculator/price-calculator';
import { ShipmentCreate } from './shipment-create/shipment-create';
import { Status } from './status/status';
import { ContactManagement } from './contact-managment/contact-managment';
import { Notification } from './notification/notification';

export const routes: Routes = [
    { path: '', redirectTo: 'price', pathMatch: 'full' },
    { path: 'price', component: PriceCalculator },
    { path: 'shipment-create', component: ShipmentCreate },
    { path: 'tracking', component: Status },
    { path: 'contacts', component: ContactManagement },
    { path: 'notification', component: Notification },

    // Für Webserver, die index.html anhängen:
    {
        path: 'index.html',
        redirectTo: 'price',
        pathMatch: 'full'
    }
];
