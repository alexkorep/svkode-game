import { Injectable } from '@angular/core';
import { GameState } from '../models/game-state.model';
import { PlayerSkill } from '../models/player-skill.model';
import { Job } from '../models/job.model';
import { JobService } from './job.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gameState: GameState;

  constructor(private jobService: JobService) {
    this.gameState = new GameState([], new Date(1984, 0, 1), [], []);
    this.initializeGameState();
    this.saveGameState();
  }

  private initializeGameState(): void {
    // Load game state from local storage or create a new one
    const storedGameState = localStorage.getItem('gameState');
    if (storedGameState) {
      this.gameState = JSON.parse(storedGameState);
      return;
    }
  }

  getCurrentGameState(): GameState {
    return this.gameState;
  }

  skipMonth(): void {
    // Increase the current date by one month
    this.gameState.currentCalendarDate.setMonth(
      this.gameState.currentCalendarDate.getMonth() + 1
    );

    const playerLastJob = this.gameState.playerJobHistory[
      this.gameState.playerJobHistory.length - 1
    ];
    if (playerLastJob) {
      // Update player skills based on the current job
      this.updatePlayerSkills(playerLastJob.skillImprovements);
    }
    // Save the game state to local storage
    this.saveGameState();
  }

  applyForJob(job: Job): boolean {
    // Calculate the chance of being accepted for the job
    const chance = this.jobService.calculateAcceptanceChance(
      job,
      this.gameState.playerSkills
    );

    // Determine if the player is accepted for the job based on the calculated chance
    const isAccepted = Math.random() < chance;

    if (isAccepted) {
      // Add the job to the player's job history
      this.gameState.playerJobHistory.push(job);
      // Update player skills based on the new job
      this.updatePlayerSkills(job.skillImprovements);
    }

    // Save the game state to local storage and return the result
    this.saveGameState();
    return isAccepted;
  }

  private updatePlayerSkills(jobSkills: string[]): void {
    if (jobSkills) {
      // Update player skills based on the job skills
      jobSkills.forEach((jobSkill) => {
        const playerSkill = this.gameState.playerSkills.find(
          (skill) => skill.technologyId === jobSkill
        );
        if (playerSkill) {
          playerSkill.monthsExperience += 1;
        } else {
          this.gameState.playerSkills.push(
            new PlayerSkill(jobSkill, 1)
          );
        }
      });
    }
  }

  private saveGameState(): void {
    localStorage.setItem('gameState', JSON.stringify(this.gameState));
  }

  isGameOver(): boolean {
    const playerAge = this.calculatePlayerAge();
    return playerAge >= 65;
  }

  private calculatePlayerAge(): number {
    const currentDate = this.gameState.currentCalendarDate;
    const birthYear = currentDate.getFullYear() - 21;
    return currentDate.getFullYear() - birthYear;
  }
}
