import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GameState } from '../../models/game-state.model';

@Component({
  selector: 'app-game-state',
  templateUrl: './game-state.component.html',
  styleUrls: ['./game-state.component.scss']
})
export class GameStateComponent implements OnInit {
  gameState?: GameState;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameState = this.gameService.getCurrentGameState();
  }
}
