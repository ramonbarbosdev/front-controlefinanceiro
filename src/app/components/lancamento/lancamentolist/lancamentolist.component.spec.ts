import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentolistComponent } from './lancamentolist.component';

describe('LancamentolistComponent', () => {
  let component: LancamentolistComponent;
  let fixture: ComponentFixture<LancamentolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentolistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LancamentolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
