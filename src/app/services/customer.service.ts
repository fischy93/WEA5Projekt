import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { environment } from '../environments/environments';
import { Customer } from '../shared/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly http = inject(HttpClient);

  private errorHandler(error: any): Observable<any> {
    console.error('CustomerService API-Fehler:', error);
    return of(null);
  }

  private baseUrl = `${environment.api}/customer`;

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl)
      .pipe(catchError(this.errorHandler));
  }

  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, customer)
      .pipe(catchError(this.errorHandler));
  }
}
