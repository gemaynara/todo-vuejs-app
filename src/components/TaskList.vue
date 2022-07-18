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

      await axios.get('/tasks').then(response => {
        this.tasks = response.data.tasks
      }).catch(error => {
        console.log(error)
      })
    },

    async deleteTask(id) {
      if (confirm("Você confirma que deseja apagar o registro?")) {
        await axios.delete('/tasks/delete/' + id).then(response => {
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

    }
  },
  mounted() {
    this.getTasks()
  }

}
</script>

<style scoped>

</style>