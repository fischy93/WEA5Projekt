import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { DummyShipmentService } from '../dummyData/dummy-shipment';
import { Shipment } from '../../shared/shipment';
import { ShipmentStatusEntry } from '../../shared/shipment-status-entry';

@Component({
  selector: 'statistics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './statistics.html'
})
export class Statistics implements OnInit {

  shipments: Shipment[] = [];

  selectedRange: string = 'week';

  chart: Chart | null = null;

  constructor(private dummy: DummyShipmentService) { }

  ngOnInit() {
    this.shipments = this.dummy.getAll();
    this.renderChart();
  }

  // Datum aus dem letzten History-Eintrag (echtes Shipment-Datum)
  private getShipmentDate(s: Shipment): Date {
    const history = s.history as ShipmentStatusEntry[];

    if (!history || history.length === 0)
      return new Date(0);   // "sehr alt" fällt aus jedem Filter raus

    const last = history[history.length - 1];

    // falls timestamp evtl. als string ankommt
    return new Date(last.timestamp);
  }

  // Zeitraum-Filter: Woche / Monat / Jahr
  private getFilteredShipments(): Shipment[] {
    const now = new Date();
    let days = 7;

    switch (this.selectedRange) {
      case "week":
        days = 7;
        break;
      case "month":
        days = 30;
        break;
      case "year":
        days = 365;
        break;
    }

    const threshold = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    return this.shipments.filter(s => {
      const d = this.getShipmentDate(s);
      return d >= threshold;
    });
  }

  // Chart bauen
  private renderChart() {
    if (this.chart) this.chart.destroy();

    const filtered = this.getFilteredShipments();

    // Status laut deinem Enum:
    // 0 = Registered
    // 1 = PackageInTransit
    // 2 = Received
    const registered = filtered.filter(s => s.status === 0).length;
    const inTransit = filtered.filter(s => s.status === 1).length;
    const delivered = filtered.filter(s => s.status === 2).length;

    this.chart = new Chart('statsChart', {
      type: 'doughnut',
      data: {
        labels: [
          'Registriert',
          'In Zustellung',
          'Zugestellt'
        ],
        datasets: [{
          label: 'Status der Pakete',
          data: [registered, inTransit, delivered],
          backgroundColor: [
            '#3924c2ff',  // blau – registriert
            '#fbbd08',  // gelb – in Zustellung
            '#21ba45'   // grün – zugestellt
          ]
        }]
      },
      options: {
        plugins: {
          legend: { display: true }
        }
      }
    });
  }

  onRangeChange() {
    this.renderChart();
  }
}
