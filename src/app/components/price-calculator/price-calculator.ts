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

  length: number = 0;
  width: number = 0;
  height: number = 0;
  weight: number = 0;

  price: number | null = null;
  errorMessage: string | null = null;

  constructor(private priceService: PriceCalculatorService) { }

  calculatePrice(event: Event) {
    event.preventDefault();

    this.errorMessage = null;
    this.price = null;

    // **Validierung**
    if (this.length <= 0 || this.width <= 0 || this.height <= 0 || this.weight <= 0) {
      this.errorMessage = "Bitte alle Werte > 0 eingeben.";
      return;
    }

    // **Parcel in dein bestehendes Modell übertragen**
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
    return new Date().getMonth() === 10; // Dezember = 11
  }


}
