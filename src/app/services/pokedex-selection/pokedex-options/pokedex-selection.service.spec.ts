import { TestBed } from '@angular/core/testing';

import { PokedexSelectionService } from './pokedex-selection.service';

describe('PokedexOptionsService', () => {
  let service: PokedexSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedexSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
