<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateralComponent />
    </div>
    <div class="column is-three-quarter">
      <FormularioComponent @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <TarefaComponent
          v-for="(tarefa, index) in tarefas"
          :key="index"
          :tarefa="tarefa"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BarraLateralComponent from './components/BarraLateral.vue'
import FormularioComponent from './components/Formulario.vue'
import TarefaComponent from './components/Tarefa.vue'
import ITarefa from './interfaces/ITarefa'

export default defineComponent({
  name: 'App',

  data() {
    return {
      tarefas: [] as ITarefa[]
    }
  },

  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa)
    }
  },

  components: {
    BarraLateralComponent,
    FormularioComponent,
    TarefaComponent
  }
})
</script>

<style scoped>
.lista {
  padding: 1.25rem;
}
</style>
