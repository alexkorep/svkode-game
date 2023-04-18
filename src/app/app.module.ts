import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CvViewComponent } from './components/game-state/game-state.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
// import { JobListComponent } from './components/job-list/job-list.component';
// import { NavbarComponent } from './components/navbar/navbar.component';
// import { WelcomeComponent } from './components/welcome/welcome.component';

import { GameService } from './services/game.service';
import { JobService } from './services/job.service';

@NgModule({
  declarations: [
    AppComponent,
    CvViewComponent,
    JobDetailsComponent,
    // JobListComponent,
    // NavbarComponent,
    // WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    GameService,
    JobService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }