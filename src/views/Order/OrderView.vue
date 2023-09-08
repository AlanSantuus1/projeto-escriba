<template>
    <div class="main-container">
        <h1>Lista de pedidos</h1>
        <OrderList />
    </div>
</template>
<script>
import OrderList from "../../components/OrderList.vue"

export default {
  name: 'OrderView',
  components: {
    OrderList
  },
}
</script>
<style src="./style.scss" lang="scss" scoped />