<template>
<v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <div v-if="questions != null">
          <p class="display-3">Question</p>
          <v-card class="mb-1 mx-auto" v-for="q in  questions" v-bind:key="q.question_fi">
        
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Question ID: {{q.question_fi}}</v-list-item-title>
                 <v-list-item-subtitle>Times showen: {{q.times.length}}</v-list-item-subtitle>
                <v-list-item-subtitle>Times in s: {{q.times}}</v-list-item-subtitle>
                <v-list-item-subtitle>Average Answer time: {{q.average}}s</v-list-item-subtitle>
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
  name: "Questions",
  components: {},
  props: ["questions"],
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