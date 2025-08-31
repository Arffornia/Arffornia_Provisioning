// priority: 996

//Replacing Chests with Pressure Plates to avoid Conflicts
ServerEvents.recipes((event) => {
    event.replaceInput(
      { mod: "handcrafted" },
      "#c:chests",
      "minecraft:oak_pressure_plate"
    );
});