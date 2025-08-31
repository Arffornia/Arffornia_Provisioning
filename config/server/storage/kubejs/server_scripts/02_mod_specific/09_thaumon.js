// priority: 992

ServerEvents.recipes((event) => {
    event.replaceInput(
        { id: 'thaumon:ancient_stone_bricks' }, // Arg 1: the filter
        'thaumon:ancient_stone',            // Arg 2: the item to replace
        'thaumon:polished_ancient_stone'         // Arg 3: the item to replace it with
        // Note: tagged fluid ingredients do not work on Fabric, but tagged items do.
    )
});