// priority: 997

ServerEvents.recipes((event) => {

    //Replacing Yellorium for Uranium in Recipes that don't have this by default.
    let yellorium_recipe_ids = [
        "bigreactors:fluidizer/casing",
        "bigreactors:fluidizer/controller",
        "bigreactors:fluidizer/solidinjector"
    ];

    yellorium_recipe_ids.forEach(recipe => {
        event.replaceInput(
            { id: recipe },
            "bigreactors:yellorium_ingot",
            "#c:ingots/uranium"
          );
    });

    //Fludizer now Accepts Uranium too
    event.custom({
        "type": "bigreactors:fluidizersolid",
        "ingredient": {
          "count": 1,
          "ingredient": {
            "type": "neoforge:components",
            "components": {
              "minecraft:attribute_modifiers": {
                "modifiers": []
              },
              "minecraft:enchantments": {
                "levels": {}
              },
              "minecraft:lore": [],
              "minecraft:max_stack_size": 64,
              "minecraft:rarity": "common",
              "minecraft:repair_cost": 0
            },
            "items": "mekanism:block_uranium",
            "strict": true
          }
        },
        "result": {
          "amount": 9000,
          "id": "bigreactors:yellorium"
        }
    });
    event.custom({
        "type": "bigreactors:fluidizersolid",
        "ingredient": {
          "count": 1,
          "ingredient": {
            "type": "neoforge:components",
            "components": {
              "minecraft:attribute_modifiers": {
                "modifiers": []
              },
              "minecraft:enchantments": {
                "levels": {}
              },
              "minecraft:lore": [],
              "minecraft:max_stack_size": 64,
              "minecraft:rarity": "common",
              "minecraft:repair_cost": 0
            },
            "items": "mekanism:ingot_uranium",
            "strict": true
          }
        },
        "result": {
          "amount": 1000,
          "id": "bigreactors:yellorium"
        }
    });

    //Processing Recipes for Benitoite and Anglesite. =============================================

    event.custom({
      "type": "enderio:sag_milling",
      "energy": 2400,
      "input": {
        "tag": "c:ores/benitoite"
      },
      "outputs": [
        {
          "item": {
            "count": 1,
            "id": "bigreactors:benitoite_crystal"
          }
        },
        {
          "chance": 0.5,
          "item": {
            "count": 1,
            "id": "bigreactors:benitoite_crystal"
          }
        },
        {
          "chance": 0.25,
          "item": {
            "count": 1,
            "id": "bigreactors:benitoite_crystal"
          }
        },
        {
          "chance": 0.15,
          "item": {
            "count": 1,
            "id": "minecraft:netherrack"
          }
        }
      ]
    }).id("ftb:enderio/sagmilling/bigreactors/benitoite");
    
    event.custom({
      "type": "create:crushing",
      "ingredients": [
        {
          "tag": "c:ores/benitoite"
        }
      ],
      "processing_time": 400,
      "results": [
        {
          "count": 1,
          "item": {
            "id": "bigreactors:benitoite_crystal"
          }
        },
        {
          "chance": 0.5,
          "count": 1,
          "item": {
            "id": "bigreactors:benitoite_crystal"
          }
        },
        {
          "chance": 0.25,
          "count": 1,
          "item": {
            "id": "bigreactors:benitoite_crystal"
          }
        },
        {
          "chance": 0.12,
          "count": 1,
          "item": {
            "id": "minecraft:netherrack"
          }
        },
        {
          "chance": 0.75,
          "item": {
            "id": "create:experience_nugget"
          }
        }
      ]
    }).id("ftb:create/crushing/bigreactors/benitoite");

    event.custom({
      "type": "enderio:sag_milling",
      "energy": 2400,
      "input": {
        "tag": "c:ores/anglesite"
      },
      "outputs": [
        {
          "item": {
            "count": 1,
            "id": "bigreactors:anglesite_crystal"
          }
        },
        {
          "chance": 0.5,
          "item": {
            "count": 1,
            "id": "bigreactors:anglesite_crystal"
          }
        },
        {
          "chance": 0.25,
          "item": {
            "count": 1,
            "id": "bigreactors:anglesite_crystal"
          }
        },
        {
          "chance": 0.15,
          "item": {
            "count": 1,
            "id": "minecraft:end_stone"
          }
        }
      ]
    }).id("ftb:enderio/sagmilling/bigreactors/anglesite");
    
    event.custom({
      "type": "create:crushing",
      "ingredients": [
        {
          "tag": "c:ores/anglesite"
        }
      ],
      "processing_time": 400,
      "results": [
        {
          "count": 1,
          "item": {
            "id": "bigreactors:anglesite_crystal"
          }
        },
        {
          "chance": 0.5,
          "count": 1,
          "item": {
            "id": "bigreactors:anglesite_crystal"
          }
        },
        {
          "chance": 0.25,
          "count": 1,
          "item": {
            "id": "bigreactors:anglesite_crystal"
          }
        },
        {
          "chance": 0.12,
          "count": 1,
          "item": {
            "id": "minecraft:end_stone"
          }
        },
        {
          "chance": 0.75,
          "item": {
            "id": "create:experience_nugget"
          }
        }
      ]
    }).id("ftb:create/crushing/bigreactors/anglesite");

    // ============================================================================================

});