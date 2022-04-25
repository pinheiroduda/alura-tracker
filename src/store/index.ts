import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";

import { INotificacao } from "@/interfaces/INotificacao";

import { NOTIFICAR } from './tipo-mutacoes';
import { EstadoDoProjeto, projeto } from "./modulos/projeto";
import { EstadoDaTarefa, tarefa } from "./modulos/tarefa";


export interface Estado {
  projeto: EstadoDoProjeto
  tarefa: EstadoDaTarefa,
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projeto: {
      projetos: []
    },
    tarefa: {
      tarefas: []
    },
    notificacoes: []
  },

  mutations: {
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id !== novaNotificacao.id)
      }, 5000)
    }
  }, 

  modules: {
    projeto,
    tarefa
  }
})

export function useStore() : Store<Estado> {
  return vuexUseStore(key)
}