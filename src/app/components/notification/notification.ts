import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Shipment } from '../../shared/shipment';
import { ShipmentService } from '../../services/shipment.service';
import { SessionService } from '../../services/session.service';
import { NotificationService } from '../../services/notification.service';
import { Address } from '../../shared/address';

@Component({
  selector: 'notification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notification.html',
})
export class Notification {

  tracking: Shipment = new Shipment();
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private notificationService: NotificationService,
    private sessionService: SessionService
  ) { this.tracking.receiverAddress = new Address("", "", 0, ""); };


  private validateInput(): { trackingId: string; zip: number; } | null {
    this.errorMessage = null;
    this.successMessage = null;

    if (!this.tracking.trackingId?.trim()) {
      this.errorMessage = "Bitte Trackingnummer eingeben";
      return null;
    }

    if (!this.tracking.receiverAddress?.zip) {
      this.errorMessage = "Bitte PLZ eingeben";
      return null;
    }

    return {
      trackingId: this.tracking.trackingId.trim(),
      zip: Number(this.tracking.receiverAddress.zip),

    };
  }

  trackingActivate() {
    const data = this.validateInput();
    if (!data) return;

    this.notificationService.AktivateNotification(data.trackingId, data.zip)
      .subscribe({
        next: () => {
          this.successMessage = "Benachrichtigungen aktiviert.";
        },
        error: () => {
          this.errorMessage = "Konnte Benachrichtigungen nicht aktivieren.";
        }
      });
  }

  trackingDeactivate() {
    const data = this.validateInput();
    if (!data) return;

    this.notificationService.DeaktivateNotification(data.trackingId, data.zip)
      .subscribe({
        next: () => {
          this.successMessage = "Benachrichtigungen deaktiviert.";
        },
        error: () => {
          this.errorMessage = "Konnte Benachrichtigungen nicht deaktivieren.";
        }
      });

  }

}
