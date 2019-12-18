<template>
    <div class="lai-chart-container">
        <h3>{{ diagramData.title }}</h3>
        <features-diagrams-scatter-chart :chart-data="chartData" :options="options"/>
    </div>
</template>

<script>
    export default {
        props: ["diagramData"],
        computed: {
            chartData: function () {
                return this.diagramData.chartData;
            },
            options: function () {
                return this.diagramData.options;
            }
        }
    }
</script>
