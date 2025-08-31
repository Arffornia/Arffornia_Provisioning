// priority: 991

ServerEvents.recipes((event) => {

    let xycraft_crystals = [
        ['xycraft_world:xychorium_ore_stone_blue', 'xycraft_world:xychorium_gem_blue'],
        ['xycraft_world:xychorium_ore_stone_green', 'xycraft_world:xychorium_gem_green'],
        ['xycraft_world:xychorium_ore_stone_red', 'xycraft_world:xychorium_gem_red'],
        ['xycraft_world:xychorium_ore_stone_dark', 'xycraft_world:xychorium_gem_dark'],
        ['xycraft_world:xychorium_ore_stone_light', 'xycraft_world:xychorium_gem_light'],

        ['xycraft_world:xychorium_ore_deepslate_blue', 'xycraft_world:xychorium_gem_blue'],
        ['xycraft_world:xychorium_ore_deepslate_green', 'xycraft_world:xychorium_gem_green'],
        ['xycraft_world:xychorium_ore_deepslate_red', 'xycraft_world:xychorium_gem_red'],
        ['xycraft_world:xychorium_ore_deepslate_dark', 'xycraft_world:xychorium_gem_dark'],
        ['xycraft_world:xychorium_ore_deepslate_light', 'xycraft_world:xychorium_gem_light']
    ];
    
    xycraft_crystals.forEach(crystal => {
        event.custom({"type":"mekanism:enriching","input":{"count":1,"item":crystal[0]},"output":{"count":2,"id":crystal[1]}})
        event.custom({
            "type": "integrateddynamics:squeezer",
            "input_item": {
              "item": crystal[0]
            },
            "output_items": [
              {
                "item": {
                  "count": 2,
                  "id": crystal[1]
                }
              },
              {
                "item": {
                  "id": crystal[1]
                },
                "chance": 0.5
              }
            ]
        })
        event.custom({
            "type": "integrateddynamics:mechanical_squeezer",
            "input_item": {
              "item": crystal[0]
            },
            "output_items": [
              {
                "item": {
                  "count": 2,
                  "id": crystal[1]
                }
              },
              {
                "item": {
                  "id": crystal[1]
                },
                "chance": 0.5
              }
            ],
            "duration": 30
        })
        event.custom({
            "type": "railcraft:crusher",
            "ingredient": {
              "item": crystal[0]
            },
            "outputs": [
              {
                "count": 2,
                "probability": 1.0,
                "result": {
                  "item": crystal[1]
                }
              },
              {
                "count": 1,
                "probability": 0.5,
                "result": {
                  "item": crystal[1]
                }
              },
            ]
          })
    })
});