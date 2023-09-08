<template>
  <div class="main-container">
    <h1>Lista de cadastros</h1>
    <PeopleList />
  </div>
</template>

<script>
import PeopleList from "../../components/PeopleList.vue"

export default {
  name: 'PeopleView',
  components: {
    PeopleList
  }

}
</script>

<style src="./style.scss" lang="scss" scoped />