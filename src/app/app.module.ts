import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PokedexTableComponent } from './pokedex-table/pokedex-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { VariantsTableComponent } from './pokedex-table/variants-table/variants-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokedexOptionsComponent } from './pokedex-table/pokedex-options/pokedex-options.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PokeImgComponent } from './pokedex-table/poke-selection-check/poke-img/poke-img.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PokedexBaseComponent } from './pokedex-table/pokedex-base-component/pokedex-base.component';
import { PokeSelectionCheckComponent } from './pokedex-table/poke-selection-check/poke-selection-check.component';
import { PokedexSearchComponent } from './pokedex-table/pokedex-search/pokedex-search.component';
import { PokeSelectionAllComponent } from './pokedex-table/poke-selection-all/poke-selection-all.component';
import { PokedexTypesComponent } from './pokedex-table/pokedex-types/pokedex-types.component';
import { PokedexTypeComponent } from './pokedex-table/pokedex-types/pokedex-type/pokedex-type.component';
import { PokeStatisticsComponent } from './pokedex-table/poke-statistics/poke-statistics.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatProgressBarModule,
    FlexLayoutModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [PokedexBaseComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
