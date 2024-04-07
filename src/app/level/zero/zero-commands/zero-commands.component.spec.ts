import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeroCommandsComponent } from './zero-commands.component';

describe('ZeroCommandsComponent', () => {
  let component: ZeroCommandsComponent;
  let fixture: ComponentFixture<ZeroCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZeroCommandsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZeroCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
