<template>
  <div class="container-fluid justify-content-center col-12 mt-5">
    <div class="card border-primary ">
      <div class="card-body">
        <h4 class="card-title">Lista de Tarefas</h4>
        <div class="row">
          <table class="table table-hover table-responsive">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tarefa</th>
              <th scope="col">Situação</th>
              <th scope="col">Ações</th>
            </tr>
            </thead>
            <tbody v-for="task  in tasks" :key="task.id">
            <tr>
              <th scope="row">{{ task.id }}</th>
              <td>{{ task.name }}</td>
              <td>{{ task.status }}</td>
              <td>
                <router-link type="button" class="btn btn-primary mx-lg-2"
                       :to="{name: 'EditTask', params:{id: task.id}}"
                >Editar
                </router-link>

                <button type="button" class="btn btn-danger"
                        @click.prevent="deleteTask(task.id)"
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
import axios from 'axios';

export default {
  name: "TaskList",
  data() {
    return {
      tasks: []
    }
  },
  created() {
    this.getTasks()
  },
  methods: {
    async getTasks() {
      let tokenStr = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjU4MDY0NzEyLCJleHAiOjE2NTgwNjgzMTIsIm5iZiI6MTY1ODA2NDcxMiwianRpIjoiMmlZQ2VhNjFoVVlnWGllbSIsInN1YiI6IjQiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.vnWSNY52qDygJqjJhK-2x72JxwJYtL8yiVxD8vG8lS4';
      let url = 'http://127.0.0.1:8000/api/tasks';

      await axios.get(url, {headers: {"Authorization": `Bearer ${tokenStr}`}}).then(response => {
        this.tasks = response.data.tasks

      }).catch(error => {
        console.log(error)
      })
    },
    async deleteTask(id) {
      let tokenStr = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjU4MDE2OTczLCJleHAiOjE2NTgwMjA1NzMsIm5iZiI6MTY1ODAxNjk3MywianRpIjoiNEQ0RjhlTTB2T3M2R0VGdCIsInN1YiI6IjQiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.xjMWPK2-RLiRD7qkiNfRXGIN37FjSPiB6SMeYfib9kg'
      let url = 'http://127.0.0.1:8000/api/tasks/delete/'+id;
      await axios.delete(url,{headers: {"Authorization": `Bearer ${tokenStr}`}}).then(response => {
        if (response.status == 200) {
          // eslint-disable-next-line no-undef
          toastr.success(response.data.message)
          this.getTasks()
        }
      }).catch(error => {
        // eslint-disable-next-line no-undef
        toastr.error(error)
        console.log(error)
      })
    }
  },
  mounted() {
    console.log('componente mountend')
  }
}
</script>

<style scoped>

</style>