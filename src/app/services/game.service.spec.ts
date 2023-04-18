import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import { BehaviorSubject } from 'rxjs';
import { Skill } from '../models/skill.model';
import { JobService } from './job.service';

describe('GameService', () => {
  let service: GameService;
  let jobService: jasmine.SpyObj<JobService>;

  beforeEach(() => {
    const jobServiceSpy = jasmine.createSpyObj('JobService', ['getJobs', 'getJobById', 'increaseSkills']);

    TestBed.configureTestingModule({
      providers: [
        GameService,
        { provide: JobService, useValue: jobServiceSpy }
      ]
    });
    service = TestBed.inject(GameService);
    jobService = TestBed.inject(JobService) as jasmine.SpyObj<JobService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#startGame', () => {
    beforeEach(() => {
      spyOn(service.currentDate$, 'next');
      spyOn(service.age$, 'next');
      spyOn(service.skills$, 'next');
      spyOn(service.jobs$, 'next');
      spyOn(service.pastJobs$, 'next');
      spyOn(service.currentJob$, 'next');
      spyOn(jobService, 'getJobs').and.returnValue(new BehaviorSubject([]));
    });

    it('should set initial values', () => {
      service.startGame();
      expect(service.currentDate$.next).toHaveBeenCalledOnceWith(jasmine.any(Date));
      expect(service.age$.next).toHaveBeenCalledOnceWith(21);
      expect(service.skills$.next).toHaveBeenCalledOnceWith(jasmine.any(Array));
      expect(service.jobs$.next).toHaveBeenCalledOnceWith(jasmine.any(Array));
      expect(service.pastJobs$.next).toHaveBeenCalledOnceWith([]);
      expect(service.currentJob$.next).toHaveBeenCalledOnceWith(null);
    });

    it('should call jobService.getJobs', () => {
      service.startGame();
      expect(jobService.getJobs).toHaveBeenCalledOnceWith(jasmine.any(Array));
    });
  });

  describe('#stopGame', () => {
    beforeEach(() => {
      spyOn(service.currentDate$, 'complete');
      spyOn(service.age$, 'complete');
      spyOn(service.skills$, 'complete');
      spyOn(service.jobs$, 'complete');
      spyOn(service.pastJobs$, 'complete');
      spyOn(service.currentJob$, 'complete');
    });

    it('should complete all BehaviorSubjects', () => {
      service.stopGame();
      expect(service.currentDate$.complete).toHaveBeenCalled();
      expect(service.age$.complete).toHaveBeenCalled();
      expect(service.skills$.complete).toHaveBeenCalled();
      expect(service.jobs$.complete).toHaveBeenCalled();
      expect(service.pastJobs$.complete).toHaveBeenCalled();
      expect(service.currentJob$.complete).toHaveBeenCalled();
    });
  });

  describe('#skipMonth', () => {
    beforeEach(() => {
      spyOn(service.currentDate$, 'next');
      spyOn(service.age$, 'next');
      spyOn(jobService, 'increaseSkills');
    });

    it('should increase age and skills', () => {
      service.startGame();
      service.skipMonth();
      expect(service.currentDate$.next).toHaveBeenCalledOnceWith(jasmine.any(Date));
      expect(service.age$.getValue()).toBe(22);
      expect(jobService.increaseSkills).toHaveBeenCalledOnceWith(jasmine.any(Array));
    });

    it('should not call jobService.increaseSkills if currentJob$ is null', () => {
      service.startGame();
      service.currentJob$.next(null);
      service.skipMonth();
      expect(jobService.increaseSkills).not.toHaveBeenCalled();
    });
  });

  describe('#applyForJob', () => {
    beforeEach(() => {
      spyOn(service.jobs$, 'next');
      spyOn(service.currentJob$, 'next');
      spyOn(service.pastJobs$, 'next');
    });

    it('should return false if jobId is invalid', () => {
      const result = service.applyForJob('invalid-id');
      expect(result).toBeFalse();
      expect(service.jobs$.next).not.toHaveBeenCalled();
      expect(service.currentJob$.next).not.toHaveBeenCalled();
      expect(service.pastJobs$.next).not.toHaveBeenCalled();
    });

    it('should return false if probability is less than random number', () => {
      const job = { id: 'job1', probability: 0.1 };
      jobService.getJobById.and.returnValue(new BehaviorSubject(job));
      spyOn(Math, 'random').and.returnValue(0.5);
      const result = service.applyForJob('job1');
      expect(result).toBeFalse();
      expect(service.jobs$.next).toHaveBeenCalledOnceWith(jasmine.any(Array));
      expect(service.currentJob$.next).not.toHaveBeenCalled();
      expect(service.pastJobs$.next).not.toHaveBeenCalled();
    });

    it('should return true if probability is greater than random number', () => {
      const job = { id: 'job1', probability: 0.9 };
      jobService.getJobById.and.returnValue(new BehaviorSubject(job));
      spyOn(Math, 'random').and.returnValue(0.5);
      const result = service.applyForJob('job1');
      expect(result).toBeTrue();
      expect(service.jobs$.next).toHaveBeenCalledOnceWith(jasmine.any(Array));
      expect(service.currentJob$.next).toHaveBeenCalledOnceWith('job1');
      expect(service.pastJobs$.next).toHaveBeenCalledOnceWith([]);
    });
  });
});