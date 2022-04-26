<template>
  <FormularioComponent @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <BoxComponent v-if="listaEstaVazia">
      Ainda não foi registrada nenhuma tarefa hoje:/
    </BoxComponent>
    <div class="field">
      <p class="control has-icons-left">
        <input
          class="input"
          type="texto"
          placeholder="Filtre sua busca"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <TarefaComponent
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoClicarNaTarefa="selecionarTarefa"
    />
    <ModalComponent :mostrar="tarefaSelecionada !== null">
      <header class="modal-card-head">
        <p class="modal-card-title">Edite sua tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label for="descricaoDaTarefa" class="label">Descrição</label>
          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada.descricao"
            id="descricaoDaTarefa"
          />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="alterarTarefa">
          Salvar alterações
        </button>
        <button class="button" @click="fecharModal">Cancelar</button>
      </footer>
    </ModalComponent>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue'
import FormularioComponent from '../components/Formulario.vue'
import TarefaComponent from '../components/Tarefa.vue'
import BoxComponent from '../components/Box.vue'
import ModalComponent from '../components/Modal.vue'
import { useStore } from '@/store'
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS
} from '@/store/tipo-acoes'
import ITarefa from '@/interfaces/ITarefa'

export default defineComponent({
  name: 'TarefasView',

  data() {
    return {
      tarefaSelecionada: null as ITarefa | null
    }
  },

  components: {
    FormularioComponent,
    TarefaComponent,
    BoxComponent,
    ModalComponent
  },

  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa)
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa
    },
    fecharModal() {
      this.tarefaSelecionada = null
    },
    alterarTarefa() {
      this.store
        .dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal())
    }
  },

  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },

  setup() {
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)

    const filtro = ref('')

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value)
    })

    return {
      store,
      filtro,
      tarefas: computed(() => store.state.tarefa.tarefas)
    }
  }
})
</script>
