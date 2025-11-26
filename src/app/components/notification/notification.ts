import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Shipment } from '../../shared/shipment';
import { ShipmentService } from '../../services/shipment.service';
import { SessionService } from '../../services/session.service';

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
    private shipmentService: ShipmentService,
    private sessionService: SessionService
  ) { }

  private validateInput(): { trackingId: string; zip: number; customerId: number } | null {
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
      customerId: this.sessionService.customerId
    };
  }

  trackingActivate() {
    const data = this.validateInput();
    if (!data) return;

    this.shipmentService.toggleNotifications(
      data.trackingId,
      data.zip,
      data.customerId,
      true
    ).subscribe(res => {
      if (!res) {
        this.errorMessage = "Konnte Benachrichtigungen nicht aktivieren.";
        return;
      }

      // WICHTIG: Zustand aus Backend setzen
      this.tracking.notificationsEnabled = res.notificationsEnabled;

      this.successMessage = "Benachrichtigungen aktiviert.";
    });
  }

  trackingDeactivate() {
    const data = this.validateInput();
    if (!data) return;

    this.shipmentService.toggleNotifications(
      data.trackingId,
      data.zip,
      data.customerId,
      false
    ).subscribe(res => {
      if (!res) {
        this.errorMessage = "Konnte Benachrichtigungen nicht deaktivieren.";
        return;
      }

      // WICHTIG: Zustand aus Backend setzen
      this.tracking.notificationsEnabled = res.notificationsEnabled;

      this.successMessage = "Benachrichtigungen deaktiviert.";
    });
  }

}
