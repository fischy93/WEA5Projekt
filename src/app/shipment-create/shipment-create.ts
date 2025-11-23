import { Component } from '@angular/core';
import { Address } from '../shared/address';
import { Parcel } from '../shared/parcel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Shipment } from '../shared/shipment';
import { Status } from '../shared/status';

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


  //dummy versant erzeugen 
  submitShipment() {
    this.errorMessage = null;

    if (!this.sender.addressIsComplete() ||
      !this.receiver.addressIsComplete() ||
      !this.parcel.parcelIsComplete()) {
      this.errorMessage = "Bitte alle Felder richtig ausfüllen";
      return;
    }



    this.createdShipment = new Shipment(
      1,
      this.sender,
      this.receiver,
      Status.Registered,
      this.parcel
    )
  }
}
