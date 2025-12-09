<script lang="ts">
  import { onMount } from "svelte";
  export let legendPosition: "bottom" | "top" | "left" | "right" = "bottom";


  type ChartSeries = {
    device: string;
    points: { label: string; value: number }[];
  };

  export let series: ChartSeries[] = [];

  let chartDiv: HTMLDivElement;
  let Chart: any;
  let chart: any;

  $: categories = series.length
    ? series[0].points.map((p) => p.label)
    : [];

$: apexSeries = series.map((s) => ({
  name:
    s.device === "ios"
      ? "iOS"
      : s.device === "android"
      ? "Android"
      : s.device === "mac"
      ? "Mac"
      : s.device,
  data: s.points.map((p) => p.value),
}));


  onMount(async () => {
    const module = await import("apexcharts");
    Chart = module.default;

    chart = new Chart(chartDiv, {
      chart: { type: "bar", height: 350, stacked: true },
      xaxis: { categories },
      colors: ["#1E73BE", "#4CAF50", "#F9A825"],
      series: apexSeries,
      legend: { position: legendPosition },
    });

    chart.render();
  });

  // Cuando cambian los labels o los valores → actualizar chart completo
  $: if (chart) {
    chart.updateOptions(
      { xaxis: { categories } },
      false,
      true
    );
    chart.updateSeries(apexSeries, true);
  }
</script>

<div class="w-full">
  <div bind:this={chartDiv}></div>
</div>
<style>
  /* Estilos opcionales para el contenedor del gráfico */
  div {
    width: 100%;
  }
</style>