import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemlancamentodetalheComponent } from './itemlancamentodetalhe.component';

describe('ItemlancamentodetalheComponent', () => {
  let component: ItemlancamentodetalheComponent;
  let fixture: ComponentFixture<ItemlancamentodetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemlancamentodetalheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemlancamentodetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
