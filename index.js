'use strict';

module.exports = function MonitorCtrl(mod) {

  // block drunken screen abnomality
  mod.hook('S_ABNORMALITY_BEGIN', 3, (e) => {
    if (mod.settings.abnormality.includes(e.id)) {
      return false;
    }
  });

  // block screen zoom scripts
  mod.hook('S_START_ACTION_SCRIPT', 'raw', () => false);

  let _ = mod.tryHook('S_FIELD_EVENT_ON_ENTER', 'raw', () => {
    setTimeout(() => {
      mod.trySend('S_AERO', 1, {
        enabled: true,
        blendTime: 1,
        aeroSet: "S1EngineResources.DefaultAero"
      })
    }, 2000);
  });
  if (!_) {
    console.log('Unmapped protocol packet \<S_FIELD_EVENT_ON_ENTER\>.');
  }

}