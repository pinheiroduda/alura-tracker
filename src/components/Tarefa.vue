<template>
  <BoxComponent>
    <div class="column is-7">
      {{ tarefa.descricao || 'Tarefa sem descrição' }}
    </div>
    <div class="column">
      <CronometroComponent :tempoEmSegundos="tarefa.duracaoEmSegundos" />
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

  components: {
    CronometroComponent,
    BoxComponent
  },

  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true
    }
  }
})
</script>
