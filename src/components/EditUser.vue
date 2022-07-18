<template>
  <div class="container-fluid justify-content-center col-12 mt-5">
    <div class="card border-primary ">
      <div class="card-body">
        <h4 class="card-title">Alterar Usuário</h4>
        <div class="alert alert-dismissible alert-danger" v-if="errors.length">
          <ul class="mb-0">
            <li v-for="(error, index) in errors" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>
        <form @submit.prevent="updateUser" novalidate>
          <fieldset>
            <div class="form-group">
              <label class="form-label mt-4">Nome</label>
              <input type="text" class="form-control" v-model="user.name" maxlength="255">
            </div>

            <div class="form-group">
              <label class="form-label mt-4">E-mail</label>
              <input type="email" class="form-control" v-model="user.email">
            </div>

            <div class="form-group">
              <label class="form-label mt-4">Senha</label>
              <input type="password" class="form-control" v-model="user.password">
            </div>

            <div class="form-group">
              <label class="form-label mt-4">Repita a Senha</label>
              <input type="password" class="form-control" v-model="user.password_confirm">
            </div>

            <div class="form-group">
              <label class="form-label mt-4">Usuário administrador?</label>
              <select class="form-select" v-model="user.is_admin">
                <option value="1">Sim</option>
                <option value="0">Não</option>

              </select>
            </div>

            <button type="submit" class="btn btn-primary mt-2">Salvar</button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditUser",
  data() {
    return {
      user: [],
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      is_admin: null,
      errors: []
    }
  },
  created() {
    this.getUserById();
  },
  methods: {
    async getUserById() {
      await axios.get('/users/show/' + this.$route.params.id)
          .then(response => {
            this.user = response.data.user
          }).catch(error => {
            console.log(error)
          })
    },
    async updateUser() {
      this.errors = [];
      if (!this.user.name) {
        this.errors.push("O campo nome é obrigatório")
      }
      if (!this.user.email) {
        this.errors.push("O campo e-mail é obrigatório")
      }
      if (!this.user.password) {
        this.errors.push("O campo senha é obrigatório")
      }
      if (!this.user.password_confirm) {
        this.errors.push("O campo confirmação senha é obrigatório")
      }
      if (this.password.length < 4) {
        this.errors.push("O campo senha deve ter no mínimo 4 caracteres")
      }
      if (this.user.password !== this.user.password_confirm) {
        this.errors.push("Os campos senha e confirmação senha não coincidem")
      }
      if (!this.user.is_admin) {
        this.errors.push("O campo admin é obrigatório")
      }
      if (!this.errors.length) {
        let formData = new FormData();
        formData.append('name', this.user.name)
        formData.append('email', this.user.email)
        formData.append('password', this.user.password)
        formData.append('password_confirm', this.user.password_confirm)
        formData.append('is_admin', this.user.is_admin)

        await axios.post('/users/update/' + this.$route.params.id, formData).then(response => {
          if (response.status == 200) {
            this.user.name = ''
            this.user.email = ''
            this.user.password = ''
            this.user.password_confirm = ''
            // eslint-disable-next-line no-undef
            toastr.success(response.data.message)
            this.$router.push({path: '/users'});
          }
        }).catch(error => {
          // eslint-disable-next-line no-undef
          toastr.error(error)
          console.log(error)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>