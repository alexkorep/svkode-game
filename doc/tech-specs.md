Show content of `.d.ts` files that correspond to the files in `src/app/services` directory

===========

`job.model.d.ts`:
```typescript
interface RequiredSkill {
  id: string;
  level: number;
  priority: number;
}

interface Job {
  id: string;
  company: string;
  title: string;
  description: string;
  requiredSkills: RequiredSkill[];
  increasedSkills: string[];
  probability: number;
}
```

`skill.model.d.ts`:
```typescript
interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
}
```
`game.service.d.ts`:
```typescript
import { BehaviorSubject } from 'rxjs';
import { Skill } from '../models/skill.model';

export class GameService {
  currentDate$: BehaviorSubject<Date>;
  age$: BehaviorSubject<number>;
  skills$: BehaviorSubject<Skill[]>;
  jobs$: BehaviorSubject<string[]>;
  pastJobs$: BehaviorSubject<string[]>;
  currentJob$: BehaviorSubject<string>;

  constructor();

  startGame(): void;
  stopGame(): void;
  skipMonth(): void;
  applyForJob(jobId: string): boolean;
}
```

`job.service.d.ts`:
```typescript
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';
import { Skill } from '../models/skill.model';

export class JobService {
  constructor();

  getJobs(skillLevels: Skill[]): Observable<Job[]>;
  getJobById(jobId: string): Observable<Job>;
  increaseSkills(skillIds: string[]): void;
}
```