import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaformComponent } from './contaform.component';

describe('ContaformComponent', () => {
  let component: ContaformComponent;
  let fixture: ComponentFixture<ContaformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContaformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
