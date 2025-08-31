// priority: 1000

sdrp.dimension_change((event) => {

    const { player } = event;
    if (!event.player) {
      return;
    }
    if (!player.level) {
      return;
    }

    let level = player.level;
      let dimName = level.dimension.toString().substring(level.dimension.toString().indexOf(":") + 1);

      console.log(`[SDRP] Player ${player.name} entered ${dimName}`)
        event.updateSDRPState(`sdrp.${dimName}.in`, `sdrp.${dimName}`, `${dimName}`);

});
