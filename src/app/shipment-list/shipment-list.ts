import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shipment } from '../shared/shipment';
import { DummyShipmentService } from '../dummyData/dummy-shipment';

@Component({
  selector: 'shipment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shipment-list.html'
})
export class ShipmentList {

  shipments: Shipment[] = [];

  constructor(private dummy: DummyShipmentService) {
    this.shipments = this.dummy.getAll();
  }

}
