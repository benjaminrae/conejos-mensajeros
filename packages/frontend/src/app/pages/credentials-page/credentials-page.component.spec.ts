import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsPageComponent } from './credentials-page.component';

describe('CredentialsPageComponent', () => {
  let component: CredentialsPageComponent;
  let fixture: ComponentFixture<CredentialsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CredentialsPageComponent]
    });
    fixture = TestBed.createComponent(CredentialsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
