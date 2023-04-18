## Directory structure

```
src/
├── app/
│   ├── components/
│   │   ├── cv-view/
│   │   │   ├── cv-view.component.html
│   │   │   ├── cv-view.component.scss
│   │   │   ├── cv-view.component.spec.ts
│   │   │   └── cv-view.component.ts
│   │   ├── job-details/
│   │   │   ├── job-details.component.html
│   │   │   ├── job-details.component.scss
│   │   │   ├── job-details.component.spec.ts
│   │   │   └── job-details.component.ts
│   │   ├── job-list/
│   │   │   ├── job-list.component.html
│   │   │   ├── job-list.component.scss
│   │   │   ├── job-list.component.spec.ts
│   │   │   └── job-list.component.ts
│   │   ├── navbar/
│   │   │   ├── navbar.component.html
│   │   │   ├── navbar.component.scss
│   │   │   ├── navbar.component.spec.ts
│   │   │   └── navbar.component.ts
│   │   └── welcome/
│   │       ├── welcome.component.html
│   │       ├── welcome.component.scss
│   │       ├── welcome.component.spec.ts
│   │       └── welcome.component.ts
│   ├── models/
│   │   ├── job.model.ts
│   │   └── skill.model.ts
│   ├── services/
│   │   ├── game.service.spec.ts
│   │   ├── game.service.ts
│   │   ├── job.service.spec.ts
│   │   └── job.service.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.module.ts
│   ├── app-routing.module.ts
│   └── main.ts
├── assets/
│   ├── data/
│   │   ├── jobs.yaml
│   │   └── skills.yaml
│   ├── images/
│   │   ├── job1.png
│   │   ├── job2.png
│   │   └── logo.png
│   └── styles/
│       ├── _variables.scss
│       └── main.scss
├── environments/
│   ├── environment.prod.ts
│   └── environment.ts
├── index.html
├── styles.scss
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
├── tslint.json
└── typings.d.ts
```

- `app/components`: This directory contains the different components of the app (CV view, job details, job list, navbar, welcome).
- `app/models`: This directory contains the different models used in the app (job, required skill, skill).
- `app/services`: This directory contains the different services used in the app (game service, job service).
- `assets/data`: This directory contains the YAML files with the job and skill data.
- `assets/images`: This directory contains the different images used in the app (job icons, logo).
- `assets/styles`: This directory contains the SCSS files with the global styles and variables.
- `environments`: This directory contains the configuration files for the different environments (development and production).
- `index.html`: This is the main HTML file for the app.
- `styles.scss`: This is the main SCSS file for the app.
- `tsconfig.app.json`: This is the TypeScript configuration file for the app.
- `tsconfig.json`: This is the TypeScript configuration file for the whole project.
- `tsconfig.spec.json`: This is the TypeScript configuration file for the tests.
- `tslint.json`: This is the configuration file for TSLint, the linter for TypeScript.
- `typings.d.ts`: This is the TypeScript definition file for the app.

