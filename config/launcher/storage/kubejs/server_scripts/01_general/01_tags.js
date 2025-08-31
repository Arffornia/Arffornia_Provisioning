// priority: 1000

const yieldBlacklist = [
  "#forge:coals",
  "#c:coals",
  "#neoforge:coals",
  "laserio:logic_chip",
  "#pneumaticcraft:plastic_sheets",
  "stevescarts:component_refined_hardener",
  "#forge:rods",
  "#forge:rods/all_metal",
  "#forge:wires",
  "#c:rods",
  "#c:rods/all_metal",
  "#c:wires",
  "#c:ingots",
  "#c:gems",
  "#c:storage_blocks",
  "#c:dusts",
  "#neoforge:rods",
  "#neoforge:rods/all_metal",
  "#neoforge:wires",
  "stevescarts:component_galgadorian_metal",
]


const jeiBlacklist = [
  "ae2:facade",
  "functionalstorage:armory_cabinet",
  "mekanism:creative_chemical_tank",
  "mekanism:creative_fluid_tank",
  "productivebees:stone_chip",
  "productivebees:wood_chip",
];

const arsBlacklist = [
  "integratedtunnels:part_interface_item",
  "integratedtunnels:part_interface_filter_item",
  "integratedtunnels:part_importer_item",
  "integratedtunnels:part_exporter_item",
  "integratedtunnels:part_importer_world_item",
  "integratedtunnels:part_exporter_world_item",
  "chipped:botanist_workbench",
  "chipped:glassblower",
  "gravestone:gravestone",
  "chipped:carpenters_table",
  "chipped:loom_table",
  "chipped:mason_table",
  "chipped:alchemy_bench",
  "chipped:tinkering_table",
];

const addLawnmowerable = [
"  projectvibrantjourneys:glowing_blue_fungus",
  "projectvibrantjourneys:white_bark_mushroom",
  "projectvibrantjourneys:orange_bark_mushroom",
  "projectvibrantjourneys:light_brown_bark_mushroom",
  "projectvibrantjourneys:bark_mushroom",
  "projectvibrantjourneys:cattail",
  "projectvibrantjourneys:sea_oats",
  "projectvibrantjourneys:beach_grass",
  "projectvibrantjourneys:watergrass",
  "projectvibrantjourneys:sandy_sprouts",
  "projectvibrantjourneys:reeds",
  "projectvibrantjourneys:small_cactus",
  "projectvibrantjourneys:short_grass",
  "projectvibrantjourneys:blue_wildflowers",
  "projectvibrantjourneys:yellow_wildflowers",
  "projectvibrantjourneys:orange_wildflowers",
  "projectvibrantjourneys:purple_wildflowers",
  "projectvibrantjourneys:white_wildflowers",
  "projectvibrantjourneys:mixed_wildflowers"
];

const removeBoonDrops = [
  "powah:uraninite_block"
]

//Hiding and ununifying Items
ServerEvents.tags("item", (event) => {
  global["unUnified"].forEach((id) => {
    event.removeAllTagsFrom(id);
    event.add("c:hidden_from_recipe_viewers", id);
  });
});

//Unifying block tags
ServerEvents.tags("block", (event) => {
  global["unUnified"].forEach((id) => {
    event.removeAllTagsFrom(id);
  });
});

const vanillaPlanks = [
  "minecraft:oak_planks",
  "minecraft:spruce_planks",
  "minecraft:birch_planks",
  "minecraft:jungle_planks",
  "minecraft:acacia_planks",
  "minecraft:dark_oak_planks",
  "minecraft:mangrove_planks",
  "minecraft:cherry_planks",
  "minecraft:bamboo_planks",
  "minecraft:crimson_planks",
  "minecraft:warped_planks",
  "ars_nouveau:archwood_planks",
  "paganbless:black_thorn_planks",
];

//Adding Item Tags
ServerEvents.tags("item", (event) => {

  vanillaPlanks.forEach((plank) => {
    event.add("ftb:vanilla_planks", plank);
  });

  event.add("c:glass/colorless", [
    "#c:glass_blocks/colorless",
    "minecraft:glass"
  ]);

  yieldBlacklist.forEach((id) => {
    event.add("enchantableblocks:yield_blacklist", id);
  });
  event.add("railcraft:nickel_raw", "c:raw_materials");
  event.add("curios:deep_learner", "hostilenetworks:deep_learner");
  event.add("enchantableblocks:yield_blacklist", "#c:ingots");
  event.add("enchantableblocks:yield_blacklist", "#c:nuggets");
  event.add("enchantableblocks:yield_blacklist", "#c:gems");
  event.add("enchantableblocks:yield_blacklist", "#c:storage_blocks");
  event.add("forge:ingots/iron", ["minecraft:iron_ingot"]);
  event.add("forge:dusts/redstone", ["minecraft:redstone"]);
  event.add("forge:glass_panes/colorless", ["minecraft:glass_pane"]);
  event.add("c:hidden_from_recipe_viewers", jeiBlacklist);
  event.remove("apothic_enchanting:boon_drops", removeBoonDrops);
  event.remove("c:ores_in_ground/stone", "powah:uraninite_block");
  event.remove("c:ingots/steel", "oritech:biosteel_ingot");
  event.add('c:ores/uranium', 'bigreactors:deepslate_yellorite_ore');

  //Unhidding Stellaris's Uranium Block since its hardcoded to be used in the Radioactive Generator
  event.remove('c:hidden_from_recipe_viewers', 'stellaris:uranium_block')

  //Adding Create's Andesite Blocks to the Chipped Andesite Tag.
  event.add("chipped:andesite", ["create:cut_andesite", "create:polished_cut_andesite", "create:cut_andesite_bricks", "create:small_andesite_bricks", "create:layered_andesite", "create:andesite_pillar"])
  //Adding Create's Granite Blocks to the Chipped Granite Tag.
  event.add("chipped:granite", ["create:cut_granite", "create:polished_cut_granite", "create:cut_granite_bricks", "create:small_granite_bricks", "create:layered_granite", "create:granite_pillar"])
  //Adding Create's Diorite Blocks to the Chipped Diorite Tag.
  event.add("chipped:diorite", ["create:cut_diorite", "create:polished_cut_diorite", "create:cut_diorite_bricks", "create:small_diorite_bricks", "create:layered_diorite", "create:diorite_pillar"])
  //Adding Create's Calcite Blocks to the Chipped Calcite Tag.
  event.add("chipped:calcite", ["create:cut_calcite", "create:polished_cut_calcite", "create:cut_calcite_bricks", "create:small_calcite_bricks", "create:layered_calcite", "create:calcite_pillar"])
  //Adding Create's Dripstone Blocks to the Chipped Dripstone Tag.
  event.add("chipped:dripstone_block", ["create:cut_dripstone", "create:polished_cut_dripstone", "create:cut_dripstone_bricks", "create:small_dripstone_bricks", "create:layered_dripstone", "create:dripstone_pillar"])
  //Adding Create's Deepslate Blocks to the Chipped Deepslate Tag.
  event.add("chipped:deepslate", ["create:cut_deepslate", "create:polished_cut_deepslate", "create:cut_deepslate_bricks", "create:small_deepslate_bricks", "create:layered_deepslate", "create:deepslate_pillar"])
  //Adding Create's Tuff Blocks to the Chipped Tuff Tag.
  event.add("chipped:tuff", ["create:cut_tuff", "create:polished_cut_tuff", "create:cut_tuff_bricks", "create:small_tuff_bricks", "create:layered_tuff", "create:tuff_pillar"])
  //Adding Create's Waxed Copper Blocks to the Chipped Waxed Copper Tag.
  event.add("chipped:waxed_copper_block", ["create:waxed_copper_shingles", "create:waxed_copper_tiles"])
  event.add("chipped:waxed_exposed_copper_block", ["create:waxed_exposed_copper_shingles", "create:waxed_exposed_copper_tiles"])
  event.add("chipped:waxed_weathered_copper", ["create:waxed_weathered_copper_shingles", "create:waxed_weathered_copper_tiles"])
  event.add("chipped:waxed_oxidized_copper", ["create:waxed_oxidized_copper_shingles", "create:waxed_oxidized_copper_tiles"])

  //Adding PNC Flour to the Create Flour Tag
  event.add("c:flours/wheat", "pneumaticcraft:wheat_flour")

});

ServerEvents.tags("block", (event) => {
  arsBlacklist.forEach((block) => {
    event.get("ars_nouveau:no_break_drop").add(block);
  });
  removeBoonDrops.forEach((block) => event.remove("apothic_enchanting:boon_drops", block));
  event.add("justdirethings:lawnmowerable", ["#projectvibrantjourneys:groundcover"]);

  addLawnmowerable.forEach((block) => event.add("justdirethings:lawnmowerable", block));
});
