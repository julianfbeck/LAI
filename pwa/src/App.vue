<template>
  <div id="app">
    <v-app>
      <v-app-bar app>
        <v-toolbar-title class="headline text-uppercase">
          <span>BEJU</span>
          <span class="font-weight-light">AS A SERVICE</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
          <span class="mr-2">LAI</span>
        </v-btn>
      </v-app-bar>

      <v-content>
        <router-view />
      </v-content>
    </v-app>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
