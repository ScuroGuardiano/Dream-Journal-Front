<template>
<div class="main-notloggedin">
    <div class="forms-wrapper">
        <login v-on:loggedIn='login($event)'></login>
        <register v-on:loggedIn='login($event)'></register>
    </div>
</div>
</template>

<script>
import Login from './Login.vue';
import Register from './Register.vue';
export default {
  components: {
    login: Login,
    register: Register
  },
  name: 'not-logged-in',
  data () {
    return {
    }
  },
  methods: {
      login(event) {
          this.$emit('loggedIn', event);
      }
  }
}
</script>

<style scoped>
    .main-notloggedin {
        display: block;
        width: 100%;
        /*background-color: black;*/
        background-color: rgba(0, 0, 0, 0.5);
    }
    .forms-wrapper {
        display: inline-block;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
    #login {
        float: left;
    }
    #register {
        float: left;
        margin-left: 20px;
    }
</style>
