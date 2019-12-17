<template>
  <div class="lai-chart-container">
    <h3>Title of the diagram</h3>
    <stacked-bar-chart v-if="chartData !=null" :chart-data="chartData"></stacked-bar-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
  import StackedBarChart from "./StackedBarChart.js";

  // TODO: Only used for testing, should be removed later
  let randomScalingFactor = function() {
    let randomInteger = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return randomInteger(-50, 50);
  };

  export default {
    components: {
      StackedBarChart
    },
    props: ["datacollection"],
    data () {
      return {
        chartData: null
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {

        console.log(this.datacollection);

        // TODO: Calculate something printable based on the datacollection
        // let labels = "", datasets = {};
        //
        // <Calc>
        //
        // this.chartData = { labels, datasets };

        // TODO: Dummy data to be removed
        this.chartData = {
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
        }
      }
    }
  }
</script>
