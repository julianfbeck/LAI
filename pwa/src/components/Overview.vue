<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <div v-if="overview != null">
          <p class="display-3">Overview</p>
          <v-card class="mb-1 mx-auto">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Total Points Reached</v-list-item-title>
                <v-list-item-subtitle>{{overview.totalPoints}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-card class="mb-1 mx-auto">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Total Points Possible</v-list-item-title>
                <v-list-item-subtitle>{{overview.maxPoints}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-card class="mb-1 mx-auto">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Test completed</v-list-item-title>
                <v-list-item-subtitle>{{overview.totalTestRuns}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Overview",
  components: {},
  props: ["overview"],
  mounted(){
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>