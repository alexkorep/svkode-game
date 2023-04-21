## Game Mechanics

### Instances

#### Technology

Every technology has an ID (e.g. "python") and a name (e.g. "Python")

#### Player skill

The player skill contains the technology ID and the number of months the player has been working with this technology.

#### Required skill

The required skill contains the technology ID and the minimum number of months the player has to work with this technology to be accepted for the job.

#### Job

Every job has

- a title, e.g. "Python Developer"
- a company, e.g. "Google"
- a text description, what user does in this job, what skills will be increased during this job
- a basic probablility of being accepted for this job, a number between 0 and 1
- a list of required skills
- a list of technologies that will increase user's skills if the player is accepted for this job. Each month working for this job, the player's skill for this technology increases by 1 month.

#### Game

Game has:

- player skills - a list of player skills
- current calendar date
- list of available jobs
- player job history. The last job is the current job.

### Use cases

#### Player starts a new game

- The game is initialized with the current calendar date set to 1st of January 1984.
- A welcome screen is displayed.

From the webcome screen, the player can display the list of available jobs or display the game state.

#### Player skips a month

Game state is updated as follows:

- The current calendar date is increased by 1 month.
- The player skills increase based on the current job.

#### Player displays a list of available jobs

- The list of available jobs is generated from the pull of all jobs available in the game, based on the player's skill levels. The list of available jobs is generated as follows:
  - For every job in the game, the chance of being accepted is calculated as described below
  - The list of available jobs is generated from the list of all jobs in the game, where the chance of being accepted is greater than 0.05
  - The jobs that are in the player's job history are not displayed in the list of available jobs
- Player can apply for a job or display the job details.

### Displaying job details

The job details page contains:

- the title
- the company
- the description
- the probablility of being accepted for this job
- the list of required skills

User can apply for this job or go back to the list of available jobs.

#### Player applies for a job

- Player selects a job from the list of available jobs and applies for it
- The chance of being accepted is calculated as described below
- If the player is accepted for the job:
  - The job is added to the player's job history
  - Congratulations message is displayed
  - Game skips to the next month. The player's skill levels increase based on the new job.
- If the player is not accepted for the job:
  - the player skips this month. The player's skill levels increase based on the current job.

##### Chance of being accepted for a job

If a player applies for a job, the chance of being accepted is calculated as follows:

- The chance of being accepted is the basic probability of being accepted for this job.
- For every skill that the player has a level lower than the required level, the chance of being accepted is multiplied by 0.9 multiplied by number of missing months multiplied by priority
- For every skill that the player has a level higher than the required level, the chance of being accepted is multiplied by 1.05 multiplied by number of extra months divided by priority

#### Displaying the game state

The game state is displayed as a player CV. The CV includes:

- The current calendar date
- The player skill levels
- The list of jobs player had in the past
- The player age

#### Game over

- Player starts at the age of 21 and can work until the age of 65.
- When the player reaches the age of 65, the game is over.
- Start date of the game is 1st of January 1984.

## Technical details

### Game state

The game state is stored in the browser local storage.

### Jobs and skills storage

The list of all jobs and all skills in the game is stored in a JSON files in the source code. The files are loaded with `json-loader` npm package.

### Application

The application is an Angular application.

### Storybook

The UI components are documented with Storybook.

### Directory structure

```
my-app/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── job-list/
│   │   │   ├── job-details/
│   │   │   ├── game-state/
│   │   │   ├── welcome-screen/
│   │   │   └── shared/
│   │   ├── models/
│   │   │   ├── technology.model.ts
│   │   │   ├── player-skill.model.ts
│   │   │   ├── required-skill.model.ts
│   │   │   ├── job.model.ts
│   │   │   └── game-state.model.ts
│   │   ├── services/
│   │   │   ├── job.service.ts
│   │   │   └── game.service.ts
│   │   ├── app-routing.module.ts
│   │   └── app.module.ts
│   │
│   ├── assets/
│   │   ├── data/
│   │   │   ├── job-list.json
│   │   │   └── skill-list.json
│   │   └── icons/
│   │
│   ├── styles/
│   │   ├── _variables.css
│   │   ├── _mixins.css
│   │   └── main.css
│   │
│   ├── index.html
│   ├── main.ts
│   └── polyfills.ts
│
├── .storybook/
│   ├── main.js
│   └── preview.js
│
├── stories/
│   ├── job-list.stories.ts
│   ├── job-details.stories.ts
│   ├── game-state.stories.ts
│   └── welcome-screen.stories.ts
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

# src/app/models/technology.model.d.ts
```
declare class Technology {
  id: string;
  name: string;

  constructor(id: string, name: string);
}

export = Technology;
```
# src/app/models/required-skill.model.d.ts
```
export declare class RequiredSkill {
  technologyId: string;
  months: number;
  priority: number;

  constructor(technologyId: string, months: number, priority: number);
}
```
# src/app/models/player-skill.model.d.ts
```
export declare class PlayerSkill {
  technologyId: string;
  monthsExperience: number;

  constructor(technologyId: string, monthsExperience: number);
}
```
# src/app/models/job.model.d.ts
```
import { RequiredSkill } from './required-skill.model';

export class Job {
  title: string;
  company: string;
  description: string;
  basicProbability: number;
  requiredSkills: RequiredSkill[];
  skillImprovements: string[];

  constructor(
    title: string,
    company: string,
    description: string,
    basicProbability: number,
    requiredSkills: RequiredSkill[],
    skillImprovements: string[]
  );

}
``` 
# src/app/models/game-state.model.d.ts
```
import { PlayerSkill } from './player-skill.model';
import { Job } from './job.model';

export declare class GameState {
  playerSkills: PlayerSkill[];
  currentCalendarDate: Date;
  availableJobs: Job[];
  playerJobHistory: Job[];

  constructor(
    playerSkills: PlayerSkill[],
    currentCalendarDate: Date,
    availableJobs: Job[],
    playerJobHistory: Job[]
  );
}
``` 