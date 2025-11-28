<script lang="ts">
  import { onMount } from "svelte";
  import { deviceStatsMock } from "$lib/mock/deviceStats";

  let Chart: any = null;

  onMount(async () => {
    const module = await import("apexcharts");
    Chart = module.default;

    const chart = new Chart(chartDiv, {
      ...chartOptions,
      series,
      chart: {
        type: "bar",
        height: 350
      }
    });

    chart.render();
  });

  let chartDiv: HTMLDivElement;

  const androidActive = deviceStatsMock.active.android;
  const iosActive = deviceStatsMock.active.ios;
  const macActive = deviceStatsMock.active.mac;

  const androidConnected = deviceStatsMock.connected.android;
  const iosConnected = deviceStatsMock.connected.ios;
  const macConnected = deviceStatsMock.connected.mac;

  const series = [
    {
      name: "Active",
      data: [androidActive, iosActive, macActive]
    },
    {
      name: "Connected",
      data: [androidConnected, iosConnected, macConnected]
    }
  ];

  const categories = ["Android", "iOS", "Mac"];

  const chartOptions = {
    chart: { toolbar: { show: false } },
    xaxis: { categories },
    colors: ["#3b82f6", "#10b981"],
  };
</script>

<div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
  <h2 class="text-xl font-semibold mb-4">Devices: Active vs Connected</h2>
  <div bind:this={chartDiv}></div>
</div>
