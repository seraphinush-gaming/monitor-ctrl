'use strict';

const config = require('./config.js');

module.exports = function MonitorCtrl(mod) {

  let flag = false;

  // block drunken screen abnomality
  mod.hook('S_ABNORMALITY_BEGIN', 3, (e) => {
    if (config.abnormality.includes(e.id)) {
      return false;
    } else if (config.crystal.includes(e.id)) {
      flag = true;
      mod.setTimeout(() => { flag = false }, 4000);
    }
  });

  // block crystal effect refresh
  mod.hook('S_ABNORMALITY_REFRESH', 1, (e) => {
    if (config.crystal.includes(e.id))
      return !flag;
  });

  // block screen zoom scripts
  mod.hook('S_START_ACTION_SCRIPT', 'raw', () => false);

  let _ = mod.tryHook('S_FIELD_EVENT_ON_ENTER', 'raw', () => {
    setTimeout(() => {
      mod.send('S_AERO', 1, {
        enabled: true,
        blendTime: 1,
        aeroSet: "S1EngineResources.DefaultAero"
      })
    }, 2000);
  });
  if (_ === null) {
    console.log('Unmapped protocol packet \<S_FIELD_EVENT_ON_ENTER\>.');
  }

}