import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as yaml from 'js-yaml';
import { HttpClient } from '@angular/common/http';
import { Job } from '../models/job.model';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobs: Job[];
  private skills: Skill[];

  constructor(private http: HttpClient) {
    this.loadJobs();
    this.jobs = [];
    this.skills = [];
  }

  private loadJobs(): void {
    this.http.get<string>('assets/data/jobs.yaml').subscribe(data => {
      this.jobs = yaml.load(data);
    });
  }

  getJobs(skillLevels: Skill[]): Observable<Job[]> {
    const filteredJobs = this.jobs.filter(job => {
      return job.requiredSkills.every(requiredSkill => {
        const skill = skillLevels.find(s => s.id === requiredSkill.id);
        return skill && skill.level >= requiredSkill.level;
      });
    });
    return of(filteredJobs);
  }

  getJobById(jobId: string): Observable<Job> {
    const job = this.jobs.find(j => j.id === jobId);
    // Raise an exception if the job is not found
    if (!job) {
      throw new Error(`Job with id ${jobId} not found`);
    }
    return of(job);
  }

  increaseSkills(skillIds: string[]): void {
    skillIds.forEach(skillId => {
      const skill = this.skills.find(s => s.id === skillId);
      if (skill) {
        skill.level++;
      }
    });
  }
}