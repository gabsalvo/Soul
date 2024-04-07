import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCommandComponent } from './home-command.component';

describe('HomeCommandComponent', () => {
  let component: HomeCommandComponent;
  let fixture: ComponentFixture<HomeCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCommandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
