import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipocontaformComponent } from './tipocontaform.component';

describe('TipocontaformComponent', () => {
  let component: TipocontaformComponent;
  let fixture: ComponentFixture<TipocontaformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipocontaformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipocontaformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
