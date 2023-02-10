import { forEachProp } from '@12luckydev/utils';
import { Directive } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { map, merge, Observable, of, takeUntil } from 'rxjs';
import { FormChanges } from 'src/app/models';
import { DestroyedAwareComponent } from './destroyed-aware.component';

@Directive()
export abstract class FormComponent<
  T extends Record<keyof T, unknown> = Record<string, unknown>
> extends DestroyedAwareComponent {
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

  private getFormChangesObservable(
    aliases: string[]
  ): Observable<FormChanges>[] {
    return aliases
      .map((alias) => ({
        alias,
        observable: this.getControlChanges(alias),
      }))
      .map(({ alias, observable }) =>
        observable?.pipe(map((value) => ({ value, alias })))
      );
  }

  public getFilteredChanges(aliases: string[]): Observable<FormChanges> {
    return merge(
      ...this.getFormChangesObservable(
        Object.keys(this._form.controls).filter(
          (alias) => !aliases.includes(alias)
        )
      )
    );
  }

  public getSelectedChanges(aliases: string[]): Observable<FormChanges> {
    return merge(...this.getFormChangesObservable(aliases));
  }

  public getControlChanges<V>(alias: string): Observable<V> {
    return (this.getControl(alias)?.valueChanges ?? of(null)).pipe(
      takeUntil(this.destroyed)
    );
  }

  public getValue<V>(alias: string): V | null {
    const control = this.getControl(alias);
    return control ? (control.value as V) : null;
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

  protected setForm(model: T) {
    forEachProp(model, (prop, key) => {
      if (key) {
        this.setValue(key, prop, true);
      }
    });
  }

  protected buildModel(): T {
    const model: { [key: string]: unknown } = {};
    Object.keys(this._form.controls).forEach((key) => {
      const value = this.getValue(key);
      if (value !== null) {
        model[key] = value;
      }
    });
    return model as unknown as T;
  }
}
