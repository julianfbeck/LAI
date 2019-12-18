<script>
    import { Scatter, mixins } from 'vue-chartjs'
    const { reactiveProp } = mixins

    // See
    // https://www.chartjs.org/samples/latest/ > Other charts > Scatter

    export default {
        extends: Scatter,
        mixins: [reactiveProp],
        props: ['chartData', 'options'],
        mounted () {
            // this.chartData is created in the mixin.
            console.log("ScatterChart::mounted()", this.chartData, this.options)

            let options = this.options ? this.options : {
                // Default options, may be overwritten
                responsive: true
            };

            this.renderChart(this.chartData, options)
        }
    }
</script>
