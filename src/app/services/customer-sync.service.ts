import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication';

@Injectable({
  providedIn: 'root'
})
export class CustomerSyncService {

  constructor(private auth: AuthenticationService) { }

  buildCustomerFromKeycloak() {
    const claims: any = this.auth.getClaims();
    if (!claims) return null;

    return {
      id: 0,                     // id 0 weil backend eine id erwartet
      FirstName: claims.given_name,
      LastName: claims.family_name,
      UserName: claims.preferred_username,
      Password: claims.sub   // Password als KeycloakId verwend damit ich backend nicht ändern muss
    };
  }
}
