<template>
<div>
    <button class="back-to-dashboard" v-on:click.prevent="goToDashboard">Back to Dashboard</button>
    <div v-if="error === '404'">
        <h1>404 Not Found</h1>
        <p>Dream not found</p>
    </div>
    <div class="dream-edit" v-if="!error">
        <input type="text" placeholder="Title of your dream" v-model="dreamTitle" id="dreamtitle" />
        <div class="dream-edit-buttons">
            <button v-on:click.prevent="cancelEdition">Cancel</button>
            <button v-on:click.prevent="submitDream">Submit</button>
        </div>
        <div class="dream-edit-content">
            <textarea placeholder="Describe your dream..." v-model="dream"></textarea>
        </div>
    </div>
</div>
</template>

<script>
import config from './../config';
import handle401error from '../mixins/handle401error';
export default {
  name: 'newdream',
  data () {
    return {
        id: this.$route.params.id,
        dream: '',
        error: '',
        dreamTitle: ''
    }
  },
  methods: {
      goToDashboard() {
          this.$router.push('/');
      },
      submitDream() {
          if(!this.dreamTitle)
            return alert('Enter your dream title before sending!');
          if(!this.dream)
            return alert('Enter your dream description before sending!');
          this.$http.put(config.SERVER_ADRESS + '/api/dream/' + this.id + '/edit', {
              dreamTitle: this.dreamTitle,
              dream: this.dream,
          }, {
              headers: { 'X-Dark-Token': window.localStorage.getItem('sessionToken') || "" }
          })
          .then(data => {
              this.$router.push('/dream/' + data.body.dream.id);
              if(data.body.token)
                window.localStorage.setItem('sessionToken', data.body.token);
          })
          .catch(err => {
              if(err.code) {
                  if(err.code === 404) {
                      alert("404 - Dream that you're editing doesn't exits");
                      this.$router.push('/');
                  }
                  else if(err.code === 401) {
                      this.handle404Error(err);
                  }
                  else alert('Some error occured, try again later');
              }
              else alert('Some error occured, try again later');
          })
      },
      cancelEdition() {
          this.$router.push('/dream/' + this.id);
      }
  },
  created() {
      this.$http.get(config.SERVER_ADRESS + '/api/dream/' + this.id, {
          headers: { 'X-Dark-Token': window.localStorage.getItem('sessionToken') || "" }
      })
      .then(data => {
          this.dream = data.body.dream.content,
          this.dreamTitle = data.body.dream.title
          if(data.body.token)
            window.localStorage.setItem('sessionToken', data.body.token);
      })
    .catch(err => {
        if(err.status) {
            if(err.status === 404)
                this.error = '404'
            if(err.status === 401)
                this.handle404Error(err);
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
#dreamtitle {
    border: none;
    border-bottom: 2px white solid;
    background-color: black;
    font-size: 36px;
    width: 350px;
    color: #eee;
    float: left;
}
.dream-edit {
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
.dream-edit-buttons {
    float: right;
}
.dream-edit-content {
    overflow: auto;
    height: calc(100% - 60px);
    clear: both;
}
.dream-edit-content textarea {
    width: 100%;
    height: calc(100% - 15px);
    margin-top: 10px;
    box-sizing: border-box;
    background-color: black;
    color: #eee;
    font-size: 14px;
    resize: none;
}
.back-to-dashboard {
    margin-left: 10px;
    margin-top: 10px;
}
</style>
