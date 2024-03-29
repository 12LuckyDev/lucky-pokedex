import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const POKEDEX_TABLE_ANIMATIONS = [
  trigger('detail-expand', [
    state(
      'collapsed',
      style({ height: '0px', minHeight: '0', visibility: 'hidden' })
    ),
    state('expanded', style({ height: '*', visibility: 'visible' })),
    transition(
      'expanded <=> collapsed',
      animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
    ),
  ]),
];
