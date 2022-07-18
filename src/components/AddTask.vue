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

            <div class="form-group">
              <label class="form-label mt-4">Data de Conclusão</label>
              <input type="date" class="form-control" v-model="task.finished_at">
            </div>

            <div class="form-group">
              <label class="form-label mt-4">Situação</label>
              <select class="form-select" v-model="task.actual_status">
                <option :value="selecione">Selecione</option>
                <option v-for="(st, idx) in status" :key="idx" :value="st.name">{{ st.name }}</option>
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
import axios from 'axios';

export default {
  name: "AddTask",
  data() {
    return {
      task: [],
      name: '',
      finished_at: '',
      actual_status: 'selecione',
      errors: [],
      status: [
        {'id': 1, 'name': 'Pendente'},
        {'id': 2, 'name': 'Em Andamento'},
        {'id': 3, 'name': 'Finalizado'}
      ]
    }
  },

  methods: {
    async saveTask() {
      this.errors = [];
      if (!this.task.name) {
        this.errors.push("O campo nome é obrigatório")
      }
      if (this.task.actual_status==='selecione') {
        this.errors.push("O campo situação é obrigatório")
      }
      if (!this.task.finished_at) {
        this.errors.push("O campo situação é obrigatório")
      }

      if (!this.errors.length) {
        let formData = new FormData();
        formData.append('name', this.task.name)
        formData.append('status', this.task.actual_status)
        formData.append('finished_at', this.task.finished_at)
        await axios.post('/tasks/store', formData)
            .then(response => {
              if (response.status == 200) {
                this.task.name = ''
                this.task.actual_status = 1
                this.task.finished_at = ''
                // eslint-disable-next-line no-undef
                toastr.success(response.data.message)
                this.$router.push({path: '/tasks'});
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