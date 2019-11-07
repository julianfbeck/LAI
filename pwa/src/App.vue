<template>
  <v-app id="app" class="lai-color-gray">
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

<style lang="scss">
  @import '@/assets/scss/index.scss';

  #container, .v-content {
    height: 100%;
  }
  #container {
    width: 100%;
  }
</style>
