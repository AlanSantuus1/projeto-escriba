<template>
  <NavBar :logo="logo_src" :alt="app_name" />
  <router-view/>
  <Footer></Footer>
</template>
<script>
  import NavBar from './components/NavBar.vue'
  import Footer from './components/Footer.vue'

  export default {
    components: {
      NavBar, Footer
    },
    data() {
      return {
        logo_src: "/img/logo.png",
        app_name: "ESCRIBA"
      }
    }
  }
</script>
<style lang="scss">
@import "./assets/scss/index.scss";

* {
  @include body-site;
}

.main-container {
  margin:50px;
  min-height: 500px;
}

h1 {
  @include title;
}

</style>
