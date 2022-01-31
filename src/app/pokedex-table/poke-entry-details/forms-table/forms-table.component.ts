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
import { FormsTableDataSource } from './forms-table-datasource';

@Component({
  selector: 'app-forms-table',
  templateUrl: './forms-table.component.html',
  styleUrls: ['./forms-table.component.scss'],
})
export class FormsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<PokedexFormEntry>;
  @Input() forms: PokedexFormEntry[] = [];

  @Input() selectedForms: number[] = [];
  @Output() formSelectionChange = new EventEmitter<number[]>();

  dataSource: FormsTableDataSource;

  displayedColumns = ['select', 'image', 'formName'];

  constructor(private cdref: ChangeDetectorRef) {
    this.dataSource = new FormsTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.forms;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.cdref.detectChanges();
  }

  public changeSelection(entry: PokedexFormEntry): void {
    const { id } = entry;
    if (this.isSelected(entry)) {
      this.selectedForms.splice(this.selectedForms.indexOf(id), 1);
    } else {
      this.selectedForms.push(id);
    }
    this.formSelectionChange.emit(this.selectedForms);
  }

  public isSelected(entry: PokedexFormEntry): boolean {
    return this.selectedForms.includes(entry.id);
  }
}
