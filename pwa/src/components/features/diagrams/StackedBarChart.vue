<script>
    import { Bar, mixins } from 'vue-chartjs'
    const { reactiveProp } = mixins

    // See
    // https://jsfiddle.net/euledge/sg0c82ev/
    // https://www.chartjs.org/samples/latest/ > Bar charts > Stacked

    export default {
        extends: Bar,
        mixins: [reactiveProp],
        props: ['chartData', 'options'],
        mounted () {
            // this.chartData is created in the mixin.
            console.log("StackedBarChart::mounted()", this.chartData, this.options)

            // https://codepen.io/apertureless/pen/zEmNpp
            let options = this.options ? this.options : {
                // Default options, may be overwritten
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
            };

            this.renderChart(this.chartData, options)
        }
    }
</script>
