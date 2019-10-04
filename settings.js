'use strict';

const DefaultSettings = {
  "abnormality": [
    70251, 70252, 70253, 70254, 70255, 70256,
    4850, 48732, 48734, 48735, 48736, 48737, 48738,
    476806,
    630201, 630202, 630411, 630511, 631002, 631003, 631201, 631202,
    776017, 806001, 806002, 811061, 821101, 905656, 905657,
    7102001, 45000011, 45000012, 47660800, 47660900, 47661000, 47662300,
    999001011
  ],
  "enableShake": false
};

function MigrateSettings(from_ver, to_ver, settings) {
  if (from_ver === undefined) {
    return Object.assign(Object.assign({}, DefaultSettings), settings);
  } else if (from_ver === null) {
    return DefaultSettings;
  } else {
    if (from_ver + 1 < to_ver) {
      settings = MigrateSettings(from_ver, from_ver + 1, settings);
      return MigrateSettings(from_ver + 1, to_ver, settings);
    }
  
    switch (to_ver) {
      case 2:
        settings.enableShake = false;
    }

    return settings;
  }
}

module.exports = MigrateSettings;