import { TestBed } from '@angular/core/testing';

import { PokedexStatisticsService } from './pokedex-statistics.service';

describe('PokedexStatisticsService', () => {
  let service: PokedexStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedexStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
