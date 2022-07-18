<template>

  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Tarefas</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#"
              aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>


      <div class="collapse navbar-collapse" v-if="isLogged">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link active" to="/tasks">Minhas Tarefas
              <span class="visually-hidden">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/add-task">Adicionar Tarefa</router-link>
          </li>
          <!--          <li class="nav-item">-->
          <!--            <a class="nav-link" href="#">Minhas Tarefas</a>-->
          <!--          </li>-->
          <li class="nav-item dropdown" v-if="userLogged.is_admin">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Usuários</a>
            <div class="dropdown-menu">
              <router-link class="dropdown-item" to="/users">Listar Usuários</router-link>
              <router-link class="dropdown-item" to="/add-user">Criar Usuário</router-link>
            </div>
          </li>
        </ul>
        <div class="d-flex">
                    <h6 class="navbar-text">Olá, {{ userLogged.name }}</h6>
          <a href="#" @click.prevent="logout" class="btn btn-warning my-sm-0 mx-lg-3">Sair</a>
        </div>

      </div>
      <div class="collapse navbar-collapse" v-if="!isLogged">
        <ul class="navbar-nav me-auto">

        </ul>
        <div class="d-flex">
          <router-link to="/register" class="btn btn-warning my-sm-0 mx-lg-3">Registrar</router-link>
          <router-link to="/login" class="btn btn-warning my-sm-0 mx-lg-3">Login</router-link>
        </div>

      </div>
    </div>
  </nav>
  <router-view :user="userLogged"></router-view>

</template>

<script>

import axios from "axios";


export default {
  name: 'App',
  props: ['user'],
  data() {
    return {
      isLogged: false,
      userLogged: null,
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    async getUser() {
      axios.get('/me').then(response => {
            this.isLogged = true
            this.userLogged = response.data.user
          }
      ).catch(error => {
        console.log(error)
      })
    },
    async logout() {
      await axios.post('/logout').then(response => {
        this.isLogged = false
        localStorage.removeItem('token')
        this.$router.push({path: '/'});

      }).catch(error => {
        console.log(error)
      })
    }
  }

}
</script>

<style>

</style>
