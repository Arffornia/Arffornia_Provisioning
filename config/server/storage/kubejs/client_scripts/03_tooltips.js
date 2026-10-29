// priority: 998

// Tooltip text lives in kubejs/assets/kubejs/lang/{en_us,fr_fr}.json, never in this script
// (see tests/i18n-data.test.ts).
ItemEvents.modifyTooltips((event) => {
  event.add(
    "stellaris:uranium_block",
    Text.translatable("tooltip.kubejs.stellaris.uranium_block").green()
  );
  event.add(
    "stellaris:fuel_refinery",
    Text.translatable("tooltip.kubejs.stellaris.fuel_refinery").green()
  );
});
