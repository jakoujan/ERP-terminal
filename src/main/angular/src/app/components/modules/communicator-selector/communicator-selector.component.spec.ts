import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicatorSelectorComponent } from './communicator-selector.component';

describe('CommunicatorSelectorComponent', () => {
  let component: CommunicatorSelectorComponent;
  let fixture: ComponentFixture<CommunicatorSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunicatorSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicatorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
