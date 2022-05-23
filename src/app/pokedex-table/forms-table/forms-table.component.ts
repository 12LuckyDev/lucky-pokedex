import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { PokedexTableForm } from 'src/app/models/pokedex-table-form.model';
import { PokedexOptionsService } from 'src/app/services';
import { PokedexBaseComponent } from '../pokedex-base-component/pokedex-base.component';
import { FormsTableDataSource } from './forms-table-datasource';

@Component({
  selector: 'app-forms-table',
  templateUrl: './forms-table.component.html',
  styleUrls: ['./forms-table.component.scss', '../../styles/poke-table.scss'],
})
export class FormsTableComponent
  extends PokedexBaseComponent
  implements AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<PokedexTableForm>;

  dataSource!: FormsTableDataSource;

  constructor(
    private cdref: ChangeDetectorRef,
    private pokedexOptionsService: PokedexOptionsService
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
    this.dataSource = new FormsTableDataSource(
      this.pokedexOptionsService,
      this.paginator,
      this.entry
    );
    this.table.dataSource = this.dataSource;
    this.dataSource.query();
    this.cdref.detectChanges();
  }
}
