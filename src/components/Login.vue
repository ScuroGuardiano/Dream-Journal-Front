<template>
  <div id="login">
    <h1>Login</h1>
    <form>
        <label>E-mail:</label><br>
        <input type="email" name="email" v-model='email' required><br>
        <label>Password:</label><br>
        <input type="password" name="password" v-model='password' required><br>
        <button v-on:click.prevent="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import config from './../config';
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
      submit() {
          this.$http.post(config.SERVER_ADRESS + '/api/login', {
              email: this.email,
              password: this.password
          })
          .then(data => {
            console.dir(data);
            console.dir(data.body);
            if(data.body.token)
                window.localStorage.setItem('sessionToken', data.body.token);
            this.$router.push('/');
          })
          .catch(err => {
            if(err.body && err.body.error) {
                alert(err.body.error);
            }
            else alert("Uknown error, try again later");
          });
      }
  }
}
</script>

<style scoped>
    #login {
        width: 400px;
        height: 400px;
        color: white;
        position: relative;
        /*background-color: black;*/
    }
    h1 {
        font-family: Verdana;
        margin: 0;
        margin-top: 20px;
        padding: 0;
        text-align: center;
    }
    input {
        text-align: center;
        color: inherit;
        font-size: 24px;
        font-family: Consolas;
        width: 350px;
        margin-bottom: 10px;
        border: none;
        border-bottom: 2px solid white;
        padding-top: 5px;
        padding-bottom: 5px;
        background-color: inherit;
        font-weight: bold;
    }
    button {
        color: white;
        background-color: transparent;
        border: none;
        border: solid 2px #eeeeee;
        margin-top: 10px;
        width: 200px;
        font-size: 24px;
        font-family: Verdana;
        margin-left: 75px;
        cursor: pointer;
        transition-duration: 0.6s;
    }
    button:hover {
        background-color: #eeeeee;
        color: black;
    }
    form {
        position: absolute;
        display: block;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
