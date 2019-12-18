<template>
  <v-container fluid>
    <v-layout text-center wrap>
      <v-container v-if="!result">
        <h1>Analyze a Test</h1>
        <p class="subheading font-weight-regular">
          Upload your exportet .zip file to get started
        </p>
        <div v-for="(file, index) in files" v-bind:key="index">
          <v-file-input
            v-model="file.value"
            label="Select .zip File..."
            accept=".zip"
            @change="onFileChange(file.value,index)"
          ></v-file-input>
        </div>
        <v-btn block v-on:click="analyze" color="green" dark>Let's Analyze</v-btn>
      </v-container>
    </v-layout>
    <v-tabs
            v-if="result"
            color="red lighten-2 accent-4"
            center-active
    >
      <v-tab ripple>Overview</v-tab>
      <v-tab ripple>Questions</v-tab>
      <v-tab ripple>Diagrams</v-tab>
      <v-tab-item>
        <v-card flat>
          <features-test-overview v-bind:data="data" />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <features-test-questions v-bind:data="data" />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <features-test-charts v-bind:data="data" />
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
// @ is an alias to /src
import xml2js from "xml2js";
import jszip from "jszip";
import parse from "@/components/features/parseJson";
export default {

  name: "home",
  data() {
    return {
      files: [],
      data:[],
      result:false

    };
  },
  created(){
    this.files.push({ value: null });
  },
  methods: {
    onFileChange(file,i) {
      let parser = new xml2js.Parser();
      jszip
        .loadAsync(file)
        .then(content => {
          // if you return a promise in a "then", you will chain the two promises
          let qti = null;
          let result = null;
          for (const [name, file] of Object.entries(content.files)) {
            if (name.includes("qti")) {
              qti = file;
            }
            if (name.includes("result")) {
              result = file;
            }
          }

          return Promise.all([qti.async("text"), result.async("text")]);
        })
        .then(txt => {
          let qti = null
          let json = null
          parser.parseString(txt[0], (err, result) => {
            qti = result.questestinterop.assessment[0]
          });
          parser.parseString(txt[1], (err, result) => {
            json = result.results;
          });

          this.data.push({"qti":qti,"json":json, "index":i})
          this.files.push({ value: null });
          //this.loadData();
        });
    },
    loadData() {
      this.overview = parse.getData(this.json, this.qti);
      this.questions = this.overview.questions;
    },
    analyze() {
      this.data.forEach(test => {
        test.overview = parse.getData(test.json,test.qti)
        test.questions = test.overview.questions
      });
      this.data.aggregatedUsers = parse.aggregateUserData(this.data)
      this.result = true
    }
  }
};
</script>
