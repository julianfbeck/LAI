<template>
    <v-container>
        <v-layout wrap>
            <v-flex mb-4>
                <div>
                    <v-card
                            class="mb-1 mx-auto"
                            v-for="user in data.aggregatedUsers"
                            v-bind:key="user[0].data.login"
                    >
                        <v-card-text>
                            <p class="headline text--primary">
                                Name: {{ user[0].data.login }}, Login:
                                {{ user[0].data.fullname }}
                            </p>
                            <div class="ma-2" v-for="test in user" v-bind:key="test.test">
                                <p class="headline text--primary">Test: {{ test.test }}</p>
                                <div class="text--primary">
                                    Total Passes: {{ test.data.passes.length }}
                                </div>
                                <div class="text--primary">
                                    Finished Tests: {{ test.data.results.length }}
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
                    <v-divider class="ma-3"></v-divider>
                    <v-btn
                            color="blue-grey"
                            class="white--text"
                            block
                            @click="downloadAll()"
                    >
                        Download all
                        <v-icon right dark>cloud_download</v-icon>
                    </v-btn>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import testParser from "@/components/features/testParser";

  export default {
    name: "Overview",
    components: {},
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
        this.data.aggregatedUsers.forEach(user => {
          user.forEach(test => {
            test.data.passes.forEach(pass => {
              rows.push({
                login: user[0].data.login,
                id: user[0].data.active_id,
                fullName: user[0].data.fullname,
                testLabel: test.test,
                pass: pass.pass,
                Time: pass.totalTime,
                TimeStamp: new Date(pass.tstamp * 1000).toISOString(),
                answeredQuestions: pass.answeredquestions,
                questionCount: pass.questioncount,
                points: pass.points,
                maxPoints: pass.maxpoints,
              });
            });
          });
        });
        testParser.downloadExcel("all", rows);
      }
    }
  };
</script>
