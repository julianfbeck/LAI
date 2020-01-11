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
  import XLSX from "xlsx"

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

      downloadAll() {
        let simpleQuestions = [];
        let advancedTable = [];
        this.data.forEach(test => {
          test.questions.forEach(q => {
            simpleQuestions.push(
            {
                test_id:test.overview.testID,
                test_label:test.overview.title,
                verfügbarkeit_start: test.overview.times.activation_start_time== 0 ? "not specified": new Date(test.overview.times.activation_start_time * 1000).toISOString(),
                verfügbarkeit_ende: test.overview.times.activation_end_time== 0 ? "not specified": new Date(test.overview.times.activation_end_time * 1000).toISOString(),
                durchfuerung_zugang_start:test.overview.times.starting_time,
                durchfuerung_zugang_ende:test.overview.times.ending_time,
                question_id:q.question_fi,
                question_label:q.title,
                total_times_shown:q.times.length,
                average_time: q.average,
                //array_of_times:q.times
            }
            );
          });
        });
        this.data.forEach(test => {
          test.fullQuestions.forEach(q => {
            advancedTable.push(
            {
                test_label:test.overview.title,
                verfügbarkeit_start: test.overview.times.activation_start_time== 0 ? "not specified": new Date(test.overview.times.activation_start_time * 1000).toISOString(),
                verfügbarkeit_ende: test.overview.times.activation_end_time== 0 ? "not specified": new Date(test.overview.times.activation_end_time * 1000).toISOString(),
                durchfuerung_zugang_start:test.overview.times.starting_time,
                durchfuerung_zugang_ende:test.overview.times.ending_time,
                user_id: q.user.active_id,
                user_login: q.user.login,
                user_fullname: q.user.fullname,
                question_user_pass_number:q.pass,
                question_id:q.question_fi,
                question_title:q.title,
                question_start_time: new Date(q.tstamp * 1000).toISOString(),
                question_editing_time: q.time,
                question_average_time: q.questionAverage,
                question_points:q.points
            }
            );
          });
        });
        const wb = XLSX.utils.book_new()
        let sheet1 = XLSX.utils.json_to_sheet(simpleQuestions) 
        XLSX.utils.book_append_sheet(wb, sheet1, "Only Questions")
        let sheet2 = XLSX.utils.json_to_sheet(advancedTable) 
        XLSX.utils.book_append_sheet(wb, sheet2, "All Questions per User Pass")
        XLSX.writeFile(wb, `TestQuestions.xlsx`)  
      }
    }
  };
</script>

<style scoped>
    .v-card {
        height: 100%;
    }
</style>
