import { TestBed } from '@angular/core/testing';

import { PokedexUiServiceService } from './pokedex-ui-service.service';

describe('PokedexUiServiceService', () => {
  let service: PokedexUiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedexUiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
