import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PriceCalculatorService } from '../../services/price-calculator.service';
import { Parcel } from '../../shared/parcel';

@Component({
  selector: 'price-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './price-calculator.html'
})
export class PriceCalculator {

  length: number | null = null;
  width: number | null = null;
  height: number | null = null;
  weight: number | null = null;


  price: number | null = null;
  errorMessage: string | null = null;

  constructor(private priceService: PriceCalculatorService) { }

  calculatePrice(event: Event) {
    event.preventDefault();

    this.errorMessage = null;
    this.price = null;

    // **Validierung**
    if (this.length == null ||
      this.width == null ||
      this.height == null ||
      this.weight == null ||
      this.length <= 0 ||
      this.width <= 0 ||
      this.height <= 0 ||
      this.weight <= 0) {
      this.errorMessage = "Bitte alle Werte > 0 eingeben.";
      return;
    }

    // **Parcel in bestehendes Modell übertragen**
    const parcel = new Parcel();
    parcel.length = this.length;
    parcel.width = this.width;
    parcel.height = this.height;
    parcel.weight = this.weight;


    // **Backend-Call**
    this.priceService.getPrice(parcel).subscribe(result => {
      if (result === null) {
        this.errorMessage = "Preisberechnung fehlgeschlagen.";
        return;
      }

      this.price = result;   // simple: backend liefert eine Zahl zurück
    });
  }
  isDecember(): boolean {
    return new Date().getMonth() === 11; // Dezember = 11
  }


}
