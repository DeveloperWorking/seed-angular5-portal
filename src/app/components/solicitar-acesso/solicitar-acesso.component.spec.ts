import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarAcessoComponent } from './solicitar-acesso.component';

describe('SolicitarAcessoComponent', () => {
  let component: SolicitarAcessoComponent;
  let fixture: ComponentFixture<SolicitarAcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarAcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
