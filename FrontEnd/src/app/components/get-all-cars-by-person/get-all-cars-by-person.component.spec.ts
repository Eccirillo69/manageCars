import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllCarsByPersonComponent } from './get-all-cars-by-person.component';

describe('GetAllCarsByPersonComponent', () => {
  let component: GetAllCarsByPersonComponent;
  let fixture: ComponentFixture<GetAllCarsByPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllCarsByPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllCarsByPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
