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
    const trackingId = this.route.snapshot.queryParamMap.get('trackingId');
    const zip = this.route.snapshot.queryParamMap.get('zip');  // falls du es brauchst

    if (!trackingId || !zip) return;

    this.shipmentService.getByTrackingIdAndZip(trackingId, Number(zip))
      .subscribe(res => this.shipment = res);
  }
}
