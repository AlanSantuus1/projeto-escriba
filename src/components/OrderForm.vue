<template>
    <div>
        <div>
            <form id="order-form" @submit.prevent="save">
                <div class="input-container">
                    <label for="clinte">Cliente:</label>
                    <select name="cliente" id="cliente" v-model="pedido.cliente">
                        <option value="">Selecione o Cliente</option>
                        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente">{{ cliente.nome }}</option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="dataEmissao">Data de Emissão:</label>
                    <input type="text" id="dataEmissao" name="dataEmissao" v-model="pedido.dataEmissao" placeholder="Digite a data de emissão">
                </div>
                <div class="input-container">
                    <label for="valorTotal">Valor total:</label>
                    <input type="text" id="valorTotal" name="valorTotal" v-model="pedido.valorTotal" placeholder="Digite o valor total" >
                </div> 
                <div id="produtos-container" class="input-container">
                    <label id="produtos-container" for="items">Selecione os produtos:</label>

                    <select name="produto" id="produto" v-model="pedido.itens">
                        <option value="">Selecione o Produto</option>
                        <option v-for="produto in produtosData" :key="produto.id" :value="produto">{{ produto.descricao }}</option>
                    </select>
                    <!-- <div class="checkbox-container" v-for="produto in produtosData" :key="produto.id">
                        <input type="checkbox" name="produtos" v-model="pedido.itens" :value="produto">
                        <span>{{ produto.descricao }}</span>
                    </div> -->
                </div>
                <div class="input-container">
                    <label for="valor">Valor:</label>
                    <input type="text" id="valor" name="valor" v-model="pedido.itens.valor" placeholder="Digite o valor" >
                </div> 
                <div class="input-container">
                    <label for="quantidade">Quantidade:</label>
                    <input type="text" id="quantidade" name="quantidade" v-model="pedido.itens.quantidade" placeholder="Digite a quantidade" >
                </div> 
                <div class="input-container">
                    <label for="subTotal">Subtotal:</label>
                    <input type="text" id="subTotal" name="subTotal" v-model="pedido.itens.subtotal" placeholder="Digite o sub total" >
                </div> 
                <div class="input-container">
                    <input type="submit" class="submit-btn" value="Finalizar Cadastro">
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import Order from "../services/orders";
import People from "../services/people";
import Products from "../services/products";

export default {
     name: "OrderForm",
     data() {
        return {
            pedido: {
                id: '', 
                cliente: {
                    id: '',
                    nome: ''
                },
                dataEmissao: '',
                valorTotal: '',
                itens: [{
                    id: '',
                    produto: {
                        id: '',
                        descricao: ''
                    },
                    valor: '',
                    quantidade: '',
                    subtotal: ''
                }]
            },
            cliente: {},
            clientes: [],
            produtos: [],
            produtosData: []
        }
     },
     methods: {
        async save(){

            this.pedido.valorTotal = parseFloat(this.pedido.valorTotal);

            this.pedido.cliente = {
                id: this.pedido.cliente.id,
                nome: this.pedido.cliente.nome
            }

            this.pedido.itens = [
                {
                    id: this.pedido.itens.id,
                    produto: {
                        id: this.pedido.itens.id,
                        descricao: this.pedido.itens.descricao
                    },
                    valor: parseFloat(this.pedido.itens.valor),
                    quantidade: parseFloat(this.pedido.itens.quantidade),
                    subtotal: parseFloat(this.pedido.itens.subtotal)
                }
            ]

            

            Order.save(this.pedido).then(() => {
                alert('Salvo com sucesso!')
            }).catch(e => {
                alert('Algo deu errado :/. Tente novamente mais tarde.') 
            })

            this.pedido = {}
        },
        async getClients(){
            People.list().then(res => {
                console.log(res.data);
                this.clientes = res.data;
            })
        },
        getProducts(){
            Products.list().then(res => {
                console.log(res.data);
                this.produtosData = res.data;
            })
        }
     },
     mounted(){
        this.getClients();
        this.getProducts();
     }
}
</script>
<style lang="scss">
@import "../assets/scss/index.scss";

#order-form {
    @include form;
}

.input-container {
    @include input-container;
}

input, select {
    @include input;
}

label {
    @include label;
}

.submit-btn {
    @include button;
}

.submit-btn:hover {
    @include button-hover;
}

#produtos-container {
    flex-direction: row;
    flex-wrap: wrap;
}

#produtos-title {
    width: 100%;
}

.checkbox-container {
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
    width: auto;

}

.checkbox-container span {
    margin-left: 6px;
    font-weight: bold;
}
</style>