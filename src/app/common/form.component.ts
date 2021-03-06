import { Directive } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, takeUntil } from 'rxjs';
import { DestroyedAwareComponent } from '../pokedex-table/pokedex-base-component/destroyed-aware.component';

@Directive()
export class FormComponent extends DestroyedAwareComponent {
  private _form: FormGroup;

  constructor(
    protected fb: FormBuilder,
    controlsConfig: {
      [key: string]: any;
    }
  ) {
    super();
    this._form = this.fb.group(controlsConfig);
  }

  public get form(): FormGroup {
    return this._form;
  }

  public get formChanges(): Observable<void> {
    return this._form.valueChanges.pipe(takeUntil(this.destroyed));
  }

  public getControl(alias: string): AbstractControl | null {
    return this._form.get(alias);
  }

  public getValue<T>(alias: string): T | null {
    const control = this.getControl(alias);
    return control ? (control.value as T) : null;
  }

  public hasValue(alias: string): boolean {
    const value = this.getValue(alias);
    return typeof value === 'boolean' ? true : !!value;
  }

  public setValue<T>(alias: string, value: T, silent: boolean = false): void {
    const control = this.getControl(alias);
    control?.setValue(value, { emitEvent: !silent });
  }

  public clearValue(alias: string): void {
    this.setValue(alias, null);
  }

  public getChangeObservable<T>(alias: string): Observable<T> | null {
    return this.getControl(alias)?.valueChanges.pipe(
      takeUntil(this.destroyed)
    ) as Observable<T> | null;
  }
}
