<template>
    <v-container fluid class="text-center">

        <!-- Diagrams TODO: Pressing the help button (?) triggers a reorder of the columns, just don't do it ¯\_(ツ)_/¯ -->
        <v-row no-gutters>
            <v-col cols="md">
                <features-diagrams-bar-diagram :diagramData="firstBarData"/>
            </v-col>
            <v-col cols="md">
                <features-diagrams-pie-diagram :diagramData="firstPieData"/>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="md">
                <features-diagrams-scatter-diagram :diagramData="firstScatterData"/>
            </v-col>
            <v-col cols="md">
                <features-diagrams-radar-diagram :diagramData="firstRadarData"/>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import { randomScalingFactor } from "@/utils/helper";

export default {
  props: ["data"],
  computed: {
      firstBarData: function () {
          return this.calcFirstBarData()
      },
      firstPieData: function () {
          return this.calcFirstPieData()
      },
      firstScatterData: function () {
          return this.calcFirstScatterData()
      },
      firstRadarData: function () {
          return this.calcFirstRadarData()
      }
  },
  methods: {
      calcFirstBarData () {
          console.log("Charts::calcFirstBarData()", this.data.aggregatedUsers);

          // Transform "data" to something chartable

          return {
              // Used by displayed diagram
              title: "A stacked bar diagram",

              // Piped to chart
              chartData: {
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [{
                      label: 'Dataset 1',
                      backgroundColor: 'rgb(255, 99, 132)',
                      data: [
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor()
                      ]
                  }, {
                      label: 'Dataset 2',
                      backgroundColor: 'rgb(54, 162, 235)',
                      data: [
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor()
                      ]
                  }, {
                      label: 'Dataset 3',
                      backgroundColor: 'rgb(75, 192, 192)',
                      data: [
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor()
                      ]
                  }]
              },
              //options: {
                  // Optional, overwrites default implementation
              //}
          }
      },
      calcFirstPieData () {
          console.log("Charts::calcFirstPieData()", this.data.aggregatedUsers);

          // Transform "data" to something chartable

          return {
              // Used by displayed diagram
              title: "A pie diagram",

              // Piped to chart
              chartData: {
                  labels: [ 'Red', 'Orange', 'Yellow', 'Green', 'Blue' ],
                  datasets: [{
                      data: [
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                      ],
                      backgroundColor: [
                          'rgb(255, 99, 132)',
                          'rgb(255, 159, 64)',
                          'rgb(255, 205, 86)',
                          'rgb(75, 192, 192)',
                          'rgb(54, 162, 235)',
                      ]
                  }]
              },
              //options: {
                  // Optional, overwrites default implementation
              //}
          }
      },
      calcFirstScatterData () {
          console.log("Charts::calcFirstScatterData()", this.data.aggregatedUsers);

          // Transform "data" to something chartable

          // TODO: Only for testing, to be removed.
          let generateDummyScatterData = function() {
              var data = [];
              for (var i = 0; i < 7; i++) {
                  data.push({
                      x: randomScalingFactor(),
                      y: randomScalingFactor()
                  });
              }
              return data;
          };

          return {
              // Used by displayed diagram
              title: "A scatter diagram",

              // Piped to chart
              chartData: {
                  datasets: [{
                      label: 'My First dataset',
                      borderColor: 'rgb(255, 99, 132)',
                      backgroundColor: 'rgb(255, 99, 132)',
                      data: generateDummyScatterData()
                  }, {
                      label: 'My Second dataset',
                      borderColor: 'rgb(54, 162, 235)',
                      backgroundColor: 'rgb(54, 162, 235)',
                      data: generateDummyScatterData()
                  }]
              },
              //options: {
                  // Optional, overwrites default implementation
              //}
          }
      },
      calcFirstRadarData () {
          console.log("Charts::calcFirstRadarData()", this.data.aggregatedUsers);

          // Transform "data" to something chartable

          return {
              // Used by displayed diagram
              title: "A radar diagram",

              // Piped to chart
              chartData: {
                  labels: [['Eating', 'Dinner'], ['Drinking', 'Water'], 'Sleeping', ['Designing', 'Graphics'], 'Coding', 'Cycling', 'Running'],
                  datasets: [{
                      label: 'My First dataset',
                      backgroundColor: 'rgba(255, 99, 132, 0.2)',
                      borderColor: 'rgb(255, 99, 132)',
                      pointBackgroundColor: 'rgb(255, 99, 132)',
                      data: [
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor()
                      ]
                  }, {
                      label: 'My Second dataset',
                      backgroundColor: 'rgba(54, 162, 235, 0.2)',
                      borderColor: 'rgb(54, 162, 235)',
                      pointBackgroundColor: 'rgb(54, 162, 235)',
                      data: [
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor(),
                          randomScalingFactor()
                      ]
                  }]
              },
              //options: {
                  // Optional, overwrites default implementation
              //}
          }
      }
  }
};
</script>

<style>
    .lai-chart-container {
        padding: 20px;
    }
</style>
