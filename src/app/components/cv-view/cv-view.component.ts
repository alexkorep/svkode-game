import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-cv-view',
  templateUrl: './cv-view.component.html',
  styleUrls: ['./cv-view.component.scss']
})
export class CvViewComponent implements OnInit {
  name: string;
  email: string;
  phone: string;
  age: number;
  skills: { name: string, level: number }[];
  jobs: { company: string, title: string, description: string, startDate: Date, endDate: Date, skills: { name: string, level: number }[] }[];

  constructor(private gameService: GameService) { 
    // Initialize variables
    this.name = '';
    this.email = '';
    this.phone = '';
    this.age = 0;
    this.skills = [];
    this.jobs = [];
  }

  ngOnInit(): void {
    // Get player information from game service
    this.name = this.gameService.getPlayerName();
    this.email = this.gameService.getPlayerEmail();
    this.phone = this.gameService.getPlayerPhone();
    this.age = this.gameService.getPlayerAge();
    this.skills = this.gameService.getPlayerSkills();

    // Get player job history from game service
    const jobHistory: Job[] = this.gameService.getPlayerJobHistory();
    this.jobs = jobHistory.map(job => {
      return {
        company: job.company,
        title: job.title,
        description: job.description,
        startDate: job.startDate,
        endDate: job.endDate,
        skills: job.skills
      };
    });
  }

}
