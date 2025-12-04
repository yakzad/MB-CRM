<script lang="ts">
  import { statsFilters } from "$lib/stores/statsFilters";
  import MonthlyBarChart from "$lib/components/MonthlyBarChart.svelte";

  type SeriesItem = {
    device: string;
    points: { label: string; value: number }[];
  };

  export let data;

  

$: currentTitle =
  $statsFilters.type === "general"
    ? "General"
    : $statsFilters.type === "pro"
    ? "Pro"
    : "Basic";

$: currentPlatform =
  $statsFilters.platform === "ios"
    ? "iOS"
    : $statsFilters.platform === "android"
    ? "Android"
    : $statsFilters.platform === "mac"
    ? "Mac"
    : "";



  //general
  const generalSeries: SeriesItem[] = data.monthlyGeneralSeries ?? [];

  //pro
  const proSeries: SeriesItem[] = data.monthlyProSeries ?? [];

  //basic
  const basicSeries: SeriesItem[] = data.monthlyBasicSeries ?? [];

  let filteredSeries: SeriesItem[] = [];

  $: {
    const { type, platform } = $statsFilters;

    let baseSeries: SeriesItem[] =
      type === "general"
        ? generalSeries
        : type === "pro"
        ? proSeries
        : basicSeries;

    filteredSeries =
      platform === "all"
        ? baseSeries
        : baseSeries.filter((s) => s.device.toLowerCase() === platform);
  }
</script>

<h1 class="text-2xl font-bold mb-8">Dashboard</h1>

<div class="flex gap-4 mb-6">
  <!-- SELECT tipo -->
  <select
    class="border p-2 rounded"
    on:change={(e) => {
      const value = (e.target as HTMLSelectElement).value;
      statsFilters.update((v) => ({ ...v, type: value }));
    }}
  >
    <option value="general">General</option>
    <option value="pro">Pro</option>
    <option value="basic">Basic</option>
  </select>

  <!-- SELECT plataforma -->
  <select
    class="border p-2 rounded"
    on:change={(e) => {
      const value = (e.target as HTMLSelectElement).value;
      statsFilters.update((v) => ({ ...v, platform: value }));
    }}
  >
    <option value="all">All</option>
    <option value="ios">iOS</option>
    <option value="android">Android</option>
    <option value="mac">Mac</option>
  </select>
</div>

<!-- CARDS -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

  <!--general-->
  <div class="p-4 bg-white shadow rounded-lg">
    <p class="text-gray-500 text-sm">General installs</p>
    <p class="text-xl font-semibold">
      {generalSeries.flatMap((s) => s.points).reduce((a, p) => a + p.value, 0)}
    </p>
  </div>

  <!--pro-->
  <div class="p-4 bg-white shadow rounded-lg">
    <p class="text-gray-500 text-sm">Pro installs</p>
    <p class="text-xl font-semibold">
      {proSeries.flatMap((s) => s.points).reduce((a, p) => a + p.value, 0)}
    </p>
  </div>

  <!--basic-->
  <div class="p-4 bg-white shadow rounded-lg">
    <p class="text-gray-500 text-sm">Basic installs</p>
    <p class="text-xl font-semibold">
      {basicSeries.flatMap((s) => s.points).reduce((a, p) => a + p.value, 0)}
    </p>
  </div>
</div>

<!-- CHART DINÁMICO -->
<div class="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-8">
<h2 class="text-md mb-3 text-gray-700 font-semibold">
  Installed Devices (2024) — {currentTitle}
  {#if currentPlatform !== ""}
    — {currentPlatform}
  {/if}
</h2>





  {#if filteredSeries.length > 0}
    <MonthlyBarChart series={filteredSeries} />
  {:else}
    <p class="text-gray-400 italic">No data…</p>
  {/if}
</div>
