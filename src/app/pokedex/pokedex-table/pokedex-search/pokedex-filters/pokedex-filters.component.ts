import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormComponent } from 'src/app/common';
import { PokeGame, PokeRegion } from 'src/app/enums';
import { PokedexFilters } from 'src/app/models/app-logic/pokedex-filters.model';
import { PokedexSearchService } from 'src/app/services';
import { formatGame, formatRegion } from 'src/app/utils';
import { retry, takeUntil } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

const REGIONS_LIST = [
  { id: PokeRegion.kanto, name: formatRegion(PokeRegion.kanto) },
  { id: PokeRegion.johto, name: formatRegion(PokeRegion.johto) },
  { id: PokeRegion.hoenn, name: formatRegion(PokeRegion.hoenn) },
  { id: PokeRegion.sinnoh, name: formatRegion(PokeRegion.sinnoh) },
  { id: PokeRegion.unova, name: formatRegion(PokeRegion.unova) },
  { id: PokeRegion.kalos, name: formatRegion(PokeRegion.kalos) },
  { id: PokeRegion.alola, name: formatRegion(PokeRegion.alola) },
  { id: PokeRegion.galar, name: formatRegion(PokeRegion.galar) },
  { id: PokeRegion.hisui, name: formatRegion(PokeRegion.hisui) },
  { id: PokeRegion.unknown, name: formatRegion(PokeRegion.unknown) },
];

const GAMES_LIST = [
  { id: PokeGame.lets_go_pikachu, name: formatGame(PokeGame.lets_go_pikachu) },
  { id: PokeGame.lets_go_eevee, name: formatGame(PokeGame.lets_go_eevee) },
  { id: PokeGame.sword, name: formatGame(PokeGame.sword) },
  {
    id: PokeGame.isle_of_armor_sword,
    name: formatGame(PokeGame.isle_of_armor_sword),
  },
  {
    id: PokeGame.crown_tundra_sword,
    name: formatGame(PokeGame.crown_tundra_sword),
  },
  { id: PokeGame.shield, name: formatGame(PokeGame.shield) },
  {
    id: PokeGame.isle_of_armor_shield,
    name: formatGame(PokeGame.isle_of_armor_shield),
  },
  {
    id: PokeGame.crown_tundra_shield,
    name: formatGame(PokeGame.crown_tundra_shield),
  },
  {
    id: PokeGame.brilliant_diamond,
    name: formatGame(PokeGame.brilliant_diamond),
  },
  { id: PokeGame.shining_pearl, name: formatGame(PokeGame.shining_pearl) },
  { id: PokeGame.legends_arceus, name: formatGame(PokeGame.legends_arceus) },
  { id: PokeGame.scarlet, name: formatGame(PokeGame.scarlet) },
  { id: PokeGame.violet, name: formatGame(PokeGame.violet) },
];

@Component({
  selector: 'app-pokedex-filters',
  templateUrl: './pokedex-filters.component.html',
  styleUrls: ['./pokedex-filters.component.scss'],
})
export class PokedexFiltersComponent
  extends FormComponent<PokedexFilters>
  implements OnInit
{
  constructor(
    override fb: FormBuilder,
    private pokedexSearchService: PokedexSearchService,
    private dialogRef: MatDialogRef<PokedexFiltersComponent>
  ) {
    super(fb, {
      origins: [[]],
      obtainableIn: [[]],
    });
  }

  ngOnInit(): void {
    this.pokedexSearchService.searchObservable
      .pipe(takeUntil(this.destroyed))
      .subscribe(({ filters }) => this.setForm(filters));
  }

  public get regions() {
    return REGIONS_LIST;
  }

  public get games() {
    return GAMES_LIST;
  }

  public save() {
    this.pokedexSearchService.changeFilters(this.buildModel());
    this.dialogRef.close();
  }
}
