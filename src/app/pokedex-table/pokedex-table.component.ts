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
      this.pokedexSearchService
    );
    this.expanded = null;
  }

  public get isGenderSelectable(): boolean {
    return this.pokedexOptionsService.isGenderSelectable;
  }

  public get displayedColumns(): string[] {
    const colums = this.pokedexOptionsService.showSelectAll
      ? ['selectAll', 'select', 'number', 'name', 'types']
      : ['select', 'number', 'name', 'types'];

    if (this.pokedexOptionsService.showExpand) {
      colums.push('expand');
    }

    return colums;
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
