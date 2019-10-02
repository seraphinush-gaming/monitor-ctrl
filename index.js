'use strict';

class MonitorCtrl {

  constructor(mod) {

    this.mod = mod;
    this.cmd = mod.command;
    this.settings = mod.settings;

    // command
    this.cmd.add('ctrl', {
      'shake': () => {
        this.settings.enableShake = !this.settings.enableShake;
        this.setCameraShake();
        this.send(`Camera shake ${this.settings.enableShake ? 'en' : 'dis'}abled.`);
      },
      '$default': () => {
        this.send(`Invalid argument. usage : ctrl [shake]`);
      }
    });

    // code
    // block drunken screen abnomality
    this.mod.hook('S_ABNORMALITY_BEGIN', 3, (e) => {
      if (this.mod.settings.abnormality.includes(e.id)) {
        return false;
      }
    });

    // block screen zoom scripts
    this.mod.hook('S_START_ACTION_SCRIPT', 'raw', () => false);

    // replace forced sky change in glm
    let _ = this.mod.tryHook('S_FIELD_EVENT_ON_ENTER', 'raw', () => {
      this.mod.setTimeout(() => {
        this.mod.trySend('S_AERO', 1, {
          enabled: true,
          blendTime: 1,
          aeroSet: "ab1_aeroset.AERO.DST_AB1_AERO"
        })
      }, 2000);
    });
    if (!_) {
      this.mod.warn('Unmapped protocol packet \<S_FIELD_EVENT_ON_ENTER\>.');
    }

    // block unnecessary spawns of fish aesthetics
    this.mod.hook('S_SPAWN_NPC', 11, { order: 10 }, (e) => {
      if (e.npcName === '투명NPC_낚시_물고기표현') {
        return false;
      }
    });

    // block camera shake
    this.setCameraShake();

  }

  // helper
  setCameraShake() { this.mod.clientInterface.configureCameraShake(this.settings.enableShake, 0.3, 0.3); }

  send() { this.cmd.message(': ' + [...arguments].join('\n\t - ')); }

}

module.exports = MonitorCtrl;