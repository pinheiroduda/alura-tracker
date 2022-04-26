<template>
  <section>
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
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { TipoNotificacao } from '@/interfaces/INotificacao'
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes'

export default defineComponent({
  name: 'FormularioView',

  props: {
    id: {
      type: String
    }
  },

  // mounted() {
  //   if (this.id) {
  //     const projeto = this.store.state.projeto.projetos.find(
  //       project => project.id === this.id
  //     )
  //     this.nomeDoProjeto = projeto?.nome || ''
  //   }
  // },

  // data() {
  //   return {
  //     nomeDoProjeto: ''
  //   }
  // },

  methods: {
    salvar() {
      if (this.id) {
        this.store
          .dispatch(ALTERAR_PROJETO, {
            id: this.id,
            nome: this.nomeDoProjeto
          })
          .then(() => this.lidarComSucesso())
      } else {
        this.store
          .dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(() => this.lidarComSucesso())
      }
    },
    lidarComSucesso() {
      this.nomeDoProjeto = ''
      this.notificar(
        TipoNotificacao.SUCESSO,
        'Sucesso!',
        'O projeto foi salvo com sucesso.'
      )
      this.$router.push('/projetos')
    }
  },

  setup(props) {
    const store = useStore()
    const { notificar } = useNotificador()

    const nomeDoProjeto = ref('')

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        project => project.id === props.id
      )
      nomeDoProjeto.value = projeto?.nome || ''
    }

    return {
      store,
      notificar,
      nomeDoProjeto
    }
  }
})
</script>
