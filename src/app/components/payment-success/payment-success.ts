import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipmentService } from '../../services/shipment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'payment-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-success.html',
})
export class PaymentSuccess implements OnInit {

  shipment: any = null;

  constructor(private route: ActivatedRoute, private shipmentService: ShipmentService) { }

  ngOnInit() {
    // Werte aus localStorage holen
    const raw = localStorage.getItem("pendingShipment");
    if (!raw) return;

    const pending = JSON.parse(raw);

    const trackingId = pending.trackingId;
    const zip = pending.zip;

    if (!trackingId || !zip) return;

    // Shipment laden
    this.shipmentService
      .getByTrackingIdAndZip(trackingId, zip)
      .subscribe(res => {
        this.shipment = res;

        //  Eintrag löschen, weil nicht mehr benötigt
        localStorage.removeItem("pendingShipment");
      });
  }

  retryPayment() {
    if (!this.shipment?.paymentUrl) return;

    window.location.href = this.shipment.paymentUrl;
  }


}
