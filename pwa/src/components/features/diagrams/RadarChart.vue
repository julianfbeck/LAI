<script>
    import { Radar, mixins } from 'vue-chartjs'
    const { reactiveProp } = mixins

    // See
    // https://www.chartjs.org/samples/latest/ > Other charts > Radar

    export default {
        extends: Radar,
        mixins: [reactiveProp],
        props: ['chartData', 'options'],
        mounted () {
            // this.chartData is created in the mixin.
            console.log("RadarChart::mounted()", this.chartData, this.options)

            let options = this.options ? this.options : {
                // Default options, may be overwritten
                legend: {
                    position: 'top',
                },
                scale: {
                    ticks: {
                        beginAtZero: true
                    }
                }
            };

            this.renderChart(this.chartData, options)
        }
    }
</script>
