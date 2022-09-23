import { Injectable } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class PokedexDialogService {
  private _isExtraSmallObservable: Observable<BreakpointState> =
    this._breakpointObserver.observe(Breakpoints.XSmall);

  constructor(
    private _dialog: MatDialog,
    private _breakpointObserver: BreakpointObserver
  ) {}

  public open<T, D = any, R = any>(
    component: ComponentType<T>,
    data?: D,
    destroyed?: Subject<void>
  ): MatDialogRef<T, R> {
    const dialogRef = this._dialog.open(component, {
      width: '90vw',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data,
    });

    const smallDialogSubscription = this._isExtraSmallObservable.subscribe(
      (size) => {
        if (size.matches) {
          dialogRef.updateSize('100vw', '100vh');
        } else {
          dialogRef.updateSize('90vw', '');
        }
      }
    );

    if (destroyed) {
      dialogRef
        .afterClosed()
        .pipe(takeUntil(destroyed))
        .subscribe(() => smallDialogSubscription.unsubscribe());
    } else {
      dialogRef
        .afterClosed()
        .subscribe(() => smallDialogSubscription.unsubscribe());
    }

    return dialogRef;
  }
}
