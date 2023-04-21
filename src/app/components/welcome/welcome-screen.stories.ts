import type { Meta, StoryObj } from '@storybook/angular';
import { WelcomeScreenComponent } from './welcome-screen.component';

const meta: Meta<WelcomeScreenComponent> = {
  title: 'SovCodeGame/WelcomeScreen',
  component: WelcomeScreenComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<WelcomeScreenComponent>;

export const Default: Story = {};