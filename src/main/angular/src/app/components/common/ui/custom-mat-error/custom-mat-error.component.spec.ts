import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomMatErrorComponent } from './custom-mat-error.component';

describe('CustomMatErrorComponent', () => {
  let component: CustomMatErrorComponent;
  let fixture: ComponentFixture<CustomMatErrorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomMatErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMatErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
