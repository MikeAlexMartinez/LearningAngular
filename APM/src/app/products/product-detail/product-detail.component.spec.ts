import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProudctDetailComponent } from './proudct-detail.component';

describe('ProudctDetailComponent', () => {
  let component: ProudctDetailComponent;
  let fixture: ComponentFixture<ProudctDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProudctDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProudctDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
