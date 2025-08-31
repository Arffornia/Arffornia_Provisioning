// priority: 956

ServerEvents.recipes((event) => {

    //Making Better Quartz Enriched Alloying Recipes ==============================================

    //Quartz Enriched Iron
    event.custom({
        "type": "enderio:alloy_smelting",
        "energy": 2000,
        "experience": 0.3,
        "inputs": [
          {
            "count": 3,
            "item": "minecraft:iron_ingot"
          },
          {
            "count": 1,
            "tag": "ae2:all_quartz"
          }
        ],
        "output": {
          "count": 4,
          "id": "refinedstorage:quartz_enriched_iron"
        }
    }).id("ftb:refinedstorage/enderio/alloying/quartz_enriched_iron");

    event.custom({
        "type": "create:mixing",
        "heat_requirement": "heated",
        "ingredients": [
          {
            "tag": "c:ingots/iron"
          },
          {
            "tag": "c:ingots/iron"
          },
          {
            "tag": "c:ingots/iron"
          },
          {
            "tag": "ae2:all_quartz"
          }
        ],
        "results": [
          {
            "count": 4,
            "item": {
              "id": "refinedstorage:quartz_enriched_iron"
            }
          }
        ]
      }).id("ftb:refinedstorage/create/mixing/quartz_enriched_iron");

    //Quartz Enriched Copper
    event.custom({
        "type": "enderio:alloy_smelting",
        "energy": 2000,
        "experience": 0.3,
        "inputs": [
          {
            "count": 3,
            "item": "minecraft:copper_ingot"
          },
          {
            "count": 1,
            "tag": "ae2:all_quartz"
          }
        ],
        "output": {
          "count": 4,
          "id": "refinedstorage:quartz_enriched_copper"
        }
    }).id("ftb:refinedstorage/enderio/alloying/quartz_enriched_copper");

    event.custom({
        "type": "create:mixing",
        "heat_requirement": "heated",
        "ingredients": [
          {
            "tag": "c:ingots/copper"
          },
          {
            "tag": "c:ingots/copper"
          },
          {
            "tag": "c:ingots/copper"
          },
          {
            "tag": "ae2:all_quartz"
          }
        ],
        "results": [
          {
            "count": 4,
            "item": {
              "id": "refinedstorage:quartz_enriched_copper"
            }
          }
        ]
      }).id("ftb:refinedstorage/create/mixing/quartz_enriched_copper");

    // ============================================================================================

    
    //Raw Neural Processor now accepts any Quartz to be Crafted.
    event.replaceInput(
      { id: "extrastorage:raw_neural_processor" },
      "minecraft:quartz",
      "#ae2:all_quartz"
    );

});