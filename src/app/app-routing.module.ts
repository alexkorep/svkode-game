import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { JobListComponent } from './components/job-list/job-list.component';
// import { JobDetailsComponent } from './components/job-details/job-details.component';
import { GameStateComponent } from './components/game-state/game-state.component';
import { WelcomeScreenComponent } from './components/welcome-screen/welcome-screen.component';


const routes: Routes = [
  { path: '', component: WelcomeScreenComponent },
  // { path: 'job-list', component: JobListComponent },
  // { path: 'job-details/:id', component: JobDetailsComponent },
  { path: 'game-state', component: GameStateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }