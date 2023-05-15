import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCarByPlatesComponent } from './delete-car-by-plates.component';

describe('DeleteCarByPlatesComponent', () => {
  let component: DeleteCarByPlatesComponent;
  let fixture: ComponentFixture<DeleteCarByPlatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCarByPlatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCarByPlatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
