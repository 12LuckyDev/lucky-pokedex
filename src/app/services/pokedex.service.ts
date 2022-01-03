import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PokedexEntry } from '../models';
import POKEDEX_LIST from './pokedex.json';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  constructor() {}

  getPokedexList(): Observable<PokedexEntry[]> {
    return of([...POKEDEX_LIST] as PokedexEntry[]);
  }
}
