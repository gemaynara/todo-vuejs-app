<template>
  <div class="container-fluid justify-content-center col-12 mt-5">
    <div class="card border-primary ">
      <div class="card-body">
        <h4 class="card-title">Lista de Usuários</h4>
        <div class="row">
          <table class="table table-hover table-responsive">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">E-mail</th>
              <th scope="col">Admin?</th>
              <th scope="col">Ações</th>
            </tr>
            </thead>
            <tbody v-for="user in users" :key="user.id">
            <tr>
              <th scope="row">{{ user.id }}</th>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span class="badge bg-success" v-if="user.is_admin">Sim</span>
                <span class="badge bg-danger" v-else>Não</span>

              </td>
              <td>
                <router-link type="button" class="btn btn-primary mx-lg-2"
                             :to="{name: 'EditUser', params:{id: user.id}}">Editar
                </router-link>

                <button type="button" class="btn btn-danger"
                        @click.prevent="deleteUser(user.id)"
                >Remover
                </button>
              </td>
            </tr>

            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserList",
  data() {
    return {
      users: []
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      await axios.get('/users').then(response => {
        this.users = response.data.users
      }).catch(error => {
        console.log(error)
      })
    },
    async deleteUser(id) {
      if (confirm("Você confirma que deseja apagar o registro?")) {
        await axios.delete('/users/delete/' + id).then(response => {
          if (response.status == 200) {
            // eslint-disable-next-line no-undef
            toastr.success(response.data.message)
            this.getUsers()
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