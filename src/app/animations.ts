import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const highlightedStateTrigger = trigger('highlightedState', [
  //metodo de animacao
  state(
    //metodo de animacao
    'default',
    style({
      // metodo de animacao
      border: '2px solid #B2B6FF',
    })
  ),
  state(
    'highlighted',
    style({
      border: '4px solid #B2B6FF',
      filter: ' brightness(85%)',
    })
  ),
  transition('default => highlighted', [
    animate(
      '200ms ease-out',
      style({
        transform: 'scale(1.02)',
      })
    ),
    animate(200),
  ]),
]);

// export const shownStateTrigger = trigger('shownState', [
//   state('shown', style({})),
//   transition('void => shown', [
//     style({
//       opacity: 0,
//     }),
//     animate(
//       3000,
//       style({
//         opacity: 1,
//       })
//     ),
//   ]),
//   transition('shown => void', [
//     animate(
//       300,
//       style({
//         opacity: 0,
//       })
//     ),
//   ]),
// ]);

//modelo com o uso de status coringa *
export const shownStateTrigger2 = trigger('shownState', [
  transition('void => *', [
    style({
      opacity: 0,
    }),
    animate(
      300,
      style({
        opacity: 1,
      })
    ),
  ]),
  transition('* => void', [
    animate(
      300,
      style({
        opacity: 0,
      })
    ),
  ]),
]);

//modelo usando para renderizar modelos condicionais usando NgIf ou listas usando NgFor
// modelo de entrada =(enter) e saida = (leave) do DOM
export const shownStateTrigger = trigger('shownState', [
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate(
      3000,
      style({
        opacity: 1,
      })
    ),
  ]),
  transition(':leave', [
    animate(
      300,
      style({
        opacity: 0,
      })
    ),
  ]),
]);
