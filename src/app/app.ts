import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { authConfig } from './auth.config';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthenticationService } from './services/authentication';
import { CustomerSyncService } from './services/customer-sync.service';
import { environment } from './environments/environments';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('DeliFHery');

  constructor(
    private oauthService: OAuthService,
    public auth: AuthenticationService,
    private sync: CustomerSyncService,
    private http: HttpClient
  ) {
    // Wichtig: OIDC konfigurieren
    this.oauthService.configure(authConfig);

    // Hier warten wir auf fertigen Login
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.afterLogin();
    });
  }

  // Diese Methode läuft erst WENN der Login wirklich abgeschlossen ist
  private afterLogin() {
    console.log("TryLogin abgeschlossen");

    if (this.auth.isLoggedIn()) {
      console.log("Login abgeschlossen → Tokens vorhanden");

      // Claims anzeigen
      console.log("ID TOKEN:", this.oauthService.getIdToken());
      console.log("ACCESS TOKEN:", this.oauthService.getAccessToken());
      console.log("CLAIMS:", this.oauthService.getIdentityClaims());

      // Customer aus Keycloak bauen
      const customer = this.sync.buildCustomerFromKeycloak();
      console.log("Customer (Keycloak):", customer);

      // Checken ob Customer schon existiert
      this.http.get<boolean>(environment.api + '/customer/exists/' + customer?.UserName)
        .subscribe((exists) => {
          console.log("Exists:", exists);

          if (!exists) {
            console.log("Customer existiert NICHT → wird gespeichert...");

            this.http.post(environment.api + '/customer', customer)
              .subscribe(res => console.log("Customer gespeichert:", res));
          } else {
            console.log("Customer existiert bereits → kein Insert notwendig.");
          }
        });
    } else {
      console.log("Nicht eingeloggt – Login-Flow wird später getriggert.");
    }
  }
}
