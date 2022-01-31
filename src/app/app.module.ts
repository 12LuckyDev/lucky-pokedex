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
import { PokedexDataService } from './services/pokedex-data/pokedex-data.service';
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
import { GenderDiffsComponent } from './pokedex-table/poke-entry-details/gender-diffs/gender-diffs.component';
import { GenderInfoComponent } from './pokedex-table/poke-entry-details/gender-diffs/gender-info/gender-info.component';
import { PokedexOptionsService } from './services/pokedex-options/pokedex-options.service';
import { PokeEntryDetailsComponent } from './pokedex-table/poke-entry-details/poke-entry-details.component';
import { PokedexSelectionService } from './services/pokedex-selection/pokedex-options/pokedex-selection.service';
import { SelectionChangeAwareComponent } from './pokedex-table/poke-entry-details/selection-change-aware/selection-change-aware.component';

@NgModule({
  declarations: [
    AppComponent,
    PokedexTableComponent,
    RegionalFormsTableComponent,
    FormsTableComponent,
    PokedexOptionsComponent,
    PokeImgComponent,
    GenderDiffsComponent,
    GenderInfoComponent,
    PokeEntryDetailsComponent,
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
    PokedexDataService,
    PokedexOptionsService,
    PokedexSelectionService,
    SelectionChangeAwareComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
