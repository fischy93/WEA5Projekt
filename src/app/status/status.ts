import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Shipment } from '../shared/shipment';
import { Address } from '../shared/address';

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

  // DUMMY DATA
  dummyShipments: Shipment[] = [
    {
      trackingId: "abcd123456",
      receiverAddress: {
        zip: 4222,
        city: "Teststadt",
        street: "Hauptstraße",
        houseNumber: "1"
      }
    } as Shipment
  ];

  checkStatus() {
    this.errorMessage = null;
    this.result = null;

    // 1. Trackingnummer prüfen
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

    // 2. PLZ prüfen (Receiver muss existieren!)
    if (!this.tracking.receiverAddress?.zip) {
      this.errorMessage = "Bitte PLZ eingeben";
      return;
    }

    if (Number(found.receiverAddress!.zip) !== Number(this.tracking.receiverAddress!.zip)) {
      this.errorMessage = "PLZ stimmt nicht überein";
      return;
    }

    // 3. Erfolg
    this.result = found;
  }
}
