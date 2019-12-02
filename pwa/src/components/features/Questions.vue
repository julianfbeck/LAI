<template>
  <v-container>
    <v-layout wrap>
      <v-flex mb-4>
        <div v-if="questions != null">
          <p class="display-3">Question</p>
          <v-card
            class="mb-1 mx-auto"
            v-for="q in questions"
            v-bind:key="q.question_fi"
          >
            <v-card-text>
              <p class="headline text--primary">
                Question ID: {{ q.question_fi }}
              </p>
              <div class="text--primary">Times shown: {{ q.times.length }}</div>
              <div class="text--primary">Times in s: {{ q.times }}</div>
              <div class="text--primary">
                Average Answer time: {{ q.average }}s
              </div>
            </v-card-text>
          </v-card>
        </div>
        <v-divider class="ma-3"></v-divider>

        <v-data-table
          :headers="headers"
          :items="questions"
          :sort-by="['question_fi']"
          :sort-desc="[true, true, true, false]"
          :hide-default-footer="true"
          multi-sort
          class="elevation-1 mb-10"
        ></v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Questions",
  components: {},
  props: ["questions"],
  mounted() {},
  data() {
    return {
      headers: [
        { text: "Question id", value: "question_fi" },
        { text: "Average Answer time (s)", value: "average" },
        { text: "Times shown", value: "times.length" },
        { text: "Answer times", value: "timeString", sortable: false }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
