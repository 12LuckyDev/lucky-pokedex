import { TestBed } from '@angular/core/testing';

import { PokedexStorageService } from './pokedex-storage.service';

describe('PokedexStorageService', () => {
  let service: PokedexStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedexStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
