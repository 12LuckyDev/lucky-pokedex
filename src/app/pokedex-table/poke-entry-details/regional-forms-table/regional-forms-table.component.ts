import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { PokeRegion } from 'src/app/enums/poke-region.enum';
import { PokedexRegionalFormEntry } from 'src/app/models';
import { RegionalFormsTableDataSource } from './regional-forms-table-datasource';

@Component({
  selector: 'app-regional-forms-table',
  templateUrl: './regional-forms-table.component.html',
  styleUrls: ['./regional-forms-table.component.scss'],
})
export class RegionalFormsTableComponent implements AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<PokedexRegionalFormEntry>;
  @Input() regionalForms: PokedexRegionalFormEntry[] = [];
  @Input() selectedRegionalForms: PokeRegion[] = [];
  @Output() regionalFormSelectionChange = new EventEmitter<PokeRegion[]>();

  dataSource: RegionalFormsTableDataSource;

  displayedColumns = ['select', 'image', 'region'];

  formatRegion(region: PokeRegion): string {
    return PokeRegion[region];
  }

  constructor() {
    this.dataSource = new RegionalFormsTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.regionalForms;
    this.table.dataSource = this.dataSource;
  }

  public changeSelection(entry: PokedexRegionalFormEntry): void {
    const { region } = entry;
    if (this.isSelected(entry)) {
      this.selectedRegionalForms.splice(
        this.selectedRegionalForms.indexOf(region),
        1
      );
    } else {
      this.selectedRegionalForms.push(region);
    }
    this.regionalFormSelectionChange.emit(this.selectedRegionalForms);
  }

  public isSelected(entry: PokedexRegionalFormEntry): boolean {
    return this.selectedRegionalForms.includes(entry.region);
  }
}
