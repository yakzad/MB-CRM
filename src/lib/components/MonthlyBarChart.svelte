<script lang="ts">
  import { onMount } from "svelte";

type ChartSeries = {
  device: string;
  points: { label: string; value: number }[];
};

export let series: ChartSeries[] = [];

  let chartDiv: HTMLDivElement;
  let Chart: any;
  let chart: any;

  $: categories = series.length
    ? series[0].points.map(p => p.label)
    : [];

  $: apexSeries = series.map(s => ({
    name: s.device,
    data: s.points.map(p => p.value),
  }));

  onMount(async () => {
    const module = await import("apexcharts");
    Chart = module.default;

    chart = new Chart(chartDiv, {
      chart: { type: "bar", height: 350, stacked: true },
      colors: ["#1E73BE", "#4CAF50", "#F9A825"],
      xaxis: { categories },
      series: apexSeries,
    });

    chart.render();
  });

  $: if (chart) {
    chart.updateSeries(apexSeries);
  }
</script>

<div class="w-full">
  <div bind:this={chartDiv}></div>
</div>
