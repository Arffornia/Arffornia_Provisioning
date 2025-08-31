// priority: 990

ServerEvents.recipes((event) => {
    
    //Replacing the Usage of Wool to Sheets from Handcrafted to avoid Recipe Conflicts
    let sleeping_bags = [
        ['comforts:sleeping_bag_white', 'minecraft:white_wool', 'handcrafted:white_sheet'],
        ['comforts:sleeping_bag_orange', 'minecraft:orange_wool', 'handcrafted:orange_sheet'],
        ['comforts:sleeping_bag_magenta', 'minecraft:magenta_wool', 'handcrafted:magenta_sheet'],
        ['comforts:sleeping_bag_light_blue', 'minecraft:light_blue_wool', 'handcrafted:light_blue_sheet'],
        ['comforts:sleeping_bag_yellow', 'minecraft:yellow_wool', 'handcrafted:yellow_sheet'],
        ['comforts:sleeping_bag_lime', 'minecraft:lime_wool', 'handcrafted:lime_sheet'],
        ['comforts:sleeping_bag_pink', 'minecraft:pink_wool', 'handcrafted:pink_sheet'],
        ['comforts:sleeping_bag_gray', 'minecraft:gray_wool', 'handcrafted:gray_sheet'],
        ['comforts:sleeping_bag_light_gray', 'minecraft:light_gray_wool', 'handcrafted:light_gray_sheet'],
        ['comforts:sleeping_bag_cyan', 'minecraft:cyan_wool', 'handcrafted:cyan_sheet'],
        ['comforts:sleeping_bag_purple', 'minecraft:purple_wool', 'handcrafted:purple_sheet'],
        ['comforts:sleeping_bag_blue', 'minecraft:blue_wool', 'handcrafted:blue_sheet'],
        ['comforts:sleeping_bag_brown', 'minecraft:brown_wool', 'handcrafted:brown_sheet'],
        ['comforts:sleeping_bag_green', 'minecraft:green_wool', 'handcrafted:green_sheet'],
        ['comforts:sleeping_bag_red', 'minecraft:red_wool', 'handcrafted:red_sheet'],
        ['comforts:sleeping_bag_black', 'minecraft:black_wool', 'handcrafted:black_sheet']
    ]
    sleeping_bags.forEach(zzz => {
        event.replaceInput(
            { id: "" + `${zzz[0]}` },
            `${zzz[1]}`,
            `${zzz[2]}`
        );
    });
});