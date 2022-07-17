<template>
  <div class="container-fluid justify-content-center col-6 mt-5 justify-content-center">
    <div class="card border-primary ">
      <div class="card-body">
        <h4 class="card-title">Registrar usuário</h4>
        <div class="form-group">
          <label class="form-label mt-4">Insira os dados abaixo</label>
          <div class="alert alert-dismissible alert-danger" v-if="errors.length">
            <ul class="mb-0">
              <li v-for="(error, index) in errors" :key="index">
                {{ error }}
              </li>
            </ul>
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" placeholder="Jhon Doe" v-model="name" required>
              <label for="">Nome</label>
            </div>

            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="" placeholder="name@example.com" v-model="email" required>
              <label>E-mail</label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" class="form-control" placeholder="*****" v-model="password" required>
              <label>Senha</label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" class="form-control" placeholder="*****" v-model="password_confirm" required>
              <label>Confirmação de Senha</label>
            </div>
            <div class="form-floatingr">
              <button type="submit" class="btn btn-success d-inline-block mt-2 ">Registrar</button>
            </div>
          </form>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Register",
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      errors: []
    }
  },


  methods: {
    async handleSubmit() {
      this.errors = [];
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirm: this.password_confirm,
      }
      await axios.post('/register', data).then(response => {
       if (response.data.stack == 'error'){
         this.errors.push(response.data.message)
       }

      }).catch(error => {
        this.errors.push(error.message)
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>