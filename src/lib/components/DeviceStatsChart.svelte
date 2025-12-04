<script lang="ts">
  import { onMount } from "svelte";
  import type { SeriesByDevice } from "$lib/stats/api";

  export let series: SeriesByDevice[] = [];

  let Chart: any = null;
  let chartDiv: HTMLDivElement;
  let chart: any = null;

  $: hasData = series && series.length > 0;

  $: categories = hasData
    ? series[0].points.map((p) => p.label)
    : [];

  $: apexSeries = hasData
    ? series.map((s) => ({
        name: s.device,
        data: s.points.map((p) => p.value),
      }))
    : [];

  onMount(async () => {
    const module = await import("apexcharts");
    Chart = module.default;

    if (hasData) {
      chart = new Chart(chartDiv, {
        chart: { type: "line", height: 350, toolbar: { show: false } },
        xaxis: { categories },
        series: apexSeries,
      });

      chart.render();
    }
  });

  $: if (Chart && hasData) {
    if (chart) chart.destroy();

    chart = new Chart(chartDiv, {
      chart: { type: "line", height: 350, toolbar: { show: false } },
      xaxis: { categories },
      series: apexSeries,
    });

    chart.render();
  }
</script>

<div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
  <h2 class="text-xl font-semibold mb-4">Devices Statistics (Dynamic)</h2>

  {#if !hasData}
    <p class="text-gray-500">Loading chart…</p>
  {/if}

  <div bind:this={chartDiv}></div>
</div>
