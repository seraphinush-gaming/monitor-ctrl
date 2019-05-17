'use strict';

const fs = require('fs');
const path = require('path');

class AutoQol {

  constructor(mod) {

    this.mod = mod;
    this.cmd = mod.command;
    this.config = require('./config.json');
    this.hooks = [];
    this.submodules = {};

    this.myGameId = BigInt(0);

    let list = [];
    if (fs.existsSync(path.join(__dirname, 'submodules'))) {
      list = fs.readdirSync(path.join(__dirname, 'submodules'));
    } else {
      fs.mkdirSync(path.join(__dirname, 'submodules'));
    }
    for (let i = 0, n = list.length; i < n; i++) {
      this.initialize(list[i]);
    }

    this.load();

  }

  destructor() {
    for (let submodule in this.submodules) {
      this.submodules[submodule].destructor();
      delete this[submodule];
    }

    this.unload();

    this.submodules = undefined;
    this.config = undefined;
    this.cmd = undefined;
    this.mod = undefined;
  }

  initialize(submodules) {
    if (typeof submodules === 'string') {
      submodules = [submodules];
    }

    for (let submodule of submodules) {
      if (!this.submodules[submodule]) {
        try {
          let req = require(`./submodules/${submodule}`);
          this.submodules[submodule] = new req(this);
          this[submodule] = this.submodules[submodule];

          console.log(`.. Loaded submodule [${submodule}]`);
        }
        catch (e) {
          delete this[submodule];

          console.log(`[auto-qol] : Unable to load submodule [${submodule}] .. \n - ${e}\n`);
        }
      }
    }
  }

  // code
  hook() {
    this.hooks.push(this.mod.hook(...arguments));
  }

  load() {
    this.hook('S_LOGIN', this.mod.majorPatchVersion >= 81 ? 13 : 12, { order: - 1000 }, (e) => {
      this.myGameId = e.gameId;
    });
  }

  unload() {
    if (this.hooks.length) {
      for (let h of this.hooks)
        this.mod.unhook(h);
      this.hooks = [];
    }
  }

  // reload
  saveState() {
    let state = this.myGameId;
    return state;
  }

  loadState(state) {
    this.myGameId = state;
  }  

}

module.exports = function AutoQolLoader(mod) {
  return new AutoQol(mod);
}