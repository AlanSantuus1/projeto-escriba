<template>
    <div class="main-container">
        <h1>Cadastro de Pedido</h1>
        <OrderForm />
    </div>
</template>
<script>
import OrderForm from "../../components/OrderForm.vue"

export default {
  name: 'OrderAdd',
  components: {
    OrderForm
  },
}
</script>
<style scoped>

</style>