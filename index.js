// Version 1.25 r:00

const config = require('./config.js')

module.exports = function MonitorCtrl(m) {

    // block drunken screen abnomality
    m.hook('S_ABNORMALITY_BEGIN', 2, (e) => { if (config.abnormality.includes(e.id)) return false });

    // block crystal effect refresh
    m.hook('S_ABNORMALITY_REFRESH', 1, (e) => { if (config.crystal.includes(e.id)) return false });

    // block screen zoom scripts
    m.hook('S_START_ACTION_SCRIPT', 'raw', () => { return false });

}