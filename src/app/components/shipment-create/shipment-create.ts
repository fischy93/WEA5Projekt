import { Component } from '@angular/core';
import { Address } from '../../shared/address';
import { Parcel } from '../../shared/parcel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Shipment } from '../../shared/shipment';
import { Status } from '../../shared/status';
import { SessionService } from '../../services/session.service';
import { ShipmentService } from '../../services/shipment.service';

@Component({
  selector: 'shipment-create',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './shipment-create.html',
})
export class ShipmentCreate {

  sender: Address = new Address();
  receiver: Address = new Address();
  parcel: Parcel = new Parcel();
  errorMessage: string | null = null;

  createdShipment: Shipment | null = null;

  constructor(
    private shipmentService: ShipmentService,
    private sessionService: SessionService
  ) { }

  submitShipment() {
    this.errorMessage = null;

    // Eingabevalidierung
    if (!this.sender.addressIsComplete() ||
      !this.receiver.addressIsComplete() ||
      !this.parcel.parcelIsComplete()) {
      this.errorMessage = "Bitte alle Felder richtig ausfüllen";
      return;
    }

    // Request-Body für Backend 
    const body = {
      senderAddress: this.sender,
      receiverAddress: this.receiver,
      parcel: this.parcel,
      customerId: this.sessionService.customerId,
      notificationsEnabled: false
    };

    // POST an Backend
    this.shipmentService.create(body as any).subscribe({
      next: (res) => {
        this.createdShipment = res; // Backend antwortet mit Shipment
      },
      error: () => {
        this.errorMessage = "Fehler beim Anlegen der Sendung.";
      }
    });
  }
}
