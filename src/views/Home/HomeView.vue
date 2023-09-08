<template>
  <div class="main-container">
    <h1>Cadastro de Pessoa</h1>
    <PeopleForm />
  </div>
</template>

<script>
import PeopleForm from "../../components/PeopleForm.vue"
import People from "../../services/people"

export default {
  name: 'HomeView',
  components: {
    PeopleForm
  },
  data (){
    return {
      pessoa: {
        nome: "",
        cpf: "",
        dataNasc: ""
      },
      pessoas: []
    }
  }, 
  mounted() {
    People.list().then(res => {
      console.log(res.data);
      this.pessoas = res.data;
    })
  }
}
</script> 

<style src="./style.scss" lang="scss" scoped />
