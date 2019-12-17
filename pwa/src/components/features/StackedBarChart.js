import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

// See
// https://codepen.io/apertureless/pen/zEmNpp
// https://www.chartjs.org/samples/latest/ > Bar charts > Stacked

export default {
    extends: Bar,
    mixins: [reactiveProp],
    mounted () {
        // this.chartData is created in the mixin.
        this.renderChart(this.chartData, {
            // Options
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                xAxes: [{
                    stacked: true, // Forces the axis to be displayed stacked (both x and y should be true)
                    categoryPercentage: 0.5,
                    barPercentage: 1
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        })
    }
}