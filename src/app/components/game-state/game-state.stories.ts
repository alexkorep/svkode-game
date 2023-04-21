import type { Meta, StoryObj } from '@storybook/angular';
import { GameStateComponent } from './game-state.component';
import { GameService } from '../../services/game.service';
import { GameState } from '../../models/game-state.model';

const mockGameState: GameState = new GameState([], new Date(), [], []);

class MockGameService {
  getCurrentGameState(): GameState {
    return mockGameState;
  }
}

const meta: Meta<GameStateComponent> = {
  title: 'SovCodeGame/GameState',
  component: GameStateComponent,
  tags: ['autodocs'],
  render: (args: GameStateComponent) => ({
    props: {
      ...args,
    },
    providers: [
      { provide: GameService, useClass: MockGameService }
    ],
  }),
};

export default meta;
type Story = StoryObj<GameStateComponent>;

export const Default: Story = {};