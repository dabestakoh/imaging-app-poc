import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';
import { CapacitorConfig }from '../../capacitor.config';

// Build the URL that Auth0 should redirect back to
const redirectUriTest = `${CapacitorConfig.appId}://dev-imaging-app.us.auth0.com/capacitor/${CapacitorConfig.appId}/callback`;

// Register AuthModule with your AppModule
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AuthModule.forRoot({
      domain: "dev-imaging-app.us.auth0.com",
      clientId: "EvyEutFaIR2nyypobghkzfviKo3a29in",
      redirectUri: 'https://localhost:4200'
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
