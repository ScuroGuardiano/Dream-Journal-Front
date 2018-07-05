<template>
  <div id="register">
    <h1>Register</h1>
    <form>
        <label>E-mail:</label><br>
        <input type="email" name="email" v-model='email' required><br>
        <label>Password:
            <span class="error" v-if="password.length < 8 && password">[Password is too short]</span>
        </label><br>
        <input type="password" name="password" v-model='password' required><br>
        <label>Confirm password:
            <span class="error" v-if="password != confirmPassword">[Password doesn't match]</span>
        </label><br>
        <input type="password" v-model='confirmPassword' required>
        <button v-on:click.prevent="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import config from './../config';
export default {
  name: 'register',
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
      submit() {
          if(this.password !== this.confirmPassword) {
              return alert("Passwords doesn't match");
          }
          this.$http.post(config.SERVER_ADRESS + '/api/register', {
              email: this.email,
              password: this.password
          })
          .then(data => {
              console.log(data);
              if(data.status == 200) {
                  this.$emit('loggedIn', { user: data.body.result.userEmail });
              }
          })
          .catch(err => {
              console.log(err);
          });
      }
  }
}
</script>

<style scoped>
    #register {
        width: 400px;
        height: 400px;
        color: white;
        position: relative;
        /*background-color: black;*/
    }
    h1 {
        font-family: Verdana;
        margin: 0;
        padding: 0;
        margin-top: 20px;
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
    .error {
        color: red;
        font-style: italic;
    }
</style>
