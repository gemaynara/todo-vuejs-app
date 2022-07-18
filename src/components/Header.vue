<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/tasks">Tarefas</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#"
              aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>


      <div class="collapse navbar-collapse" v-if="user">
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

        </ul>
        <div class="d-flex">
          <h6 class="navbar-text">Olá, {{ user.name }}</h6>
          <a href="#" @click.prevent="logout" class="btn btn-warning my-sm-0 mx-lg-3">Sair</a>
        </div>

      </div>
            <div class="collapse navbar-collapse" v-if="!user">
              <ul class="navbar-nav me-auto">

              </ul>
              <div class="d-flex">
                <router-link to="/register" class="btn btn-warning my-sm-0 mx-lg-3">Registrar</router-link>
                <router-link to="/login" class="btn btn-warning my-sm-0 mx-lg-3">Login</router-link>
              </div>

            </div>
    </div>
  </nav>
</template>

<script>

import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  props: ['user'],
  methods: {
    async logout() {
      await axios.post('/logout').then(response => {
        localStorage.removeItem('token')
        this.$router.push({path: '/login'});

      }).catch(error => {
        console.log(error)
      })
    }
  }

}
</script>

<style scoped>

</style>