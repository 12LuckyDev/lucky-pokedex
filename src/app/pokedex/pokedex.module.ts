import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { PokeSelectionAllComponent } from './pokedex-table/poke-selection-all/poke-selection-all.component';
import { PokeImgComponent } from './pokedex-table/poke-selection-check/poke-img/poke-img.component';
import { PokeSelectionCheckComponent } from './pokedex-table/poke-selection-check/poke-selection-check.component';
import { PokeDetailedStatisticsComponent } from './pokedex-table/poke-statistics/poke-detailed-statistics/poke-detailed-statistics.component';
import { PokeStatisticsBarsComponent } from './pokedex-table/poke-statistics/poke-statistics-bars/poke-statistics-bars.component';
import { PokeStatisticsComponent } from './pokedex-table/poke-statistics/poke-statistics.component';
import { PokedexOptionsComponent } from './pokedex-table/pokedex-options/pokedex-options.component';
import { PokedexSearchComponent } from './pokedex-table/pokedex-search/pokedex-search.component';
import { PokedexTableComponent } from './pokedex-table/pokedex-table.component';
import { PokedexTypeComponent } from './pokedex-table/pokedex-types/pokedex-type/pokedex-type.component';
import { PokedexTypesComponent } from './pokedex-table/pokedex-types/pokedex-types.component';
import { VariantsTableComponent } from './pokedex-table/variants-table/variants-table.component';
import { PokedexComponent } from './pokedex.component';

const ANGULAR_MODULES = [CommonModule, ReactiveFormsModule];

const CUSTOM_MODULES = [FlexLayoutModule, TranslateModule];

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatProgressBarModule,
  MatDialogModule,
];

const POKEDEX_COMPONENTS = [
  PokedexComponent,
  PokedexTableComponent,
  VariantsTableComponent,
  PokedexOptionsComponent,
  PokeImgComponent,
  PokeSelectionCheckComponent,
  PokedexSearchComponent,
  PokeSelectionAllComponent,
  PokedexTypesComponent,
  PokedexTypeComponent,
  PokeStatisticsComponent,
  PokeStatisticsBarsComponent,
  PokeDetailedStatisticsComponent,
];

@NgModule({
  declarations: [POKEDEX_COMPONENTS],
  exports: [PokedexComponent],
  imports: [ANGULAR_MODULES, MATERIAL_MODULES, CUSTOM_MODULES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PokedexModule {}
