// Version 1.23 r:02

const abnormality = require('./abnormality.js')
const crystal = require('./crystal.js')

module.exports = function MonitorControl(d) {

    // block drunken screen abnomality
    d.hook('S_ABNORMALITY_BEGIN', 2, (e) => { if (abnormality.includes(e.id)) return false })

    // block crystal effect refresh
    d.hook('S_ABNORMALITY_REFRESH', 1, (e) => { if (crystal.includes(e.id)) return false })

    // block screen zoom scripts
    d.hook('S_START_ACTION_SCRIPT', 'raw', () => { return false })

}