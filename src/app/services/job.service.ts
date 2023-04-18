import { Injectable } from '@angular/core';
import { Job } from '../models/job.model';
import { PlayerSkill } from '../models/player-skill.model';
import jobsData from '../../assets/data/job-list.json';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobs: Job[] = jobsData;

  getAvailableJobs(playerSkills: PlayerSkill[]): Job[] {
    return this.jobs.filter((job) => this.calculateAcceptanceChance(job, playerSkills) > 0.05);
  }

  calculateAcceptanceChance(job: Job, playerSkills: PlayerSkill[]): number {
    let chance = job.basicProbability;

    job.requiredSkills.forEach((requiredSkill) => {
      const playerSkill = playerSkills.find((skill) => skill.technologyId === requiredSkill.technologyId);

      if (playerSkill) {
        const skillDifference = playerSkill.monthsExperience - requiredSkill.months;
        const multiplier = skillDifference >= 0 ? 1.05 * skillDifference / requiredSkill.priority : 0.9 * Math.abs(skillDifference) * requiredSkill.priority;
        chance *= multiplier;
      } else {
        chance *= 0.9 * requiredSkill.months * requiredSkill.priority;
      }
    });

    return Math.min(Math.max(chance, 0), 1);
  }
}