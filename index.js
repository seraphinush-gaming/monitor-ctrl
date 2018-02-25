// OPCODE REQUIRED :
// - S_ABNORMALITY_BEGIN
// - S_ABNORMALITY_REFRESH
// - S_START_ACTION_SCRIPT

// Version 1.22 r:01

const abnormality = [
    70234, // 
    70235, // 
    70236, // 하늘 연꽃주
    70237, // Lein's Rootbeer
    70238, // 터커식 꿀호박술
    905434,
    999001011, // Beach Party : Watermelon mini-game
]
const crystal = [
    10306, // Forcefulness VII
    10316, // Forcefulness VII
    12001, // Infusion VII
    12003, // Infusion VII
    12120, // Infusion VII
    12130, // Infusion VII
]

module.exports = function MonitorControl(d) {

    // block drunken screen abnomality
    d.hook('S_ABNORMALITY_BEGIN', (e) => { if (abnormality.includes(e.id)) return false })

    // block crystal effect refresh
    d.hook('S_ABNORMALITY_REFRESH', (e) => { if (crystal.includes(e.id)) return false })

    // block screen zoom scripts
    d.hook('S_START_ACTION_SCRIPT', () => { return false })

}
