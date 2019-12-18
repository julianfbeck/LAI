<template>
    <v-container>
        <v-tabs color="red lighten-2 accent-4" center-active>
            <v-tab ripple>Tables</v-tab>
            <v-tab ripple>Detail</v-tab>

            <!-- TABLES tab -->
            <v-tab-item>
                <v-row v-for="test in data" :key="test.overview.title">
                    <v-col mb-4 cols="12">
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
                                class="elevation-1"/>
                    </v-col>
                    <v-col cols="12">
                        <v-btn block
                               @click="download(test)">
                            Download
                            <v-icon right dark>cloud_download</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-divider class="ma-4"/>
                    <v-btn color="blue-grey"
                           class="white--text"
                           block
                           @click="downloadAll()">
                        Download all
                        <v-icon right dark>cloud_download</v-icon>
                    </v-btn>
                </v-row>
            </v-tab-item>

            <!-- DETAIL tab -->
            <v-tab-item>
                <v-row v-for="test in data" :key="test.overview.title">
                    <v-col cols="12">
                        <h2 class="text-center">
                            Questions from {{ test.overview.title }}
                        </h2>
                        <v-row wrap v-if="test != null">
                            <v-col cols="12" md="6" xl="4"
                                   v-for="q in test.questions"
                                   v-bind:key="q.question_fi">

                                <v-card>
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
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
  import testParser from "@/components/features/testParser";

  export default {
    props: ["data"],
    mounted() {
    },
    data() {
      return {
        headers: [
          {text: "Question", value: "title"},
          {text: "ID", value: "question_fi"},
          {text: "Average Answer time (s)", value: "average"},
          {text: "Times shown", value: "times.length"},
          {text: "Answer times", value: "timeString", sortable: false}
        ]
      };
    },
    methods: {
      download(test) {
        testParser.downloadExcel(test.overview.title, test.questions);
      },

      downloadAll() {
        let allQuestions = [];
        this.data.forEach(test => {
          test.questions.forEach(q => {
            q["Test ID"] = test.overview.testID;
            q["Test Title"] = test.overview.title;
            allQuestions.push(q);
          });
        });
        testParser.downloadExcel("all", allQuestions);
      }
    }
  };
</script>

<style scoped>
    .v-card {
        height: 100%;
    }
</style>
