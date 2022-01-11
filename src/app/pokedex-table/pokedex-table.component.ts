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
import { PokedexService } from '../services/pokedex.service';
import { PokedexTableDataSource } from './pokedex-table-datasource';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  CountFormsPolicy,
  CountGendersPolicy,
  CountRegionalFormsPolicy,
} from '../enums';

@Component({
  selector: 'app-pokedex-table',
  templateUrl: './pokedex-table.component.html',
  styleUrls: ['./pokedex-table.component.scss'],
  animations: [
    trigger('detail-expand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class PokedexTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PokedexEntry>;
  dataSource: PokedexTableDataSource;
  selection: SelectionModel<PokedexEntry>;
  expanded: PokedexEntry | null;

  displayedColumns = ['select', 'number', 'image', 'name'];

  private _options: PokedexOptions;

  constructor(
    private cdref: ChangeDetectorRef,
    private pokedexService: PokedexService
  ) {
    this.dataSource = new PokedexTableDataSource();
    this.selection = new SelectionModel<PokedexEntry>(true, []);
    this.expanded = null;
    this._options = {
      countFormsPolicy: CountFormsPolicy.COUNT_ALL,
      countRegionalFormsPolicy: CountRegionalFormsPolicy.COUNT_ALL,
      countGendersPolicy: CountGendersPolicy.NO_COUNT,
    };
  }

  get options(): PokedexOptions {
    return this._options;
  }

  set options(options: PokedexOptions) {
    this._options = options;
    console.log('OPTIONS CHANGED', options);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.pokedexService.getPokedexList().subscribe((pokedexList) => {
      this.dataSource.data = pokedexList;
      this.cdref.detectChanges();
    });
  }
}
