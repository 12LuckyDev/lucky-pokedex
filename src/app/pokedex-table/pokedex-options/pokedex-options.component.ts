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

const getPolicyList = <T extends { [key: string]: string }>(policyEnum: T) =>
  Object.keys(policyEnum).map((el) => policyEnum[el]);

const COUNT_FORMS_POLICY_OPTIONS = getPolicyList(CountFormsPolicy);
const COUNT_REGIONAL_FORMS_POLICY_OPTIONS = getPolicyList(
  CountRegionalFormsPolicy
);
const COUNT_GENDERS_POLICY_OPTIONS = getPolicyList(CountGendersPolicy);
const COUNT_GIGANTAMAX_POLICY_OPTIONS = getPolicyList(CountGigantamaxPolicy);
const COUNT_ALPHA_POLICY_OPTIONS = getPolicyList(CountAlphaPolicy);

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
      countGendersPolicy: [],
      countFormsPolicy: [],
      applyGenderPolicyToForms: [],
      countRegionalFormsPolicy: [],
      applyGenderPolicyToRegionalForms: [],
      countGigantamaxPolicy: [],
      applyGenderPolicyToGigantamax: [],
      countAlphaPolicy: [],
      applyGenderPolicyToAlpha: [],
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
