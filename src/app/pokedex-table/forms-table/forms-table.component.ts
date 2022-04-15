import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { CountGendersPolicy, PokeFormType } from 'src/app/enums';
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
  displayedColumns = ['select', 'formName'];

  constructor(
    private cdref: ChangeDetectorRef,
    private pokedexOptionsService: PokedexOptionsService
  ) {
    super();
  }

  get forms() {
    return this.entry.forms ?? [];
  }

  get selectionTypes() {
    return PokeFormType;
  }

  public get showGenders(): boolean {
    return (
      this.pokedexOptionsService.options?.countGendersPolicy !==
      CountGendersPolicy.NO_COUNT
    );
  }

  ngAfterViewInit(): void {
    this.dataSource = new FormsTableDataSource(
      this.pokedexOptionsService,
      this.entry
    );
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.cdref.detectChanges();
  }
}
