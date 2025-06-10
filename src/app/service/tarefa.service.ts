import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Tarefa } from '../interface/tarefa';

// Refatorando o service para usar os metodos com o RxJs
@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  private readonly API = 'http://localhost:3000/tarefas';
  // BehaviorSubject e uma variante do subject  que pode ser tanto um
  //  observable, emitindo eventos, quanto como observer, captando os eventos e recebendo informações.
  private tarefasSubject = new BehaviorSubject<Tarefa[]>([]); //atributo  de servico reativo semper que ouver alteracao
  tarefa$ = this.tarefasSubject.asObservable(); //criacao do observable com uso do asObervable que tem como fonte de dados o subjet
  constructor(private http: HttpClient) {}

  // modelo com o uso da navegacao com o rxjs e o observable(subject) criado.
  listar(): void {
    let params = new HttpParams().appendAll({
      _sort: 'id',
      _order: 'desc',
    });

    this.http.get<Tarefa[]>(this.API, { params }).subscribe((tarefas) => {
      let tarefasTemporarias = this.tarefasSubject.getValue(); // variavel que pega os valores do subject atraves do getValue()
      tarefasTemporarias = tarefasTemporarias.concat(tarefas); // concatenar os dados recebidos na requicao com as da variavel
      this.tarefasSubject.next(tarefasTemporarias); // emitir os valores atualizados, passando as tarefasTemporarias
    });
  }

  // modelo de listagem usando navegacao sem o uso do rxjs
  // listar(categoria: string): Observable<Tarefa[]> {
  //   let params = new HttpParams().appendAll({
  //     _sort: 'id',
  //     _order: 'desc',
  //   });
  //   if (categoria) {
  //     params = params.append('categoria', categoria);
  //   }
  //   return this.http.get<Tarefa[]>(this.API, { params });
  // }

  // modelo com o uso da navegacao com o rxjs e o observable(subject) criado.
  criar(tarefa: Tarefa): void {
    this.http.post<Tarefa>(this.API, tarefa).subscribe((novaTarefa) => {
      const tarefas = this.tarefasSubject.getValue(); // variavel que pega os valores do subject atraves do getValue()
      tarefas.unshift(novaTarefa); //unshift(), do JavaScript, que, diferentemente do .push(), adicionará novaTarefa ao início do array:
      this.tarefasSubject.next(tarefas); // emitir os valores atualizados, passando as tarefas
    });
  }

  // modelo de listagem usando navegacao sem o uso do rxjs
  // criar(tarefa: Tarefa): Observable<Tarefa> {
  //   return this.http.post<Tarefa>(this.API, tarefa);
  // }

  // modelo com o uso da navegacao com o rxjs e o observable(subject) criado.
  editar(tarefa: Tarefa, atualizarSubject: boolean): void {
    const url = `${this.API}/${tarefa.id}`;
    this.http.put<Tarefa>(url, tarefa).subscribe((tarefaEditada) => {
      if (atualizarSubject) {
        // condicional para atualizar
        const tarefas = this.tarefasSubject.getValue(); // variavel que pega os valores do subject atraves do getValue()
        const index = tarefas.findIndex(
          //o método .findIndex(), que retorna o índice do primeiro elemento encontrado a partir da função callback que passarmos.
          (tarefa) => tarefa.id === tarefaEditada.id
        );
        if (index !== -1) {
          //caso o id nao seja encontrado
          tarefas[index] = tarefaEditada;
          this.tarefasSubject.next(tarefas); // emitir os valores atualizados, passando as tarefas
        }
      }
    });
  }

  // modelo de listagem usando navegacao sem o uso do rxjs
  // editar(tarefa: Tarefa): Observable<Tarefa> {
  //   const url = `${this.API}/${tarefa.id}`;
  //   return this.http.put<Tarefa>(url, tarefa);
  // }

  // modelo com o uso da navegacao com o rxjs e o observable(subject) criado.
  excluir(id: number): void {
    const url = `${this.API}/${id}`;
    this.http.delete<Tarefa>(url).subscribe(() => {
      const tarefas = this.tarefasSubject.getValue(); // variavel que pega os valores do subject atraves do getValue()
      const index = tarefas.findIndex(
        //o método .findIndex(), que retorna o índice do primeiro elemento encontrado a partir da função callback que passarmos.
        (tarefa) => tarefa.id === id
      );
      if (index !== -1) {
        //caso o id nao seja encontrado
        tarefas.splice(index, 1); // o que significa que somente este elemento será removido
        this.tarefasSubject.next(tarefas); // emitir os valores atualizados, passando as tarefas
      }
    });
  }

  // modelo de listagem usando navegacao sem o uso do rxjs
  // excluir(id: number): Observable<Tarefa> {
  //   const url = `${this.API}/${id}`;
  //   return this.http.delete<Tarefa>(url);
  // }

  buscarPorId(id: number): Observable<Tarefa> {
    const url = `${this.API}/${id}`;
    return this.http.get<Tarefa>(url);
  }

  // modelo com o uso da navegacao com o rxjs e o observable(subject) criado.
  atualizarStatusTarefa(tarefa: Tarefa): void {
    tarefa.statusFinalizado = !tarefa.statusFinalizado;
    this.editar(tarefa, false);
  }

  // atualizarStatusTarefa(tarefa: Tarefa): Observable<Tarefa> {
  //   tarefa.statusFinalizado = !tarefa.statusFinalizado;
  //   return this.editar(tarefa);
  // }
}
