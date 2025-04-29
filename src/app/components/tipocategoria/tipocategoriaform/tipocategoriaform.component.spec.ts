import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipocategoriaformComponent } from './tipocategoriaform.component';

describe('TipocategoriaformComponent', () => {
  let component: TipocategoriaformComponent;
  let fixture: ComponentFixture<TipocategoriaformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipocategoriaformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipocategoriaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
