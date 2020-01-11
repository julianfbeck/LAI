<template>
    <v-container>
        <v-row wrap>
            <v-col cols="12" md="6" xl="4"
                   v-for="user in data.aggregatedUsers"
                   v-bind:key="user[0].data.login">
                <v-card>
                    <v-card-text>
                        <p class="headline text--primary">
                            {{ user[0].data.fullname }} ({{ user[0].data.login }})
                        </p>
                        <div class="ma-2" v-for="test in user" v-bind:key="test.test">
                            <p class="headline text--secondary">Test: {{ test.test }}</p>
                            <div class="text--primary">
                                User id: {{ user[0].data.active_id }}
                            </div>
                            <div class="text--primary">
                                Total Passes: {{ test.data.passes.length }}
                            </div>
                            <div class="text--primary">
                                Passed Test: {{ test.data.results[0].passed==1?"Yes":"No" }}
                            </div>
                            <div class="text--primary">
                                Mark: {{ test.data.results[0].mark_official }}
                            </div>
                            <div class="text--primary">
                                Time per pass [s]: {{ test.data.passes.map(x => Number(x.workingtime)) }}
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row no-gutters>
            <v-divider class="ma-3"/>
            <v-btn color="blue-grey"
                   class="white--text"
                   block
                   @click="downloadAll()">
                Download all
                <v-icon right dark>cloud_download</v-icon>
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
  import XLSX from "xlsx"

  export default {
    props: ["data"],
    mounted() {
    },
    data() {
      return {};
    },
    methods: {
      downloadAll() {
        console.log(this.data)
        let wb = XLSX.utils.book_new()

        let rows = [];
        //convert data to a good looking excel table
        this.data.aggregatedUsers.forEach(user => {
          user.forEach(test => {
            test.data.passes.forEach(pass => {
              rows.push({
                login: user[0].data.login,
                id: user[0].data.active_id,
                full_name: user[0].data.fullname,
                test_label: test.test,
                verfügbarkeit_start: test.times.activation_start_time == 0 ? "not specified": new Date(test.times.activation_start_time * 1000).toISOString(),
                verfügbarkeit_ende: test.times.activation_end_time== 0 ? "not specified": new Date(test.times.activation_end_time * 1000).toISOString(),
                durchfuerung_zugang_start:test.times.starting_time,
                durchfuerung_zugang_ende:test.times.ending_time,
                erste_bearbeitung: new Date( user[0].data.firstLooked * 1000).toISOString(),
                letzte_bearbeitung:new Date(user[0].data.lastLooked * 1000).toISOString(),
                user_has_passed_once: user[0].data.results[0].passed==1?"Yes":"No",
                user_has_passed_mark:user[0].data.results[0].mark_official,
                number_of_passes: user[0].data.passes.length,
                pass_number: pass.pass,
                time_for_pass: pass.workingtime || 0,
                //working_time:pass.workingtime,
                time_stamp: new Date(pass.tstamp * 1000).toISOString(),
                number_answered_questions: pass.answeredquestions,
                count_of_questions: pass.questioncount,
                points: pass.points,
                max_number_of_points: pass.maxpoints
              });
            });
          });
        });
        let sheet = XLSX.utils.json_to_sheet(rows)
         XLSX.utils.book_append_sheet(wb, sheet,"All Users Test Passes")
        //testParser.downloadExcel("User_test_passes", rows);
        this.data.aggregatedUsers.forEach(user => {
          let data = []
          user.forEach(test => {
            test.data.passes.forEach(pass => {
              data.push({
                test_label: test.test,
                verfügbarkeit_start: test.times.activation_start_time == 0 ? "not specified": new Date(test.times.activation_start_time * 1000).toISOString(),
                verfügbarkeit_ende: test.times.activation_end_time== 0 ? "not specified": new Date(test.times.activation_end_time * 1000).toISOString(),
                durchfuerung_zugang_start:test.times.starting_time,
                durchfuerung_zugang_ende:test.times.ending_time,
                erste_bearbeitung: new Date( user[0].data.firstLooked * 1000).toISOString(),
                letzte_bearbeitung:new Date(user[0].data.lastLooked * 1000).toISOString(),
                user_has_passed_once: user[0].data.results[0].passed==1?"Yes":"No",
                user_has_passed_mark:user[0].data.results[0].mark_official,
                number_of_passes: user[0].data.passes.length,
                pass_number: pass.pass,
                time_for_pass: pass.workingtime || 0,
                //working_time:pass.workingtime,
                time_stamp: new Date(pass.tstamp * 1000).toISOString(),
                number_answered_questions: pass.answeredquestions,
                count_of_questions: pass.questioncount,
                points: pass.points,
                max_number_of_points: pass.maxpoints
              });
            });
          });
          let sheet2 = XLSX.utils.json_to_sheet(data)
          XLSX.utils.book_append_sheet(wb, sheet2,user[0].data.fullname)
        });

        XLSX.writeFile(wb, `TestUsers.xlsx`)      
      }
    }
  };
</script>

<style scoped>
    .v-card {
        height: 100%;
    }
</style>

