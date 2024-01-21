
export const hazardInformation = {

        HEALTH_HAZARD: {
          0: "Normal material",
          1: "Slightly hazardous",
          2: "Hazardous",
          3: "Extreme danger",
          4: "Deadly"
        },
        FIRE_HAZARD: {
        0: "Will not burn",
        1: "Above 93° C",
        2: "Below 93° C",
        3: "Below 38° C",
        4: "Below 23° C"
        },
        SPECIFIC_HAZARD: [
          "Oxidizer",
          "Acid",
          "ACID",
          "Alkali",
          "ALK",
          "Corrosive",
          "COR",
          "Use NO WATER",
          "W",
          "Radiation Hazard"
        ],
        INSTABILITY: {
          0: "Stable",
          1: "Unstable if heated",
          2: "Violent chemical change",
          3: "Shock and heat may detonate",
          4: "May detonate"
        }
  };
  
  export const chemicals = {
    UN1075: {
        Name: "Propane",
        INSTABILITY: 0,
        SPECIFIC_HAZARD: "None",
        FIRE_HAZARD: 3,
        HEALTH_HAZARD: 0,
        STATE: "Gas", 
        OXIDIZER: false, 
        CORROSIVE: false,
        FLAMMABLE : true
      },
      UN1203: {
        Name: "Gasoline",
        INSTABILITY: 0,
        SPECIFIC_HAZARD: "None",
        FIRE_HAZARD: 3,
        HEALTH_HAZARD: 0,
        STATE: "Liquid", 
        OXIDIZER: false, 
        CORROSIVE: false,
        FLAMMABLE : true
      },
      UN1230: {
        Name: "Methanol",
        INSTABILITY: 0,
        SPECIFIC_HAZARD: "POI",
        FIRE_HAZARD: 3,
        HEALTH_HAZARD: 4,
        STATE: "Gas", 
        OXIDIZER: false, 
        CORROSIVE: false,
        FLAMMABLE : true
      },
      UN0029: {
        Name: "Explosive Material",
        INSTABILITY: 4,
        SPECIFIC_HAZARD: "None",
        FIRE_HAZARD: 0,
        HEALTH_HAZARD: 0,
        STATE: "Solid", 
        OXIDIZER: false, 
        CORROSIVE: false,
        FLAMMABLE : true
      },
      UN1344: {
        Name: "Ferrous Sulfide",
        INSTABILITY: 0,
        SPECIFIC_HAZARD: "None",
        FIRE_HAZARD: 2,
        HEALTH_HAZARD: 0,
        STATE: "Solid", 
        OXIDIZER: true, 
        CORROSIVE: false,
        FLAMMABLE : true
        // need to fix data
      },
      UN1748: {
        Name: "Oxidizing Substance",
        INSTABILITY: 2,
        SPECIFIC_HAZARD: "OXI",
        FIRE_HAZARD: 2,
        HEALTH_HAZARD: 0,
        STATE: "Solid", 
        OXIDIZER: true, 
        CORROSIVE: false,
        FLAMMABLE : false
        // need to fix data
      },
      UN1588: {
        Name: "Toxic Substance",
        INSTABILITY: 0,
        SPECIFIC_HAZARD: "TOX",
        FIRE_HAZARD: 0,
        HEALTH_HAZARD: 3,
        STATE: "Solid", 
        OXIDIZER: true, 
        CORROSIVE: false,
        FLAMMABLE : true
        // need to fix data
      },
      UN1005: {
        Name: "Ammonia, anhydrous",
        INSTABILITY: 1,
        SPECIFIC_HAZARD: "Corrosive",
        FIRE_HAZARD: 1,
        HEALTH_HAZARD: 3,
        STATE: "Gas",
        OXIDIZER: false,
        CORROSIVE: true,
        FLAMMABLE: true
      },
      UN1017: {
        Name: "Chlorine",
        INSTABILITY: 0,
        SPECIFIC_HAZARD: "Oxidizer",
        FIRE_HAZARD: 0,
        HEALTH_HAZARD: 3,
        STATE: "Gas",
        OXIDIZER: true,
        CORROSIVE: true,
        FLAMMABLE: false
      },
      UN1090: {
        Name: "Acetone",
        INSTABILITY: 1,
        SPECIFIC_HAZARD: "None",
        FIRE_HAZARD: 3,
        HEALTH_HAZARD: 1,
        STATE: "Liquid",
        OXIDIZER: false,
        CORROSIVE: false,
        FLAMMABLE: true
      },
      UN1202: {
        Name: "Diesel fuel",
        INSTABILITY: 0,
        SPECIFIC_HAZARD: "None",
        FIRE_HAZARD: 2,
        HEALTH_HAZARD: 2,
        STATE: "Liquid",
        OXIDIZER: false,
        CORROSIVE: false,
        FLAMMABLE: true
      },
      UN1824: {
        Name: "Sodium hydroxide solution",
        INSTABILITY: 0,
        SPECIFIC_HAZARD: "Corrosive",
        FIRE_HAZARD: 0,
        HEALTH_HAZARD: 3,
        STATE: "Liquid",
        OXIDIZER: false,
        CORROSIVE: true,
        FLAMMABLE: false
      },
      UN1789: {
        Name: "Hydrochloric acid",
        INSTABILITY: 0,
        SPECIFIC_HAZARD: "Corrosive",
        FIRE_HAZARD: 0,
        HEALTH_HAZARD: 3,
        STATE: "Liquid",
        OXIDIZER: false,
        CORROSIVE: true,
        FLAMMABLE: false
      },
    UN1040: {
        Name: "Ethylene oxide",
        INSTABILITY: 2,
        SPECIFIC_HAZARD: "Explosive",
        FIRE_HAZARD: 4,
        HEALTH_HAZARD: 3,
        STATE: "Gas",
        OXIDIZER: false,
        CORROSIVE: false,
        FLAMMABLE: true
      },
    UN1170: {
        Name: "Ethanol",
        INSTABILITY: 0,
        SPECIFIC_HAZARD: "None",
        FIRE_HAZARD: 3,
        HEALTH_HAZARD: 2,
        STATE: "Liquid",
        OXIDIZER: false,
        CORROSIVE: false,
        FLAMMABLE: true
      },
    UN1219: {
        Name: "Isopropanol",
        INSTABILITY: 0,
        SPECIFIC_HAZARD: "None",
        FIRE_HAZARD: 3,
        HEALTH_HAZARD: 2,
        STATE: "Liquid",
        OXIDIZER: false,
        CORROSIVE: false,
        FLAMMABLE: true
      },
    UN1791: {
        Name: "Hypochlorite solution",
        INSTABILITY: 1,
        SPECIFIC_HAZARD: "Oxidizer",
        FIRE_HAZARD: 0,
        HEALTH_HAZARD: 2,
        STATE: "Liquid",
        OXIDIZER: true,
        CORROSIVE: true,
        FLAMMABLE: false
      }
    
    }

  
  export default hazardInformation;

  