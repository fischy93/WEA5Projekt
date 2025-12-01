import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Shipment } from '../../shared/shipment';
import { ShipmentStatusEntry } from '../../shared/shipment-status-entry';
import { Status as ShipmentStatus } from '../../shared/status'
import { SessionService } from '../../services/session.service';
import { ShipmentService } from '../../services/shipment.service';

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

  constructor(
    private shipmentService: ShipmentService,
    private sessionService: SessionService
  ) { }

  checkStatus() {
    this.errorMessage = null;
    this.result = null;
    this.history = [];

    // 1) Validierung
    if (!this.tracking.trackingId) {
      this.errorMessage = "Bitte Trackingnummer eingeben";
      return;
    }

    if (!this.tracking.receiverAddress?.zip) {
      this.errorMessage = "Bitte PLZ eingeben";
      return;
    }

    const trackingId = this.tracking.trackingId;
    const zip = Number(this.tracking.receiverAddress.zip);

    // 2) Backend-Request
    this.shipmentService
      .getByTrackingIdAndZip(trackingId, zip)
      .subscribe(result => {
        if (!result) {
          this.errorMessage = "Sendung nicht gefunden";
          return;
        }

        // 3) Backend-Daten übernehmen
        this.result = result;
        this.history = result.history ?? [];
      });
  }

}
