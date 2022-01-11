import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  CountFormsPolicy,
  CountGendersPolicy,
  CountRegionalFormsPolicy,
} from 'src/app/enums';
import { PokedexOptions } from 'src/app/models';

const COUNT_FORMS_POLICY_OPTIONS = [
  {
    id: CountFormsPolicy.COUNT_ALL,
    name: CountFormsPolicy[CountFormsPolicy.COUNT_ALL],
  },
  {
    id: CountFormsPolicy.NO_COUNT_VISUAL_ONLY,
    name: CountFormsPolicy[CountFormsPolicy.NO_COUNT_VISUAL_ONLY],
  },
  {
    id: CountFormsPolicy.NO_COUNT,
    name: CountFormsPolicy[CountFormsPolicy.NO_COUNT],
  },
];

const COUNT_REGIONAL_FORMS_POLICY = [
  {
    id: CountRegionalFormsPolicy.COUNT_ALL,
    name: CountRegionalFormsPolicy[CountRegionalFormsPolicy.COUNT_ALL],
  },
  {
    id: CountRegionalFormsPolicy.NO_COUNT,
    name: CountRegionalFormsPolicy[CountRegionalFormsPolicy.NO_COUNT],
  },
];

const COUNT_GENDERS_POLICY = [
  {
    id: CountGendersPolicy.COUNT_ALL,
    name: CountGendersPolicy[CountGendersPolicy.COUNT_ALL],
  },
  {
    id: CountGendersPolicy.COUNT_ALL_WITH_DIFFS,
    name: CountGendersPolicy[CountGendersPolicy.COUNT_ALL_WITH_DIFFS],
  },
  {
    id: CountGendersPolicy.NO_COUNT_VISUAL_ONLY,
    name: CountGendersPolicy[CountGendersPolicy.NO_COUNT_VISUAL_ONLY],
  },
  {
    id: CountGendersPolicy.NO_COUNT,
    name: CountGendersPolicy[CountGendersPolicy.NO_COUNT],
  },
];

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

  get countFormsPolicyOptions() {
    return COUNT_FORMS_POLICY_OPTIONS;
  }

  get countRegionalFormsPolicyOptions() {
    return COUNT_REGIONAL_FORMS_POLICY;
  }

  get countGendersPolicyOptions() {
    return COUNT_GENDERS_POLICY;
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
