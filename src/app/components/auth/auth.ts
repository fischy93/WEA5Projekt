import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication';
import { CustomerSyncService } from '../../services/customer-sync.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';


@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.html'
})
export class AuthComponent {

  constructor(
    public auth: AuthenticationService,
    private sync: CustomerSyncService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.auth.login();
  }


  onRegister() {
    const customer = this.sync.buildCustomerFromKeycloak();

    if (!customer) {
      console.error("Kein Keycloak-Token vorhanden.");
      return;
    }

    this.http.post(environment.api + '/customer', customer).subscribe({
      next: (res) => console.log("Customer gespeichert:", res),
      error: (err) => console.error("Fehler beim Speichern:", err)
    });
  }
}
