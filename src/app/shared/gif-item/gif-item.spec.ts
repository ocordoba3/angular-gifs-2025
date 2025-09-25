import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifItem } from './gif-item';

describe('GifItem', () => {
  let component: GifItem;
  let fixture: ComponentFixture<GifItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GifItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GifItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
