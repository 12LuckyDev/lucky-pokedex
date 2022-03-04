import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { PokedexFormEntry } from 'src/app/models';
import { PokedexSelectionService } from 'src/app/services/pokedex-selection/pokedex-selection.service';
import { SelectionChangeAwareComponent } from '../selection-change-aware/selection-change-aware.component';
import { FormsTableDataSource } from './forms-table-datasource';

@Component({
  selector: 'app-forms-table',
  templateUrl: './forms-table.component.html',
  styleUrls: ['./forms-table.component.scss'],
})
export class FormsTableComponent
  extends SelectionChangeAwareComponent
  implements AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<PokedexFormEntry>;

  dataSource: FormsTableDataSource;

  displayedColumns = ['select', 'image', 'formName'];

  constructor(
    private cdref: ChangeDetectorRef,
    override pokedexSelectionService: PokedexSelectionService
  ) {
    super(pokedexSelectionService);
    this.dataSource = new FormsTableDataSource();
  }

  get forms() {
    return this.entry.forms ?? [];
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.forms;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.cdref.detectChanges();
  }

  public changeSelection(entry: PokedexFormEntry): void {
    if (this.number) {
      this.pokedexSelectionService.changeFormSelection(this.number, entry.id);
    }
  }

  // TODO
  public isSelected(entry: PokedexFormEntry): boolean {
    if (this.number) {
      const selection = this.pokedexSelectionService.getSelection(this.number);
      return !!selection?.forms?.includes(entry.id);
    }
    return false;
  }
}
