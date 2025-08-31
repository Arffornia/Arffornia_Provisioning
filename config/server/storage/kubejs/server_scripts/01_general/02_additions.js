// priority: 999

ServerEvents.recipes((event) => {
    event
    .shaped("comforts:sleeping_bag_black", ["BBB", "B B", "BBB"], {
      B: "handcrafted:black_sheet"
    })
    .id("ftb:sleeping_bag_black");

    event.shaped("laserbridges:laser_source_block", ["GGG", "GDG", "GEG"], {
      G: "minecraft:stone",
      E: "minecraft:lapis_lazuli",
      D: "minecraft:redstone"
    }).id("ftb:laser_source_block");

    //Adding Decompression Recipe.
    //Edited by Artpoke, original piece of code made by BDTheNerdyMedic and can be found here:
    // https://github.com/FTBTeam/FTB-Modpack-Issues/issues/6314#issuecomment-2514056615
    const decompressions = [
        { block: 'minecraft:quartz_block', item: 'minecraft:quartz', amount: 4 },
        { block: 'minecraft:amethyst_block', item: 'minecraft:amethyst_shard', amount: 4 },
        { block: 'minecraft:clay', item: 'minecraft:clay_ball', amount: 4 },
        { block: 'minecraft:glowstone', item: 'minecraft:glowstone_dust', amount: 4 },
        { block: 'minecraft:honeycomb_block', item: 'minecraft:honeycomb', amount: 4 }
    ];
  
    decompressions.forEach(entry => {
        event.shapeless(Item.of(entry.item, entry.amount), [entry.block]);
    });

    //Blasting Stellaris Raw Steel into Steel
    event.custom({
      "type": "railcraft:blasting",
      "cookingTime": 200,
      "experience": 0.0,
      "ingredient": {
        "tag": "c:raw_materials/steel"
      },
      "result": {
        "count": 1,
        "id": "mekanism:ingot_steel"
      },
      "slagOutput": 1
    }).id("ftb:blasting_raw_steel");

    event.custom({
      "type": "railcraft:blasting",
      "cookingTime": 1800,
      "experience": 0.0,
      "ingredient": {
        "tag": "c:storage_blocks/raw_steel"
      },
      "result": {
        "count": 1,
        "id": "mekanism:block_steel"
      },
      "slagOutput": 9
    }).id("ftb:blasting_raw_steel_block");

    //vanilla Bookshelf == Oak Bookshelf (Fixes a Recipe Conflict)
    event.replaceInput(
      { id: "minecraft:bookshelf" },
      "#minecraft:planks",
      "#ftb:vanilla_planks"
    );

    //Replacing Structurize's Gold Scepter Recipe to Avoid Conflicts
    event.replaceInput(
      { id: "structurize:sceptergold" },
      "#minecraft:stone_crafting_materials",
      "#c:ingots/gold"
    );

    //Replacing Structurize's Steel Scepter Recipe to Avoid Conflicts
    event.replaceInput(
      { id: "structurize:sceptersteel" },
      "minecraft:iron_ingot",
      "#c:ingots/steel"
    );
    
    //Fixing MineColonies Recipe Conflicts ========================================================

    event.replaceInput(
      { id: "minecolonies:soysauce" },
      "minecolonies:soybean",
      "sushigocrafting:soy_bean"
    );

    event.replaceInput(
      { id: "minecolonies:feta_cheese" },
      "minecolonies:large_milk_bottle",
      "minecraft:milk_bucket"
    );

    event.replaceInput(
      { id: "minecolonies:cream_cheese" },
      "minecolonies:large_milk_bottle",
      "farmersdelight:milk_bottle"
    );

    event.replaceInput(
      { id: "minecolonies:cheddar_cheese" },
      "minecolonies:large_milk_bottle",
      "minecolonies:feta_cheese"
    );

    // ============================================================================================

    //Adding a Recipe for the Heart of the Sea, since for some reason buried treasures don't generate O.o
    event.shaped("minecraft:heart_of_the_sea", ["SCS", "COC", "SCS"], {
      O: "evilcraft:blood_orb_empty",
      C: "minecraft:prismarine_crystals",
      S: "minecraft:prismarine_shard"
    }).id("ftb:heart_of_the_sea");

});