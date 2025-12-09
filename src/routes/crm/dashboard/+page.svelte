<script lang="ts">
  import MonthlyBarChart from "$lib/components/MonthlyBarChart.svelte";

  

  type Point = { label: string; value: number };
  type Series = { device: string; points: Point[] };

  export let data: {
    type: string;
    stats: { queries: Record<string, number> } | null;
  };

  // Filters
  let type = data.type ?? "general";  
  let platform = "all";               

  $: queries = data.stats?.queries ?? {};


  function getSeries(prefix: string, device: string): Point[] {
    const base = `${prefix}_${device}_`;

    const keys = Object.keys(queries)
      .filter((k) => k.startsWith(base))
      .sort((a, b) => {
        const pa = a.split("_");
        const pb = b.split("_");
        const ma = Number(pa[pa.length - 1].split("-")[1]);
        const mb = Number(pb[pb.length - 1].split("-")[1]);
        return ma - mb;
      });

    return keys.map((key) => ({
      label: key.replace(base, ""),
      value: queries[key] ?? 0
    }));
  }

  // GENERAL
  $: iosGeneral = getSeries("installed", "ios");
  $: androidGeneral = getSeries("installed", "android");
  $: macGeneral = getSeries("installed", "mac");
  $: totalGeneral = getSeries("installed", "total");

  // PRO
  $: iosPro = getSeries("installed_pro", "ios");
  $: androidPro = getSeries("installed_pro", "android");
  $: macPro = getSeries("installed_pro", "mac");

  $: totalPro = iosPro.map((p, i) => ({
    label: p.label,
    value:
      p.value +
      (androidPro[i]?.value ?? 0) +
      (macPro[i]?.value ?? 0)
  }));

  // BASIC = GENERAL - PRO
  function subtract(a: Point[], b: Point[]): Point[] {
    return a.map((p, i) => ({
      label: p.label,
      value: p.value - (b[i]?.value ?? 0)
    }));
  }

  $: iosBasic = subtract(iosGeneral, iosPro);
  $: androidBasic = subtract(androidGeneral, androidPro);
  $: macBasic = subtract(macGeneral, macPro);
  $: totalBasic = subtract(totalGeneral, totalPro);

  // CHOOSE SERIES BY TYPE
  $: iosSeries =
    type === "general" ? iosGeneral :
    type === "pro" ? iosPro :
    iosBasic;

  $: androidSeries =
    type === "general" ? androidGeneral :
    type === "pro" ? androidPro :
    androidBasic;

  $: macSeries =
    type === "general" ? macGeneral :
    type === "pro" ? macPro :
    macBasic;

  $: totalSeries =
    type === "general" ? totalGeneral :
    type === "pro" ? totalPro :
    totalBasic;

  // PLATFORM FILTER
  $: filteredSeries =
    platform === "all"
      ? [
          { device: "ios", points: iosSeries },
          { device: "android", points: androidSeries },
          { device: "mac", points: macSeries }
        ]
      : [{ device: platform, points: 
            platform === "ios" ? iosSeries :
            platform === "android" ? androidSeries :
            macSeries }];
</script>


<div class="flex items-center gap-4 mb-6">

  <!-- FILTER: TYPE -->
  <select bind:value={type} class="border p-2 rounded">
    <option value="general">General</option>
    <option value="pro">Pro</option>
    <option value="basic">Basic</option>
  </select>

  <!-- FILTER: PLATFORM -->
  <select bind:value={platform} class="border p-2 rounded">
    <option value="all">All platforms</option>
    <option value="ios">iOS</option>
    <option value="android">Android</option>
    <option value="mac">Mac</option>
  </select>
</div>


<div class="bg-white shadow-sm border rounded-xl p-6">
      <h2 class="text-xl font-semibold mb-4">Installed Devices 2024</h2>

  {#if filteredSeries.length > 0}
    <MonthlyBarChart series={filteredSeries}/>
  {:else}
    <p>No data available</p>
  {/if}
</div>
