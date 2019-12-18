<script>
    import { Pie, mixins } from 'vue-chartjs'
    const { reactiveProp } = mixins

    // See
    // https://www.chartjs.org/samples/latest/ > Other charts > Pie

    export default {
        extends: Pie,
        mixins: [reactiveProp],
        props: ['chartData', 'options'],
        mounted () {
            // this.chartData is created in the mixin.
            console.log("PieChart::mounted()", this.chartData, this.options)

            let options = this.options ? this.options : {
                // Default options, may be overwritten
                responsive: true
            };

            this.renderChart(this.chartData, options)
        }
    }
</script>
