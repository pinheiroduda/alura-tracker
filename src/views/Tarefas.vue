<template>
  <FormularioComponent @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <TarefaComponent
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
    />
    <BoxComponent v-if="listaEstaVazia">
      Ainda não foi registrada nenhuma tarefa hoje:/
    </BoxComponent>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import FormularioComponent from '../components/Formulario.vue'
import TarefaComponent from '../components/Tarefa.vue'
import BoxComponent from '../components/Box.vue'
import { useStore } from '@/store'
import { OBTER_TAREFAS } from '@/store/tipo-acoes'

export default defineComponent({
  name: 'TarefasView',

  components: {
    FormularioComponent,
    TarefaComponent,
    BoxComponent
  },

  methods: {
    // salvarTarefa(tarefa: ITarefa) {
    //   this.tarefas.push(tarefa)
    // }
  },

  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },

  setup() {
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    return {
      store,
      tarefas: computed(() => store.state.tarefas)
    }
  }
})
</script>
