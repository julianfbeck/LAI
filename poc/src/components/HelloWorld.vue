<template>
  <div>
    <bar-diagram></bar-diagram>
    <div class="container">
      <div class="large-12 medium-12 small-12 cell">
        <label>
          File
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
        </label>
        <button v-on:click="submitFile()">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import BarDiagram from "./BarDiagram";

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
      reader.readAsText(this.file);
      reader.onload = this.handleFileLoad;
    },
    handleFileLoad(event) {
      console.log(event);
      console.log(event.target.result);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
