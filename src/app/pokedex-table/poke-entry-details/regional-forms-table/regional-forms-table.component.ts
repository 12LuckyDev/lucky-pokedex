import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
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

  dataSource: RegionalFormsTableDataSource;

  displayedColumns = ['image', 'region'];

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
}
