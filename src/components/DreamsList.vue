<template>
<div>
  <button class="back-to-dashboard" v-on:click.prevent="goToDashboard">Back to Dashboard</button>
  <h1 v-if='dreams.length'>Your last dreams</h1>
  <div id="dreamlist">
    <h1 v-if='!dreams.length'>{{ dreamsMessage }}</h1>
    <div v-for='(dream, index) in dreams' v-bind:key="index" class="dream">
      <router-link v-bind:to="'/dream/' + dream.id"><h2 class="dream-title">{{ dream.title }}</h2></router-link>
      <h2 class="dream-date">{{ new Date(dream.date).toLocaleDateString() }}</h2>
    <p>{{ dream.content + '...'}}</p>
    </div>
  </div>
</div>
</template>

<script>
import config from './../config';
import handle401error from '../mixins/handle401error';
export default {
  name: 'dreamlist',
  data () {
    return {
      dreams: [],
      error: '',
      dreamsMessage: 'Loading...'
    }
  },
  methods: {
      goToDashboard() {
          this.$router.push('/');
      }
  },
  created() {
      this.$http.get(config.SERVER_ADRESS + '/api/dreams',
      { 
        params: { contentLimit: 120 },
        headers: { 'X-Dark-Token': window.localStorage.getItem('sessionToken') || "" } 
      })
      .then(data => {
          if(data.body.dreams.length) {
              this.dreams = data.body.dreams
          }
          else {
              this.dreamsMessage = "You have no dreams yet";
          }
          if(data.body.token)
            window.localStorage.setItem('sessionToken', data.body.token);
      })
      .catch(err => {
          if(err.status && err.status === 401) {
              this.handle401Error(err);
          }
          else this.error = "Some error while trying to download dreams";
      });
  },
  mixins: [handle401error]
}
</script>

<style scoped>
h1 {
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #eee;
}
.back-to-dashboard {
    margin-left: 10px;
    margin-top: 10px;
}
.dream {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 30px;
        text-shadow: 0 0 3px #000; /* horizontal-offset vertical-offset 'blur' colour */
        -moz-text-shadow: 0 0 3px #000;
        -webkit-text-shadow: 0 0 3px #000;
    }
#dreamlist {
    margin-left: auto;
    margin-right: auto;
    width: 800px;
    max-height: 70vh;
    overflow: auto;
}
.dream-title {
    float: left;
}
.dream-date {
    float: right;
}
.dream h2 {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-align: left;
    color: #eee;
    margin-bottom: 0px;
    padding-bottom: 0px;
}
.dream p {
    clear: both;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin-top: 8px;
    color: #eee;
}
</style>
