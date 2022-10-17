import { TestBed } from '@angular/core/testing';

import { ProtegiendoRutaGuard } from './protegiendo-ruta.guard';

describe('ProtegiendoRutaGuard', () => {
  let guard: ProtegiendoRutaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtegiendoRutaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
