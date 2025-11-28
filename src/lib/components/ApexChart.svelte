<script lang="ts">
  import { onMount } from "svelte";
  import ApexCharts from "apexcharts";

  export let options;
  export let series;
  export let type = "bar";
  export let height = 350;

  let chartDiv: HTMLDivElement;

  onMount(() => {
    const chart = new ApexCharts(chartDiv, {
      ...options,
      series,
      chart: { type, height }
    });

    chart.render();

    return () => chart.destroy();
  });
</script>

<div bind:this={chartDiv}></div>
