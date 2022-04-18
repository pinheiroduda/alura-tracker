<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateralComponent />
    </div>
    <div class="column is-three-quarter">
      <FormularioComponent />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BarraLateralComponent from './components/BarraLateral.vue'
import FormularioComponent from './components/Formulario.vue'

export default defineComponent({
  name: 'App',

  components: {
    BarraLateralComponent,
    FormularioComponent
  }
})
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
