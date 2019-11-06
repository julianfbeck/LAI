<template>
    <v-layout text-center wrap>
    <bar-diagram></bar-diagram>
    </v-layout>
</template>

<script>
// @ is an alias to /src
import BarDiagram from "@/components/BarDiagram";

export default {
  name: "charts",
  components: {
    BarDiagram
  }
};
</script>
