import { statsFetch } from "$lib/api/stats.Fetch";

export async function load(event) {
  try {
    // Connected Devices
    const connectedRes = await statsFetch(event, "/devices/query", {
      method: "POST",
      body: JSON.stringify({
        query: "ios&installed&activated_from=2024-1-1&activated_to=2024-2-1",
      }),
    });

    console.log("CONNECTED STATUS:", connectedRes.status);

    const connected = await connectedRes.json();
    console.log("CONNECTED DATA:", connected);

    // Installed Devices
    const installedRes = await statsFetch(event, "/devices/query", {
      method: "POST",
      body: JSON.stringify({
        query: "ios&installed&activated_from=2024-1-1&activated_to=2024-2-1",
      }),
    });

    console.log("INSTALLED STATUS:", installedRes.status);

    const installed = await installedRes.json();
    console.log("INSTALLED DATA:", installed);

    return {
      connected,
      installed,
    };
  } catch (err: any) {
    console.error("Dashboard failed:", err);
    console.error("Error stack:", err?.stack);

    return {
      connected: {},
      installed: {},
    };
  }
}
