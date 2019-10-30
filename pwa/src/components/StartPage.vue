<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Welcome to LAI</h1>
        <p class="subheading font-weight-regular">Upload your exportet .xls file to get started</p>
        <v-file-input type="file" id="file" ref="file" label="Select .xls" v-on:change="handleFileUpload()"></v-file-input>
      </v-flex>
    </v-layout>
    <bar-diagram></bar-diagram>
    <v-file-input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
  </v-container>
</template>

<script>
import BarDiagram from "./BarDiagram";
import XLSX from "xlsx"
export default {
  name: "HelloWorld",
  components: {
    BarDiagram
  },
  data() {
    return {
      file: ""
    };
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
      const reader = new FileReader();
      reader.onload = this.handleFileLoad;
    },
    handleFileLoad(event) {
      var data = event.target.result;
      var workbook = XLSX.read(data, {
        type: "binary"
      });
      console.log(workbook.SheetNames)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>