import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscovermoviesComponent } from './discovermovies.component';

describe('DiscovermoviesComponent', () => {
  let component: DiscovermoviesComponent;
  let fixture: ComponentFixture<DiscovermoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscovermoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscovermoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
