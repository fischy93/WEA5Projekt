import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Shipment } from '../shared/shipment';
import { DummyShipmentService } from '../dummyData/dummy-shipment';
import { ShipmentStatusEntry } from '../shared/shipment-status-entry';
import { Status as ShipmentStatus } from '../shared/status'

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './status.html',
})
export class Status {

  tracking: Shipment = new Shipment();
  errorMessage: string | null = null;
  result: Shipment | null = null;
  history: ShipmentStatusEntry[] = [];
  ShipmentStatus = ShipmentStatus;

  dummyShipments: Shipment[] = [];

  constructor(private dummy: DummyShipmentService) {
    // Dummy-Daten laden
    this.dummyShipments = this.dummy.getAll();
  }

  checkStatus() {
    this.errorMessage = null;
    this.result = null;

    if (!this.tracking.trackingId) {
      this.errorMessage = "Bitte Trackingnummer eingeben";
      return;
    }

    const found = this.dummyShipments.find(
      s => s.trackingId === this.tracking.trackingId
    );

    if (!found) {
      this.errorMessage = "Trackingnummer nicht gefunden";
      return;
    }

    if (!this.tracking.receiverAddress?.zip) {
      this.errorMessage = "Bitte PLZ eingeben";
      return;
    }

    const userZip = Number(this.tracking.receiverAddress.zip);
    const realZip = Number(found.receiverAddress!.zip);

    if (userZip !== realZip) {
      this.errorMessage = "PLZ stimmt nicht überein";
      return;
    }
    this.history = found.history;
    this.result = found;

  }
}
