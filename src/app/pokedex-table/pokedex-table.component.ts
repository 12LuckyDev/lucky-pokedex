import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PokedexEntry } from '../models';
import { PokedexDataService } from '../services/pokedex-data/pokedex-data.service';
import { PokedexTableDataSource } from './pokedex-table-datasource';
import { POKEDEX_TABLE_ANIMATIONS } from './pokedex-table-animations';
import { PokedexOptionsService } from '../services/pokedex-options/pokedex-options.service';
import { CountGendersPolicy } from '../enums';
import { PokedexSearchService } from '../services/pokedex-search/pokedex-search.service';

@Component({
  selector: 'app-pokedex-table',
  templateUrl: './pokedex-table.component.html',
  styleUrls: ['./pokedex-table.component.scss'],
  animations: POKEDEX_TABLE_ANIMATIONS,
})
export class PokedexTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PokedexEntry>;
  dataSource: PokedexTableDataSource;
  expanded: PokedexEntry | null;

  constructor(
    private cdref: ChangeDetectorRef,
    private pokedexDataService: PokedexDataService,
    private pokedexOptionsService: PokedexOptionsService,
    private pokedexSearchService: PokedexSearchService
  ) {
    this.dataSource = new PokedexTableDataSource(
      this.pokedexDataService,
      this.pokedexOptionsService,
      this.pokedexSearchService
    );
    this.expanded = null;
  }

  public get showGenders(): boolean {
    return (
      this.pokedexOptionsService.options.countGendersPolicy !==
      CountGendersPolicy.NO_COUNT
    );
  }

  public get displayedColumns(): string[] {
    return this.showGenders
      ? ['select', 'number', 'name']
      : ['select', 'number', 'image', 'name'];
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.query();
    this.cdref.detectChanges();
  }
}
