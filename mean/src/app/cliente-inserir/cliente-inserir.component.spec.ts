import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteInserirComponent } from './cliente-inserir.component';

describe('ClienteInserirComponent', () => {
  let component: ClienteInserirComponent;
  let fixture: ComponentFixture<ClienteInserirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteInserirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteInserirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
