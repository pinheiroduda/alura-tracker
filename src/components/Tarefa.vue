<template>
  <BoxComponent>
    <div class="columns hover" @click="tarefaClicada">
      <div class="column is-4">
        {{ tarefa.descricao || 'Tarefa sem descrição' }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || 'N/D' }}
      </div>
      <div class="column">
        <CronometroComponent :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </BoxComponent>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CronometroComponent from './Cronometro.vue'
import BoxComponent from './Box.vue'
import ITarefa from '@/interfaces/ITarefa'

export default defineComponent({
  name: 'TarefaComponent',

  emits: ['aoClicarNaTarefa'],

  components: {
    CronometroComponent,
    BoxComponent
  },

  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true
    }
  },

  methods: {
    tarefaClicada(): void {
      this.$emit('aoClicarNaTarefa', this.tarefa)
    }
  }
})
</script>

<style scoped>
.hover {
  cursor: pointer;
}
</style>
