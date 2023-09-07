<template>
  <div class="main-container">
    <h1>CADASTRO DE PESSOAS</h1>
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
