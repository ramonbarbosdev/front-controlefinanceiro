import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoformComponent } from './lancamentoform.component';

describe('LancamentoformComponent', () => {
  let component: LancamentoformComponent;
  let fixture: ComponentFixture<LancamentoformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentoformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LancamentoformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
