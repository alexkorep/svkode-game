export interface RequiredSkill {
  id: string;
  level: number;
  priority: number;
}

export interface Job {
  id: string;
  company: string;
  title: string;
  description: string;
  companyDescription: string;
  requiredSkills: RequiredSkill[];
  increasedSkills: string[];
  probability: number;
}
