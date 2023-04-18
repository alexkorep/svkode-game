import type { Meta, StoryObj } from '@storybook/angular';
import { GameStateComponent } from '../app/components/game-state/game-state.component';
import { GameService } from '../app/services/game.service';
import { GameState } from '../app/models/game-state.model';

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