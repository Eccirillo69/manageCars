import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCarByPlatesComponent } from './change-car-plates-by-plates.component';

describe('ChangeCarByPlatesComponent', () => {
  let component: ChangeCarByPlatesComponent;
  let fixture: ComponentFixture<ChangeCarByPlatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCarByPlatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeCarByPlatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
