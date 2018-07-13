// Version 1.24 r:00

const config = require('./config.js')

module.exports = function MonitorControl(d) {

    // block drunken screen abnomality
    d.hook('S_ABNORMALITY_BEGIN', 2, (e) => { if (config.abnormality.includes(e.id)) return false })

    // block crystal effect refresh
    d.hook('S_ABNORMALITY_REFRESH', 1, (e) => { if (config.crystal.includes(e.id)) return false })

    // block screen zoom scripts
    d.hook('S_START_ACTION_SCRIPT', 'raw', () => { return false })

}