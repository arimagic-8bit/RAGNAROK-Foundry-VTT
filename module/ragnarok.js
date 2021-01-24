// Import Modules
import { RagnarokActor } from "./actor/actor.js";
import { RagnarokActorSheet } from "./actor/actor-sheet.js";
import { RagnarokItem } from "./item/item.js";
import { RagnarokItemSheet } from "./item/item-sheet.js";
import { iniciativa } from "./combat/combat.js";


Hooks.once('init', async function() {

  game.ragnarok = {
    RagnarokActor,
    RagnarokItem
  };

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = "1d20 + @caracteristicas.destreza + @habilidades.percepcion.alerta";
  Combat.prototype.iniciativa = iniciativa;

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