<script lang="ts">
  import DeviceStatsChart from "$lib/components/DeviceStatsChart.svelte";
  export let data;
</script>

<div class="p-6 space-y-8">
  <h1 class="text-2xl font-semibold text-gray-800">Dashboard</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

    <!-- CONNECTED -->
    <div class="bg-white rounded-xl p-4 shadow-sm">
      <h2 class="text-lg mb-2 text-gray-700">Connected Devices</h2>

    {#if data.connected && data.connected.query !== 0}
      <DeviceStatsChart series={data.connected} />
    {:else}
      <div class="flex items-center justify-center py-10 text-gray-400 text-sm italic">
        No data available for this period.
      </div>
    {/if}
    </div>


    <!-- INSTALLED -->
    <div class="bg-white rounded-xl p-4 shadow-sm">
      <h2 class="text-lg mb-2 text-gray-700">Installed Devices</h2>

      {#if data.installed && data.installed.query !== 0}
        <DeviceStatsChart series={data.installed} />
      {:else}
        <div class="flex items-center justify-center py-10 text-gray-400 text-sm italic">
        No data available for this period.
      </div>
      {/if}
    </div>

  </div>
</div>

<style>
  :global(body) {
    background-color: #898784;
  }
</style>
