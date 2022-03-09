import { Directive, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';

@Directive()
export class FormComponent implements OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private _form: FormGroup;

  constructor(
    protected fb: FormBuilder,
    controlsConfig: {
      [key: string]: any;
    }
  ) {
    this._form = this.fb.group(controlsConfig);
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  public get destroyed(): Subject<void> {
    return this._destroyed;
  }

  public get form(): FormGroup {
    return this._form;
  }

  public get formChanges(): Observable<void> {
    return this._form.valueChanges.pipe(takeUntil(this._destroyed));
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
      takeUntil(this._destroyed)
    ) as Observable<T> | null;
  }
}
