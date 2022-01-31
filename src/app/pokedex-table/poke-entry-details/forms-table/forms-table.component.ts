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
import { PokedexSelectionService } from 'src/app/services/pokedex-selection/pokedex-options/pokedex-selection.service';
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
    const { id } = entry;
    const selectedForms = this.selection ? this.selection.forms ?? [] : [];

    if (this.isSelected(entry)) {
      selectedForms.splice(selectedForms.indexOf(id), 1);
    } else {
      selectedForms.push(id);
    }
    if (this.number && this.selection) {
      this.pokedexSelectionService.updateSelection(this.number, {
        ...this.selection,
        forms: selectedForms,
      });
    }
  }

  public isSelected(entry: PokedexFormEntry): boolean {
    if (this.selection === null || this.selection.forms === null) {
      return false;
    } else {
      return this.selection.forms.includes(entry.id);
    }
  }
}
