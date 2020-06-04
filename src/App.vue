<template>
  <div id="app">
    <TopBar/>
    <router-view/>
  </div>
</template>

<script>
  import TopBar from './components/top-bar';

  export default {
    name: 'App',
    components: {
      TopBar
    }
  }
</script>

<style lang="scss">
  body {
    margin: 0;
    background-color: lavender;
    min-height: 100vh;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 80px 0 0;

    &-wrapper {
       width: 100%;
       max-width: 700px;
     }

    &-separate {
       height: 60px;
     }
    }

    button {
      border: 0;
      font-size: 20px;
      color: aliceblue;
      background-color: cornflowerblue;
      padding: 20px 60px;
    }
  }
</style>
