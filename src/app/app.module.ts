import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PhotosComponent } from './photos/photos.component';
import { InfoComponent } from './info/info.component';
import { FaqComponent } from './faq/faq.component';
import { RsvpComponent } from './rsvp/rsvp.component';

@NgModule({
  declarations: [
    AppComponent, 
    WelcomeComponent, NavbarComponent, FooterComponent, PhotosComponent, InfoComponent, FaqComponent, RsvpComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'rsvp', component: RsvpComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'info', component: InfoComponent },
      { path: 'photos', component: PhotosComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
