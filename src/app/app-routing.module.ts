// Modificado para uso de recarregamento atraves do rxjs.

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
//import { AppRouteReuseStrategy } from './app-route-reuse-strategy';

import { ListaTarefasComponent } from './lista-tarefas/lista-tarefas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listaTarefas',
    pathMatch: 'full',
    // data: {
    //   reuseComponent: true,
    // },
  },
  {
    path: 'listaTarefas',
    component: ListaTarefasComponent,
    // data: {
    //   reuseComponent: true,
    // },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// @NgModule({
//   imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
//   exports: [RouterModule],
//   providers: [{ provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy }],
// })
// export class AppRoutingModule {}

// Nesta aula, exploramos uma estratégia de recarregamento no Angular utilizando o Router para navegação entre exibições.

// Foi configurado o RouterModule.forRoot com a opção onSameUrlNavigation: 'reload' para recarregar a página ao navegar para a mesma URL.

// Implementamos uma estratégia de reutilização de rotas personalizada (AppRouteReuseStrategy) que estende BaseRouteReuseStrategy para determinar se uma rota pode ser reutilizada com base na propriedade reuseComponent no objeto data da rota.

// Essa estratégia foi registrada no módulo da aplicação e a propriedade data foi adicionada às rotas para controlar a reutilização de componentes.
