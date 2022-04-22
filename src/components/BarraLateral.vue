<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Alura Tracker" />
    </h1>
    <div class="has-text-centered">
      <button class="button" @click="alterarTema">{{ textoBotao }}</button>
    </div>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks">tarefas</i>
          </router-link>
        </li>
        <li>
          <router-link to="/projetos" class="link">
            <i class="fas fa-project-diagram">projetos</i>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BarraLateralComponent',

  emits: ['aoAlterarTema'],

  data() {
    return {
      modoEscuroAtivo: false
    }
  },

  computed: {
    textoBotao() {
      if (this.modoEscuroAtivo) {
        return 'Ativar modo claro'
      }
      return 'Ativar modo escuro'
    }
  },

  methods: {
    alterarTema() {
      this.modoEscuroAtivo = !this.modoEscuroAtivo
      this.$emit('aoAlterarTema', this.modoEscuroAtivo)
    }
  }
})
</script>

<style scoped>
h1 {
  text-align: center;
}
strong {
  color: #f95738;
}
header {
  padding: 2rem;
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
.panel li {
  margin: 8px 0;
}
.link {
  color: #fff;
}
.link:hover {
  color: #faf0ca;
}
.link.router-link-active {
  color: #faf0ca;
}
</style>
