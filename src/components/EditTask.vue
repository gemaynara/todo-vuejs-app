<template>
  <div class="container-fluid justify-content-center col-12 mt-5">
    <div class="card border-primary ">
      <div class="card-body">
        <h4 class="card-title">Editar Tarefa</h4>
        <div class="alert alert-dismissible alert-danger" v-if="errors.length">
          <ul class="mb-0">
            <li v-for="(error, index) in errors" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>
        <form @submit.prevent="updateTask" novalidate>
          <fieldset>
            <div class="form-group">
              <label class="form-label mt-4">Nome</label>
              <input type="text" class="form-control" v-model="task.name" maxlength="255">
            </div>

            <button type="submit" class="btn btn-primary mt-2">Editar</button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "EditTask",
  data() {
    return {
      task: [],
      name: '',
      errors: []
    }
  },
  created() {
    this.getTaskById()
  },
  methods: {
    async getTaskById() {

      await axios.get('/tasks/show/' + this.$route.params.id)
          .then(response => {
            this.task = response.data.task

          }).catch(error => {
            console.log(error)
          })
    },
    async updateTask() {
      this.errors = [];
      if (!this.task.name) {
        this.errors.push("O campo nome é obrigatório")
      }

      if (!this.errors.length) {
        let formData = new FormData();
        formData.append('name', this.task.name)

        await axios.post('/tasks/update/' + this.$route.params.id, formData).then(response => {
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
    }
  }
}
</script>
<style scoped>

</style>