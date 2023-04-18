import { PlayerSkill } from './player-skill.model';
import { Job } from './job.model';

export class GameState {
  playerSkills: PlayerSkill[];
  currentCalendarDate: Date;
  availableJobs: Job[];
  playerJobHistory: Job[];

  constructor(
    playerSkills: PlayerSkill[],
    currentCalendarDate: Date,
    availableJobs: Job[],
    playerJobHistory: Job[]
  ) {
    this.playerSkills = playerSkills;
    this.currentCalendarDate = currentCalendarDate;
    this.availableJobs = availableJobs;
    this.playerJobHistory = playerJobHistory;
  }
}