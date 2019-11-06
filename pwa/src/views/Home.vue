<template>
  <v-tabs >
    <v-tab ripple>Overview</v-tab>
    <v-tab ripple>Questions</v-tab>
    <v-tab ripple>Diagrams</v-tab>
    <v-tab-item>
      <v-card flat>
        <StartPage />
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card flat>
        <v-card-text>Contents for Item 2 go here</v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
// @ is an alias to /src
import StartPage from "@/components/StartPage.vue";

export default {
  name: "home",
  components: {
    StartPage
  }
};
</script>
