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
import { computed, defineComponent, PropType } from 'vue'
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

  setup(props, { emit }) {
    const tarefaClicada = (): void => {
      emit('aoClicarNaTarefa', props.tarefa)
    }

    const tempoGasto = computed(() => {
      return new Date(props.tarefa.duracaoEmSegundos * 1000)
        .toISOString()
        .substr(11, 8)
    })

    return {
      tarefaClicada,
      tempoGasto
    }
  }
})
</script>

<style scoped>
.hover {
  cursor: pointer;
}
</style>
