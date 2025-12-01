import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../environments/environments';
import { Parcel } from '../shared/parcel';

@Injectable({
  providedIn: 'root',
})
export class PriceCalculatorService {
  private readonly http = inject(HttpClient);

  private errorHandler(error: any): Observable<any> {
    console.error('CustomerService API-Fehler:', error);
    return of(null);
  }

  private baseUrl = `${environment.api}/shipment/price`;

  getPrice(newParcel: Parcel): Observable<number> {
    return this.http
      .post<number>(this.baseUrl, { parcel: newParcel })
      .pipe(catchError(this.errorHandler));
  }




}
