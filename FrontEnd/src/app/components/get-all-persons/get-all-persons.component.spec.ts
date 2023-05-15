import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllPersonsComponent } from './get-all-persons.component';

describe('GetAllPersonsComponent', () => {
  let component: GetAllPersonsComponent;
  let fixture: ComponentFixture<GetAllPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllPersonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
