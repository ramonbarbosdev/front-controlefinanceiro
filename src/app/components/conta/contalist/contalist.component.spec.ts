import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContalistComponent } from './contalist.component';

describe('ContalistComponent', () => {
  let component: ContalistComponent;
  let fixture: ComponentFixture<ContalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContalistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
