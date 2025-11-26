import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../environments/environments';
import { Shipment } from '../shared/shipment';

@Injectable({
  providedIn: 'root',
})
export class ShipmentService {

  private readonly http = inject(HttpClient);

  private errorHandler(error: any): Observable<any> {
    console.error('CustomerService API-Fehler:', error);
    return of(null);
  }

  private baseUrl = `${environment.api}/shipment`;


  getByTrackingIdAndZip(trackingId: string, zip: number): Observable<Shipment> {
    return this.http.get<Shipment>(`${this.baseUrl}/${trackingId}/${zip}`)
      .pipe(catchError(this.errorHandler));
  }

  create(newShipment: Shipment): Observable<Shipment> {
    return this.http.post<Shipment>(this.baseUrl, newShipment)
      .pipe(catchError(this.errorHandler));
  }


}
