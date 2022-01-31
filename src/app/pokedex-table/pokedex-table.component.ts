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
import {
  PokedexSelectionModel,
  PokedexSelectionService,
} from '../services/pokedex-selection/pokedex-options/pokedex-selection.service';

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

  displayedColumns = ['select', 'number', 'image', 'name'];

  constructor(
    private cdref: ChangeDetectorRef,
    private pokedexDataService: PokedexDataService,
    private pokedexOptionsService: PokedexOptionsService,
    private pokedexSelectionService: PokedexSelectionService
  ) {
    this.dataSource = new PokedexTableDataSource(
      this.pokedexDataService,
      this.pokedexOptionsService
    );
    this.expanded = null;
  }

  get optionsSubject(): BehaviorSubject<PokedexOptions> {
    return this.pokedexOptionsService.optionsSubject;
  }

  public changeSelection(entry: PokedexEntry): void {
    const { number } = entry;
    this.pokedexSelectionService.updateSelection(number, {
      ...this.pokedexSelectionService.getSelection(entry.number),
      selected: !this.isSelected(entry),
    });
  }

  public isSelected(entry: PokedexEntry): boolean {
    const selectionModel = this.pokedexSelectionService.getSelection(
      entry.number
    );
    return selectionModel.selected;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.query();
    this.cdref.detectChanges();
  }
}
