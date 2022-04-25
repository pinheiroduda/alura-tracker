import { INotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./tipo-acoes";
import {ADICIONA_PROJETO, ALTERA_PROJETO, DEFINE_PROJETOS, DEFINIR_TAREFAS, EXCLUI_PROJETO, NOTIFICA} from './tipo-mutacoes';
import http from "@/http"
import ITarefa from "@/interfaces/ITarefa";


interface Estado {
  projetos: IProjeto[],
  tarefas: ITarefa[],
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projetos: [],
    tarefas: [],
    notificacoes: []
  },

  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto
      } as IProjeto
      state.projetos.push(projeto)
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex( projeto => projeto.id === projeto.id)
      state.projetos[index] = projeto
    },
    [EXCLUI_PROJETO](state, id: string) {
     state.projetos = state.projetos.filter(projeto => projeto.id !== id)
    },
    [DEFINE_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos
    },
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas
    },
    [NOTIFICA](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id !== novaNotificacao.id)
      }, 5000)
    }
  },
  
  actions: {
    [OBTER_PROJETOS] ({commit}) {
      http.get('projetos')
      .then(resposta => commit(DEFINE_PROJETOS, resposta.data))
    },
    [CADASTRAR_PROJETO] (contexto, nomeDoProjeto: string) {
      return http.post('/projetos', {
        nome: nomeDoProjeto
      })
    }, 
    [ALTERAR_PROJETO] (contexto, projeto: IProjeto) {
      return http.put(`/projetos/${projeto.id}`, projeto)
    },
    [REMOVER_PROJETO] ({ commit}, id: string) {
      return http.delete(`/projetos/${id}`)
        .then(() => { commit(EXCLUI_PROJETO, id)})
    },
    [OBTER_TAREFAS] ({commit}) {
      http.get('tarefas')
        .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
    },
  }
})

export function useStore() : Store<Estado> {
  return vuexUseStore(key)
}