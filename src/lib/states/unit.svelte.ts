import type { UnitSystems } from "$lib/types/types";

// eslint-disable-next-line prefer-const
export let unitSystem: UnitSystems = $state({ unit: "metric" });