import {
  animate,
  group,
  keyframes,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const highlightedStateTrigger = trigger('highlightedState', [
  //metodo de animacao
  state(
    'default',
    style({
      border: '2px solid #B2B6FF',
    })
  ),
  state(
    'highlighted',
    style({
      border: '4px solid #B2B6FF',
      filter: 'brightness(92%)',
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
      300,
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
    animate(
      '400ms ease-in',
      style({
        transform: 'scale(0.4)',
      })
    ),
  ]),
]);

// modelo com o uso do backgoundColor
export const filterTrigger1 = trigger('filterAnimation', [
  transition(':enter', [
    style({ opacity: 0, width: 0 }),
    animate(
      '2000ms ease-out',
      keyframes([
        style({ offset: 0, opacity: 0, width: 0 }),
        style({
          offset: 0.5,
          opacity: 0.5,
          width: '*',
          backgroundColor: 'lightgreen',
        }),
        style({
          offset: 1,
          opacity: 1,
          width: '*',
          backgroundColor: 'lighblue',
        }),
      ])
    ),
    transition(':leave', [
      animate('400ms ease-out', style({ opacity: 0, width: 0 })),
    ]),
  ]),
]);

// modelo com o uso do cubic-bezier()
export const filterTrigger = trigger('filterAnimation', [
  transition(':enter', [
    style({ opacity: 0, width: 0 }),
    animate(
      '400ms ease-out',
      keyframes([
        style({ offset: 0, opacity: 0, width: 0 }),
        style({ offset: 0.8, opacity: 0.5, width: '*' }),
        style({ offset: 1, opacity: 1, width: '*' }),
      ])
    ),
  ]),
  transition(':leave', [
    animate(
      '200ms cubic-bezier(.13,.9,.8,.1)',
      style({ opacity: 0, width: 0 })
    ),
  ]),
]);

// modelo sequencial de animacao nao recomendadno para animacoes complexas
export const formButtonTrigger1 = trigger('formButton', [
  transition('invalid => valid', [
    animate(
      100,
      style({
        backgroundColor: '#63B77C',
      })
    ),
    animate(
      100,
      style({
        transform: 'scale(1.2)',
      })
    ),
    animate(
      100,
      style({
        transform: 'scale(1)',
      })
    ),
  ]),
]);

//modelo com o gruop melhora a perfomance e executa de maneira simuntanea o que estiver dentro do gruop
// modelo com o query que consulta os seletores  elementos, tag, classes, ids dos elementos ect
export const formButtonTrigger = trigger('formButton', [
  transition('invalid => valid', [
    query('#botao-salvar', [
      group([
        animate(
          200,
          style({
            backgroundColor: '#63B77C',
          })
        ),
        animate(
          100,
          style({
            transform: 'scale(1.1)',
          })
        ),
      ]),
      animate(
        200,
        style({
          transform: 'scale(1)',
        })
      ),
    ]),
  ]),
  transition('valid => invalid', [
    query('#botao-salvar', [
      group([
        animate(
          200,
          style({
            backgroundColor: '#6C757D',
          })
        ),
        animate(
          100,
          style({
            transform: 'scale(1.1)',
          })
        ),
      ]),
      animate(
        200,
        style({
          transform: 'scale(1)',
        })
      ),
    ]),
  ]),
]);

// desafio
export const flyInOutTrigger = trigger('flyInOut', [
  transition(':enter', [
    style({
      width: '100%',
      transform: 'translateX(-100%)',
      opacity: 0,
    }),
    group([
      animate(
        '0.3s 0.1s ease',
        style({
          transform: 'translateX(0)',
          width: '*',
        })
      ),
      animate(
        '0.3s ease',
        style({
          opacity: 1,
        })
      ),
    ]),
  ]),
  transition(':leave', [
    group([
      animate(
        '0.3s ease',
        style({
          transform: 'translateX(100%)',
          width: '*',
        })
      ),
      animate(
        '0.3s 0.2s ease',
        style({
          opacity: 0,
        })
      ),
    ]),
  ]),
]);

export const shakeTrigger = trigger('shakeAnimation', [
  transition('* => *', [
    query(
      'input.ng-invalid:focus, select.ng-invalid:focus',
      [
        animate(
          '0.5s',
          keyframes([
            style({ border: '2px solid red' }),
            style({ transform: 'translateX(0)' }),
            style({ transform: 'translateX(-10px)' }),
            style({ transform: 'translateX(10px)' }),
            style({ transform: 'translateX(-10px)' }),
            style({ transform: 'translateX(10px)' }),
            style({ transform: 'translateX(-10px)' }),
            style({ transform: 'translateX(10px)' }),
            style({ transform: 'translateX(0)' }),
          ])
        ),
      ],
      { optional: true }
    ),
  ]),
]);

// query() -  permite buscar elementos específicos no DOM para aplicar animações

// group() - executa animações simultaneamente, otimizando a performance e a organização do código.

//https://cubic-bezier.com/#.17,.67,.83,.67

// keyframes() - você adiciona estilos intermediários em animações Angular

// offset - controla o tempo exato das mudanças de propriedades CSS durante a animação.

// trigger() - inicia a animação e serve como um contêiner para todas as outras chamadas de função de animação. O template é vinculado ao nome do trigger, que é declarado como primeiro argumento da função. Usa sintaxe de matriz.

// style() - define um ou mais estilos CSS para usar em animações. Controla a aparência visual dos elementos HTML durante as animações. Usa sintaxe de objeto.

// state() - cria um conjunto nomeado de estilos CSS que devem ser aplicados na transição bem-sucedida para um determinado estado. O estado pode então ser referenciado pelo nome dentro de outras funções de animação.

// animate() - especifica as informações de tempo para uma transição. Valores opcionais para delay e easing function. Pode conter métodos style().

// transition() - define a sequência de animação entre dois estados nomeados. Usa sintaxe de matriz.
