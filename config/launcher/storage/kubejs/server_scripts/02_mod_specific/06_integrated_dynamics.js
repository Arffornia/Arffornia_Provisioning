// priority: 995

ServerEvents.recipes((event) => {

    //Original Script Bellow was made by Raidobw2 and posted on Github, it can be found here:
    https://github.com/FTBTeam/FTB-Modpack-Issues/issues/6038#issuecomment-2466571484
    //All Credits goes to him, I just implemented the fix here ~ Artpoke

    // KubeJS seems to not allow rest parameters so we code 2 similar functions, output2 and output3
    const output2 = (outputItemId, amount1, chance1, amount2, chance2) => {
        return [
            {
                "item": {
                    "id": outputItemId,
                    "count": amount1
                },
                "chance": chance1
            },
            {
                "item": {
                    "id": outputItemId,
                    "count": amount2
                },
                "chance": chance2
            }
        ]
    }

    const output3 = (outputItemId, amount1, chance1, amount2, chance2, amount3, chance3) => {
        return [
            {
                "item": {
                    "id": outputItemId,
                    "count": amount1
                },
                "chance": chance1
            },
            {
                "item": {
                    "id": outputItemId,
                    "count": amount2
                },
                "chance": chance2
            },
            {
                "item": {
                    "id": outputItemId,
                    "count": amount3
                },
                "chance": chance3
            }
        ]
    }

    // This function will add a recipe for a squeezer or a mechanical squeezer
    const id_recipe = (type, inputTag, outputItems) => {
        let jsonRecipe = {
            "type": type,
            "input_item": {
                "tag": inputTag
            },
            "output_items": outputItems
        }

        // Mechanical Squeezer requires a duration
        // JAOPCA always added 3200RF for ores which is 40 duration
        if (type === "integrateddynamics:mechanical_squeezer") {
            jsonRecipe.duration = 40
        }

        event.custom(jsonRecipe)
    };

    let machines = ["squeezer", "mechanical_squeezer"]

    // Iesnium is removed through JAOPCA config, not here
    machines.forEach(machine => {
        event.remove({id: "integrateddynamics:" + machine + "/ore/raw_copper"})
        event.remove({id: "integrateddynamics:" + machine + "/ore/raw_osmium"})
        event.remove({id: "integrateddynamics:" + machine + "/ore/raw_aluminum"})
        event.remove({id: "integrateddynamics:" + machine + "/ore/raw_lead"})
        event.remove({id: "integrateddynamics:" + machine + "/ore/raw_zinc"})
        event.remove({id: "integrateddynamics:" + machine + "/ore/raw_gold"})
        event.remove({id: "integrateddynamics:" + machine + "/ore/raw_nickel"})
        event.remove({id: "integrateddynamics:" + machine + "/ore/raw_iron"})
        event.remove({id: "integrateddynamics:" + machine + "/ore/raw_uranium"})
        event.remove({id: "integrateddynamics:" + machine + "/ore/raw_tin"})
        event.remove({id: "integrateddynamics:" + machine + "/ore/raw_mithril"})
        event.remove({id: "integrateddynamics:" + machine + "/ore/raw_silver"})
    });

    // Squeezer ore to dust recipes
    id_recipe("integrateddynamics:squeezer", "c:ores/copper", output3("mekanism:dust_copper", 4, 1, 2, 0.5, 2, 0.5))
    id_recipe("integrateddynamics:squeezer", "c:ores/osmium", output2("mekanism:dust_osmium", 2, 1, 1, 0.75))
    id_recipe("integrateddynamics:squeezer", "c:ores/iesnium", output2("occultism:iesnium_dust", 2, 1, 1, 0.75))
    id_recipe("integrateddynamics:squeezer", "c:ores/aluminum", output2("jaopca:dusts.aluminum", 2, 1, 1, 0.75))
    id_recipe("integrateddynamics:squeezer", "c:ores/lead", output2("mekanism:dust_lead", 2, 1, 1, 0.75))
    id_recipe("integrateddynamics:squeezer", "c:ores/zinc", output2("jaopca:dusts.zinc", 2, 1, 1, 0.75))
    id_recipe("integrateddynamics:squeezer", "c:ores/gold", output2("mekanism:dust_gold", 2, 1, 1, 0.75))
    id_recipe("integrateddynamics:squeezer", "c:ores/nickel", output2("oritech:nickel_dust", 2, 1, 1, 0.75))
    id_recipe("integrateddynamics:squeezer", "c:ores/iron", output2("mekanism:dust_iron", 2, 1, 1, 0.75))
    id_recipe("integrateddynamics:squeezer", "c:ores/uranium", output2("mekanism:dust_uranium", 2, 1, 1, 0.75))
    id_recipe("integrateddynamics:squeezer", "c:ores/tin", output2("mekanism:dust_tin", 2, 1, 1, 0.75))
    id_recipe("integrateddynamics:squeezer", "c:ores/mithril", output2("jaopca:dusts.mithril", 2, 1, 1, 0.75))
    id_recipe("integrateddynamics:squeezer", "c:ores/silver", output2("occultism:silver_dust", 2, 1, 1, 0.75))
    
    // Mechanical Squeezer ore to dust recipes
    id_recipe("integrateddynamics:mechanical_squeezer", "c:ores/copper", output3("mekanism:dust_copper", 8, 1, 2, 0.5, 2, 0.25))
    id_recipe("integrateddynamics:mechanical_squeezer", "c:ores/osmium", output3("mekanism:dust_osmium", 3, 1, 2, 0.5, 2, 0.5))
    id_recipe("integrateddynamics:mechanical_squeezer", "c:ores/iesnium", output3("occultism:iesnium_dust", 3, 1, 2, 0.5, 2, 0.5))
    id_recipe("integrateddynamics:mechanical_squeezer", "c:ores/aluminum", output3("jaopca:dusts.aluminum", 3, 1, 2, 0.5, 2, 0.5))
    id_recipe("integrateddynamics:mechanical_squeezer", "c:ores/lead", output3("mekanism:dust_lead", 3, 1, 2, 0.5, 2, 0.5))
    id_recipe("integrateddynamics:mechanical_squeezer", "c:ores/zinc", output3("jaopca:dusts.zinc", 3, 1, 2, 0.5, 2, 0.5))
    id_recipe("integrateddynamics:mechanical_squeezer", "c:ores/gold", output3("mekanism:dust_gold", 3, 1, 2, 0.5, 2, 0.5))
    id_recipe("integrateddynamics:mechanical_squeezer", "c:ores/nickel", output3("oritech:nickel_dust", 3, 1, 2, 0.5, 2, 0.5))
    id_recipe("integrateddynamics:mechanical_squeezer", "c:ores/iron", output3("mekanism:dust_iron", 3, 1, 2, 0.5, 2, 0.5))
    id_recipe("integrateddynamics:mechanical_squeezer", "c:ores/uranium", output3("mekanism:dust_uranium", 3, 1, 2, 0.5, 2, 0.5))
    id_recipe("integrateddynamics:mechanical_squeezer", "c:ores/tin", output3("mekanism:dust_tin", 3, 1, 2, 0.5, 2, 0.5))
    id_recipe("integrateddynamics:mechanical_squeezer", "c:ores/mithril", output3("jaopca:dusts.mithril", 3, 1, 2, 0.5, 2, 0.5))
    id_recipe("integrateddynamics:mechanical_squeezer", "c:ores/silver", output3("occultism:silver_dust", 3, 1, 2, 0.5, 2, 0.5))


});
