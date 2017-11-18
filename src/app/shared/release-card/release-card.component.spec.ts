import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseCardComponent } from './release-card.component';

describe('ReleaseCardComponent', () => {
  let component: ReleaseCardComponent;
  let fixture: ComponentFixture<ReleaseCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ReleaseCardComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
