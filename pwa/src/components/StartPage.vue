<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Welcome to LAI</h1>
        <p class="subheading font-weight-regular">Upload your exportet .xls file to get started</p>
        <v-file-input
          v-model="file"
          label="Select xls File..."
          accept=".xlsx"
          @change="onFileChange"
        ></v-file-input>
        <v-card class="mx-auto">
          <v-list-item v-for="item in json" v-bind:key="item">
            <v-list-item-content>
              <v-list-item-title>{{item.sheetName}}</v-list-item-title>
              <v-list-item-subtitle>{{item.data}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-flex>
    </v-layout>
    <bar-diagram></bar-diagram>
  </v-container>
</template>

<script>
import BarDiagram from "./BarDiagram";
import XLSX from "xlsx";
export default {
  name: "StartPage",
  components: {
    BarDiagram
  },
  data() {
    return {
      file: null,
      json: []
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
        console.log(workbook);
        workbook.SheetNames.forEach(sheetName => {
          let XL_row_object = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheetName]
          );

          this.json.push({ sheetName: sheetName, data: XL_row_object });
          console.log(this.json)
        });
      };
      reader.readAsBinaryString(this.file);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>