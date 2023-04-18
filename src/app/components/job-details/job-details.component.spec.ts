import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Job } from '../../models/job.model';
import { GameService } from '../../services/game.service';
import { JobService } from '../../services/job.service';
import { JobDetailsComponent } from './job-details.component';

describe('JobDetailsComponent', () => {
  let component: JobDetailsComponent;
  let fixture: ComponentFixture<JobDetailsComponent>;
  let mockRouter;
  let mockActivatedRoute;
  let mockJobService;
  let mockGameService;
  const mockJob: Job = {
    id: 'google-python-developer',
    company: 'Google',
    title: 'Python Developer',
    description: 'You will work with a team of developers to build and maintain software using Python.',
    companyDescription: 'Google is a technology company specializing in internet-related services and products.',
    requiredSkills: [
      { id: 'python', level: 12, priority: 0.8 },
      { id: 'algorithms', level: 6, priority: 0.5 },
      { id: 'communication', level: 6, priority: 0.7 }
    ],
    skillIncreases: [
      { id: 'python', level: 2, priority: 1 },
      { id: 'algorithms', level: 1, priority: 0.3 }
    ],
    baseProbability: 0.2
  };

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (param: string) => 'google-python-developer'
        }
      }
    };
    mockJobService = jasmine.createSpyObj(['getJobById']);
    mockGameService = jasmine.createSpyObj(['calculateChanceOfBeingAccepted', 'applyForJob']);
    await TestBed.configureTestingModule({
      declarations: [ JobDetailsComponent ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: JobService, useValue: mockJobService },
        { provide: GameService, useValue: mockGameService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockJobService.getJobById.and.returnValue(mockJob);
    mockGameService.calculateChanceOfBeingAccepted.and.returnValue(0.5);
    fixture = TestBed.createComponent(JobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the job details', () => {
    expect(component.job).toEqual(mockJob);
  });

  it('should calculate the chance of being accepted', () => {
    expect(component.chanceOfBeingAccepted).toEqual(0.5);
  });

  it('should apply for the job and navigate to CV page if accepted', () => {
    mockGameService.applyForJob.and.returnValue(true);
    component.applyForJob();
    expect(mockGameService.applyForJob).toHaveBeenCalledWith(mockJob);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/cv']);
  });

  it('should apply for the job and display alert if not accepted', () => {
    mockGameService.applyForJob.and.returnValue(false);
    spyOn(window, 'alert');
    component.applyForJob();
    expect(mockGameService.applyForJob).toHaveBeenCalledWith(mockJob);
    expect(window.alert).toHaveBeenCalledWith('Sorry, you were not accepted for the job.');
  });
});