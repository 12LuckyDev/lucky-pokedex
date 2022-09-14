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
import { MatTooltipModule } from '@angular/material/tooltip';

import { PokedexComponent } from './pokedex.component';
import { PokedexSelectionAllComponent } from './pokedex-table/pokedex-selection-all/pokedex-selection-all.component';
import { PokedexImgComponent } from './pokedex-table/pokedex-selection-check/pokedex-img/pokedex-img.component';
import { PokedexSelectionCheckComponent } from './pokedex-table/pokedex-selection-check/pokedex-selection-check.component';
import { PokedexDetailedStatisticsComponent } from './pokedex-table/pokedex-statistics/pokedex-detailed-statistics/pokedex-detailed-statistics.component';
import { PokedexStatisticsBarsComponent } from './pokedex-table/pokedex-statistics/pokedex-statistics-bars/pokedex-statistics-bars.component';
import { PokedexStatisticsComponent } from './pokedex-table/pokedex-statistics/pokedex-statistics.component';
import { PokedexOptionsComponent } from './pokedex-table/pokedex-options/pokedex-options.component';
import { PokedexSearchComponent } from './pokedex-table/pokedex-search/pokedex-search.component';
import { PokedexTableComponent } from './pokedex-table/pokedex-table.component';
import { PokedexTypeComponent } from './pokedex-table/pokedex-types/pokedex-type/pokedex-type.component';
import { PokedexTypesComponent } from './pokedex-table/pokedex-types/pokedex-types.component';
import { PokedexVariantsTableComponent } from './pokedex-table/pokedex-variants-table/pokedex-variants-table.component';

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
  MatTooltipModule,
];

const POKEDEX_COMPONENTS = [
  PokedexComponent,
  PokedexTableComponent,
  PokedexVariantsTableComponent,
  PokedexOptionsComponent,
  PokedexImgComponent,
  PokedexSelectionCheckComponent,
  PokedexSearchComponent,
  PokedexSelectionAllComponent,
  PokedexTypesComponent,
  PokedexTypeComponent,
  PokedexStatisticsComponent,
  PokedexStatisticsBarsComponent,
  PokedexDetailedStatisticsComponent,
];

@NgModule({
  declarations: [POKEDEX_COMPONENTS],
  exports: [PokedexComponent],
  imports: [ANGULAR_MODULES, MATERIAL_MODULES, CUSTOM_MODULES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PokedexModule {}
