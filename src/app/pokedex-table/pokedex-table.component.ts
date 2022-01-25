import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PokedexEntry, PokedexOptions } from '../models';
import { PokedexDataService } from '../services/pokedex-data/pokedex-data.service';
import { PokedexTableDataSource } from './pokedex-table-datasource';
import { BehaviorSubject } from 'rxjs';
import { POKEDEX_TABLE_ANIMATIONS } from './pokedex-table-animations';
import { PokedexOptionsService } from '../services/pokedex-options/pokedex-options.service';

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
  selection: SelectionModel<PokedexEntry>;
  expanded: PokedexEntry | null;

  displayedColumns = ['select', 'number', 'image', 'name'];

  constructor(
    private cdref: ChangeDetectorRef,
    private pokedexDataService: PokedexDataService,
    private pokedexOptionsService: PokedexOptionsService
  ) {
    this.dataSource = new PokedexTableDataSource(
      this.pokedexDataService,
      this.pokedexOptionsService
    );
    this.selection = new SelectionModel<PokedexEntry>(true, []);
    this.expanded = null;
  }

  get optionsSubject(): BehaviorSubject<PokedexOptions> {
    return this.pokedexOptionsService.optionsSubject;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.query();
    this.cdref.detectChanges();
  }
}
