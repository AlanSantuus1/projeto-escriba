<template>
    <div>
        <div id="people-table">
            <div class="input-container">
                <input type="text" placeholder="Buscar por um Nome" v-model="searchQuery">
            </div>
            <div>
                <div id="people-table-heading">
                    <div class="people-id">#</div>
                    <div>Nome</div>
                    <div>CPF</div>
                    <div>Data de Nascimento</div>
                    <div class="header-actions">AÇÕES</div> 
                </div>
            </div>
            <div id="people-table-rows">
                <div class="people-table-row" v-for="pessoa in filteredData" :key="pessoa.id">
                    <div class="people-number">{{ pessoa.id }}</div>
                    <div>{{ pessoa.nome }}</div>
                    <div>{{ pessoa.cpf }}</div>
                    <div>{{ pessoa.dataNascimento }}</div>
                    <div id="btn-actions">
                        <button @click="edit(pessoa)" class="edit-btn">EDITAR</button>
                        <button @click="remove(pessoa)" class="delete-btn">EXCLUIR</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="form">
            <br><br><br>
            <h1>Editar Pessoa</h1>
            <form id="people-form" @submit.prevent="save">
                <div class="input-container">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" v-model="pessoa.nome" placeholder="Digite o seu nome">
                    <span v-show="campoObgNome" style="color: red; font-size: small;">Campo nome é obrigatório!*</span>
                </div>
                <div class="input-container">
                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" name="cpf" v-model="pessoa.cpf" placeholder="Digite o seu CPF" >
                    <span v-show="campoObgCpf" style="color: red; font-size: small;">Campo CPF é obrigatório!*</span>
                    <span v-show="campoInvalidoCpf" style="color: red; font-size: small;">Campo CPF inválido!*</span>
                </div> 
                <div class="input-container">
                    <label for="dataNascimento">Data de Nascimento</label>
                    <input type="text" id="dataNasc" name="dataNasc" v-model="pessoa.dataNascimento" placeholder="Digite o sua data de nascimento">
                </div>
                <div class="input-container">
                    <input type="submit" class="submit-btn" value="Salvar">
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import People from "../services/people"

export default {
    name: 'PeopleList',
    data() {
        return {
            pessoas: [],
            pessoa_id: null,
            pessoa: {
                id: null,
                nome: '',
                cpf: '',
                dataNascimento: ''
            },
            form: false,
            campoObgNome: false,
            campoObgCpf: false,
            campoInvalidoCpf: false,
            searchQuery: ''
        }
    },
    computed: {
        filteredData: function() {
            return this.pessoas.filter((items) => {
            for (var item in items) {
                if(String(items[item]).indexOf(this.searchQuery) !== -1) {
                    return true
                }
            }
            return false
            })
        }
    },
    methods: {
        async listPeople() {
            People.list().then(res => {
                console.log(res.data);
                this.pessoas = res.data;
            })

        },
        async edit(pessoa){
            this.form = true
            this.pessoa = pessoa;
        },
        async remove(pessoa){
            if(confirm('Deseja excluir este cadastro?')){
                People.apagar(pessoa).then(res => {
                    this.listPeople()
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
            if(this.pessoa.nome == ''){
                this.campoObgNome = true
            }else {
                this.campoObgNome = false
            }

            if(this.pessoa.cpf == ''){
                this.campoObgCpf = true
            }else{
                this.campoObgCpf = false
            }

            var validCpf = this.validCpf(this.pessoa.cpf);

            if(validCpf == false){
                this.campoInvalidoCpf = true
            }else {
                this.campoInvalidoCpf = false
            }
            
            if(!this.campoObgNome && !this.campoObgCpf && !this.campoInvalidoCpf){
                People.edit(this.pessoa).then(() => {
                    alert('Atualizado com sucesso!');
                    this.listPeople();
                }).catch(e => {
                    alert('Algo deu errado :/. Tente novamente mais tarde.') 
                })
                this.pessoa = {}
                this.form = false
            }
        },
        validCpf(strCPF){
            var Soma;
            var Resto;
            var i;
            Soma = 0;
            if (strCPF == "00000000000") return false;

            for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;

            if ((Resto == 10) || (Resto == 11))  Resto = 0;
            if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

            Soma = 0;
            for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;

            if ((Resto == 10) || (Resto == 11))  Resto = 0;
            if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
            return true;
        }
    },
    mounted() {
        this.listPeople();
    }
}
</script>
<style lang="scss">
@import "../assets/scss/index.scss";

#people-table {
    @include table;
}

#people-table-heading,
#people-table-rows,
.people-table-row {
    @include rows;
}

#people-table-heading {
    @include heading;
}

#people-table-heading div,
.people-table-row div {
    width: 19%;
}

.people-table-row {
    @include row;
}

#people-table-heading .people-id,
.people-table-row .people-number {
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