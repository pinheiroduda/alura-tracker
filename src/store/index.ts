import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";

import http from "@/http"

import { INotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";

import {  ALTERAR_TAREFA,CADASTRAR_TAREFA, OBTER_TAREFAS} from "./tipo-acoes";
import { ADICIONAR_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS, NOTIFICAR} from './tipo-mutacoes';
import { EstadoDoProjeto } from "./modulos/projeto";


export interface Estado {
  projeto: EstadoDoProjeto
  tarefas: ITarefa[],
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projeto: {
      projetos: []
    },
    tarefas: [],
    notificacoes: []
  },

  mutations: {
    
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas
    },
    [ADICIONAR_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa)
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex( tarefa => tarefa.id === tarefa.id)
      state.tarefas[index] = tarefa
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id !== novaNotificacao.id)
      }, 5000)
    }
  },
  
  actions: {
    
    [OBTER_TAREFAS] ({commit}) {
      http.get('tarefas')
        .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
    },
    [CADASTRAR_TAREFA] ({commit}, tarefa: ITarefa) {
      return http.post('/projetos', tarefa)
        .then(resposta => commit(ADICIONAR_TAREFA, resposta.data))
    },
    [ALTERAR_TAREFA] ({commit}, tarefa: ITarefa) {
      return http.put(`/tarefas/${tarefa.id}`, tarefa)
      .then(() => commit(ALTERA_TAREFA, tarefa))
    },
  }
})

export function useStore() : Store<Estado> {
  return vuexUseStore(key)
}