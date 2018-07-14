<template>
  <main>
    <darkheader></darkheader>
    <router-view></router-view>
  </main>
</template>

<script>
import Header from './components/Header.vue';
export default {
  components: {
    'darkheader': Header,
  },
  name: 'app',
  data () {
    return {
      title: "Scuro Dream Journal"
    }
  },
  methods: {

  }
}
</script>
<style>
html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
body {
  background-image: url('./assets/darkback.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}
.main-notloggedin {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
button {
    border: none;
    background-color: transparent;
    border: 2px solid #eee;
    color: #eee;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 24px;
    padding: 8px;
    transition-duration: 0.6s;
    cursor: pointer;
}
button:hover {
    background-color: #eee;
    color: black;
}
</style>
