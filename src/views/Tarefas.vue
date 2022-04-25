<template>
  <FormularioComponent @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <TarefaComponent
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoClicarNaTarefa="selecionarTarefa"
    />
    <BoxComponent v-if="listaEstaVazia">
      Ainda não foi registrada nenhuma tarefa hoje:/
    </BoxComponent>
    <div class="modal" :class="{ 'is-active': tarefaSelecionada }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import FormularioComponent from '../components/Formulario.vue'
import TarefaComponent from '../components/Tarefa.vue'
import BoxComponent from '../components/Box.vue'
import { useStore } from '@/store'
import {
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
    BoxComponent
  },

  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa)
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa
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
    return {
      store,
      tarefas: computed(() => store.state.tarefas)
    }
  }
})
</script>
