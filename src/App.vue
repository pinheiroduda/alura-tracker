<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateralComponent />
    </div>
    <div class="column is-three-quarter">
      <FormularioComponent />
      <div class="lista">
        <TarefaComponent />
        <TarefaComponent />
        <TarefaComponent />
        <TarefaComponent />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BarraLateralComponent from './components/BarraLateral.vue'
import FormularioComponent from './components/Formulario.vue'
import TarefaComponent from './components/Tarefa.vue'

export default defineComponent({
  name: 'App',

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
