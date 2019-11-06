<template>
  <v-app id="app">

    <core-toolbar/>

    <core-navigation/>

    <div id="container">
      <v-content>
        <router-view />

        <core-footer/>
      </v-content>
    </div>
  </v-app>
</template>

<style>
  #app {
    background: #eee
  }

  #container {
    width: 100%;
    height: 100%;
  }
</style>
