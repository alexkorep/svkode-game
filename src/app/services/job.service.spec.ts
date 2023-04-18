import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { JobService } from './job.service';
import { Job } from '../models/job.model';

describe('JobService', () => {
  let service: JobService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JobService],
    });
    service = TestBed.inject(JobService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getJobs', () => {
    it('should return an Observable<Job[]>', () => {
      const dummyJobs: Job[] = [
        {
          id: 'job1',
          name: 'Job 1',
          description: 'Description of Job 1',
          requiredSkills: [],
        },
        {
          id: 'job2',
          name: 'Job 2',
          description: 'Description of Job 2',
          requiredSkills: [],
        },
      ];

      service.getJobs().subscribe((jobs) => {
        expect(jobs.length).toBe(2);
        expect(jobs).toEqual(dummyJobs);
      });

      const req = httpMock.expectOne(service['jobsUrl']);
      expect(req.request.method).toBe('GET');
      req.flush(dummyJobs);
    });
  });

  describe('getJobById', () => {
    it('should return an Observable<Job> with the requested job', () => {
      const dummyJob: Job = {
        id: 'job1',
        name: 'Job 1',
        description: 'Description of Job 1',
        requiredSkills: [],
      };

      service.getJobById('job1').subscribe((job) => {
        expect(job).toEqual(dummyJob);
      });

      const req = httpMock.expectOne(service['jobsUrl']);
      expect(req.request.method).toBe('GET');
      req.flush([dummyJob]);
    });
  });

  describe('getAvailableJobs', () => {
    it('should return an Observable<Job[]> with the available jobs', () => {
      const playerSkills = new Map<string, number>([
        ['skill1', 6],
        ['skill2', 3],
      ]);
      const dummyJobs: Job[] = [
        {
          id: 'job1',
          title: 'Job 1',
          description: 'Description of Job 1',
          requiredSkills: [
            { id: 'skill1', level: 4, priority: 0.5 },
            { id: 'skill2', level: 5, priority: 1 },
          ],
          baseProbability: 0.8,
          company: 'Company 1',
          companyDescription: 'Description of Company 1',
          skillIncreases: [],
        },
        {
          id: 'job2',
          title: 'Job 2',
          description: 'Description of Job 2',
          requiredSkills: [
            { id: 'skill2', level: 4, priority: 0.5 },
            { id: 'skill3', level: 5, priority: 1 },
          ],
          baseProbability: 0.9,
          company: 'Company 1',
          companyDescription: 'Description of Company 1',
          skillIncreases: [],
        },
      ];

      spyOn(service, 'getJobs').and.returnValue({ pipe: () => dummyJobs });

      service.getAvailableJobs(playerSkills).subscribe((jobs) => {
        expect(jobs.length).toBe(1);
        expect(jobs[0]).toEqual(dummyJobs[0]);
      });
    });
  });
});
