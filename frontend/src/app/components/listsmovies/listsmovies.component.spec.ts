import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsmoviesComponent } from './listsmovies.component';

describe('ListsmoviesComponent', () => {
  let component: ListsmoviesComponent;
  let fixture: ComponentFixture<ListsmoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsmoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsmoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
