<template>
    <v-container fluid class="text-center">

        <!-- Diagrams TODO: Pressing the help button (?) triggers a reorder of the columns, just don't do it ¯\_(ツ)_/¯ -->
        <v-row no-gutters>
            <v-col cols="md">
                <bar-diagram v-bind:datacollection="data"></bar-diagram>
            </v-col>
            <v-col cols="md">
                <bar-diagram v-bind:datacollection="data"></bar-diagram>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="md">
                <bar-diagram v-bind:datacollection="data"></bar-diagram>
            </v-col>
            <v-col cols="md">
                <bar-diagram v-bind:datacollection="data"></bar-diagram>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
// @ is an alias to /src
import BarDiagram from "@/components/features/BarDiagram";

export default {
  name: "Charts",
  props: ["data"],
  mounted() {},
  data() {
      return {};
  },
  components: {
    BarDiagram
  }
};
</script>

<style>
    .lai-chart-container {
        padding: 20px;
    }
</style>