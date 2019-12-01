<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <div v-if="overview != null">
          <p class="display-3">Overview</p>
          <v-card class="mb-1 mx-auto" v-for="user in overview.users" v-bind:key="user.active_id">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Name: {{user.fullname}}, Login: {{user.login}}</v-list-item-title>
                <v-list-item-subtitle>Total Passes: {{user.passes.length}}</v-list-item-subtitle>
                <v-list-item-subtitle>Finished Tests: {{user.results.length}}</v-list-item-subtitle>
                <v-list-item-subtitle>Status: {{user.results[0].mark_official}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-card class="mb-1 mx-auto">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Total unique Users</v-list-item-title>
                <v-list-item-subtitle>{{overview.uniqueUsers}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-card class="mb-1 mx-auto">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Total Test Runs</v-list-item-title>
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