import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarusuarioComponent } from './cambiarusuario.component';

describe('CambiarusuarioComponent', () => {
  let component: CambiarusuarioComponent;
  let fixture: ComponentFixture<CambiarusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
