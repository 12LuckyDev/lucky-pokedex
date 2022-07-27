import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormComponent } from 'src/app/common/form.component';
import {
  CountFormsPolicy,
  CountGendersPolicy,
  CountRegionalFormsPolicy,
  CountGigantamaxPolicy,
  CountAlphaPolicy,
} from 'src/app/enums';
import { PokedexOptions } from 'src/app/models';
import {
  PokedexOptionsService,
  PokedexUiServiceService,
} from 'src/app/services';

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

const COUNT_REGIONAL_FORMS_POLICY_OPTIONS = [
  {
    id: CountRegionalFormsPolicy.COUNT_ALL,
    name: CountRegionalFormsPolicy[CountRegionalFormsPolicy.COUNT_ALL],
  },
  {
    id: CountRegionalFormsPolicy.NO_COUNT,
    name: CountRegionalFormsPolicy[CountRegionalFormsPolicy.NO_COUNT],
  },
];

const COUNT_GENDERS_POLICY_OPTIONS = [
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

const COUNT_GIGANTAMAX_POLICY_OPTIONS = [
  {
    id: CountGigantamaxPolicy.COUNT_ALL,
    name: CountGigantamaxPolicy[CountGigantamaxPolicy.COUNT_ALL],
  },
  {
    id: CountGigantamaxPolicy.COUNT_FOR_FORMS_WITH_DIFFS,
    name: CountGigantamaxPolicy[
      CountGigantamaxPolicy.COUNT_FOR_FORMS_WITH_DIFFS
    ],
  },
  {
    id: CountGigantamaxPolicy.NO_COUNT_FOR_FORMS,
    name: CountGigantamaxPolicy[CountGigantamaxPolicy.NO_COUNT_FOR_FORMS],
  },
  {
    id: CountGigantamaxPolicy.NO_COUNT,
    name: CountGigantamaxPolicy[CountGigantamaxPolicy.NO_COUNT],
  },
];

const COUNT_ALPHA_POLICY_OPTIONS = [
  {
    id: CountAlphaPolicy.COUNT,
    name: CountAlphaPolicy[CountAlphaPolicy.COUNT],
  },
  {
    id: CountAlphaPolicy.NO_COUNT,
    name: CountAlphaPolicy[CountAlphaPolicy.NO_COUNT],
  },
];

@Component({
  selector: 'app-pokedex-options',
  templateUrl: './pokedex-options.component.html',
  styleUrls: ['./pokedex-options.component.scss'],
})
export class PokedexOptionsComponent extends FormComponent implements OnInit {
  private _expanded: boolean;

  constructor(
    override fb: FormBuilder,
    private pokedexOptionsService: PokedexOptionsService,
    private pokedexUiServiceService: PokedexUiServiceService
  ) {
    super(fb, {
      countFormsPolicy: [],
      countRegionalFormsPolicy: [],
      countGendersPolicy: [],
      countGigantamaxPolicy: [],
      countAlphaPolicy: [],
    });
    this._expanded = this.pokedexUiServiceService.settings.optionsAreOpen;
  }

  ngOnInit(): void {
    this.setOptions(this.pokedexOptionsService.options);
    this.formChanges.subscribe(() => {
      this.pokedexOptionsService.setOptions(this.buildOptionsModel());
    });
  }

  get expanded() {
    return this._expanded;
  }

  get countFormsPolicyOptions() {
    return COUNT_FORMS_POLICY_OPTIONS;
  }

  get countRegionalFormsPolicyOptions() {
    return COUNT_REGIONAL_FORMS_POLICY_OPTIONS;
  }

  get countGendersPolicyOptions() {
    return COUNT_GENDERS_POLICY_OPTIONS;
  }

  get countGigantamaxPolicyOptions() {
    return COUNT_GIGANTAMAX_POLICY_OPTIONS;
  }

  get countAlphaPolicyOptions() {
    return COUNT_ALPHA_POLICY_OPTIONS;
  }

  public onPanelClick(state: boolean) {
    if (this._expanded !== state) {
      this.pokedexUiServiceService.optionsAreOpen = state;
    }
  }

  private setOptions(options: PokedexOptions | null): void {
    if (options) {
      this.setValue('countFormsPolicy', options.countFormsPolicy, true);
      this.setValue(
        'countRegionalFormsPolicy',
        options.countRegionalFormsPolicy,
        true
      );
      this.setValue('countGendersPolicy', options.countGendersPolicy, true);
      this.setValue(
        'countGigantamaxPolicy',
        options.countGigantamaxPolicy,
        true
      );
      this.setValue('countAlphaPolicy', options.countAlphaPolicy, true);
    }
  }

  private buildOptionsModel(): PokedexOptions {
    return {
      countFormsPolicy: this.getValue('countFormsPolicy'),
      countRegionalFormsPolicy: this.getValue('countRegionalFormsPolicy'),
      countGendersPolicy: this.getValue('countGendersPolicy'),
      countGigantamaxPolicy: this.getValue('countGigantamaxPolicy'),
      countAlphaPolicy: this.getValue('countAlphaPolicy'),
    };
  }
}
