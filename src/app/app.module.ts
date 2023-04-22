import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { JobListComponent } from './components/job-list/job-list.component';
// import { JobDetailsComponent } from './components/job-details/job-details.component';
import { GameStateComponent } from './components/game-state/game-state.component';
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    // JobListComponent,
    // JobDetailsComponent,
    GameStateComponent,
    WelcomeScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }