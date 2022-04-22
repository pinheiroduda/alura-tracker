<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <button type="submit" class="button">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IProjeto from '../interfaces/IProjeto'

export default defineComponent({
  name: 'ProjetosView',

  data() {
    return {
      nomeDoProjeto: ''
    }
  },

  methods: {
    salvar() {
      const projeto: IProjeto = {
        id: new Date().toISOString(),
        nome: this.nomeDoProjeto
      }
    }
  }
})
</script>
