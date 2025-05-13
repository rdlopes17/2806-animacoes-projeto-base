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

//modelo com o uso de status coringa *
export const shownStateTrigger1 = trigger('shownState', [
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

// modelo usando para renderizar modelos condicionais nao vinculados ao Dom
// usando NgIf ou listas usando NgFor
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

export const checkButtonTrigger = trigger('checkButton', [
  transition('* => checked', [
    animate('400ms ease-in', style({
      transform: 'scale(0.4)'
    }))
  ])
])


// trigger() - inicia a animação e serve como um contêiner para todas as outras chamadas de função de animação. O template é vinculado ao nome do trigger, que é declarado como primeiro argumento da função. Usa sintaxe de matriz.

// style() - define um ou mais estilos CSS para usar em animações. Controla a aparência visual dos elementos HTML durante as animações. Usa sintaxe de objeto.

// state() - cria um conjunto nomeado de estilos CSS que devem ser aplicados na transição bem-sucedida para um determinado estado. O estado pode então ser referenciado pelo nome dentro de outras funções de animação.

// animate() - especifica as informações de tempo para uma transição. Valores opcionais para delay e easing function. Pode conter métodos style().

// transition() - define a sequência de animação entre dois estados nomeados. Usa sintaxe de matriz.
