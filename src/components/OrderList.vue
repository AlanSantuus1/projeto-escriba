<template>
    <div>
        <div id="order-table">
            <div class="input-container">
                <input type="text" placeholder="Buscar por nome de cliente" v-model="searchQuery">
            </div>
            <div>
                <div id="order-table-heading">
                    <div class="order-id">#</div>
                    <div>Cliente</div>
                    <div>Data de Emissão</div>
                    <div>Valor Total</div>
                    <div>Itens</div>
                    <div class="header-actions">AÇÕES</div> 
                </div>
            </div>
            <div id="order-table-rows">
                <div class="order-table-row" v-for="pedido in filteredData" :key="pedido.id">
                    <div class="order-number">{{ pedido.id }}</div>
                    <div>{{ pedido.cliente.nome }}</div>
                    <div>{{ pedido.dataEmissao }}</div>
                    <div>{{ pedido.valorTotal }}</div>
                    <div>
                        <ul>
                            <li v-for="(item, index) in pedido.itens" :key="index">{{ item.produto.descricao }}</li>
                        </ul>
                    </div>
                    <div id="btn-actions">
                        <button @click="edit(pedido)" class="edit-btn">EDITAR</button>
                        <button @click="remove(pedido)" class="delete-btn">EXCLUIR</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="form">
            <br><br><br>
            <h1>Editar Pedido</h1>
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
                <!-- <div id="produtos-container" class="input-container">
                    <label id="produtos-container" for="items">Selecione os</label>

                    <select name="produto" id="produto" v-model="pedido.itens">
                        <option value="">Selecione o Produto</option>
                        <option v-for="produto in produtosData" :key="produto.id" :value="produto">{{ produto.descricao }}</option>
                    </select>
                    <div class="checkbox-container" v-for="produto in produtosData" :key="produto.id">
                        <input type="checkbox" name="produtos" v-model="pedido.itens" :value="produto">
                        <span>{{ produto.descricao }}</span>
                    </div>
                </div> -->
                <!-- <div class="input-container">
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
                </div> -->
                <div class="input-container">
                    <input type="submit" class="submit-btn" value="Salvar">
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import Order from "../services/orders.js"

export default {
    name: 'OrderList',
    data() {
        return {
            pedidos: [],
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
            form: false,
            searchQuery: ''
        }
    },
    computed: {
        filteredData: function() {
            return this.pedidos.filter((itens) => {
            for (var item in itens) {
                if(String(itens[item].nome).indexOf(this.searchQuery) !== -1) {
                    return true
                }
            }
            return false
            })
        }
    },
    methods: {
        async listOrder() {
            Order.list().then(res => {
                console.log(res.data);
                this.pedidos = res.data;
            })

        },
        async edit(pedido){
            this.form = true;
            this.pedido = pedido;
        },
        async remove(pedido){
            if(confirm('Deseja excluir este cadastro?')){
                Order.apagar(pedido).then(res => {
                    this.listOrder()
                    this.errors = []
                    alert("Cadastro apagado com sucesso!")
                }).catch(e => {
                    this.errors = e.response.data.errors;
                    console.log(this.errors)
                    alert("Algo deu errado :/. Tente novamente mais tarde.")
                })
            }

            
        },
        async save(){
            Order.edit(this.pedido).then(() => {
                alert('Atualizado com sucesso!');
                this.listOrder();
            }).catch(e => {
                alert('Algo deu errado :/. Tente novamente mais tarde.') 
            })
            this.pedido = {}
            this.form = false
        }
    },
    mounted() {
        this.listOrder();
    }
}
</script>
<style lang="scss">
@import "../assets/scss/index.scss";

#order-table {
    @include table;
}

#order-table-heading,
#order-table-rows,
.order-table-row {
    @include rows;
}

#order-table-heading {
    @include heading;
}

#order-table-heading div,
.order-table-row div {
    width: 19%;
}

.order-table-row {
    @include row;
}

#order-table-heading .order-id,
.order-table-row .order-number {
    width: 5%;
}

.delete-btn {
    @include delete-btn;
}

.delete-btn:hover {
    @include delete-btn-hover
}

.edit-btn {
    @include edit-btn
}

.edit-btn:hover {
    @include edit-btn-hover
}
</style>