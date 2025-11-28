<script lang="ts">
  export const ssr = false;

  import DeviceStatsChart from "$lib/components/DeviceStatsChart.svelte";
</script>

<h1 class="text-2xl font-semibold">Dashboard</h1>
<p class="mt-2 text-gray-600">Welcome to the MB Smart CRM</p>

<div class="p-6">
  <DeviceStatsChart />
</div>
