<template>
  <div>
    <v-layout text-center wrap>
      <v-container v-if="json.length == 0">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to LAI</h1>
        <p class="subheading font-weight-regular">Upload your exportet .xlsx file to get started</p>
        <v-file-input
          v-model="file"
          label="Select xls File..."
          accept=".xlsx"
          @change="onFileChange"
        ></v-file-input>
      </v-container>
    </v-layout>
    <v-tabs v-if="json.length != 0"  color="red lighten-2 accent-4" center-active>
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

import XLSX from "xlsx";
import parse from "@/components/features/parseJson";
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
    onFileChange() {
      let reader = new FileReader();
      reader.onload = () => {
        let data = reader.result;
        let workbook = XLSX.read(data, {
          type: "binary"
        });
        workbook.SheetNames.forEach(sheetName => {
          let XL_row_object = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheetName]
          );

          this.json.push({ sheetName: sheetName, data: XL_row_object });
        });
        this.overview = parse.getOverview(this.json);
      };
      reader.readAsBinaryString(this.file);
    }
  }
};
</script>