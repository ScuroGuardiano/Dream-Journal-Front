<template>
<div>
    <button class="back-to-dashboard" v-on:click.prevent="goToDashboard">Back to Dashboard</button>
    <div v-if="error === '404'">
        <h1>404 Not Found</h1>
        <p>Dream not found</p>
    </div>
    <div class="dream-view" v-if="dream">
        <h1 v-bind:title="dream.title">{{ dream.title }}</h1>
        <div class="dream-view-buttons">
            <button v-on:click.prevent="editDream">Edit</button>
            <button v-on:click.prevent="deleteDream">Delete</button>
        </div>
        <div class="dream-view-content">
            <p>{{ dream.content }}</p>
        </div>
    </div>
</div>
</template>

<script>
import config from './../config';
import handle401error from '../mixins/handle401error';
export default {
  name: 'viewdream',
  data () {
    return {
        id: this.$route.params.id,
        dream: null,
        error: ''
    }
  },
  methods: {
      goToDashboard() {
          this.$router.push('/');
      },
      editDream() {
          this.$router.push(`/dream/${this.id}/edit`)
      },
      deleteDream() {
          let sure = confirm('Are you sure?');
          if(sure)
            this.$http.delete(config.SERVER_ADRESS + `/api/dream/${this.id}/delete`, {
                headers: { 'X-Dark-Token': window.localStorage.getItem('sessionToken') || "" }
            })
            .then(data => {
                if(data.body.token)
                    window.localStorage.setItem('sessionToken', data.body.token);
                this.$router.push('/');
            })
            .catch(err => {
                if(err.status) {
                    if(err.status === 404)
                        this.$router.push('/');
                    if(err.status === 401)
                        this.handle401Error(err);
                }
                alert("Some error occured, try again later " + JSON.stringify(err, 4));
            })
      }
  },
  created() {
        if(!this.id)
            return this.$router.push('/');
        this.$http.get('http://localhost:3000/api/dream/' + this.id, {
            headers: {
                "X-Dark-Token": window.localStorage.getItem('sessionToken') || ""
            }
        })
        .then(data => {
            this.dream = data.body.dream;
            if(data.body.token)
                window.localStorage.setItem('sessionToken', data.body.token);
        })
        .catch(err => {
            if(err.status) {
                if(err.status === 404)
                    this.error = '404';
                if(err.status === 401)
                    this.handle401Error();
            }
            else {
                console.log(err);
                this.$router.push('/');
            }
        })
  },
  mixins: [handle401error]
}
</script>

<style scoped>
.dream-view {
    width: 600px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    height: 80vh;
    color: #eee;
    background-color: black;
    box-sizing: border-box;
    border: solid 0px black;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    padding: 10px;
}
.dream-view h1 {
    padding-top: 0px;
    margin-top: 0px;
    width: 400px;
    height: 36px;
    overflow: hidden;
    font-size: 24px;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
}
.dream-view-buttons {
    float: right;
}
.dream-view-content {
    overflow: auto;
    height: calc(100% - 60px);
    clear: both;
    white-space: pre-wrap;
}
.back-to-dashboard {
    margin-left: 10px;
    margin-top: 10px;
}
</style>
