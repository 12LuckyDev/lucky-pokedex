import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { FormComponent } from 'src/app/common/form.component';
import {
  CountFormsPolicy,
  CountGendersPolicy,
  CountRegionalFormsPolicy,
} from 'src/app/enums';
import { PokedexOptions } from 'src/app/models';
import { PokedexOptionsService } from 'src/app/services';

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
export class PokedexOptionsComponent extends FormComponent implements OnInit {
  constructor(
    override fb: FormBuilder,
    private pokedexOptionsService: PokedexOptionsService
  ) {
    super(fb, {
      countFormsPolicy: [],
      countRegionalFormsPolicy: [],
      countGendersPolicy: [],
    });
  }

  ngOnInit(): void {
    this.pokedexOptionsService.optionsObservable
      .pipe(takeUntil(this.destroyed))
      .subscribe((options) => this.setOptions(options));
    this.formChanges.subscribe(() => {
      this.pokedexOptionsService.setOptions(this.buildOptionsModel());
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

  private setOptions(options: PokedexOptions | null): void {
    console.log('SET');
    if (options) {
      this.setValue('countFormsPolicy', options.countFormsPolicy, true);
      this.setValue(
        'countRegionalFormsPolicy',
        options.countRegionalFormsPolicy,
        true
      );
      this.setValue('countGendersPolicy', options.countGendersPolicy, true);
    }
  }

  private buildOptionsModel(): PokedexOptions {
    return {
      countFormsPolicy: this.getValue('countFormsPolicy'),
      countRegionalFormsPolicy: this.getValue('countRegionalFormsPolicy'),
      countGendersPolicy: this.getValue('countGendersPolicy'),
    };
  }
}
