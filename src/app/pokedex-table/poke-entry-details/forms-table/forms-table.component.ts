import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { CountGendersPolicy } from 'src/app/enums';
import { PokedexFormEntry } from 'src/app/models';
import { PokedexOptionsService } from 'src/app/services';
import { SelectionType } from '../../poke-selection-check/poke-selection-check.component';
import { PokedexBaseComponent } from '../../pokedex-base-component/pokedex-base.component';
import { FormsTableDataSource } from './forms-table-datasource';

@Component({
  selector: 'app-forms-table',
  templateUrl: './forms-table.component.html',
  styleUrls: ['./forms-table.component.scss'],
})
export class FormsTableComponent
  extends PokedexBaseComponent
  implements AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<PokedexFormEntry>;

  dataSource: FormsTableDataSource;

  displayedColumns = ['select', 'formName'];

  constructor(
    private cdref: ChangeDetectorRef,
    private pokedexOptionsService: PokedexOptionsService
  ) {
    super();
    this.dataSource = new FormsTableDataSource();
  }

  get forms() {
    return this.entry.forms ?? [];
  }

  get selectionTypes() {
    return SelectionType;
  }

  public get showGenders(): boolean {
    return (
      this.pokedexOptionsService.options?.countGendersPolicy !==
      CountGendersPolicy.NO_COUNT
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.forms;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.cdref.detectChanges();
  }
}
