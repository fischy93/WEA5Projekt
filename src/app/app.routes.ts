import { Routes } from '@angular/router';

import { PriceCalculator } from './components/price-calculator/price-calculator';
import { ShipmentCreate } from './components/shipment-create/shipment-create';
import { Status } from './components/status/status';
import { ContactManagement } from './components/contact-managment/contact-managment';
import { Notification } from './components/notification/notification';
import { Statistics } from './components/statistics/statistics';
import { AuthComponent } from './components/auth/auth'
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'price', pathMatch: 'full' },

    { path: 'auth', component: AuthComponent },

    { path: 'price', component: PriceCalculator, },
    { path: 'shipment-create', component: ShipmentCreate, canActivate: [AuthGuard] },
    { path: 'tracking', component: Status, canActivate: [AuthGuard] },
    { path: 'contacts', component: ContactManagement, canActivate: [AuthGuard] },
    { path: 'notification', component: Notification, canActivate: [AuthGuard] },
    { path: 'stats', component: Statistics, canActivate: [AuthGuard] },

    { path: 'index.html', redirectTo: 'price', pathMatch: 'full' }
];


