import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { CountGendersPolicy } from 'src/app/enums';
import { PokeRegion } from 'src/app/enums/poke-region.enum';
import { PokedexRegionalFormEntry } from 'src/app/models';
import { PokedexOptionsService } from 'src/app/services/pokedex-options/pokedex-options.service';
import { PokedexSelectionService } from 'src/app/services/pokedex-selection/pokedex-selection.service';
import { SelectionType } from '../../poke-selection-check/poke-selection-check.component';
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

  displayedColumns = ['select', 'region'];

  constructor(
    override pokedexSelectionService: PokedexSelectionService,
    private pokedexOptionsService: PokedexOptionsService
  ) {
    super(pokedexSelectionService);
    this.dataSource = new RegionalFormsTableDataSource();
  }

  get regionalForms() {
    return this.entry.regionalForms ?? [];
  }

  get selectionTypes() {
    return SelectionType;
  }

  public get showGenders(): boolean {
    return (
      this.pokedexOptionsService.options.countGendersPolicy !==
      CountGendersPolicy.NO_COUNT
    );
  }

  public formatRegion(region: PokeRegion): string {
    return PokeRegion[region];
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.regionalForms;
    this.table.dataSource = this.dataSource;
  }
}
