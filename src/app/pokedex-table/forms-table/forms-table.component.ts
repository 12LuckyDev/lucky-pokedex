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
    this.dataSource = new FormsTableDataSource(this.pokedexOptionsService);
  }

  public get displayedColumns(): string[] {
    const colums = ['selectAll', 'select', 'number', 'name', 'types'];

    if (this.pokedexOptionsService.showExpand) {
      colums.push('expand');
    }

    return colums;
  }

  get forms() {
    return this.entry.forms ?? [];
  }

  public get isGenderSelectable(): boolean {
    return this.pokedexOptionsService.isGenderSelectable;
  }

  ngAfterViewInit(): void {
    this.dataSource.entry = this.entry;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.query();
    this.cdref.detectChanges();
  }
}
