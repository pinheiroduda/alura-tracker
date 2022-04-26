<template>
  <section
    class="is-flex is-align-items-center is-justify-content-space-between"
  >
    <CronometroComponent :tempoEmSegundos="tempoEmSegundos" />
    <BotaoComponent
      @clicado="iniciar"
      icone="fas fa-play"
      texto="play"
      :desabilitado="cronometroRodando"
    />
    <BotaoComponent
      @clicado="finalizar"
      icone="fas fa-stop"
      texto="stop"
      :desabilitado="!cronometroRodando"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CronometroComponent from './Cronometro.vue'
import BotaoComponent from './Botao.vue'

export default defineComponent({
  name: 'TemporizadorComponent',

  emits: ['aoTemporizadorSerFinalizado'],

  components: {
    CronometroComponent,
    BotaoComponent
  },

  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false
    }
  },

  methods: {
    iniciar() {
      this.cronometroRodando = true
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1
      }, 1000)
    },
    finalizar() {
      this.$emit('aoTemporizadorSerFinalizado', this.tempoEmSegundos)
      this.tempoEmSegundos = 0
      this.cronometroRodando = false
      clearInterval(this.cronometro)
    }
  }
})
</script>
