import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { PokedexTableComponent } from './pokedex-table/pokedex-table.component';
import { VariantsTableComponent } from './pokedex-table/variants-table/variants-table.component';
import { PokedexOptionsComponent } from './pokedex-table/pokedex-options/pokedex-options.component';
import { PokeImgComponent } from './pokedex-table/poke-selection-check/poke-img/poke-img.component';
import { PokedexBaseComponent } from './pokedex-table/pokedex-base-component/pokedex-base.component';
import { PokeSelectionCheckComponent } from './pokedex-table/poke-selection-check/poke-selection-check.component';
import { PokedexSearchComponent } from './pokedex-table/pokedex-search/pokedex-search.component';
import { PokeSelectionAllComponent } from './pokedex-table/poke-selection-all/poke-selection-all.component';
import { PokedexTypesComponent } from './pokedex-table/pokedex-types/pokedex-types.component';
import { PokedexTypeComponent } from './pokedex-table/pokedex-types/pokedex-type/pokedex-type.component';
import { PokeStatisticsComponent } from './pokedex-table/poke-statistics/poke-statistics.component';
import { PokeStatisticsBarsComponent } from './pokedex-table/poke-statistics/poke-statistics-bars/poke-statistics-bars.component';
import { PokeDetailedStatisticsComponent } from './pokedex-table/poke-statistics/poke-detailed-statistics/poke-detailed-statistics.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

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

@NgModule({
  declarations: [
    AppComponent,
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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ...MATERIAL_MODULES,
  ],
  providers: [PokedexBaseComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
