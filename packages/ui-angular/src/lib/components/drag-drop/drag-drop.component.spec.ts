import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropComponent } from './drag-drop.component';

describe('ButonComponent', () => {
  let component: DragDropComponent<unknown, unknown>;
  let fixture: ComponentFixture<DragDropComponent<unknown, unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragDropComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
