<template>
  <div class="main-container">
    <h1>Cadastro de Pessoa</h1>
    <PeopleForm />
  </div>
</template>

<script>
import PeopleForm from "../../components/PeopleForm.vue"

export default {
  name: 'HomeView',
  components: {
    PeopleForm
  },
}
</script> 

<style src="./style.scss" lang="scss" scoped />
