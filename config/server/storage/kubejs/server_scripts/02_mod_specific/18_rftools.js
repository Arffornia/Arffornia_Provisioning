// priority: 955

ServerEvents.recipes((event) => {
  
  //Adding Crushing Recipes for Dimensional Shard =================================================

  event.custom({
    "type": "enderio:sag_milling",
    "energy": 2400,
    "input": {
      "tag": "c:ores/dimensional_shard"
    },
    "outputs": [
      {
        "item": {
          "count": 3,
          "id": "rftoolsbase:dimensionalshard"
        }
      },
      {
        "chance": 0.5,
        "item": {
          "count": 2,
          "id": "rftoolsbase:dimensionalshard"
        }
      },
      {
        "chance": 0.25,
        "item": {
          "count": 1,
          "id": "rftoolsbase:dimensionalshard"
        }
      },
      {
        "chance": 0.15,
        "item": {
          "count": 1,
          "id": "minecraft:cobblestone"
        }
      }
    ]
  }).id("ftb:enderio/sagmilling/rftools/dimensional_shard");
  
  event.custom({
    "type": "create:crushing",
    "ingredients": [
      {
        "tag": "c:ores/dimensional_shard"
      }
    ],
    "processing_time": 400,
    "results": [
      {
        "count": 3,
        "item": {
          "id": "rftoolsbase:dimensionalshard"
        }
      },
      {
        "chance": 0.5,
        "count": 2,
        "item": {
          "id": "rftoolsbase:dimensionalshard"
        }
      },
      {
        "chance": 0.25,
        "count": 1,
        "item": {
          "id": "rftoolsbase:dimensionalshard"
        }
      },
      {
        "chance": 0.12,
        "count": 1,
        "item": {
          "id": "minecraft:cobblestone"
        }
      },
      {
        "chance": 0.75,
        "item": {
          "id": "create:experience_nugget"
        }
      }
    ]
  }).id("ftb:create/crushing/rftools/dimensional_shard");

  // event.custom({
  //   "type": "modern_industrialization:macerator",
  //   "duration": 400,
  //   "eu": 2,
  //   "item_inputs": [
  //     {
  //       "amount": 1,
  //       "tag": "c:ores/dimensional_shard"
  //     }
  //   ],
  //   "item_outputs": [
  //     {
  //       "amount": 3,
  //       "item": "rftoolsbase:dimensionalshard"
  //     },
  //     {
  //       "probability": 0.5,
  //       "amount": 2,
  //       "item": "rftoolsbase:dimensionalshard"
  //     },
  //     {
  //       "probability": 0.25,
  //       "amount": 1,
  //       "item": "rftoolsbase:dimensionalshard"
  //     },
  //     {
  //       "probability": 0.12,
  //       "amount": 1,
  //       "item": "minecraft:cobblestone"
  //     }
  //   ]
  // }
  // ).id("ftb:modern_industrialization/macerator/rftools/dimensional_shard");

  // ==============================================================================================

});