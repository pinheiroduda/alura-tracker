import { INotificacao, TipoNotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUI_PROJETO} from './tipo-mutacoes'

interface Estado {
  projetos: IProjeto[],
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projetos: [],
    notificacoes: [
      {
        id: 1,
        tipo: TipoNotificacao.SUCESSO,
        titulo: 'Sucesso',
        texto: 'Sucesso',
      },
      {
        id: 1,
        tipo: TipoNotificacao.ATENCAO,
        titulo: 'Atenção',
        texto: 'Atenção',
      },
      {
        id: 1,
        tipo: TipoNotificacao.FALHA,
        titulo: 'Falha',
        texto: 'Falha',
      }
    ]
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
     state.projetos = state.projetos.filter(projeto => projeto.id !== projeto.id)
    }
  }
})

export function useStore() : Store<Estado> {
  return vuexUseStore(key)
}