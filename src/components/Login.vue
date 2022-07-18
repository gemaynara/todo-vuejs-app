<template>
  <div class="container-fluid justify-content-center col-6 mt-5 justify-content-center">
    <div class="card border-primary ">
      <div class="card-body">
        <h4 class="card-title">Login</h4>
        <div class="alert alert-dismissible alert-danger" v-if="errors.length">
          {{ errors }}
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label class="form-label mt-4">Insira as credenciais para entrar</label>
            <div class="form-floating mb-3">
              <input type="email" class="form-control" v-model="email" placeholder="name@example.com">
              <label>E-mail</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" v-model="password" placeholder="*****">
              <label>Senha</label>
            </div>
            <div class="form-floatingr">
              <button type="submit" class="btn btn-success d-block mt-2 ">Entrar</button>
            </div>

          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      errors: ''
    }
  },
  methods: {
    async handleSubmit() {
      this.errors = '';

      await axios.post('/login', {
        email: this.email,
        password: this.password
      }).then(response => {
        console.log(response.data.authorization.token)
        localStorage.setItem('token', response.data.authorization.token)
        this.$router.push(this.$route.query.redirect || '/tasks')
        // this.$router.push({path: '/tasks'});
      }).catch(error => {
        console.log(error)
        this.errors = 'Credenciais inválidas. Tente novamente!'
      })

    }
  }
}
</script>

<style scoped>

</style>