import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { PokedexBaseComponent } from 'src/app/common';
import { PokedexTableVariant } from 'src/app/models';
import { PokedexOptionsService, PokedexService } from 'src/app/services';
import { PokedexVariantsTableDataSource } from './pokedex-variants-table-datasource';

@Component({
  selector: 'pokedex-variants-table',
  templateUrl: './pokedex-variants-table.component.html',
  styleUrls: ['../../../styles/poke-table.scss'],
})
export class PokedexVariantsTableComponent
  extends PokedexBaseComponent
  implements OnInit, AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<PokedexTableVariant>;

  dataSource!: PokedexVariantsTableDataSource;
  displayedColumns: string[];

  constructor(
    private cdref: ChangeDetectorRef,
    private pokedexOptionsService: PokedexOptionsService,
    private pokedexService: PokedexService
  ) {
    super();
    this.displayedColumns = this.pokedexOptionsService.tablesColumns;
  }

  get forms() {
    return this.entry.formsData?.forms ?? [];
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
    this.dataSource = new PokedexVariantsTableDataSource(
      this.pokedexService,
      this.pokedexOptionsService,
      this.paginator,
      this.entry
    );
    this.table.dataSource = this.dataSource;
    this.dataSource.query();
    this.cdref.detectChanges();
  }
}
