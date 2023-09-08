<template>
    <div>
        
        <div>
            <form id="people-form" @submit.prevent="save">
                <div class="input-container">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" v-model="pessoa.nome" placeholder="Digite o seu nome">
                    <span v-show="campoObgNome" style="color: red; font-size: small;">Campo <strong>nome</strong> é obrigatório!*</span>
                </div>
                <div class="input-container">
                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" name="cpf" v-model="pessoa.cpf" placeholder="Digite o seu CPF" >
                    <span v-show="campoObgCpf" style="color: red; font-size: small;">Campo <strong>CPF</strong> é obrigatório!*</span>
                    <span v-show="campoInvalidoCpf" style="color: red; font-size: small;">Campo <strong>CPF</strong> inválido!*</span>
                </div> 
                <div class="input-container">
                    <label for="dataNascimento">Data de Nascimento</label>
                    <input type="text" id="dataNasc" name="dataNasc" v-model="pessoa.dataNascimento" placeholder="Digite o sua data de nascimento">
                </div>
                <div class="input-container">
                    <input type="submit" class="submit-btn" value="Finalizar Cadastro">
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import People from "../services/people";

export default {
     name: "PeopleForm",
     data() {
        return {
            pessoa: {
                id: '', 
                nome: '',
                cpf: '',
                dataNascimento: ''
            },
            campoObgNome: false,
            campoObgCpf: false,
            campoInvalidoCpf: false
        }
     },
     methods: {
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
                People.save(this.pessoa).then(() => {
                    alert('Salvo com sucesso!')
                }).catch(e => {
                    alert('Algo deu errado :/. Tente novamente mais tarde.') 
                })
                this.pessoa = {}
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
     }
}
</script>
<style lang="scss">
@import "../assets/scss/index.scss";

#people-form {
    @include form;
}

.input-container {
    @include input-container;
}

input {
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




</style>