// Import Modules
import { RagnarokActor } from "./actor/actor.js";
import { RagnarokActorSheet } from "./actor/actor-sheet.js";
import { RagnarokItem } from "./item/item.js";
import { RagnarokItemSheet } from "./item/item-sheet.js";

Hooks.once('init', async function() {

  game.ragnarok = {
    RagnarokActor,
    RagnarokItem
  };

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };

  // Define custom Entity classes
  CONFIG.Actor.entityClass = RagnarokActor;
  CONFIG.Item.entityClass = RagnarokItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("ragnarok", RagnarokActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("ragnarok", RagnarokItemSheet, { makeDefault: true });

  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper('concat', function() {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });
});