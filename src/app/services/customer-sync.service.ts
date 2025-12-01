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
      id: claims.sub,
      FirstName: claims.given_name,
      LastName: claims.family_name,
      UserName: claims.preferred_username,
    };
  }
}
