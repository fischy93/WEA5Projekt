import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'price-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './price-calculator.html'
})
export class PriceCalculator {

  length: number = 0;
  width: number = 0;
  height: number = 0;
  weight: number = 0;

  price: number | null = null;
  errorMessage: string | null = null;


  calculatePrice(event: Event) {
    event.preventDefault();

    // Fehler zurücksetzen
    this.errorMessage = null;

    // Validierung
    if (this.length <= 0 || this.width <= 0 || this.height <= 0 || this.weight <= 0) {
      this.price = null;
      this.errorMessage = "Bitte alle Werte > 0 eingeben.";
      return;
    }

    // Deine Preisberechnung
    let base = 5;
    if (this.weight > 1) base += (this.weight - 1) * 0.5;
    if (this.length + this.width + this.height > 100) base += 3;
    if (this.weight > 5) base += 4;

    this.price = Math.round(base * 100) / 100;
  }

}
