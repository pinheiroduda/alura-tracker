import { INotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { OBTER_PROJETOS } from "./tipo-acoes";
import {ADICIONA_PROJETO, ALTERA_PROJETO, DEFINE_PROJETOS, EXCLUI_PROJETO, NOTIFICA} from './tipo-mutacoes';
import http from "@/http"


interface Estado {
  projetos: IProjeto[],
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projetos: [],
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
    }
  }
})

export function useStore() : Store<Estado> {
  return vuexUseStore(key)
}