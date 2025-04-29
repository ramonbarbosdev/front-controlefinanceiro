import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipocategorialistComponent } from './tipocategorialist.component';

describe('TipocategorialistComponent', () => {
  let component: TipocategorialistComponent;
  let fixture: ComponentFixture<TipocategorialistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipocategorialistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipocategorialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
