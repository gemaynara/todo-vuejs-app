<template>

  <Header :user="user"/>
  <router-view :user="user"></router-view>

</template>

<script>

import Header from './components/Header';
import axios from "axios";


export default {
  name: 'App',
  props: ['user'],
  components: {
    Header
  },
  data() {
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      user: null,
    }
  },
  async created() {
    await axios.get('/user').then(response => {
      this.user = response.data.user

    }).catch(error => {
      console.log(error)
    })
  },

}
</script>

<style>

</style>
