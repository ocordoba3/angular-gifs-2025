import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifList } from './gif-list';

describe('GifList', () => {
  let component: GifList;
  let fixture: ComponentFixture<GifList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GifList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GifList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
