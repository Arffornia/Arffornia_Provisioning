// priority: 994

ServerEvents.recipes((event) => {

    //Adding a Conversion Recipe for Sulfur
    event.shapeless(Item.of('mekanism:dust_sulfur', 1), ['railcraft:sulfur_dust'])

    //Alloy Recipes using a EnderIO Alloy Smelter
    let alloy_recipes = [
        ['minecraft:copper_ingot', 3, 'mekanism:ingot_tin', 1, 'mekanism:ingot_bronze', 4],
        ['railcraft:nickel_ingot', 1, 'minecraft:iron_ingot', 2, 'railcraft:invar_ingot', 3],
        ['minecraft:copper_ingot', 3, 'railcraft:zinc_ingot', 1, 'railcraft:brass_ingot', 4]
    ];

    alloy_recipes.forEach(recipe => {

        let input_1 = recipe[0]
        let count_1 = recipe[1]

        let input_2 = recipe[2]
        let count_2 = recipe[3]

        let output = recipe[4]
        let output_count = recipe[5]

        let output_split = output.split(":")
        let output_name = output_split[1]

        event.custom({
            "type": "enderio:alloy_smelting",
            "energy": 3200,
            "experience": 0.3,
            "inputs": [
              {
                "count": count_1,
                "item": input_1
              },
              {
                "count": count_2,
                "item": input_2
              }
            ],
            "output": {
              "count": output_count,
              "id": output
            }
        }).id("ftb:railcraft/alloy_smelter/" + output_name)
    });
    
});