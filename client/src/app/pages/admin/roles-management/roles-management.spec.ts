import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesManagement } from './roles-management';

describe('RolesManagement', () => {
  let component: RolesManagement;
  let fixture: ComponentFixture<RolesManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
