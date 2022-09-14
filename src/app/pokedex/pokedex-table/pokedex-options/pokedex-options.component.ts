import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormComponent } from 'src/app/common';
import { PokedexOptions } from 'src/app/models';
import {
  PokedexOptionsService,
  PokedexUiServiceService,
} from 'src/app/services';
import * as POLICIES from './pokedex-options-policies';

@Component({
  selector: 'pokedex-options',
  templateUrl: './pokedex-options.component.html',
})
export class PokedexOptionsComponent
  extends FormComponent<PokedexOptions>
  implements OnInit
{
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
      this.pokedexOptionsService.setOptions(this.buildModel());
    });
  }

  get expanded() {
    return this._expanded;
  }

  get countFormsPolicyOptions() {
    return POLICIES.COUNT_FORMS_POLICY_OPTIONS;
  }

  get countRegionalFormsPolicyOptions() {
    return POLICIES.COUNT_REGIONAL_FORMS_POLICY_OPTIONS;
  }

  get countGendersPolicyOptions() {
    return POLICIES.COUNT_GENDERS_POLICY_OPTIONS;
  }

  get countGigantamaxPolicyOptions() {
    return POLICIES.COUNT_GIGANTAMAX_POLICY_OPTIONS;
  }

  get countAlphaPolicyOptions() {
    return POLICIES.COUNT_ALPHA_POLICY_OPTIONS;
  }

  public onPanelClick(state: boolean) {
    if (this._expanded !== state) {
      this.pokedexUiServiceService.optionsAreOpen = state;
    }
  }

  private setOptions(options: PokedexOptions): void {
    this.setForm(options);
  }
}
