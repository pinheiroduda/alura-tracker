import { Module } from "vuex";
import http from "@/http";

import IProjeto from "@/interfaces/IProjeto";

import { Estado } from "@/store";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO } from "@/store/tipo-acoes";
import { ADICIONAR_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, EXCLUIR_PROJETO } from "@/store/tipo-mutacoes";

export interface EstadoDoProjeto {
  projetos: IProjeto[]
}

export const projeto: Module<EstadoDoProjeto, Estado> = {
  mutations: {
    [ADICIONAR_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto
      } as IProjeto
      state.projetos.push(projeto)
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex( project => project.id === projeto.id)
      state.projetos[index] = projeto
    },
    [EXCLUIR_PROJETO](state, id: string) {
     state.projetos = state.projetos.filter(project => project.id !== id)
    },
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos
    },
  },

  actions: {
    [OBTER_PROJETOS] ({commit}) {
      http.get('projetos')
      .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
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
        .then(() => { commit(EXCLUIR_PROJETO, id)})
    },
  },
  getters: {
    projetos (state) {
      return state.projetos
    }
  }
}