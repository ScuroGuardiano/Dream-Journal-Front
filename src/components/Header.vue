<template>
<header>
    <h1>{{ title }}</h1>
</header>
</template>

<script>
export default {
  name: 'darkheader',
  data () {
    return {
        title: "Scuro Dream Journal"
    }
  }
}
</script>

<style scoped>
    header {
        background-color: black;
        color: #eeeeee;
    }
    h1 {
        font-size: 36px;
        margin: 0;
        padding: 0;
        margin-left: 10px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-weight: 300;
    }
</style>
