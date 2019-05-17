class AutoInspect {

  constructor(parent) {

    this.parent = parent;

    this.parent.hook('S_ANSWER_INTERACTIVE', 2, {}, (e) => {
      this.parent.mod.send('C_REQUEST_USER_PAPERDOLL_INFO', 1, { name: e.name });
    });

  }

  destructor() {
    this.parent = undefined;
  }

}

module.exports = AutoInspect;