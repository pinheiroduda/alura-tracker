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
import { defineComponent } from 'vue'
import FormularioComponent from '../components/Formulario.vue'
import TarefaComponent from '../components/Tarefa.vue'
import BoxComponent from '../components/Box.vue'
import ITarefa from '../interfaces/ITarefa'

export default defineComponent({
  name: 'TarefasView',

  data() {
    return {
      tarefas: [] as ITarefa[]
    }
  },

  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },

  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa)
    }
  },

  components: {
    FormularioComponent,
    TarefaComponent,
    BoxComponent
  }
})
</script>
