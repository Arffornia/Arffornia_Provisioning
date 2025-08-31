// priority: 988

ServerEvents.recipes((event) => {
    
    //Improving Andesite Alloy Recipe by swapping to chipped:andesite
    event.replaceInput({ id: "create:crafting/materials/andesite_alloy" }, "minecraft:andesite", "#chipped:andesite");
    event.replaceInput({ id: "create:crafting/materials/andesite_alloy_from_zinc" }, "minecraft:andesite", "#chipped:andesite");

    //Adding a Stonecutter Recipe to get the Brass Block Variant of Create
    event.stonecutting("create:brass_block", "railcraft:brass_block").id("ftbevolution:create/brass_block");
    event.stonecutting("railcraft:brass_block", "create:brass_block").id("ftbevolution:create/brass_block_1");

    //Adding a Stonecutter Recipe to get the Zinc Block Variant of Create
    event.stonecutting("create:zinc_block", "railcraft:zinc_block").id("ftbevolution:create/zinc_block");
    event.stonecutting("railcraft:zinc_block", "create:zinc_block").id("ftbevolution:create/zinc_block_1");

    //Apparently this Recipe also needs to be tweaked.
    event.replaceInput({ id: "georenouveau:zinc_geore_dowsing_rod" }, "create:zinc_ingot", "#c:ingots/zinc");

    //Unifiying Raw Block Recipes
    event.replaceInput({ id: "create:crafting/materials/raw_zinc_block" }, "create:raw_zinc", "railcraft:zinc_raw");
    event.replaceOutput({ id: "create:crafting/materials/raw_zinc" }, "create:raw_zinc", "railcraft:zinc_raw");
    

    //Adding Blasting and Smelting Recipes for materials that don't have them =====================
    
    let create_crushed_blasting = [
        ["create:crushed_raw_nickel", "railcraft:nickel_ingot"], 
        ["create:crushed_raw_aluminum", "xycraft_world:aluminum_ingot"], 
        ["create:crushed_raw_platinum", "oritech:platinum_ingot"], 
        ["create:crushed_raw_silver", "occultism:silver_ingot"],
        ["create:crushed_raw_zinc", "railcraft:zinc_ingot"],
    ];

    create_crushed_blasting.forEach(crushed_ore => {

        let output_name = crushed_ore[1].split(":")[1]
        let input_name = crushed_ore[0].split(":")[1]

        event.custom({
            "type": "minecraft:blasting",
            "category": "misc",
            "cookingtime": 100,
            "experience": 0.1,
            "ingredient": {
              "item": crushed_ore[0]
            },
            "result": {
              "count": 1,
              "id": crushed_ore[1]
            }
        }).id("ftb:blasting/" + input_name + "_to_" + output_name)

        event.smelting(crushed_ore[1], crushed_ore[0]).id("ftb:smelting/" + input_name + "_to_" + output_name)

    });

    // ============================================================================================

    //Adding Washing Recipes for materials that don't have them ==================================

    let create_crushed_washing = [
        ["create:crushed_raw_nickel", "railcraft:nickel_nugget"], 
        ["create:crushed_raw_aluminum", "xycraft_world:aluminum_nugget"], 
        ["create:crushed_raw_platinum", "oritech:platinum_nugget"], 
        ["create:crushed_raw_silver", "occultism:silver_nugget"],
        ["create:crushed_raw_osmium", "mekanism:nugget_osmium"],
        ["create:crushed_raw_tin", "mekanism:nugget_tin"],
        ["create:crushed_raw_lead", "mekanism:nugget_lead"],
        ["create:crushed_raw_uranium", "mekanism:nugget_uranium"]
    ];

    create_crushed_washing.forEach(crushed_ore => {

        let output_name = crushed_ore[1].split(":")[1]
        let input_name = crushed_ore[0].split(":")[1]

        event.custom({
            "type": "create:splashing",
            "ingredients": [
              {
                "item": crushed_ore[0]
              }
            ],
            "results": [
              {
                "count": 9,
                "item": {
                  "id": crushed_ore[1]
                }
              },
              {
                "chance": 0.25,
                "count": 2,
                "item": {
                  "id": crushed_ore[1]
                }
              }
            ]
          }).id("ftb:washing/" + input_name + "_to_" + output_name)
    });

    // ============================================================================================

    //Adding Recipes for Create's Enchantments to the EnderIO Enchanter ===========================

    //Potato Recovery
    event.custom({
      "type": "enderio:enchanting",
      "cost_multiplier": 1,
      "enchantment": "create:potato_recovery",
      "input": {
        "count": 2,
        "item": "farmersdelight:potato_crate"
      }
    }).id("ftb:enderio/enchanting/create/potato_recovery");

    //Air Capacity
    event.custom({
      "type": "enderio:enchanting",
      "cost_multiplier": 1,
      "enchantment": "create:capacity",
      "input": {
        "count": 2,
        "item": "create:fluid_tank"
      }
    }).id("ftb:enderio/enchanting/create/capacity");

  // ==============================================================================================

  //Adding a Infusing Recipe for Rose Quartz
  event.custom({
    "type": "mekanism:metallurgic_infusing",
    "chemical_input": {
      "amount": 60,
      "tag": "mekanism:redstone"
    },
    "item_input": {
      "count": 1,
      "tag": "ae2:all_quartz"
    },
    "output": {
      "count": 1,
      "id": "create:rose_quartz"
    },
    "per_tick_usage": false
  }).id("ftb:mekanism/metallurgic_infusing/create/rose_quartz");

});