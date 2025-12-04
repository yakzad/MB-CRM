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


  // Opciones globales del chart (incluye leyenda SIEMPRE visible)
  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: { show: false },
    },
    legend: {
      show: true,                  // ← **ESTO FORZA LA LEYENDA**
      position: "top",
      markers: { radius: 12 },
    },
    colors: ["#3B82F6", "#10B981", "#6366F1"], // iOS / Android / Mac
  };

  onMount(async () => {
    const module = await import("apexcharts");
    Chart = module.default;

    if (hasData) {
      chart = new Chart(chartDiv, {
        ...chartOptions,
        xaxis: { categories },
        series: apexSeries,
      });

      chart.render();
    }
  });

  // Reactive update cuando cambian los datos
  $: if (Chart && hasData) {
    if (chart) chart.destroy();

    chart = new Chart(chartDiv, {
      ...chartOptions,
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
