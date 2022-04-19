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
        <BoxComponent v-if="listaEstaVazia">
          Ainda não foi registrada nenhuma tarefa hoje:/
        </BoxComponent>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BarraLateralComponent from './components/BarraLateral.vue'
import FormularioComponent from './components/Formulario.vue'
import TarefaComponent from './components/Tarefa.vue'
import BoxComponent from './components/Box.vue'
import ITarefa from './interfaces/ITarefa'

export default defineComponent({
  name: 'App',

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
    BarraLateralComponent,
    FormularioComponent,
    TarefaComponent,
    BoxComponent
  }
})
</script>

<style scoped>
.lista {
  padding: 1.25rem;
}
</style>
