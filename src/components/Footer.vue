<template>
    <footer id="footer">
        <p>Escriba Informática &copy; 2023</p>
    </footer>
</template>
<script>
export default {
    name: 'Footer'
}
</script>
<style lang="scss">
    @import "../assets/scss/index.scss";

    #footer {
        @include footer;
    }

</style>