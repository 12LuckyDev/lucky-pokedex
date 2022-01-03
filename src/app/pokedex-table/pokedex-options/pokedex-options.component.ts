import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  CountFormsPolicy,
  CountGendersPolicy,
  CountRegionalFormsPolicy,
} from 'src/app/enums';
import { PokedexOptions } from 'src/app/models';

@Component({
  selector: 'app-pokedex-options',
  templateUrl: './pokedex-options.component.html',
  styleUrls: ['./pokedex-options.component.scss'],
})
export class PokedexOptionsComponent implements OnInit {
  optionsForm: FormGroup;
  @Input() options!: PokedexOptions;
  @Output() optionsChange = new EventEmitter<PokedexOptions>();

  constructor(private fb: FormBuilder) {
    this.optionsForm = this.fb.group({
      countFormsPolicy: [],
      countRegionalFormsPolicy: [],
      countGendersPolicy: [],
    });
  }

  ngOnInit(): void {
    if (this.options) {
      this.optionsForm.controls['countFormsPolicy'].setValue(
        this.options.countFormsPolicy
      );
      this.optionsForm.controls['countRegionalFormsPolicy'].setValue(
        this.options.countRegionalFormsPolicy
      );
      this.optionsForm.controls['countGendersPolicy'].setValue(
        this.options.countGendersPolicy
      );
    }
    this.optionsForm.valueChanges.subscribe(() => {
      this.optionsChange.emit(this.buidlOptionsModel());
    });
  }

  private buidlOptionsModel(): PokedexOptions {
    const countFormsPolicy = this.optionsForm.controls['countFormsPolicy']
      .value as CountFormsPolicy;
    const countRegionalFormsPolicy = this.optionsForm.controls[
      'countRegionalFormsPolicy'
    ].value as CountRegionalFormsPolicy;
    const countGendersPolicy = this.optionsForm.controls['countGendersPolicy']
      .value as CountGendersPolicy;

    return {
      countFormsPolicy,
      countRegionalFormsPolicy,
      countGendersPolicy,
    };
  }
}
