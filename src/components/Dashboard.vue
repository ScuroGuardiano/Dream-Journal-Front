<template>
<div id="dashboard">
    <button v-on:click.prevent="goToNewDream">New Dream</button>
    <button>Account Settings</button>
    <button v-on:click.prevent="logout">Logout</button>
    <div id="dreams">
        <h1 v-if='dreams.length'>Your last dreams</h1>
        <h1 v-if='!dreams.length'>{{ dreamsMessage }}</h1>
        <div v-for='(dream, index) in dreams' v-bind:key="index" class="dream">
            <router-link v-bind:to="'/dream/' + dream.id"><h2 class="dream-title">{{ dream.title }}</h2></router-link>
            <h2 class="dream-date">{{ new Date(dream.date).toLocaleDateString() }}</h2>
            <p>{{ dream.content + '...'}}</p>
        </div>
    </div>
    <button id="viewalldreams" v-if='dreams.length' v-on:click.prevent='viewAllDreams'>View all dreams</button>
</div>
</template>

<script>
import config from './../config';
export default {
  name: 'logged-in',
  props: ['user'],
  data () {
    return {
        dreams: [],
        error: '',
        dreamsMessage: 'Loading...'
    }
  },
  methods: {
      logout() {
          this.$emit('loggedOut');
      },
      viewAllDreams() {
          this.$router.push('/dreams');
      },
      goToNewDream() {
          this.$router.push('/newdream');
      }
  },
  created() {
      this.$http.get(config.SERVER_ADRESS + '/api/dreams', {
          params: { limit: 4, contentLimit: 120 }
      })
      .then(data => {
          if(data.body.result.length) {
              this.dreams = data.body.result
          }
          else {
              this.dreamsMessage = "You have no dreams yet";
          }
      })
      .catch(err => {
          this.error = "Some error while trying to download dreams";
      });
  }
}
</script>

<style scoped>
    .dream {
        width: 50%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 30px;
        text-shadow: 0 0 3px #000; /* horizontal-offset vertical-offset 'blur' colour */
        -moz-text-shadow: 0 0 3px #000;
        -webkit-text-shadow: 0 0 3px #000;
    }
    #dreams {
        margin-top: 80px;
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
    #viewalldreams {
        margin-bottom: 20px;
    }
</style>