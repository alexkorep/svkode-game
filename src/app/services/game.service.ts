import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JobService } from './job.service';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  currentDate$: BehaviorSubject<Date>;
  age$: BehaviorSubject<number>;
  skills$: BehaviorSubject<Skill[]>;
  jobs$: BehaviorSubject<string[]>;
  pastJobs$: BehaviorSubject<string[]>;
  currentJob$: BehaviorSubject<string>;

  private gameInterval: any;

  constructor(private jobService: JobService) {
    this.currentDate$ = new BehaviorSubject<Date>(new Date());
    this.age$ = new BehaviorSubject<number>(21);
    this.skills$ = new BehaviorSubject<Skill[]>([]);
    this.jobs$ = new BehaviorSubject<string[]>([]);
    this.pastJobs$ = new BehaviorSubject<string[]>([]);
    this.currentJob$ = new BehaviorSubject<string>('');

    this.startGame();
  }

  startGame(): void {
    this.gameInterval = setInterval(() => {
      const currentDate = this.currentDate$.value;
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      this.currentDate$.next(newDate);

      const currentAge = this.age$.value;
      const newAge = currentAge + 1;
      this.age$.next(newAge);

      const currentSkills = this.skills$.value;
      const currentJob = this.currentJob$.value;

      if (currentJob) {
        const job = this.jobService.getJobById(currentJob).subscribe((job) => {
          const increasedSkills = job.increasedSkills;
          const newSkills = [...currentSkills];
          for (let i = 0; i < increasedSkills.length; i++) {
            const skillIndex = newSkills.findIndex((skill) => skill.id === increasedSkills[i]);
            newSkills[skillIndex].level += 1;
          }
          this.skills$.next(newSkills);
          jobService.increaseSkills(increasedSkills);
          this.pastJobs$.next([...this.pastJobs$.value, currentJob]);
          this.currentJob$.next(null);
        });
      } else {
        const newSkills = [...currentSkills];
        for (let i = 0; i < newSkills.length; i++) {
          newSkills[i].level += 1;
        }
        this.skills$.next(newSkills);
      }
    }, 1000);
  }

  stopGame(): void {
    clearInterval(this.gameInterval);
  }

  skipMonth(): void {
    this.currentJob$.next('');
  }

  applyForJob(jobId: string): boolean {
    const currentSkills = this.skills$.value;
    const job = this.jobService.getJobById(jobId).value;

    let chance = job.probability;
    for (let i = 0; i < job.requiredSkills.length; i++) {
      const skill = job.requiredSkills[i];
      const currentSkill = currentSkills.find((s) => s.id === skill.id);
      if (!currentSkill || currentSkill.level < skill.level) {
        chance *= 0.9 * (skill.level - (currentSkill ? currentSkill.level : 0)) * skill.priority;
      } else if (currentSkill.level > skill.level) {
        chance *= 1.05 * (currentSkill.level - skill.level) / skill.priority;
      }
    }

    if (Math.random() < chance) {
      this.currentJob$.next(jobId);
      return true;
    } else {
      return false;
    }
  }
}