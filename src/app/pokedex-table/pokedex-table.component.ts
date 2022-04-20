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
import { PokedexTableDataSource } from './pokedex-table-datasource';
import { POKEDEX_TABLE_ANIMATIONS } from './pokedex-table-animations';
import { CountGendersPolicy } from '../enums';
import {
  PokedexDataService,
  PokedexOptionsService,
  PokedexSearchService,
} from '../services';

@Component({
  selector: 'app-pokedex-table',
  templateUrl: './pokedex-table.component.html',
  styleUrls: ['./pokedex-table.component.scss', '../styles/poke-table.scss'],
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
      this.pokedexOptionsService.options?.countGendersPolicy !==
      CountGendersPolicy.NO_COUNT
    );
  }

  public get displayedColumns(): string[] {
    return ['selectAll', 'select', 'number', 'name'];
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.query();
    this.cdref.detectChanges();
  }

  public expand(entry: PokedexEntry) {
    this.expanded = this.expanded === entry ? null : entry;
  }

  public isExpandable(entry: PokedexEntry) {
    return this.pokedexOptionsService.getIsExpandable(entry);
  }
}
