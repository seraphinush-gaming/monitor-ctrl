class AutoCutscene {

  constructor(parent) {

    this.parent = parent;

    this.enable = parent.config.enableCutscene;

    // command
    this.parent.cmd.add('skip', {
      '$none': () => {
        this.enable = !this.enable;
        this.send(`auto-cutscene ${this.enable ? 'en' : 'dis'}abled`);
      }
    });

    this.parent.hook('S_PLAY_MOVIE', 1, (e) => {
      if (this.enable) {
        this.parent.mod.send('C_END_MOVIE', 1, Object.assign({ unk: 1 }, e));
        return false;
      }
    });

  }

  destructor() {
    this.parent.cmd.remove('skip');

    this.parent = undefined;
    this.enable = undefined;
  }

  send(msg) { this.parent.cmd.message(`: ` + msg); }

}

module.exports = AutoCutscene;