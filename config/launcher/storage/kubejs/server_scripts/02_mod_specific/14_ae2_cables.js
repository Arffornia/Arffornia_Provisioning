// priority: 957

var isEnderIOLoaded = Platform.isLoaded("enderio");

ServerEvents.recipes((event) => {

  //Declaring Variables ===============

  let input_name = "";
  let wool = "";
  let painted_wool = "";
  let dye = "";

  let fluix_glass_cable = "";
  let glass_cable = "";
  
  let fluix_covered_cable = "";
  let covered_cable = "";
  
  let fluix_dense_covered_cable = "";
  let dense_covered_cable = "";
  
  let fluix_smart_cable = "";
  let smart_cable = "";
  
  let fluix_dense_smart_cable = "";
  let dense_smart_cable = "";

  let me_conduit = "";
  let dense_me_conduit = "";

  // ================================ /

  function ae_cable_shaped_compress(input, output, color) {
    event.shaped(Item.of(output, 1), ["SS", "SS"], {
      S: input
    }).id(`ftb:ae/cable_compressing/${color}`);
  }

  function ae_cable_shaped_decompress(input, output, amount, color) {
    event.shapeless(Item.of(output, amount), [input]).id(`ftb:ae/cable_decompressing/${color}`);
  }

  function ae_make_the_cable_smart(input, output) {
    input_name = input.split(":")[1]
    event.shaped(Item.of(output, 1), ["CR", "G "], {
      C: input,
      R: "#c:dusts/redstone",
      G: "#c:dusts/glowstone"
    }).id(`ftb:ae/cable_smartfying/${input_name}`);
  }

  function ae_cover_cable(input, output, color) {
    wool = "#minecraft:wool"
    painted_wool = `minecraft:${color}_wool`;
    dye = `minecraft:${color}_dye`
    event.shapeless(Item.of(output, 1), [input, painted_wool]).id(`ftb:ae/glass_cable_covering/${color}`);
    event.shapeless(Item.of(output, 1), [input, wool, dye]).id(`ftb:ae/glass_cable_covering/${color}_1`);
  }

  ftb_colors.forEach(color => {

    // Smart Cables ================================================================================
    fluix_glass_cable = "ae2:fluix_glass_cable";
    glass_cable = `ae2:${color}_glass_cable`;

    fluix_covered_cable = "ae2:fluix_covered_cable";
    covered_cable = `ae2:${color}_covered_cable`;

    fluix_dense_covered_cable = "ae2:fluix_covered_dense_cable";
    dense_covered_cable = `ae2:${color}_covered_dense_cable`;

    fluix_smart_cable = "ae2:fluix_smart_cable";
    smart_cable = `ae2:${color}_smart_cable`;

    fluix_dense_smart_cable = "ae2:fluix_smart_dense_cable";
    dense_smart_cable = `ae2:${color}_smart_dense_cable`;

    // Compressing the Cables
    ae_cable_shaped_compress(smart_cable, dense_smart_cable, color);
    ae_cable_shaped_compress(covered_cable, dense_covered_cable, color);

    // Decompressing the Cables
    ae_cable_shaped_decompress(dense_smart_cable, smart_cable, 4, color);
    ae_cable_shaped_decompress(dense_covered_cable, covered_cable, 4, color);

    // Making Painted Covered Cables Smart
    ae_make_the_cable_smart(covered_cable, smart_cable, color);
    ae_make_the_cable_smart(dense_covered_cable, dense_smart_cable, color);

    // Covering Glass Cables
    ae_cover_cable(glass_cable, covered_cable, color);

  // ============================================================================================

  });

  //Also Adding Recipes for the EnderIO ME Conduits ===============================================
  me_conduit = `enderio:conduit[enderio:conduit="enderio:me"]`
  dense_me_conduit = `enderio:conduit[enderio:conduit="enderio:dense_me"]`

  if (isEnderIOLoaded){

    event.shaped(Item.of(dense_me_conduit, 1), ["SS", "SS"], {
      S: me_conduit
    }).id(`ftb:enderio/conduit_compressing/me`);

    event.shapeless(Item.of(me_conduit, 4), [dense_me_conduit]).id(`ftb:enderio/conduit_decompressing/me`);

  }

  // ==============================================================================================

});
