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
                            <p class="headline text--primary">Test: {{ test.test }}</p>
                            <div class="text--primary">
                                Total Passes: {{ test.data.passes.length }}
                            </div>
                            <div class="text--primary">
                                Finished Tests: {{ test.data.results.length }} (TODO: Current value is successful passes, not finished ones)
                            </div>
                            <div class="text--primary">
                                Status: {{ test.data.results[0].mark_official }}
                            </div>
                            <div class="text--primary">
                                Time per pass: {{ test.data.passes.map(x => x.totalTime) }}
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
  import testParser from "@/components/features/testParser";

  export default {
    props: ["data"],
    mounted() {
    },
    data() {
      return {};
    },
    methods: {
      downloadAll() {
        let rows = [];
        //convert data to a good looking excel table
        console.log(this.data[0].overview.times)
        this.data.aggregatedUsers.forEach(user => {
          user.forEach(test => {
            console.log(user[0].data.results[0])
            test.data.passes.forEach(pass => {
              rows.push({
                login: user[0].data.login,
                id: user[0].data.active_id,
                fullName: user[0].data.fullname,
                testLabel: test.test,
                Verfügbarkeit_Start: this.data[0].overview.times.activation_start_time== 0 ? "not specified": new Date(this.data[0].overview.times.activation_start_time * 1000).toISOString(),
                Verfügbarkeit_Ende: this.data[0].overview.times.activation_end_time== 0 ? "not specified": new Date(this.data[0].overview.times.activation_end_time * 1000).toISOString(),
                Durchfuerung_Zugang_Start:this.data[0].overview.times.starting_time,
                Durchfuerung_Zugang_Ende:this.data[0].overview.times.ending_time,
                Öffnen_des_Tests: new Date( user[0].data.tstamp * 1000).toISOString(),
                Erste_Bearbeitung:new Date(user[0].data.results[0].tstamp * 1000).toISOString(),

                pass: pass.pass,
                Time: pass.totalTime,
                TimeStamp: new Date(pass.tstamp * 1000).toISOString(),
                answeredQuestions: pass.answeredquestions,
                questionCount: pass.questioncount,
                points: pass.points,
                maxPoints: pass.maxpoints
              });
            });
          });
        });
        testParser.downloadExcel("all", rows);
      }
    }
  };
</script>

<style scoped>
    .v-card {
        height: 100%;
    }
</style>

