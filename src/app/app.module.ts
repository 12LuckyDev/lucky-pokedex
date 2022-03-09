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
import { RegionalFormsTableComponent } from './pokedex-table/poke-entry-details/regional-forms-table/regional-forms-table.component';
import { FormsTableComponent } from './pokedex-table/poke-entry-details/forms-table/forms-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokedexOptionsComponent } from './pokedex-table/pokedex-options/pokedex-options.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PokeImgComponent } from './pokedex-table/poke-img/poke-img.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PokeEntryDetailsComponent } from './pokedex-table/poke-entry-details/poke-entry-details.component';
import { PokedexBaseComponent } from './pokedex-table/pokedex-base-component/pokedex-base.component';
import { PokeSelectionCheckComponent } from './pokedex-table/poke-selection-check/poke-selection-check.component';
import { PokedexSearchComponent } from './pokedex-table/pokedex-search/pokedex-search.component';
import { DEFAULT_CONFIG, NgForageOptions } from 'ngforage';

@NgModule({
  declarations: [
    AppComponent,
    PokedexTableComponent,
    RegionalFormsTableComponent,
    FormsTableComponent,
    PokedexOptionsComponent,
    PokeImgComponent,
    PokeEntryDetailsComponent,
    PokeSelectionCheckComponent,
    PokedexSearchComponent,
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
    FlexLayoutModule,
  ],
  providers: [
    PokedexBaseComponent,
    {
      provide: DEFAULT_CONFIG,
      useValue: {
        name: 'Pokedex',
      } as NgForageOptions,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
