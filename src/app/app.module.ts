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
import { PokedexService } from './services/pokedex.service';
import { RegionalFormsTableComponent } from './pokedex-table/regional-forms-table/regional-forms-table.component';
import { FormsTableComponent } from './pokedex-table/forms-table/forms-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokedexOptionsComponent } from './pokedex-table/pokedex-options/pokedex-options.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PokeImgComponent } from './pokedex-table/poke-img/poke-img.component';

@NgModule({
  declarations: [
    AppComponent,
    PokedexTableComponent,
    RegionalFormsTableComponent,
    FormsTableComponent,
    PokedexOptionsComponent,
    PokeImgComponent,
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
    MatRadioModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
  ],
  providers: [PokedexService],
  bootstrap: [AppComponent],
})
export class AppModule {}
