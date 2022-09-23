import { TestBed } from '@angular/core/testing';

import { PokedexDialogService } from './pokedex-dialog.service';

describe('PokedexDialogService', () => {
  let service: PokedexDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedexDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
