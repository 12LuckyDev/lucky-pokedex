import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PokedexTableEntry } from '../../models';
import { PokedexTableDataSource } from './pokedex-table-datasource';
import { POKEDEX_TABLE_ANIMATIONS } from './pokedex-table-animations';
import {
  PokedexOptionsService,
  PokedexSearchService,
  PokedexService,
} from '../../services';

@Component({
  selector: 'pokedex-table',
  templateUrl: './pokedex-table.component.html',
  styleUrls: ['./pokedex-table.component.scss', '../../styles/poke-table.scss'],
  animations: POKEDEX_TABLE_ANIMATIONS,
})
export class PokedexTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PokedexTableEntry>;
  dataSource!: PokedexTableDataSource;
  expanded: PokedexTableEntry | null;
  displayedColumns: string[];

  constructor(
    private cdref: ChangeDetectorRef,
    private pokedexService: PokedexService,
    private pokedexOptionsService: PokedexOptionsService,
    private pokedexSearchService: PokedexSearchService
  ) {
    this.expanded = null;
    this.displayedColumns = this.pokedexOptionsService.tablesColumns;
  }

  public get isGenderSelectable(): boolean {
    return this.pokedexOptionsService.isGenderSelectable;
  }

  ngOnInit(): void {
    this.pokedexOptionsService.tablesColumnsObservable.subscribe(
      (columns) => (this.displayedColumns = columns)
    );
  }

  ngAfterViewInit(): void {
    this.dataSource = new PokedexTableDataSource(
      this.pokedexService,
      this.pokedexSearchService,
      this.pokedexOptionsService,
      this.paginator,
      this.sort
    );
    this.table.dataSource = this.dataSource;
    this.dataSource.query();
    this.cdref.detectChanges();
  }

  public expand(entry: PokedexTableEntry) {
    this.expanded = this.expanded === entry ? null : entry;
  }

  public isExpansionDetailRow = (i: number, row: PokedexTableEntry) =>
    row.hasVariants;
}
