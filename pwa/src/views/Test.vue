<template>
  <div>
    <v-layout text-center wrap>
      <v-container v-if="json.length == 0">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to LAI</h1>
        <p class="subheading font-weight-regular">
          Upload your exportet .xlsx file to get started
        </p>
        <v-file-input
          v-model="file"
          label="Select xls File..."
          accept=".xml"
          @change="onFileChange"
        ></v-file-input>
        <v-btn small v-on:click="sample">Load Sample</v-btn>
      </v-container>
    </v-layout>
    <v-tabs
      v-if="json.length != 0"
      color="red lighten-2 accent-4"
      center-active
    >
      <v-tab ripple>Overview</v-tab>
      <v-tab ripple>Questions</v-tab>
      <v-tab ripple>Diagrams</v-tab>
      <v-tab-item>
        <v-card flat>
          <Overview v-bind:overview="overview" />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <Questions />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <Charts />
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import Overview from "@/components/features/Overview.vue";
import Charts from "@/components/features/Charts.vue";
import Questions from "@/components/features/Questions.vue";

import xml2js from "xml2js";
import parse from "@/components/features/parseJson";
import sample from "@/components/features/sample";
export default {
  name: "home",
  components: {
    Overview,
    Questions,
    Charts
  },
  data() {
    return {
      file: null,
      json: [],
      overview: null
    };
  },
  methods: {
    sample() {
      this.json = sample.results
      console.log(this.json.tst_active[0].row)
      let users = this.json.tst_active[0].row.map(usr => usr.$)
      console.log(users)
      this.overview = parse.getOverview(this.json);
    },
    onFileChange() {
      let reader = new FileReader();
      let parser = new xml2js.Parser();

      reader.onload = () => {
        let data = reader.result;
        parser.parseString(data, (err, result) => {
          this.json = result.results;
        });
        this.overview = parse.getOverview(this.json);
      };
      reader.readAsBinaryString(this.file);
    }
  }
};
</script>
