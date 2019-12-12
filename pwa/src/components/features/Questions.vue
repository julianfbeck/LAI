<template>
  <v-container>
    <v-tabs color="red lighten-2 accent-4" center-active>
      <v-tab ripple>Tables</v-tab>
      <v-tab ripple>Detail</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-layout wrap v-for="test in data" :key="test.overview.title">
              <v-flex mb-4>
              <h2 class="text-center">
                Questions from {{ test.overview.title }}
              </h2>
              <v-data-table
                :headers="headers"
                :items="test.questions"
                :sort-by="['question_fi']"
                :sort-desc="[true, true, true, false]"
                :hide-default-footer="true"
                multi-sort
                class="elevation-1 mb-10"
              ></v-data-table>
              </v-flex>
          </v-layout>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-layout wrap v-for="test in data" :key="test.overview.title">
            <v-flex mb-4>
              <h2 class="text-center">
                Questions from {{ test.overview.title }}
              </h2>
              <div v-if="test != null">
                <v-card
                  class="mb-1 mx-auto"
                  v-for="q in test.questions"
                  v-bind:key="q.question_fi"
                >
                  <v-card-text>
                    <p class="headline text--primary">
                      Question: {{ q.title }}
                    </p>
                    <div class="text--primary">
                      Question ID: {{ q.question_fi }}
                    </div>
                    <div class="text--primary">
                      Times shown: {{ q.times.length }}
                    </div>
                    <div class="text--primary">Times in s: {{ q.times }}</div>
                    <div class="text--primary">
                      Average Answer time: {{ q.average }}s
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
export default {
  name: "Questions",
  components: {},
  props: ["data"],
  mounted() {},
  data() {
    return {
      headers: [
        { text: "Question", value: "title" },
        { text: "ID", value: "question_fi" },
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
