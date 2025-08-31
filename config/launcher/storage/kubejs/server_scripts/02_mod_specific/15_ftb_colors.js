// priority: 958

// ================================================================================================

// TO-DO ======
//
// 1 - Maybe Figure a way to make Supplementaries's Buntings Work Again.
// 2 - Adjust the Cleaning Recipes to maybe use Tags, decreasing the JEI Pollution.
//

// ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ██╗     
// ██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗██║     
// ██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║██║     
// ██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║██║     
// ╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║███████╗
//  ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

let isMekanismLoaded = Platform.isLoaded("mekanism");
let isConnectedGlassLoaded = Platform.isLoaded("connectedglass");
let isAE2Loaded = Platform.isLoaded("ae2");
let isFarmersDelightLoaded = Platform.isLoaded("farmersdelight");
let isBibliocraftLoaded = Platform.isLoaded("bibliocraft");
let isCookingForBlockheadsLoaded = Platform.isLoaded("cookingforblockheads");
let isSupplementariesLoaded = Platform.isLoaded("supplementaries");
let isActuallyAdditionsLoaded = Platform.isLoaded("actuallyadditions");
let isImmersiveEngineeringLoaded = Platform.isLoaded("immersiveengineering");
let isPneumaticCraftLoaded = Platform.isLoaded("pneumaticcraft");
let isUtilitarianLoaded = Platform.isLoaded("utilitarian");
let isProductiveMetalworksLoaded = Platform.isLoaded("productivemetalworks");
let isIntegratedDynamicsLoaded = Platform.isLoaded("integrateddynamics");
let isMoreRedLoaded = Platform.isLoaded("morered");
let isElevatorModLoaded = Platform.isLoaded("elevatorid");
let isGlassentialLoaded = Platform.isLoaded("glassential");
let isPickleTweaksLoaded = Platform.isLoaded("pickletweaks");
let isOccultismLoaded = Platform.isLoaded("occultism");
let isCreateLoaded = Platform.isLoaded("create");
let isBumblezoneLoaded = Platform.isLoaded("the_bumblezone");
let isIndustrialForegoingLoaded = Platform.isLoaded("industrialforegoing");
let isEternalStarlightLoaded = Platform.isLoaded("eternal_starlight");
let isComfortsLoaded = Platform.isLoaded("comforts");
let isChalksLoaded = Platform.isLoaded("chalk");
let isEnderIOLoaded = Platform.isLoaded("enderio");
let isForbiddenArcanusLoaded = Platform.isLoaded("forbidden_arcanus");
let isModernIndustrializationLoaded = Platform.isLoaded("modern_industrialization");
let isProductiveBeesLoaded = Platform.isLoaded("productivebees");
let isRefinedStorageLoaded = Platform.isLoaded("refinedstorage");

let ftb_colors = [
    "white",
    "light_gray",
    "gray",
    "black",
    "lime",
    "yellow",
    "orange",
    "brown",
    "red",
    "pink",
    "magenta",
    "purple",
    "blue",
    "light_blue",
    "cyan",
    "green"
];

let input_name = "";
let output_name = "";
let dye = "";
let water_bottle = `minecraft:potion[potion_contents={potion:"minecraft:water"}]`;
let redyeable_vanilla_blocks = ["terracotta", "concrete", "concrete_powder", "stained_glass", "stained_glass_pane", "candle"];

ServerEvents.tags("item", event => {
    //Adding Tags to some Colored Vanilla Blocks so it can be used throughout the Script.
    event.add("minecraft:concrete", [
        "minecraft:white_concrete",
        "minecraft:light_gray_concrete", 
        "minecraft:gray_concrete",
        "minecraft:black_concrete",
        "minecraft:brown_concrete",
        "minecraft:red_concrete",
        "minecraft:orange_concrete",
        "minecraft:yellow_concrete",
        "minecraft:lime_concrete",
        "minecraft:green_concrete",
        "minecraft:cyan_concrete",
        "minecraft:light_blue_concrete",
        "minecraft:blue_concrete",
        "minecraft:purple_concrete",
        "minecraft:magenta_concrete",
        "minecraft:pink_concrete"
    ]);

    event.add("minecraft:concrete_powder", [
        "minecraft:white_concrete_powder",
        "minecraft:light_gray_concrete_powder", 
        "minecraft:gray_concrete_powder",
        "minecraft:black_concrete_powder",
        "minecraft:brown_concrete_powder",
        "minecraft:red_concrete_powder",
        "minecraft:orange_concrete_powder",
        "minecraft:yellow_concrete_powder",
        "minecraft:lime_concrete_powder",
        "minecraft:green_concrete_powder",
        "minecraft:cyan_concrete_powder",
        "minecraft:light_blue_concrete_powder",
        "minecraft:blue_concrete_powder",
        "minecraft:purple_concrete_powder",
        "minecraft:magenta_concrete_powder",
        "minecraft:pink_concrete_powder"
    ]);

    event.add("minecraft:stained_glass", [
        "minecraft:glass",
        "minecraft:white_stained_glass",
        "minecraft:light_gray_stained_glass", 
        "minecraft:gray_stained_glass",
        "minecraft:black_stained_glass",
        "minecraft:brown_stained_glass",
        "minecraft:red_stained_glass",
        "minecraft:orange_stained_glass",
        "minecraft:yellow_stained_glass",
        "minecraft:lime_stained_glass",
        "minecraft:green_stained_glass",
        "minecraft:cyan_stained_glass",
        "minecraft:light_blue_stained_glass",
        "minecraft:blue_stained_glass",
        "minecraft:purple_stained_glass",
        "minecraft:magenta_stained_glass",
        "minecraft:pink_stained_glass"
    ]);

    event.add("minecraft:stained_glass_pane", [
        "minecraft:glass_pane",
        "minecraft:white_stained_glass_pane",
        "minecraft:light_gray_stained_glass_pane", 
        "minecraft:gray_stained_glass_pane",
        "minecraft:black_stained_glass_pane",
        "minecraft:brown_stained_glass_pane",
        "minecraft:red_stained_glass_pane",
        "minecraft:orange_stained_glass_pane",
        "minecraft:yellow_stained_glass_pane",
        "minecraft:lime_stained_glass_pane",
        "minecraft:green_stained_glass_pane",
        "minecraft:cyan_stained_glass_pane",
        "minecraft:light_blue_stained_glass_pane",
        "minecraft:blue_stained_glass_pane",
        "minecraft:purple_stained_glass_pane",
        "minecraft:magenta_stained_glass_pane",
        "minecraft:pink_stained_glass_pane"
    ]);

    //This is only needed cause for some reason Mojang decided it was a good idea to, IN THIS TAG, make it plural =).
    event.add("minecraft:candle", [
        "minecraft:candle",
        "minecraft:white_candle",
        "minecraft:light_gray_candle", 
        "minecraft:gray_candle",
        "minecraft:black_candle",
        "minecraft:brown_candle",
        "minecraft:red_candle",
        "minecraft:orange_candle",
        "minecraft:yellow_candle",
        "minecraft:lime_candle",
        "minecraft:green_candle",
        "minecraft:cyan_candle",
        "minecraft:light_blue_candle",
        "minecraft:blue_candle",
        "minecraft:purple_candle",
        "minecraft:magenta_candle",
        "minecraft:pink_candle"
    ]);
    
    //Adding Tags for Utilitarian's Trading Carpets.
    if (isUtilitarianLoaded) {
        event.add("c:utilitarian_trading_carpet", [
            "utilitarian:white_soliciting_carpet", 
            "utilitarian:light_gray_soliciting_carpet", 
            "utilitarian:orange_soliciting_carpet", 
            "utilitarian:magenta_soliciting_carpet", 
            "utilitarian:light_blue_soliciting_carpet", 
            "utilitarian:yellow_soliciting_carpet", 
            "utilitarian:lime_soliciting_carpet", 
            "utilitarian:pink_soliciting_carpet", 
            "utilitarian:gray_soliciting_carpet", 
            "utilitarian:cyan_soliciting_carpet", 
            "utilitarian:purple_soliciting_carpet", 
            "utilitarian:blue_soliciting_carpet", 
            "utilitarian:brown_soliciting_carpet", 
            "utilitarian:green_soliciting_carpet", 
            "utilitarian:red_soliciting_carpet", 
            "utilitarian:black_soliciting_carpet"
        ]);
        event.add("c:utilitarian_trapped_trading_carpet", [
            "utilitarian:white_trapped_soliciting_carpet", 
            "utilitarian:light_gray_trapped_soliciting_carpet", 
            "utilitarian:orange_trapped_soliciting_carpet", 
            "utilitarian:magenta_trapped_soliciting_carpet", 
            "utilitarian:light_blue_trapped_soliciting_carpet", 
            "utilitarian:yellow_trapped_soliciting_carpet", 
            "utilitarian:lime_trapped_soliciting_carpet", 
            "utilitarian:pink_trapped_soliciting_carpet", 
            "utilitarian:gray_trapped_soliciting_carpet", 
            "utilitarian:cyan_trapped_soliciting_carpet", 
            "utilitarian:purple_trapped_soliciting_carpet", 
            "utilitarian:blue_trapped_soliciting_carpet", 
            "utilitarian:brown_trapped_soliciting_carpet", 
            "utilitarian:green_trapped_soliciting_carpet", 
            "utilitarian:red_trapped_soliciting_carpet", 
            "utilitarian:black_trapped_soliciting_carpet"
        ]);
    }

    if (isCookingForBlockheadsLoaded) {
        event.add("cookingforblockheads:kitchen_floors", [
            "cookingforblockheads:kitchen_floor",
            "cookingforblockheads:white_kitchen_floor",
            "cookingforblockheads:light_gray_kitchen_floor", 
            "cookingforblockheads:gray_kitchen_floor",
            "cookingforblockheads:black_kitchen_floor",
            "cookingforblockheads:brown_kitchen_floor",
            "cookingforblockheads:red_kitchen_floor",
            "cookingforblockheads:orange_kitchen_floor",
            "cookingforblockheads:yellow_kitchen_floor",
            "cookingforblockheads:lime_kitchen_floor",
            "cookingforblockheads:green_kitchen_floor",
            "cookingforblockheads:cyan_kitchen_floor",
            "cookingforblockheads:light_blue_kitchen_floor",
            "cookingforblockheads:blue_kitchen_floor",
            "cookingforblockheads:purple_kitchen_floor",
            "cookingforblockheads:magenta_kitchen_floor",
            "cookingforblockheads:pink_kitchen_floor"
        ]);
    }

    if (isIndustrialForegoingLoaded) {
        event.add("industrialforegoing:laser_lens", [
            "industrialforegoing:white_laser_lens",
            "industrialforegoing:light_gray_laser_lens", 
            "industrialforegoing:gray_laser_lens",
            "industrialforegoing:black_laser_lens",
            "industrialforegoing:brown_laser_lens",
            "industrialforegoing:red_laser_lens",
            "industrialforegoing:orange_laser_lens",
            "industrialforegoing:yellow_laser_lens",
            "industrialforegoing:lime_laser_lens",
            "industrialforegoing:green_laser_lens",
            "industrialforegoing:cyan_laser_lens",
            "industrialforegoing:light_blue_laser_lens",
            "industrialforegoing:blue_laser_lens",
            "industrialforegoing:purple_laser_lens",
            "industrialforegoing:magenta_laser_lens",
            "industrialforegoing:pink_laser_lens"
        ]);
    }

    if (isImmersiveEngineeringLoaded) {
        event.add("c:chutes", [
            "immersiveengineering:chute_copper",
            "immersiveengineering:chute_aluminum",
            "immersiveengineering:chute_steel",
            "immersiveengineering:chute_iron",
            "immersiveengineering:chute_colored_white", 
            "immersiveengineering:chute_colored_light_gray", 
            "immersiveengineering:chute_colored_orange", 
            "immersiveengineering:chute_colored_magenta", 
            "immersiveengineering:chute_colored_light_blue", 
            "immersiveengineering:chute_colored_yellow", 
            "immersiveengineering:chute_colored_lime", 
            "immersiveengineering:chute_colored_pink", 
            "immersiveengineering:chute_colored_gray", 
            "immersiveengineering:chute_colored_cyan", 
            "immersiveengineering:chute_colored_purple", 
            "immersiveengineering:chute_colored_blue", 
            "immersiveengineering:chute_colored_brown", 
            "immersiveengineering:chute_colored_green", 
            "immersiveengineering:chute_colored_red", 
            "immersiveengineering:chute_colored_black"
        ]);
        event.add("c:colored_chutes", [
            "immersiveengineering:chute_colored_white", 
            "immersiveengineering:chute_colored_light_gray", 
            "immersiveengineering:chute_colored_orange", 
            "immersiveengineering:chute_colored_magenta", 
            "immersiveengineering:chute_colored_light_blue", 
            "immersiveengineering:chute_colored_yellow", 
            "immersiveengineering:chute_colored_lime", 
            "immersiveengineering:chute_colored_pink", 
            "immersiveengineering:chute_colored_gray", 
            "immersiveengineering:chute_colored_cyan", 
            "immersiveengineering:chute_colored_purple", 
            "immersiveengineering:chute_colored_blue", 
            "immersiveengineering:chute_colored_brown", 
            "immersiveengineering:chute_colored_green", 
            "immersiveengineering:chute_colored_red", 
            "immersiveengineering:chute_colored_black"
        ]);
        event.add("c:colored_sheetmetals", [
            "immersiveengineering:sheetmetal_colored_white", 
            "immersiveengineering:sheetmetal_colored_light_gray", 
            "immersiveengineering:sheetmetal_colored_orange", 
            "immersiveengineering:sheetmetal_colored_magenta", 
            "immersiveengineering:sheetmetal_colored_light_blue", 
            "immersiveengineering:sheetmetal_colored_yellow", 
            "immersiveengineering:sheetmetal_colored_lime", 
            "immersiveengineering:sheetmetal_colored_pink", 
            "immersiveengineering:sheetmetal_colored_gray", 
            "immersiveengineering:sheetmetal_colored_cyan", 
            "immersiveengineering:sheetmetal_colored_purple", 
            "immersiveengineering:sheetmetal_colored_blue", 
            "immersiveengineering:sheetmetal_colored_brown", 
            "immersiveengineering:sheetmetal_colored_green", 
            "immersiveengineering:sheetmetal_colored_red", 
            "immersiveengineering:sheetmetal_colored_black"
        ]);
        event.add("c:colored_sheetmetal_slabs", [
            "immersiveengineering:slab_sheetmetal_colored_white", 
            "immersiveengineering:slab_sheetmetal_colored_light_gray", 
            "immersiveengineering:slab_sheetmetal_colored_orange", 
            "immersiveengineering:slab_sheetmetal_colored_magenta", 
            "immersiveengineering:slab_sheetmetal_colored_light_blue", 
            "immersiveengineering:slab_sheetmetal_colored_yellow", 
            "immersiveengineering:slab_sheetmetal_colored_lime", 
            "immersiveengineering:slab_sheetmetal_colored_pink", 
            "immersiveengineering:slab_sheetmetal_colored_gray", 
            "immersiveengineering:slab_sheetmetal_colored_cyan", 
            "immersiveengineering:slab_sheetmetal_colored_purple", 
            "immersiveengineering:slab_sheetmetal_colored_blue", 
            "immersiveengineering:slab_sheetmetal_colored_brown", 
            "immersiveengineering:slab_sheetmetal_colored_green", 
            "immersiveengineering:slab_sheetmetal_colored_red", 
            "immersiveengineering:slab_sheetmetal_colored_black"
        ]);
    }

    if (isConnectedGlassLoaded) {
        event.add("connectedglass:colored_clear_glass", [
            "connectedglass:clear_glass_white", 
            "connectedglass:clear_glass_light_gray", 
            "connectedglass:clear_glass_orange", 
            "connectedglass:clear_glass_magenta", 
            "connectedglass:clear_glass_light_blue", 
            "connectedglass:clear_glass_yellow", 
            "connectedglass:clear_glass_lime", 
            "connectedglass:clear_glass_pink", 
            "connectedglass:clear_glass_gray", 
            "connectedglass:clear_glass_cyan", 
            "connectedglass:clear_glass_purple", 
            "connectedglass:clear_glass_blue", 
            "connectedglass:clear_glass_brown", 
            "connectedglass:clear_glass_green", 
            "connectedglass:clear_glass_red", 
            "connectedglass:clear_glass_black"
        ]);
        event.add("connectedglass:colored_borderless_glass", [
            "connectedglass:borderless_glass_white", 
            "connectedglass:borderless_glass_light_gray", 
            "connectedglass:borderless_glass_orange", 
            "connectedglass:borderless_glass_magenta", 
            "connectedglass:borderless_glass_light_blue", 
            "connectedglass:borderless_glass_yellow", 
            "connectedglass:borderless_glass_lime", 
            "connectedglass:borderless_glass_pink", 
            "connectedglass:borderless_glass_gray", 
            "connectedglass:borderless_glass_cyan", 
            "connectedglass:borderless_glass_purple", 
            "connectedglass:borderless_glass_blue", 
            "connectedglass:borderless_glass_brown", 
            "connectedglass:borderless_glass_green", 
            "connectedglass:borderless_glass_red", 
            "connectedglass:borderless_glass_black"
        ]);
        event.add("connectedglass:colored_scratched_glass", [
            "connectedglass:scratched_glass_white", 
            "connectedglass:scratched_glass_light_gray", 
            "connectedglass:scratched_glass_orange", 
            "connectedglass:scratched_glass_magenta", 
            "connectedglass:scratched_glass_light_blue", 
            "connectedglass:scratched_glass_yellow", 
            "connectedglass:scratched_glass_lime", 
            "connectedglass:scratched_glass_pink", 
            "connectedglass:scratched_glass_gray", 
            "connectedglass:scratched_glass_cyan", 
            "connectedglass:scratched_glass_purple", 
            "connectedglass:scratched_glass_blue", 
            "connectedglass:scratched_glass_brown", 
            "connectedglass:scratched_glass_green", 
            "connectedglass:scratched_glass_red", 
            "connectedglass:scratched_glass_black"
        ]);
        event.add("connectedglass:colored_clear_glass_panes", [
            "connectedglass:clear_glass_white_pane", 
            "connectedglass:clear_glass_light_gray_pane", 
            "connectedglass:clear_glass_orange_pane", 
            "connectedglass:clear_glass_magenta_pane", 
            "connectedglass:clear_glass_light_blue_pane", 
            "connectedglass:clear_glass_yellow_pane", 
            "connectedglass:clear_glass_lime_pane", 
            "connectedglass:clear_glass_pink_pane", 
            "connectedglass:clear_glass_gray_pane", 
            "connectedglass:clear_glass_cyan_pane", 
            "connectedglass:clear_glass_purple_pane", 
            "connectedglass:clear_glass_blue_pane", 
            "connectedglass:clear_glass_brown_pane", 
            "connectedglass:clear_glass_green_pane", 
            "connectedglass:clear_glass_red_pane", 
            "connectedglass:clear_glass_black_pane"
        ]);
        event.add("connectedglass:colored_borderless_glass_panes", [
            "connectedglass:borderless_glass_white_pane", 
            "connectedglass:borderless_glass_light_gray_pane", 
            "connectedglass:borderless_glass_orange_pane", 
            "connectedglass:borderless_glass_magenta_pane", 
            "connectedglass:borderless_glass_light_blue_pane", 
            "connectedglass:borderless_glass_yellow_pane", 
            "connectedglass:borderless_glass_lime_pane", 
            "connectedglass:borderless_glass_pink_pane", 
            "connectedglass:borderless_glass_gray_pane", 
            "connectedglass:borderless_glass_cyan_pane", 
            "connectedglass:borderless_glass_purple_pane", 
            "connectedglass:borderless_glass_blue_pane", 
            "connectedglass:borderless_glass_brown_pane", 
            "connectedglass:borderless_glass_green_pane", 
            "connectedglass:borderless_glass_red_pane", 
            "connectedglass:borderless_glass_black_pane"
        ]);
        event.add("connectedglass:colored_scratched_glass_panes", [
            "connectedglass:scratched_glass_white_pane", 
            "connectedglass:scratched_glass_light_gray_pane", 
            "connectedglass:scratched_glass_orange_pane", 
            "connectedglass:scratched_glass_magenta_pane", 
            "connectedglass:scratched_glass_light_blue_pane", 
            "connectedglass:scratched_glass_yellow_pane", 
            "connectedglass:scratched_glass_lime_pane", 
            "connectedglass:scratched_glass_pink_pane", 
            "connectedglass:scratched_glass_gray_pane", 
            "connectedglass:scratched_glass_cyan_pane", 
            "connectedglass:scratched_glass_purple_pane", 
            "connectedglass:scratched_glass_blue_pane", 
            "connectedglass:scratched_glass_brown_pane", 
            "connectedglass:scratched_glass_green_pane", 
            "connectedglass:scratched_glass_red_pane", 
            "connectedglass:scratched_glass_black_pane"
        ]);
    }

    if (isForbiddenArcanusLoaded) {
        event.add("forbidden_arcanus:quantum_catchers", [
            "forbidden_arcanus:quantum_catcher",
            "forbidden_arcanus:white_quantum_catcher",
            "forbidden_arcanus:light_gray_quantum_catcher", 
            "forbidden_arcanus:gray_quantum_catcher",
            "forbidden_arcanus:black_quantum_catcher",
            "forbidden_arcanus:brown_quantum_catcher",
            "forbidden_arcanus:red_quantum_catcher",
            "forbidden_arcanus:orange_quantum_catcher",
            "forbidden_arcanus:yellow_quantum_catcher",
            "forbidden_arcanus:lime_quantum_catcher",
            "forbidden_arcanus:green_quantum_catcher",
            "forbidden_arcanus:cyan_quantum_catcher",
            "forbidden_arcanus:light_blue_quantum_catcher",
            "forbidden_arcanus:blue_quantum_catcher",
            "forbidden_arcanus:purple_quantum_catcher",
            "forbidden_arcanus:magenta_quantum_catcher",
            "forbidden_arcanus:pink_quantum_catcher"
        ]);
    }

    if (isProductiveBeesLoaded) {
        event.add("productivebees:petrified_honeys", [
            "productivebees:petrified_honey",
            "productivebees:white_petrified_honey",
            "productivebees:light_gray_petrified_honey", 
            "productivebees:gray_petrified_honey",
            "productivebees:black_petrified_honey",
            "productivebees:brown_petrified_honey",
            "productivebees:red_petrified_honey",
            "productivebees:orange_petrified_honey",
            "productivebees:yellow_petrified_honey",
            "productivebees:lime_petrified_honey",
            "productivebees:green_petrified_honey",
            "productivebees:cyan_petrified_honey",
            "productivebees:light_blue_petrified_honey",
            "productivebees:blue_petrified_honey",
            "productivebees:purple_petrified_honey",
            "productivebees:magenta_petrified_honey",
            "productivebees:pink_petrified_honey"
        ]);
    }

    if (isGlassentialLoaded) {
        event.add("glassential:glass_doors", [
            "glassential:glass_door",
            "glassential:white_glass_door",
            "glassential:light_gray_glass_door", 
            "glassential:gray_glass_door",
            "glassential:black_glass_door",
            "glassential:brown_glass_door",
            "glassential:red_glass_door",
            "glassential:orange_glass_door",
            "glassential:yellow_glass_door",
            "glassential:lime_glass_door",
            "glassential:green_glass_door",
            "glassential:cyan_glass_door",
            "glassential:light_blue_glass_door",
            "glassential:blue_glass_door",
            "glassential:purple_glass_door",
            "glassential:magenta_glass_door",
            "glassential:pink_glass_door"
        ]);
        event.add("glassential:glass_trapdoors", [
            "glassential:glass_trapdoor",
            "glassential:white_glass_trapdoor",
            "glassential:light_gray_glass_trapdoor", 
            "glassential:gray_glass_trapdoor",
            "glassential:black_glass_trapdoor",
            "glassential:brown_glass_trapdoor",
            "glassential:red_glass_trapdoor",
            "glassential:orange_glass_trapdoor",
            "glassential:yellow_glass_trapdoor",
            "glassential:lime_glass_trapdoor",
            "glassential:green_glass_trapdoor",
            "glassential:cyan_glass_trapdoor",
            "glassential:light_blue_glass_trapdoor",
            "glassential:blue_glass_trapdoor",
            "glassential:purple_glass_trapdoor",
            "glassential:magenta_glass_trapdoor",
            "glassential:pink_glass_trapdoor"
        ]);
    }

    if (isAE2Loaded) {
        event.add("ae2:matter_balls", [
            "ae2:matter_ball",
            "ae2:white_paint_ball",
            "ae2:light_gray_paint_ball", 
            "ae2:gray_paint_ball",
            "ae2:black_paint_ball",
            "ae2:brown_paint_ball",
            "ae2:red_paint_ball",
            "ae2:orange_paint_ball",
            "ae2:yellow_paint_ball",
            "ae2:lime_paint_ball",
            "ae2:green_paint_ball",
            "ae2:cyan_paint_ball",
            "ae2:light_blue_paint_ball",
            "ae2:blue_paint_ball",
            "ae2:purple_paint_ball",
            "ae2:magenta_paint_ball",
            "ae2:pink_paint_ball"
        ]);
    }

})

//Dealing with the Existence of Soap. =============================================================
let soap = "";
if (isSupplementariesLoaded) {
    soap = "supplementaries:soap";
} else {
    soap = "minecraft:wet_sponge";
}

ServerEvents.recipes((event) => {
    
    //Also Adding More ways to make a Sponge Wet.
    event.shapeless("minecraft:wet_sponge", [
        "minecraft:sponge",
        water_bottle
    ]).replaceIngredient(water_bottle, "minecraft:glass_bottle").id(`ftb_colors:sponge_filling`);

    event.shapeless("8x minecraft:wet_sponge", [
        "minecraft:sponge",
        "minecraft:sponge",
        "minecraft:sponge",
        "minecraft:sponge",
        "minecraft:sponge",
        "minecraft:sponge",
        "minecraft:sponge",
        "minecraft:sponge",
        "#c:buckets/water"
    ]).id(`ftb_colors:sponge_filling_1`);

})

// ================================================================================================

// ███╗   ███╗███████╗██╗  ██╗ █████╗ ███╗   ██╗██╗███████╗███╗   ███╗
// ████╗ ████║██╔════╝██║ ██╔╝██╔══██╗████╗  ██║██║██╔════╝████╗ ████║
// ██╔████╔██║█████╗  █████╔╝ ███████║██╔██╗ ██║██║███████╗██╔████╔██║
// ██║╚██╔╝██║██╔══╝  ██╔═██╗ ██╔══██║██║╚██╗██║██║╚════██║██║╚██╔╝██║
// ██║ ╚═╝ ██║███████╗██║  ██╗██║  ██║██║ ╚████║██║███████║██║ ╚═╝ ██║
// ╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚══════╝╚═╝     ╚═╝
                                                                   
// ██████╗  █████╗ ██╗███╗   ██╗████████╗███████╗██████╗              
// ██╔══██╗██╔══██╗██║████╗  ██║╚══██╔══╝██╔════╝██╔══██╗             
// ██████╔╝███████║██║██╔██╗ ██║   ██║   █████╗  ██████╔╝             
// ██╔═══╝ ██╔══██║██║██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗             
// ██║     ██║  ██║██║██║ ╚████║   ██║   ███████╗██║  ██║             
// ╚═╝     ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝             

// And More!

ServerEvents.recipes((event) => {
    
    // Functions ==================================================================================

    if (isMekanismLoaded) {
        // 1 Dye added to the Paiting Machine is 256, so considering the possible addition of recipes that paint 8 with only 1 dye.
        // The Amount Required would usually be 32.
        function mekanism_painting(input, output, color_amount, color, modid) {
            input_name = input.split(":")[1]
            if (input.includes("#")) {
                event.custom({"type": "mekanism:painting",
                    "chemical_input": { "amount": color_amount,"chemical": `mekanism:${color}`},
                    "item_input": { "tag": input.replace("#", ""), "count": 1 },
                    "output": { "count": 1,"id": output },
                    "per_tick_usage":false
                }).id(`ftb:mekanism/painting/${modid}/${input_name}/${color}`);
            } else {
                event.custom({"type": "mekanism:painting",
                    "chemical_input": { "amount": color_amount,"chemical": `mekanism:${color}`},
                    "item_input": { "item": input, "count": 1 },
                    "output": { "count": 1,"id": output },
                    "per_tick_usage":false
                }).id(`ftb:mekanism/painting/${modid}/${input_name}/${color}`);
            }
        }
    }

    // Universal Cleaning Function
    function shapeless_cleaning (input, output, modid) {
        input_name = input.split(":")[1];
        if (!isSupplementariesLoaded) {
            event.shapeless(output, [
                input,
                soap
            ]).replaceIngredient(soap, "minecraft:sponge").id(`ftb:cleaning/${modid}/${input_name}`);
        } else {
            event.shapeless(output, [
                input,
                soap
            ]).id(`ftb:cleaning/${modid}/${input_name}`);
        }
    }

    // Universal Dyeing Function
    function shapeless_dyeing (input, output, dye, modid) {
        input_name = input.split(":")[1];
        output_name = output.split(":")[1]; 
            event.shapeless(
                Item.of(output, 1),
                [
                  dye,
                  input
                ]
            ).id(`ftb:shapeless/dyeing/${modid}/${input_name}/${output_name}`);
    }

    // Universal 8-Dyeing Function
    function shaped_circular_dyeing (input, output, dye, modid) {
        input_name = input.split(":")[1];
        output_name = output.split(":")[1];  
        event.shaped(
            Item.of(output, 8),
            [
              "III",
              "IDI",
              "III"
            ],
            {
              I: input,
              D: dye
            }
        ).id(`ftb:shaped/dyeing/${modid}/${input_name}/${output_name}`);
    }

    //If Utilitarian is Present, it will add some Redying Recipes, those are Cool, but we need a way to get them without the Mod.
    //Just in Case.

    if (isUtilitarianLoaded) {
        ftb_colors.forEach(color => {

            // These are the Existing Redying Recipes that the Mod Adds.
            // utilitarian:utility/redying/${color}_terracotta_single
            // utilitarian:utility/redying/${color}_terracotta
            // utilitarian:utility/redying/${color}_concrete_single
            // utilitarian:utility/redying/${color}_concrete
            // utilitarian:utility/redying/${color}_concrete_powder_single
            // utilitarian:utility/redying/${color}_concrete_powder
            // utilitarian:utility/redying/${color}_stained_glass_single
            // utilitarian:utility/redying/${color}_stained_glass
            // utilitarian:utility/redying/${color}_stained_glass_pane_single
            // utilitarian:utility/redying/${color}_stained_glass_pane
            // utilitarian:utility/redying/${color}_candle

            //Removing These Vanila Painting Recipes since Utilitarian already adds a alternate tagged recipe.
            event.remove({ id: `minecraft:${color}_terracotta` });
            event.remove({ id: `minecraft:${color}_candle` });
            event.remove({ id: `minecraft:${color}_stained_glass` });
            event.remove({ id: `minecraft:${color}_stained_glass_pane_from_glass_pane` });
            
            //Also Fixing the Candle Recipe, since the vanilla candles tag would allow the usage of Occultism Large Candles.
            event.replaceInput({ id: `utilitarian:utility/redying/${color}_candle` }, "#minecraft:candles", "#minecraft:candle");

        });
    } else {

        //If the Utilitarian Mod is not present, time to add its recipes manually!
        ftb_colors.forEach(color => {
            dye = `minecraft:${color}_dye`;

            //Removing These Vanila Painting Recipes since we will also anyway add alternate tagged recipes.
            event.remove({ id: `minecraft:${color}_terracotta` });
            event.remove({ id: `minecraft:${color}_candle` });
            event.remove({ id: `minecraft:${color}_stained_glass` });
            event.remove({ id: `minecraft:${color}_stained_glass_pane_from_glass_pane` });

            redyeable_vanilla_blocks.forEach(block_type => {
                shapeless_dyeing(`#minecraft:${block_type}`, `minecraft:${color}_${block_type}`, dye, "minecraft");
                shaped_circular_dyeing(`#minecraft:${block_type}`, `minecraft:${color}_${block_type}`, dye, "minecraft");
            });
        });
        
    }

    // ============================================================================================

    // ███╗   ███╗ ██████╗ ██████╗                                  
    // ████╗ ████║██╔═══██╗██╔══██╗                                 
    // ██╔████╔██║██║   ██║██║  ██║                                 
    // ██║╚██╔╝██║██║   ██║██║  ██║                                 
    // ██║ ╚═╝ ██║╚██████╔╝██████╔╝                                 
    // ╚═╝     ╚═╝ ╚═════╝ ╚═════╝                                  
                                                                 
    //  ██████╗ ██████╗ ███╗   ███╗██████╗  █████╗ ████████╗███████╗
    // ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔══██╗╚══██╔══╝██╔════╝
    // ██║     ██║   ██║██╔████╔██║██████╔╝███████║   ██║   ███████╗
    // ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██╔══██║   ██║   ╚════██║
    // ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ██║  ██║   ██║   ███████║
    //  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚══════╝
    
    if (isConnectedGlassLoaded){

        //Declaring Variables ===============

        let connected_glass_types = [
            "scratched",
            "clear",
            "borderless"
        ];

        // ================================ /

        connected_glass_types.forEach(glass_type => {

            ftb_colors.forEach(color => {

                //Removing Duplicated Recipes.
                event.remove({ id: `connectedglass:${glass_type}_glass_${color}2` });
                event.remove({ id: `connectedglass:${glass_type}_glass_${color}_pane2` });

                //Adding the Compat with Meka Painting
                if (isMekanismLoaded) {
                    mekanism_painting(`connectedglass:${glass_type}_glass`, `connectedglass:${glass_type}_glass_${color}`, 32, color, "connectedglass");
                    mekanism_painting(`connectedglass:${glass_type}_glass_pane`, `connectedglass:${glass_type}_glass_${color}_pane`, 32, color, "connectedglass");
                }

            });

            //For some Reason, Supplementaries only adds cleaning recipes for Glass Blocks and not Panes.
            shapeless_cleaning(`#connectedglass:colored_${glass_type}_glass_panes`, `connectedglass:${glass_type}_glass_pane`, "connectedglass");
            
            //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
            switch (isSupplementariesLoaded) {
                case false:

                        shapeless_cleaning(`#connectedglass:colored_${glass_type}_glass`, `connectedglass:${glass_type}_glass`, "connectedglass");
                        shapeless_cleaning(`#connectedglass:colored_${glass_type}_glass`, `connectedglass:${glass_type}_glass`, "connectedglass");
                        shapeless_cleaning(`#connectedglass:colored_${glass_type}_glass_panes`, `connectedglass:${glass_type}_glass_pane`, "connectedglass");
                    shapeless_cleaning(`#connectedglass:colored_${glass_type}_glass`, `connectedglass:${glass_type}_glass`, "connectedglass");
                        shapeless_cleaning(`#connectedglass:colored_${glass_type}_glass_panes`, `connectedglass:${glass_type}_glass_pane`, "connectedglass");

                    break;
            
                default:
                    break;
            }
        });

    }
    
    if (isAE2Loaded){

        //Declaring Variables ===============

        let fluix_glass_cable = "";
        let glass_cable = "";
        
        let fluix_covered_cable = "";
        let covered_cable = "";
        
        let fluix_dense_covered_cable = "";
        let dense_covered_cable = "";
        
        let fluix_smart_cable = "";
        let smart_cable = "";
        
        let fluix_dense_smart_cable = "";
        let dense_smart_cable = "";

        let default_matter_ball = "";
        let painted_matter_ball = "";
        let lumen_matter_ball = "";
        let painted_lumen_matter_ball = "";

        // ================================ /

        ftb_colors.forEach(color => {

            fluix_glass_cable = "ae2:fluix_glass_cable";
            glass_cable = `ae2:${color}_glass_cable`;
            
            fluix_covered_cable = "ae2:fluix_covered_cable";
            covered_cable = `ae2:${color}_covered_cable`;
            
            fluix_dense_covered_cable = "ae2:fluix_covered_dense_cable";
            dense_covered_cable = `ae2:${color}_covered_dense_cable`;
            
            fluix_smart_cable = "ae2:fluix_smart_cable";
            smart_cable = `ae2:${color}_smart_cable`;
            
            fluix_dense_smart_cable = "ae2:fluix_smart_dense_cable";
            dense_smart_cable = `ae2:${color}_smart_dense_cable`;

            default_matter_ball = "#ae2:matter_balls";
            painted_matter_ball = `ae2:${color}_paint_ball`;
            lumen_matter_ball = "#ae2:lumen_paint_balls";
            painted_lumen_matter_ball = `ae2:${color}_lumen_paint_ball`;

            if(isMekanismLoaded) {
                mekanism_painting(fluix_glass_cable, glass_cable, 32, color, "ae2");
                mekanism_painting(fluix_covered_cable, covered_cable, 32, color, "ae2");
                mekanism_painting(fluix_dense_covered_cable, dense_covered_cable, 32, color, "ae2");
                mekanism_painting(fluix_smart_cable, smart_cable, 32, color, "ae2");
                mekanism_painting(fluix_dense_smart_cable, dense_smart_cable, 32, color, "ae2");
                mekanism_painting(default_matter_ball, painted_matter_ball, 32, color, "ae2");
                mekanism_painting(lumen_matter_ball, painted_lumen_matter_ball, 32, color, "ae2");
            }

        });

        shapeless_cleaning(lumen_matter_ball,"ae2:white_lumen_paint_ball", "ae2");
        shapeless_cleaning(default_matter_ball, "ae2:matter_ball", "ae2");

    }

    if (isFarmersDelightLoaded) {

        //Declaring Variables ===============

        let default_canvas_sign = "#farmersdelight:canvas_signs";
        let painted_canvas_sign = "";

        let default_hanging_canvas_sign = "#farmersdelight:hanging_canvas_signs";
        let painted_hanging_canvas_sign = "";

        // ================================ /

        ftb_colors.forEach(color => {

            // Canvas Signs ===================================================================
            
            painted_canvas_sign = `farmersdelight:${color}_canvas_sign`;
            painted_hanging_canvas_sign = `farmersdelight:${color}_hanging_canvas_sign`;

            if (isMekanismLoaded) {
                mekanism_painting(default_canvas_sign, painted_canvas_sign, 32, color, "farmersdelight");
                mekanism_painting(default_hanging_canvas_sign, painted_hanging_canvas_sign, 32, color, "farmersdelight");
            }
            
        });

        //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
        switch (isSupplementariesLoaded) {
            case false:

                shapeless_cleaning(default_canvas_sign, "farmersdelight:canvas_sign", "farmersdelight");
                shapeless_cleaning(default_hanging_canvas_sign, "farmersdelight:hanging_canvas_sign", "farmersdelight");

                break;
        
            default:
                break;
        }

    }

    if (isBibliocraftLoaded) {

        //Declaring Variables ===============

        let default_biblio_block = "";
        let painted_biblio_block = "";

        let biblio_wood_types = [
            "oak",
            "spruce",
            "birch",
            "jungle",
            "acacia",
            "dark_oak",
            "crimson",
            "warped",
            "mangrove",
            "bamboo",
            "cherry"
        ];
        
        let biblio_block_types = [
            "display_case",
            "seat",
            "small_seat_back",
            "raised_seat_back",
            "flat_seat_back",
            "tall_seat_back",
            "fancy_seat_back",
            "fancy_gold_lamp",
            "fancy_iron_lamp",
            "fancy_gold_lantern",
            "fancy_iron_lantern",
        ];

        // ================================ /

        ftb_colors.forEach(color => {
            //Since White will be our Default Color, we need a if statement.
            if (color !== "white") {
                biblio_block_types.forEach(block_type => {
                    default_biblio_block = `bibliocraft:white_${block_type}`;
                    painted_biblio_block = `bibliocraft:${color}_${block_type}`;
                    
                    //Also checking here if the block type is a lantern or a lamp.
                    if (block_type.includes("iron") || block_type.includes("gold")) {

                        if (isMekanismLoaded) {
                            mekanism_painting(default_biblio_block, painted_biblio_block, 32, color, "bibliocraft");
                        }
                        
                        //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
                        switch (isSupplementariesLoaded) {
                            case false:
            
                                shapeless_cleaning(painted_biblio_block, default_biblio_block, "bibliocraft");
            
                                break;
                        
                            default:
                                break;
                        }

                    } else {
                        biblio_wood_types.forEach(wood_type => {
                            default_biblio_block = `bibliocraft:white_${wood_type}_${block_type}`;
                            painted_biblio_block = `bibliocraft:${color}_${wood_type}_${block_type}`;

                            if (isMekanismLoaded) {
                                mekanism_painting(default_biblio_block, painted_biblio_block, 32, color, "bibliocraft");
                            }
                            
                            //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
                            switch (isSupplementariesLoaded) {
                                case false:
                
                                    shapeless_cleaning(painted_biblio_block, default_biblio_block, "bibliocraft");
                
                                    break;
                            
                                default:
                                    break;
                            }

                        })
                    }
                });
            }
        });
    }

    if (isCookingForBlockheadsLoaded) {

        //Declaring Variables ===============

        let tagged_block = "";
        let painted_block = "";
        let cleaned_block = "";

        let cooking_for_blockheads_block_types = [
            ["oven", "cookingforblockheads:white_oven"],
            ["fridge", "cookingforblockheads:white_fridge"],
            ["connector", "cookingforblockheads:connector"],
            ["cooking_table", "cookingforblockheads:cooking_table"],
            ["counter", "cookingforblockheads:counter"],
            ["cabinet", "cookingforblockheads:cabinet"],
            ["sink", "cookingforblockheads:sink"],
            ["kitchen_floor", "cookingforblockheads:white_kitchen_floor"]
        ];

        // ================================ /

        cooking_for_blockheads_block_types.forEach(block_type => {

            tagged_block = `#cookingforblockheads:${block_type[0]}s`;
            cleaned_block = `${block_type[1]}`;

            ftb_colors.forEach(color => {
                painted_block = `cookingforblockheads:${color}_${block_type[0]}`;
                
                if (isMekanismLoaded) {
                    mekanism_painting(tagged_block, painted_block, 32, color, "cookingforblockheads");
                }
  
            });

            //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
            switch (isSupplementariesLoaded) {
                case false:

                    shapeless_cleaning(tagged_block, cleaned_block, "cookingforblockheads");

                    break;
            
                default:
                    break;
            }

        });
    }

    if (isSupplementariesLoaded) {

        //Declaring Variables ===============

        let default_block = "";
        let painted_block = "";


        let supplementaries_block_types = [
            "presents",
            "candle_holders",
            "awnings"
        ];

        // ================================ /

        supplementaries_block_types.forEach(block_type => {

            default_block = `#supplementaries:${block_type}`;

            ftb_colors.forEach(color => {
                painted_block = `supplementaries:${block_type.slice(0, -1)}_${color}`;
                dye = `minecraft:${color}_dye`;
                
                //Removing Default Dyeing Recipe so we can readd it accepting a Tag Later.
                event.remove({ id: `supplementaries:${block_type}/${block_type.slice(0, -1)}_${color}_dye` });

                shapeless_dyeing(default_block, painted_block, dye, "supplementaries");
                shaped_circular_dyeing(default_block, painted_block, dye, "supplementaries");

                if (isMekanismLoaded) {
                    mekanism_painting(default_block, painted_block, 32, color, "supplementaries");
                }
                
                //Flags and Buntings (Buntings are weird and don't work, that's why they're commented)
                if (color !== "white") {
                    mekanism_painting("supplementaries:flag_white", `supplementaries:flag_${color}`, 32, color, "supplementaries");
                    //mekanism_painting(`supplementaries:bunting[base_color="white"]`, `supplementaries:bunting[base_color="${color}"]`, 32, color, "supplementaries");
                }

            });

            
        });
    }

    if (isActuallyAdditionsLoaded) {

        ftb_colors.forEach(color => {

            //Coloring of Drills
            if (isMekanismLoaded) {
                mekanism_painting(`#actuallyadditions:drills`, `actuallyadditions:drill_${color}`, 32, color, "actuallyadditions");
                mekanism_painting("#actuallyadditions:lamps", `actuallyadditions:lamp_${color}`, 32, color, "actuallyadditions");
            }

        });

        shapeless_cleaning(`#actuallyadditions:drills`, "actuallyadditions:drill_light_blue", "actuallyadditions");

        //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
        switch (isSupplementariesLoaded) {
            case false:

                shapeless_cleaning("#actuallyadditions:lamps", "actuallyadditions:lamp_white", "actuallyadditions");

                break;
        
            default:
                break;
        }
    }

    if (isImmersiveEngineeringLoaded) {

        ftb_colors.forEach(color => {

            if (isMekanismLoaded) {
                mekanism_painting("#c:sheetmetals", `immersiveengineering:sheetmetal_colored_${color}`, 32, color, "immersiveengineering");
                mekanism_painting("#c:sheetmetal_slabs", `immersiveengineering:slab_sheetmetal_colored_${color}`, 32, color, "immersiveengineering");
                mekanism_painting("#c:chutes", `immersiveengineering:chute_colored_${color}`, 32, color, "immersiveengineering");
            }
        });

        //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
        switch (isSupplementariesLoaded) {
            case false:

                    shapeless_cleaning("#c:colored_sheetmetals", "immersiveengineering:sheetmetal_colored_white", "immersiveengineering");
                    shapeless_cleaning("#c:colored_sheetmetal_slabs", "immersiveengineering:slab_sheetmetal_colored_white", "immersiveengineering");
                    shapeless_cleaning("#c:colored_chutes", "immersiveengineering:chute_colored_white", "immersiveengineering");

                break;
        
            default:
                break;
        }     
    }

    if (isPneumaticCraftLoaded) {

        ftb_colors.forEach(color => {
            if (isMekanismLoaded) {
                //Coloring of Bricks
                mekanism_painting("#pneumaticcraft:plastic_bricks", `pneumaticcraft:plastic_brick_${color}`, 32, color, "pneumaticcraft");
                mekanism_painting("#pneumaticcraft:smooth_plastic_bricks", `pneumaticcraft:smooth_plastic_brick_${color}`, 32, color, "pneumaticcraft");
                //Wall Lamps
                mekanism_painting("#pneumaticcraft:wall_lamps", `pneumaticcraft:wall_lamp_${color}`, 32, color, "pneumaticcraft");
                mekanism_painting("#pneumaticcraft:wall_lamps_inverted", `pneumaticcraft:wall_lamp_inverted_${color}`, 32, color, "pneumaticcraft");
            }
        });

        //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
        switch (isSupplementariesLoaded) {
            case false:

                shapeless_cleaning("#pneumaticcraft:plastic_bricks", "pneumaticcraft:plastic_brick_white", "pneumaticcraft");
                shapeless_cleaning("#pneumaticcraft:smooth_plastic_bricks", "pneumaticcraft:smooth_plastic_brick_white", "pneumaticcraft");
                shapeless_cleaning("#pneumaticcraft:wall_lamps", "pneumaticcraft:wall_lamp_white", "pneumaticcraft");
                shapeless_cleaning("#pneumaticcraft:wall_lamps_inverted", "pneumaticcraft:wall_lamp_inverted_white", "pneumaticcraft");

                break;
        
            default:
                break;
        }    
    }

    if (isUtilitarianLoaded) {

        let soliciting_carpet = "#c:utilitarian_trading_carpet";
        let trapped_soliciting_carpet = "#c:utilitarian_trapped_trading_carpet";

        ftb_colors.forEach(color => {

            dye = `minecraft:${color}_dye`;

            //Adding Recipes to Paint the Carpets
            event.shapeless(`utilitarian:${color}_soliciting_carpet`, [dye, soliciting_carpet]).id(`ftb:shapeless/utilitarian/painting/${color}_soliciting_carpet`);
            event.shapeless(`utilitarian:${color}_trapped_soliciting_carpet`, [dye, trapped_soliciting_carpet]).id(`ftb:shapeless/utilitarian/painting/${color}_trapped_soliciting_carpet`);

            //Trader Carpets
            if (isMekanismLoaded) {
                mekanism_painting(soliciting_carpet, `utilitarian:${color}_soliciting_carpet`, 32, color, "utilitarian");
                mekanism_painting(trapped_soliciting_carpet, `utilitarian:${color}_trapped_soliciting_carpet`, 32, color, "utilitarian");
            }

        });

        //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
        switch (isSupplementariesLoaded) {
            case false:

                shapeless_cleaning(soliciting_carpet, "utilitarian:white_soliciting_carpet", "utilitarian");
                shapeless_cleaning(trapped_soliciting_carpet, "utilitarian:white_trapped_soliciting_carpet", "utilitarian");

                break;
        
            default:
                break;
        }

    }
    
    if (isProductiveMetalworksLoaded) {
        
        //Supplementaries Adds Automatic Cleaning Recipes for this Mod using the White Versions, make sure to blacklist this mod from this function
        //Add this -> "productivemetalworks:foundry_controller", "productivemetalworks:foundry_drain", "productivemetalworks:foundry_tank", "productivemetalworks:foundry_window", "productivemetalworks:fire_bricks"
        let soap_cleaning_metalworks = [
            ["#productivemetalworks:foundry_controllers", "productivemetalworks:black_foundry_controller"],
            ["#productivemetalworks:foundry_drains", "productivemetalworks:black_foundry_drain"],
            ["#productivemetalworks:foundry_tanks", "productivemetalworks:black_foundry_tank"],
            ["#productivemetalworks:foundry_windows", "productivemetalworks:black_foundry_window"],
            ["#productivemetalworks:fire_bricks", "productivemetalworks:black_fire_bricks"]
        ];

        soap_cleaning_metalworks.forEach(recipe => {
            shapeless_cleaning(recipe[0], recipe[1], "productivemetalworks");
            //event.shapeless(recipe[1], [soap, recipe[0]]).id("ftb:supplementaries/soap_cleaning/" + recipe[1].split(":")[1]);
        });

        if (isMekanismLoaded) {
            ftb_colors.forEach(color => {
                if (color !== "black") {
                    //Foundry Controller
                    mekanism_painting("productivemetalworks:black_foundry_controller", `productivemetalworks:${color}_foundry_controller`, 32, color, "productivemetalworks");
                    //Foundry Drain
                    mekanism_painting("productivemetalworks:black_foundry_drain", `productivemetalworks:${color}_foundry_drain`, 32, color, "productivemetalworks");
                    //Foundry Tank
                    mekanism_painting("productivemetalworks:black_foundry_tank", `productivemetalworks:${color}_foundry_tank`, 32, color, "productivemetalworks");
                    //Foundry Window
                    mekanism_painting("productivemetalworks:black_foundry_window", `productivemetalworks:${color}_foundry_window`, 32, color, "productivemetalworks");
                    //Foundry Bricks
                    mekanism_painting("productivemetalworks:black_fire_bricks", `productivemetalworks:${color}_fire_bricks`, 32, color, "productivemetalworks");
                }
            });
        }
    }

    if (isIntegratedDynamicsLoaded) {
        //Not Exactly a Paiting Compat, if Adding a QOL Universal Cleaning Recipe for IE Input Variables.
        shapeless_cleaning("integrateddynamics:variable_transformer_input", "integrateddynamics:variable_transformer_output", "integrated_dynamics");
        if (isSupplementariesLoaded) {
            event.shapeless("4x integrateddynamics:variable_transformer_output", ["supplementaries:soap","integrateddynamics:variable_transformer_input", "integrateddynamics:variable_transformer_input", "integrateddynamics:variable_transformer_input", "integrateddynamics:variable_transformer_input"]).id("ftb:cleaning/integrated_dynamics/variable_transformer_input_2");
        } else {
            event.shapeless("4x integrateddynamics:variable_transformer_output", ["minecraft:wet_sponge","integrateddynamics:variable_transformer_input", "integrateddynamics:variable_transformer_input", "integrateddynamics:variable_transformer_input", "integrateddynamics:variable_transformer_input"]).replaceIngredient("minecraft:wet_sponge", "minecraft:sponge").id("ftb:cleaning/integrated_dynamics/variable_transformer_input_2");
        }
        
        event.shapeless("1x integrateddynamics:variable_transformer_input", ["#c:slime_balls","integrateddynamics:variable_transformer_output"]).id("ftb:integrated_dynamics/input_variable_qol");
        event.shapeless("4x integrateddynamics:variable_transformer_input", ["#c:slime_balls","integrateddynamics:variable_transformer_output", "integrateddynamics:variable_transformer_output", "integrateddynamics:variable_transformer_output", "integrateddynamics:variable_transformer_output"]).id("ftb_colors:integrated_dynamics/input_variable_qol_2");
    }

    if (isMoreRedLoaded) {

        let white_network_cable = "morered:white_network_cable";
        let painted_network_cable = "";

        shapeless_cleaning("#morered:colored_network_cables", white_network_cable, "morered");

        if (isMekanismLoaded) {
            ftb_colors.forEach(color => {   
                painted_network_cable = `morered:${color}_network_cable`;
                //Network Cables
                mekanism_painting("#morered:colored_network_cables", painted_network_cable, 32, color, "morered");
            });
        }
    }

    if (isElevatorModLoaded) {

        let elevator = "#elevatorid:elevators";
        let painted_elevator = "";

        ftb_colors.forEach(color => {   
            painted_elevator = `elevatorid:elevator_${color}`;
            //Elevators
            if (isMekanismLoaded) {
                mekanism_painting(elevator, painted_elevator, 32, color, "elevatorid");
            }
        });

        //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
        switch (isSupplementariesLoaded) {
            case false:

                shapeless_cleaning(elevator, "elevatorid:elevator_white", "elevatorid");

                break;
        
            default:
                break;
        }

    }

    if (isGlassentialLoaded) {

        let glass_door = "#glassential:glass_doors";
        let painted_glass_door = "";

        let glass_trapdoor = "#glassential:glass_trapdoors";
        let painted_glass_trapdoor = "";

        ftb_colors.forEach(color => {
            painted_glass_door = `glassential:${color}_glass_door`;
            painted_glass_trapdoor = `glassential:${color}_glass_trapdoor`;
            dye = `minecraft:${color}_dye`;

            if (isMekanismLoaded) {
                //Glass Doors
                mekanism_painting(glass_door, painted_glass_door, 32, color, "glassential");
                //Glass Trapdoors
                mekanism_painting(glass_trapdoor, painted_glass_trapdoor, 32, color, "glassential");
            }

            shapeless_dyeing(glass_door, painted_glass_door, dye, "glassential");
            shaped_circular_dyeing(glass_door, painted_glass_door, dye, "glassential");

            shapeless_dyeing(glass_trapdoor, painted_glass_trapdoor, dye, "glassential");
            shaped_circular_dyeing(glass_trapdoor, painted_glass_trapdoor, dye, "glassential");

        });

        //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
        switch (isSupplementariesLoaded) {
            case false:

                shapeless_cleaning(glass_door, "glassential:glass_door", "glassential");
                shapeless_cleaning(glass_trapdoor, "glassential:glass_trapdoor", "glassential");

                break;
        
            default:
                break;
        }
    }

    if (isPickleTweaksLoaded) {

        let cobblestone = "#c:cobblestones";
        let colored_cobblestone = "#pickletweaks:colored_cobblestone";
        let painted_cobblestone = "";

        ftb_colors.forEach(color => {   
            painted_cobblestone = `pickletweaks:${color}_cobblestone`;
            dye = `minecraft:${color}_dye`;

            shapeless_dyeing(cobblestone, painted_cobblestone, dye, "pickletweaks");

            if (isMekanismLoaded) {
                mekanism_painting(cobblestone, painted_cobblestone, 32, color, "pickletweaks");
            }
        });

        //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
        switch (isSupplementariesLoaded) {
            case false:

                shapeless_cleaning(colored_cobblestone, "minecraft:cobblestone", "pickletweaks");

                break;
        
            default:
                break;
        }
    }

    if (isOccultismLoaded) {

        let candle = "#occultism:candles";
        let painted_candle = "";
        
        ftb_colors.forEach(color => {
            dye = `minecraft:${color}_dye`;
            painted_candle = `occultism:large_candle_${color}`;
            
            //Removing Default Dyeing Recipe so we can readd it accepting a Tag Later.
            event.remove({ id: `occultism:crafting/large_candle_${color}` });
            
            shapeless_dyeing(candle, painted_candle, dye, "occultism");
            shaped_circular_dyeing(candle, painted_candle, dye, "occultism");

            if (isMekanismLoaded) {
                mekanism_painting(candle, painted_candle, 32, color, "occultism");
            }

        });

        //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
        switch (isSupplementariesLoaded) {
            case false:

                shapeless_cleaning(candle, "occultism:large_candle", "occultism");

                break;
        
            default:
                break;
        }

    }

    if (isBumblezoneLoaded) {

        let string_curtains = "#the_bumblezone:string_curtains";
        let painted_string_curtains = "";
        let super_candles = "#the_bumblezone:super_candles";
        let painted_super_candles = "";
        
        ftb_colors.forEach(color => {
            painted_string_curtains = `the_bumblezone:string_curtain_${color}`;
            painted_super_candles = `the_bumblezone:super_candle_${color}`;
            
            if (isMekanismLoaded) {
                mekanism_painting(string_curtains, painted_string_curtains, 32, color, "the_bumblezone");
                mekanism_painting(super_candles, painted_super_candles, 32, color, "the_bumblezone");
            }

        });

        //Supplementaries does not add automatically a cleaning recipe for super candles, so forcing it here.
        shapeless_cleaning(super_candles, "the_bumblezone:super_candle", "the_bumblezone");

        //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
        switch (isSupplementariesLoaded) {
            case false:

                shapeless_cleaning(string_curtains, "the_bumblezone:string_curtain_white", "the_bumblezone");

                break;
        
            default:
                break;
        }

    }

    if (isCreateLoaded) {

        let valve_handle = "#create:valve_handles";
        let postbox = "#create:postboxes";
        let table_cloth = "#create:table_cloths";
        let toolbox = "#create:toolboxes";
        let seat = "#create:seats"

        let painted_valve_handle = "";
        let painted_postbox = "";
        let painted_table_cloth = "";
        let painted_toolbox = "";
        let painted_seat = ""
        
        ftb_colors.forEach(color => {

            dye = `minecraft:${color}_dye`;
            painted_valve_handle = `create:${color}_valve_handle`;
            painted_postbox = `create:${color}_postbox`;
            painted_table_cloth = `create:${color}_table_cloth`;
            painted_toolbox = `create:${color}_toolbox`;
            painted_seat = `create:${color}_seat`

            shaped_circular_dyeing(valve_handle, painted_valve_handle, dye, "create");
            shaped_circular_dyeing(postbox, painted_postbox, dye, "create");
            shaped_circular_dyeing(table_cloth, painted_table_cloth, dye, "create");
            shaped_circular_dyeing(toolbox, painted_toolbox, dye, "create");
            shaped_circular_dyeing(seat, painted_seat, dye, "create");

            if (isMekanismLoaded) {
                mekanism_painting(valve_handle, painted_valve_handle, 32, color, "create");
                mekanism_painting(postbox, painted_postbox, 32, color, "create");
                mekanism_painting(table_cloth, painted_table_cloth, 32, color, "create");
                mekanism_painting(toolbox, painted_toolbox, 32, color, "create");
                mekanism_painting(seat, painted_seat, 32, color, "create");
            }
 
        });

        //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
        switch (isSupplementariesLoaded) {
            case false:

                shapeless_cleaning(valve_handle, "create:white_valve_handle", "create");
                shapeless_cleaning(postbox, "create:white_postbox", "create");
                shapeless_cleaning(table_cloth, "create:white_table_cloth", "create");
                shapeless_cleaning(toolbox, "create:white_toolbox", "create");
                shapeless_cleaning(seat, "create:white_seat", "create");

                break;
        
            default:
                break;
        }

    }

    if (isIndustrialForegoingLoaded) {

        let laser_lens = "#industrialforegoing:laser_lens";
        let painted_laser_lens = "";
        
        ftb_colors.forEach(color => {
            painted_laser_lens = `industrialforegoing:${color}_laser_lens`;
            
            if (isMekanismLoaded) {
                mekanism_painting(laser_lens, painted_laser_lens, 32, color, "industrialforegoing");
            }
 
        });

        //No Check if Supplementaries is Loaded since it does not have a native compat with IF Lenses.
        shapeless_cleaning(laser_lens, "industrialforegoing:white_laser_lens", "industrialforegoing");

    }

    if (isEternalStarlightLoaded) {

        let yeti_fur = "#eternal_starlight:yeti_fur";
        let painted_yeti_fur = "";
        let yeti_fur_carpets = "#eternal_starlight:yeti_fur_carpets";
        let painted_yeti_fur_carpets = "";
        
        ftb_colors.forEach(color => {
            painted_yeti_fur = `eternal_starlight:${color}_yeti_fur`;
            painted_yeti_fur_carpets = `eternal_starlight:${color}_yeti_fur_carpet`;
            
            if (isMekanismLoaded) {
                mekanism_painting(yeti_fur, painted_yeti_fur, 32, color, "eternal_starlight");
                mekanism_painting(yeti_fur_carpets, painted_yeti_fur_carpets, 32, color, "eternal_starlight");
            }
  
        });
        
        //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
        switch (isSupplementariesLoaded) {
            case false:

                shapeless_cleaning(yeti_fur, "eternal_starlight:white_yeti_fur", "eternal_starlight");
                shapeless_cleaning(yeti_fur_carpets, "eternal_starlight:white_yeti_fur_carpet", "eternal_starlight");

                break;
        
            default:
                break;
        }
    }

    if (isComfortsLoaded) {

        let sleeping_bags = "#comforts:sleeping_bags";
        let painted_sleeping_bags = "";
        let hammocks = "#comforts:hammocks";
        let painted_hammocks = "";
        
        ftb_colors.forEach(color => {
            painted_sleeping_bags = `comforts:sleeping_bag_${color}`;
            painted_hammocks = `comforts:hammock_${color}`;
            
            if (isMekanismLoaded) {
                mekanism_painting(sleeping_bags, painted_sleeping_bags, 32, color, "comforts");
                mekanism_painting(hammocks, painted_hammocks, 32, color, "comforts");
            }            
        });
        
        //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
        switch (isSupplementariesLoaded) {
            case false:

                shapeless_cleaning(sleeping_bags, "comforts:sleeping_bag_white", "comforts");
                shapeless_cleaning(hammocks, "comforts:hammock_white", "comforts");

                break;
        
            default:
                break;
        }

    }

    if (isChalksLoaded) {

        let chalks = "#chalk:chalks";
        let painted_chalks = "";
        
        ftb_colors.forEach(color => {
            painted_chalks = `chalk:${color}_chalk`;
            dye = `minecraft:${color}_dye`;
            
            if (isMekanismLoaded) {
                mekanism_painting(chalks, painted_chalks, 32, color, "chalk");
            }

            shapeless_dyeing(chalks, painted_chalks, dye, "chalk");

        });

        //Force Loading Cleaning Recipes since it does not get added by Default with Supplementaries.
        shapeless_cleaning(chalks, "chalk:white_chalk", "chalk");

    }

    if (isEnderIOLoaded) {

        let glass_types = [
            "clear_glass", "clear_glass_p", "clear_glass_np", "clear_glass_m", "clear_glass_nm", "clear_glass_a", "clear_glass_na",
            "clear_glass_d", "clear_glass_dp", "clear_glass_dnp", "clear_glass_dm", "clear_glass_dnm", "clear_glass_da", "clear_glass_dna",
            "clear_glass_e", "clear_glass_ep", "clear_glass_enp", "clear_glass_em", "clear_glass_enm", "clear_glass_ea", "clear_glass_ena"
        ];

        let base_glass = "";
        let painted_glass = "";
        let tagged_glass = "";

        glass_types.forEach(type => {

            tagged_glass = `#enderio:${type}`;
            base_glass = `enderio:${type}`;
            
            ftb_colors.forEach(color => {

                painted_glass = `enderio:${type}_${color}`;
                dye = `minecraft:${color}_dye`;

                if (isMekanismLoaded) {
                    mekanism_painting(tagged_glass, painted_glass, 32, color, "enderio");
                }
    
                shapeless_dyeing(tagged_glass, painted_glass, dye, color, "enderio");

                
            });
            
            //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
            switch (!isSupplementariesLoaded) {
                case false:

                    shapeless_cleaning(tagged_glass, base_glass, "enderio");

                    break;
            
                default:
                    break;
            }

        });
    }

    if (isForbiddenArcanusLoaded) {

        let quantum_catchers = "#forbidden_arcanus:quantum_catchers";
        let painted_quantum_catchers = "";
        
        ftb_colors.forEach(color => {
            painted_quantum_catchers = `forbidden_arcanus:${color}_quantum_catcher`;
            
            if (isMekanismLoaded) {
                mekanism_painting(quantum_catchers, painted_quantum_catchers, 32, color, "forbidden_arcanus");
            }
        });

        //Force Loading Cleaning Recipes since it does not get added by Default with Supplementaries.
        shapeless_cleaning(quantum_catchers, "forbidden_arcanus:quantum_catcher", "forbidden_arcanus");
    }

    if (isModernIndustrializationLoaded) {

        let cable_types = [
            "fluid_pipe",
            "item_pipe",
            "me_wire"
        ];

        let tagged_cable = "";
        let painted_cable = "";
        
        cable_types.forEach(cable_type => {
            tagged_cable = `#modern_industrialization:${cable_type}s`;

            ftb_colors.forEach(color => {
                painted_cable = `modern_industrialization:${color}_${cable_type}`;
                
                if (isMekanismLoaded) {
                    mekanism_painting(tagged_cable, painted_cable, 32, color, "modern_industrialization");
                }
            });
            
            //Force Loading Cleaning Recipes since it does not get added by Default with Supplementaries.
            shapeless_cleaning(tagged_cable, `modern_industrialization:${cable_type}`, "modern_industrialization");

        });
    }

    if (isProductiveBeesLoaded) {

        let petrified_honey = "#productivebees:petrified_honeys";
        let painted_petrified_honey = "";
        
        ftb_colors.forEach(color => {
            painted_petrified_honey = `productivebees:${color}_petrified_honey`;
            dye = `minecraft:${color}_dye`;

            if (isMekanismLoaded) {
                mekanism_painting(petrified_honey, painted_petrified_honey, 32, color, "productivebees");
            }
  
            shaped_circular_dyeing(petrified_honey, painted_petrified_honey, dye, color, "productivebees");

        });
        
        //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
        switch (isSupplementariesLoaded) {
            case false:

                shapeless_cleaning(petrified_honey, "productivebees:petrified_honey", "productivebees");

                break;
        
            default:
                break;
        }
    }

    if (isRefinedStorageLoaded) {

        let controller = "#refinedstorage:controllers";
        let creative_controller = "#refinedstorage:creative_controllers";
        let cable = "#refinedstorage:cables";
        let importer = "#refinedstorage:importers";
        let exporter = "#refinedstorage:exporters";
        let external_storage = "#refinedstorage:external_storages";
        let constructor = "#refinedstorage:constructors";
        let destructor = "#refinedstorage:destructors";
        let wireless_transmitter = "#refinedstorage:wireless_transmitters";
        let autocrafter = "#refinedstorage:autocrafters";
        let autocrafter_manager = "#refinedstorage:autocrafter_managers";
        let autocrafting_monitor = "#refinedstorage:autocrafting_monitors";
        let grid = "#refinedstorage:grids";
        let crafting_grid = "#refinedstorage:crafting_grids";
        let pattern_grid = "#refinedstorage:pattern_grids";
        let detector = "#refinedstorage:detectors";
        let network_transmitter = "#refinedstorage:network_transmitters";
        let network_receiver = "#refinedstorage:network_receivers";
        let security_manager = "#refinedstorage:security_managers";
        let relay = "#refinedstorage:relays";
        let disk_interface = "#refinedstorage:disk_interfaces";

        let painted_controller = "";
        let painted_creative_controller = "";
        let painted_cable = "";
        let painted_importer = "";
        let painted_exporter = "";
        let painted_external_storage = "";
        let painted_constructor = "";
        let painted_destructor = "";
        let painted_wireless_transmitter = "";
        let painted_autocrafter = "";
        let painted_autocrafter_manager = "";
        let painted_autocrafting_monitor = "";
        let painted_grid = "";
        let painted_crafting_grid = "";
        let painted_pattern_grid = "";
        let painted_detector = "";
        let painted_network_transmitter = "";
        let painted_network_receiver = "";
        let painted_security_manager = "";
        let painted_relay = "";
        let painted_disk_interface = "";

        ftb_colors.forEach(color => {

            if (color == "light_blue") {
                return
            } else {

                dye = `minecraft:${color}_dye`;
    
                painted_controller = `refinedstorage:${color}_controller`;
                painted_creative_controller = `refinedstorage:${color}_creative_controller`;
                painted_cable = `refinedstorage:${color}_cable`;
                painted_importer = `refinedstorage:${color}_importer`;
                painted_exporter = `refinedstorage:${color}_exporter`;
                painted_external_storage = `refinedstorage:${color}_external_storage`;
                painted_constructor = `refinedstorage:${color}_constructor`;
                painted_destructor = `refinedstorage:${color}_destructor`;
                painted_wireless_transmitter = `refinedstorage:${color}_wireless_transmitter`;
                painted_autocrafter = `refinedstorage:${color}_autocrafter`;
                painted_autocrafter_manager = `refinedstorage:${color}_autocrafter_manager`;
                painted_autocrafting_monitor = `refinedstorage:${color}_autocrafting_monitor`;
                painted_grid = `refinedstorage:${color}_grid`;
                painted_crafting_grid = `refinedstorage:${color}_crafting_grid`;
                painted_pattern_grid = `refinedstorage:${color}_pattern_grid`;
                painted_detector = `refinedstorage:${color}_detector`;
                painted_network_transmitter = `refinedstorage:${color}_network_transmitter`;
                painted_network_receiver = `refinedstorage:${color}_network_receiver`;
                painted_security_manager = `refinedstorage:${color}_security_manager`;
                painted_relay = `refinedstorage:${color}_relay`;
                painted_disk_interface = `refinedstorage:${color}_disk_interface`;
    
                if (isMekanismLoaded) {

                    if (color == "gray") {
                        return
                    } else {
                        mekanism_painting(cable, painted_cable, 32, color, "refinedstorage");
                        mekanism_painting(importer, painted_importer, 32, color, "refinedstorage");
                        mekanism_painting(exporter, painted_exporter, 32, color, "refinedstorage");
                        mekanism_painting(external_storage, painted_external_storage, 32, color, "refinedstorage");
                        mekanism_painting(constructor, painted_constructor, 32, color, "refinedstorage");
                        mekanism_painting(destructor, painted_destructor, 32, color, "refinedstorage");
                    }

                    mekanism_painting(controller, painted_controller, 32, color, "refinedstorage");
                    mekanism_painting(creative_controller, painted_creative_controller, 32, color, "refinedstorage");
                    mekanism_painting(wireless_transmitter, painted_wireless_transmitter, 32, color, "refinedstorage");
                    mekanism_painting(autocrafter, painted_autocrafter, 32, color, "refinedstorage");
                    mekanism_painting(autocrafter_manager, painted_autocrafter_manager, 32, color, "refinedstorage");
                    mekanism_painting(autocrafting_monitor, painted_autocrafting_monitor, 32, color, "refinedstorage");
                    mekanism_painting(grid, painted_grid, 32, color, "refinedstorage");
                    mekanism_painting(crafting_grid, painted_crafting_grid, 32, color, "refinedstorage");
                    mekanism_painting(pattern_grid, painted_pattern_grid, 32, color, "refinedstorage");
                    mekanism_painting(detector, painted_detector, 32, color, "refinedstorage");
                    mekanism_painting(network_transmitter, painted_network_transmitter, 32, color, "refinedstorage");
                    mekanism_painting(network_receiver, painted_network_receiver, 32, color, "refinedstorage");
                    mekanism_painting(security_manager, painted_security_manager, 32, color, "refinedstorage");
                    mekanism_painting(relay, painted_relay, 32, color, "refinedstorage");
                    mekanism_painting(disk_interface, painted_disk_interface, 32, color, "refinedstorage");
                }
    
                //Some Blocks are Commented here since they don't stack.
                //shaped_circular_dyeing(controller, painted_controller, dye, color, "refinedstorage");
                //shaped_circular_dyeing(creative_controller, painted_creative_controller, dye, color, "refinedstorage");

                //Also, Cables Specifically don't have a Gray Version...

                if (color == "gray") {
                    return
                } else {
                    shaped_circular_dyeing(cable, painted_cable, dye, color, "refinedstorage");
                    shaped_circular_dyeing(importer, painted_importer, dye, color, "refinedstorage");
                    shaped_circular_dyeing(exporter, painted_exporter, dye, color, "refinedstorage");
                    shaped_circular_dyeing(external_storage, painted_external_storage, dye, color, "refinedstorage");
                    shaped_circular_dyeing(constructor, painted_constructor, dye, color, "refinedstorage");
                    shaped_circular_dyeing(destructor, painted_destructor, dye, color, "refinedstorage");
                }

                shaped_circular_dyeing(wireless_transmitter, painted_wireless_transmitter, dye, color, "refinedstorage");
                shaped_circular_dyeing(autocrafter, painted_autocrafter, dye, color, "refinedstorage");
                shaped_circular_dyeing(autocrafter_manager, painted_autocrafter_manager, dye, color, "refinedstorage");
                shaped_circular_dyeing(autocrafting_monitor, painted_autocrafting_monitor, dye, color, "refinedstorage");
                shaped_circular_dyeing(grid, painted_grid, dye, color, "refinedstorage");
                shaped_circular_dyeing(crafting_grid, painted_crafting_grid, dye, color, "refinedstorage");
                shaped_circular_dyeing(pattern_grid, painted_pattern_grid, dye, color, "refinedstorage");
                shaped_circular_dyeing(detector, painted_detector, dye, color, "refinedstorage");
                shaped_circular_dyeing(network_transmitter, painted_network_transmitter, dye, color, "refinedstorage");
                shaped_circular_dyeing(network_receiver, painted_network_receiver, dye, color, "refinedstorage");
                shaped_circular_dyeing(security_manager, painted_security_manager, dye, color, "refinedstorage");
                shaped_circular_dyeing(relay, painted_relay, dye, color, "refinedstorage");
                shaped_circular_dyeing(disk_interface, painted_disk_interface, dye, color, "refinedstorage");

            }
        });
        
        //If Supplementaries is not Loaded, This will Still add Cleaning Recipes.
        switch (isSupplementariesLoaded) {
            case false:

                shapeless_cleaning(controller, "refinedstorage:controller", "refinedstorage");
                shapeless_cleaning(creative_controller, "refinedstorage:creative_controller", "refinedstorage");
                shapeless_cleaning(cable, "refinedstorage:cable", "refinedstorage");
                shapeless_cleaning(importer, "refinedstorage:importer", "refinedstorage");
                shapeless_cleaning(exporter, "refinedstorage:exporter", "refinedstorage");
                shapeless_cleaning(external_storage, "refinedstorage:external_storage", "refinedstorage");
                shapeless_cleaning(constructor, "refinedstorage:constructor", "refinedstorage");
                shapeless_cleaning(destructor, "refinedstorage:destructor", "refinedstorage");
                shapeless_cleaning(wireless_transmitter, "refinedstorage:wireless_transmitter", "refinedstorage");
                shapeless_cleaning(autocrafter, "refinedstorage:autocrafter", "refinedstorage");
                shapeless_cleaning(autocrafter_manager, "refinedstorage:autocrafter_manager", "refinedstorage");
                shapeless_cleaning(autocrafting_monitor, "refinedstorage:autocrafting_monitor", "refinedstorage");
                shapeless_cleaning(grid, "refinedstorage:grid", "refinedstorage");
                shapeless_cleaning(crafting_grid, "refinedstorage:crafting_grid", "refinedstorage");
                shapeless_cleaning(pattern_grid, "refinedstorage:pattern_grid", "refinedstorage");
                shapeless_cleaning(detector, "refinedstorage:detector", "refinedstorage");
                shapeless_cleaning(network_transmitter, "refinedstorage:network_transmitter", "refinedstorage");
                shapeless_cleaning(network_receiver, "refinedstorage:network_receiver", "refinedstorage");
                shapeless_cleaning(security_manager, "refinedstorage:security_manager", "refinedstorage");
                shapeless_cleaning(relay, "refinedstorage:relay", "refinedstorage");
                shapeless_cleaning(disk_interface, "refinedstorage:disk_interface", "refinedstorage");

                break;
        
            default:
                break;
        }
        
    }

})