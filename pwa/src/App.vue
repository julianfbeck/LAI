<template>
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
      <StartPage />
    </v-content>
  </v-app>
</template>

<script>
import StartPage from "./components/StartPage";

export default {
  name: "App",
  components: {
    StartPage
  },
  data: () => ({
    //
  })
};
</script>
