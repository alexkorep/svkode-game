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
  ) {
    this.title = title;
    this.company = company;
    this.description = description;
    this.basicProbability = basicProbability;
    this.requiredSkills = requiredSkills;
    this.skillImprovements = skillImprovements;
  }
}
