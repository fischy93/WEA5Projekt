import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { authConfig } from './auth.config';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthenticationService } from './services/authentication';

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
    public auth: AuthenticationService
  ) {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }


}
