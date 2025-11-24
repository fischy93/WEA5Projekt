import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Shipment } from '../shared/shipment';
import { DummyShipmentService } from '../dummyData/dummy-shipment';

@Component({
  selector: 'notification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notification.html',
})
export class Notification {
  tracking: Shipment = new Shipment();   // User-Eingabe landet hier
  errorMessage: string | null = null;

  dummyShipments: Shipment[] = [];

  constructor(private dummy: DummyShipmentService) {
    this.dummyShipments = this.dummy.getAll();
  }

  private checkInputAndLoadShipment(): Shipment | null {
    this.errorMessage = null;

    const inputTrackingId = this.tracking.trackingId?.trim();
    const inputZip = this.tracking.receiverAddress?.zip;

    if (!inputTrackingId) {
      this.errorMessage = "Bitte Trackingnummer eingeben";
      return null;
    }

    if (!inputZip) {
      this.errorMessage = "Bitte PLZ eingeben";
      return null;
    }

    const found = this.dummyShipments.find(
      s => s.trackingId === inputTrackingId
    );

    if (!found) {
      this.errorMessage = "Trackingnummer nicht gefunden";
      return null;
    }

    const userZip = Number(inputZip);
    const realZip = Number(found.receiverAddress?.zip);

    if (userZip !== realZip) {
      this.errorMessage = "PLZ stimmt nicht überein";
      return null;
    }

    // wichtig: jetzt das echte Shipment fürs UI übernehmen
    this.tracking = found;
    return found;
  }

  trackingAktivate() {
    const s = this.checkInputAndLoadShipment();
    if (!s) return;

    this.tracking.notificationsEnabled = true;
  }

  trackingDeactivate() {
    const s = this.checkInputAndLoadShipment();
    if (!s) return;

    this.tracking.notificationsEnabled = false;
  }
}
