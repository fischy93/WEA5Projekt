import { Injectable } from '@angular/core';
import { Shipment } from '../shared/shipment';
import { Address } from '../shared/address';
import { Parcel } from '../shared/parcel';
import { Status } from '../shared/status';
import { ShipmentStatusEntry } from '../shared/shipment-status-entry';

@Injectable({
  providedIn: 'root'
})
export class DummyShipmentService {

  shipments: Shipment[] = [

    new Shipment(
      1,
      new Address("Softwarepark", "11", 4232, "Hagenberg"),
      new Address("Hauptplatz", "13", 4020, "Linz"),
      Status.Registered,
      new Parcel(32, 20, 14, 1.2),
      9.90,
      "ABC123456",
      [
        new ShipmentStatusEntry("2025-01-01 10:00", Status.Registered),
        new ShipmentStatusEntry("2025-01-02 09:15", Status.Received, "Linz Verteilzentrum"),
        new ShipmentStatusEntry("2025-01-02 12:30", Status.PackageInTransit, "Linz"),
      ]
    ),

    new Shipment(
      2,
      new Address("Herrengasse", "4", 8010, "Graz"),
      new Address("Bindergasse", "7", 4020, "Linz"),
      Status.Received,
      new Parcel(20, 10, 10, 0.8),
      7.50,
      "XYZ987654",
      [
        new ShipmentStatusEntry("2025-02-10 08:00", Status.Registered),
        new ShipmentStatusEntry("2025-02-11 06:40", Status.Received, "Linz Filiale"),
      ]
    ),

    new Shipment(
      3,
      new Address("Herrengasse", "4", 8010, "Graz"),
      new Address("Bindergasse", "7", 4020, "Linz"),
      Status.PackageInTransit,
      new Parcel(20, 10, 10, 0.8),
      7.50,
      "ABCD123456",
      [
        new ShipmentStatusEntry("2025-10-30 08:00", Status.Registered),
        new ShipmentStatusEntry("2025-11-18 06:40", Status.PackageInTransit, "Linz Filiale"),
      ]
    )

  ];

  getAll(): Shipment[] {
    return this.shipments;
  }

  findByTracking(trackingId: string): Shipment | undefined {
    return this.shipments.find(s => s.trackingId === trackingId);
  }
}
