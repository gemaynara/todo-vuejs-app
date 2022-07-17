<template>
  <div class="container-fluid justify-content-center col-12 mt-5">
    <div class="card border-primary ">
      <div class="card-body">
        <h4 class="card-title">Adicionar Tarefa</h4>
        <div class="alert alert-dismissible alert-danger" v-if="errors.length">
          <ul class="mb-0">
            <li v-for="(error, index) in errors" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>
        <form @submit.prevent="saveTask" novalidate>
          <fieldset>
            <div class="form-group">
              <label class="form-label mt-4">Nome</label>
              <input type="text" class="form-control" v-model="task.name" maxlength="255">
            </div>

            <button type="submit" class="btn btn-primary mt-2">Salvar</button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AddTask",
  data() {
    return {
      task: [],
      name: '',
      errors: []
    }
  },

  methods: {
    async saveTask() {
      this.errors = [];
      if (!this.task.name) {
        this.errors.push("O campo nome é obrigatório")
      }

      if (!this.errors.length) {
        let formData = new FormData();
        formData.append('name', this.task.name)

        let tokenStr = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjU4MDE0NzI4LCJleHAiOjE2NTgwMTgzMjgsIm5iZiI6MTY1ODAxNDcyOCwianRpIjoieXo3dUJGMm1jUXEwS3diMiIsInN1YiI6IjQiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.PUvNZ-NynGmmVEV5uTTUM3VnSjp743Jb0r4giEWbGss'
        let url = 'http://127.0.0.1:8000/api/tasks/store'
        await axios.post(url, formData, {headers: {"Authorization": `Bearer ${tokenStr}`}}).then(response => {
          if (response.status == 200) {
            this.task.name = ''
            // eslint-disable-next-line no-undef
            toastr.success(response.data.message)
          }
        }).catch(error => {
          // eslint-disable-next-line no-undef
          toastr.error(error)
          console.log(error)
        })
      }

    },
  }
}
</script>
<style scoped>

</style>