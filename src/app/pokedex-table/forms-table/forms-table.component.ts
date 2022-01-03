import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
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

  onToggleHandler(item: PokedexFormEntry): void {
    console.log(item);
  }
}
