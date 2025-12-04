import { writable } from "svelte/store";

export const statsFilters = writable({
  year: 2024,
  type: "general", // general | pro | basic
  platform: "all", // all | ios | android | mac
});
