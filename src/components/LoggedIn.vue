<template>
<div class="main-loggedin">
    <h1>Welcome to your Dream Journal!</h1>
    <dashboard v-on:loggedOut="logout"></dashboard>
</div>
</template>

<script>
import Dashboard from './Dashboard.vue'
import config from './../config';
export default {
  name: 'logged-in',
  components: {
      dashboard: Dashboard
  },
  props: ['user'],
  data () {
    return {

    }
  },
  methods: {
      logout() {
          this.$emit('loggedOut');
      }
  },
  beforeCreate() {
      if(!this.$parent.loggedIn)
        this.$router.push('/login');
  },
  created() {

  }
}
</script>


<style scoped>
    h1, #dashboard >>> h1 {
        color: white;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        text-align: center;
    }
    #dashboard {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }
</style>