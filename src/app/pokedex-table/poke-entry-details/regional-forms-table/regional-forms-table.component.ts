import { toggle } from '@12luckydev/utils';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { PokeRegion } from 'src/app/enums/poke-region.enum';
import { PokedexRegionalFormEntry } from 'src/app/models';
import { PokedexSelectionService } from 'src/app/services/pokedex-selection/pokedex-options/pokedex-selection.service';
import { SelectionChangeAwareComponent } from '../selection-change-aware/selection-change-aware.component';
import { RegionalFormsTableDataSource } from './regional-forms-table-datasource';

@Component({
  selector: 'app-regional-forms-table',
  templateUrl: './regional-forms-table.component.html',
  styleUrls: ['./regional-forms-table.component.scss'],
})
export class RegionalFormsTableComponent
  extends SelectionChangeAwareComponent
  implements AfterViewInit
{
  @ViewChild(MatTable) table!: MatTable<PokedexRegionalFormEntry>;

  dataSource: RegionalFormsTableDataSource;

  displayedColumns = ['select', 'image', 'region'];

  formatRegion(region: PokeRegion): string {
    return PokeRegion[region];
  }

  constructor(override pokedexSelectionService: PokedexSelectionService) {
    super(pokedexSelectionService);
    this.dataSource = new RegionalFormsTableDataSource();
  }

  get regionalForms() {
    return this.entry.regionalForms ?? [];
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.regionalForms;
    this.table.dataSource = this.dataSource;
  }

  public changeSelection(entry: PokedexRegionalFormEntry): void {
    if (this.number) {
      this.pokedexSelectionService.changeRegionalFormSelection(
        this.number,
        entry.region
      );
    }
  }

  // TODO
  public isSelected(entry: PokedexRegionalFormEntry): boolean {
    if (this.number) {
      const selection = this.pokedexSelectionService.getSelection(this.number);
      return !!selection?.regionalForms?.includes(entry.region);
    }
    return false;
  }
}
