import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { mergeMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Browser } from '@capacitor/browser';
import { CapacitorConfig } from '../../../capacitor.config';

// const returnTo = `${CapacitorConfig.appId}://dev-imaging-app.us.auth0.com/capacitor/${CapacitorConfig.appId}/callback`;
const returnTo = 'https://localhost:4200'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoggedIn = false;
  constructor(public auth: AuthService) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    this.auth.user$.subscribe(res => {
      if (res) {
        this.isLoggedIn = true;
      }
    });
  }


  login() {
    this.auth
      .buildAuthorizeUrl()
      .pipe(mergeMap((url) => Browser.open({ url, windowName: '_self' })))
      .subscribe(() => {
        this.isLoggedIn = true;
      });

  }

  logout() {
    // Use the SDK to build the logout URL
    this.auth
      .buildLogoutUrl({ returnTo })
      .pipe(
        tap((url) => {
          // Call the logout fuction, but only log out locally
          this.auth.logout({ localOnly: false });
          // Redirect to Auth0 using the Browser plugin, to clear the user's session
          this.isLoggedIn = false;
          sessionStorage.clear();
          Browser.open({ url, windowName: '_self' });
          // Browser.open({ url });
        })
      )
      .subscribe();
  }
}
