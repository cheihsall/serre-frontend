import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemeComponent } from './systeme.component';

describe('SystemeComponent', () => {
  let component: SystemeComponent;
  let fixture: ComponentFixture<SystemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
