import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipocontalistComponent } from './tipocontalist.component';

describe('TipocontalistComponent', () => {
  let component: TipocontalistComponent;
  let fixture: ComponentFixture<TipocontalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipocontalistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipocontalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
