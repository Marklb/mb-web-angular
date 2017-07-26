import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRelationOrganizerComponent } from './data-relation-organizer.component';

describe('DataRelationOrganizerComponent', () => {
  let component: DataRelationOrganizerComponent;
  let fixture: ComponentFixture<DataRelationOrganizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataRelationOrganizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRelationOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
