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
            this.$http.delete(config.SERVER_ADRESS + '/api/delete-dream', {
                body: { id: this.id }
            })
            .then(data => {
                this.$router.push('/');
            })
            .catch(err => {
                alert("Some error occured, try again later " + JSON.stringify(err, 4));
            })
      }
  },
  created() {
        if(!this.id)
            return this.$router.push('/');
        this.$http.get('http://localhost:3000/api/dream/' + this.id)
        .then(data => {
            this.dream = data.body.result;
        })
        .catch(err => {
            if(err.status) {
                if(err.status == 404)
                    this.error = '404'
            }
            else {
                console.log(err);
                this.$router.push('/');
            }
        })
  }
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
