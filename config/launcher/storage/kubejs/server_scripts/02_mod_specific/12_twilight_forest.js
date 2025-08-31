// priority: 989

ServerEvents.recipes((event) => {
    
    //Replacing the Usage of Wool to Sheets from Handcrafted to avoid Recipe Conflicts
    let chest_recipe_ids = [
        ['twilightforest:wood/twilight_oak_chest', 'twilightforest:twilight_oak_planks', 'twilightforest:twilight_oak_slab'],
        ['twilightforest:wood/canopy_chest', 'twilightforest:canopy_planks', 'twilightforest:canopy_slab'],
        ['twilightforest:wood/mangrove_chest', 'twilightforest:mangrove_planks', 'twilightforest:mangrove_slab'],
        ['twilightforest:wood/dark_chest', 'twilightforest:dark_planks', 'twilightforest:dark_slab'],
        ['twilightforest:wood/time_chest', 'twilightforest:time_planks', 'twilightforest:time_slab'],
        ['twilightforest:wood/transformation_chest', 'twilightforest:transformation_planks', 'twilightforest:transformation_slab'],
        ['twilightforest:wood/mining_chest', 'twilightforest:mining_planks', 'twilightforest:mining_slab'],
        ['twilightforest:wood/sorting_chest', 'twilightforest:sorting_planks', 'twilightforest:sorting_slab'],

        ['twilightforest:wood/twilight_oak_trapped_chest', 'twilightforest:twilight_oak_planks', 'twilightforest:twilight_oak_slab'],
        ['twilightforest:wood/canopy_trapped_chest', 'twilightforest:canopy_planks', 'twilightforest:canopy_slab'],
        ['twilightforest:wood/mangrove_trapped_chest', 'twilightforest:mangrove_planks', 'twilightforest:mangrove_slab'],
        ['twilightforest:wood/dark_trapped_chest', 'twilightforest:dark_planks', 'twilightforest:dark_slab'],
        ['twilightforest:wood/time_trapped_chest', 'twilightforest:time_planks', 'twilightforest:time_slab'],
        ['twilightforest:wood/transformation_trapped_chest', 'twilightforest:transformation_planks', 'twilightforest:transformation_slab'],
        ['twilightforest:wood/mining_trapped_chest', 'twilightforest:mining_planks', 'twilightforest:mining_slab'],
        ['twilightforest:wood/sorting_trapped_chest', 'twilightforest:sorting_planks', 'twilightforest:sorting_slab']

    ]
    chest_recipe_ids.forEach(recipe => {
        event.replaceInput(
            { id: `${recipe[0]}` },
            `${recipe[1]}`,
            `${recipe[2]}`
        );
    });
});