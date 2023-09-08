<template>
    <nav>
        <router-link to="/" id="logo-url">
            <img :src="logo" :alt="alt" id="logo">
        </router-link>
        <router-link to="/">Cadastrar Nova Pessoa</router-link> |
        <router-link to="/cadastrar-pedido">Cadastrar Novo Pedido</router-link> |
        <router-link to="/pessoas">Lista de Cadastros</router-link> |
        <router-link to="/pedidos">Lista de Pedidos</router-link>

    </nav>
</template>
<script>
    export default {
        name:  "NavBar",
        props: ["logo", "alt"]
    }
</script>
<style scoped>

nav {
    background-color: #222;
    border-bottom: 4px solid #111;
    padding: 15px 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

#logo-url {
    margin:auto;
    margin-left:0;

}

#logo {
    width: 40px;
    height: 40px;
}

nav a {
    color: gold;
    text-decoration: none;
    margin: 12px;
    transition: 0.5s;
}

nav a:hover {
    color: #FFF
}

</style>