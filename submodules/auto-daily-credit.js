class AutoDailyCredit {

  constructor(parent) {

    this.parent = parent;

    this.parent.hook('S_LOGIN', 'raw', () => {
      let _ = this.parent.mod.trySend('C_REQUEST_RECV_DAILY_TOKEN', 1, {});
      if (!_) {
        console.log('Unmapped protocol packet \<C_REQUEST_RECV_DAILY_TOKEN\>.');
      }
    });

  }

  destructor() {
    this.parent = undefined;
  }

}

module.exports = AutoDailyCredit;