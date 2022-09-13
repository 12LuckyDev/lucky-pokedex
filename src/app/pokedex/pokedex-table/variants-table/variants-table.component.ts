import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { PokedexTableVariant } from 'src/app/models';
import { PokedexOptionsService, PokedexService } from 'src/app/services';
import { PokedexBaseComponent } from '../../../common/components/pokedex-base.component';
import { VariantsTableDataSource } from './variants-table-datasource';

@Component({
  selector: 'app-forms-table',
  templateUrl: './variants-table.component.html',
  styleUrls: [
    './variants-table.component.scss',
    '../../styles/poke-table.scss',
  ],
})
export class VariantsTableComponent
  extends PokedexBaseComponent
  implements AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<PokedexTableVariant>;

  dataSource!: VariantsTableDataSource;

  constructor(
    private cdref: ChangeDetectorRef,
    private pokedexOptionsService: PokedexOptionsService,
    private pokedexService: PokedexService
  ) {
    super();
  }

  public get displayedColumns(): string[] {
    return this.pokedexOptionsService.tablesColumns;
  }

  get forms() {
    return this.entry.formsData?.forms ?? [];
  }

  public get isGenderSelectable(): boolean {
    return this.pokedexOptionsService.isGenderSelectable;
  }

  ngAfterViewInit(): void {
    this.dataSource = new VariantsTableDataSource(
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
