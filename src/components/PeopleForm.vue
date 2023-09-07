<template>
    <div>
        
        <div>
            <form id="people-form">
                <div class="input-container">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o seu nome">
                </div>
                <div class="input-container">
                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" name="cpf" v-model="cpf" placeholder="Digite o seu CPF">
                </div> 
                <div class="input-container">
                    <label for="dataNascimento">Data de Nascimento</label>
                    <input type="text" id="dataNasc" name="dataNasc" v-model="dataNasc" placeholder="Digite o sua data de nascimento">
                </div>
                <div class="input-container">
                    <input type="submit" class="submit-btn" value="Finalizar Cadastro">
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    
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