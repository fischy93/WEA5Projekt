import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly http = inject(HttpClient);
  private baseUrl = `${environment.api}/Notification`;

  private errorHandler(error: any): Observable<any> {
    console.error('NotificationService API-Fehler:', error);
    return of(null);
  }

  // POST /Notification
  public AktivateNotification(trackingId: string, zip: number) {
    const body = { trackingId, zip };

    return this.http
      .post(`${this.baseUrl}`, body)
      .pipe(catchError(this.errorHandler));
  }

  // DELETE /Notification
  public DeaktivateNotification(trackingId: string, zip: number) {
    const body = { trackingId, zip };

    return this.http
      .delete(`${this.baseUrl}`, {
        body: body
      })
      .pipe(catchError(this.errorHandler));
  }

}
