export class RequiredSkill {
  technologyId: string;
  months: number;
  priority: number;

  constructor(technologyId: string, months: number, priority: number) {
    this.technologyId = technologyId;
    this.months = months;
    this.priority = priority;
  }
}
