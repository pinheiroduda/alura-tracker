<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
        />
      </div>
      <div class="column">
        <div
          class="is-flex is-align-items-center is-justify-content-space-between"
        >
          <CronometroComponent :tempoEmSegundos="tempoEmSegundos" />
          <button class="button" @click="iniciar">
            <span class="icon">
              <i class="fas fa-play"></i>
            </span>
            <span>play</span>
          </button>
          <button class="button" @click="finalizar">
            <span class="icon">
              <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CronometroComponent from './Cronometro.vue'

export default defineComponent({
  name: 'FormularioComponent',

  components: {
    CronometroComponent
  },

  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0
    }
  },

  methods: {
    iniciar() {
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1
      }, 1000)
    },
    finalizar() {
      clearInterval(this.cronometro)
    }
  }
})
</script>
