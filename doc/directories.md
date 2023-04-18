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
│   │   │   └── game.model.ts
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

This structure organizes the application into components, models, and services. The `src/app/components` folder contains the main UI components, such as job list, job details, game state, and welcome screen. The `src/app/models` folder contains the data models, while the `src/app/services` folder contains the services for handling job and game logic.

The `src/assets` folder contains static data files (job-list.json and skill-list.json) and icons.

The `src/styles` folder contains the CSS files, including variables, mixins, and the main CSS file.

The `.storybook` folder contains Storybook configuration files, and the `stories` folder contains the Storybook stories for each component.

The root folder contains configuration files for Angular and TypeScript, as well as the package.json and README file for the project.