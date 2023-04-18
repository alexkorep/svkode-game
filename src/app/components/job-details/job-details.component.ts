import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../../models/job.model';
import { GameService } from '../../services/game.service';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent {

  job: Job;
  chanceOfBeingAccepted: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');
    this.job = this.jobService.getJobById(jobId);
    this.chanceOfBeingAccepted = this.gameService.calculateChanceOfBeingAccepted(this.job);
  }

  applyForJob(): void {
    const isAccepted = this.gameService.applyForJob(this.job);
    if (isAccepted) {
      alert('Congratulations! You have been accepted for the job.');
      this.router.navigate(['/cv']);
    } else {
      alert('Sorry, you were not accepted for the job.');
    }
  }

}
