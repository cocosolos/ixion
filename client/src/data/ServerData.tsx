import LsbDefaults from '../../../api/defaultLsbSettings.json';

export interface ServerSetting {
  name: string;
  description: string;
  unit?: string;
  transform?: (arg: boolean | string | number) => boolean | string | number;
}

export interface ServerSettings {
  [key: string]: boolean | string | number;
}

export default interface ServerData {
  name: string;
  url: string;
  location: string;
  max_level: number;
  settings?: ServerSettings;
  customizations: ServerSettings;
  login_limit: number;
  active_sessions: number;
  updated: string;
  up: boolean;
}

export const DemoServerData: ServerData = {
  name: 'LandSandBoat Demo',
  url: 'github.com/LandSandBoat/server',
  location: 'NA',
  max_level: 99,
  settings: LsbDefaults,
  customizations: {
    'API.WEBSITE': 'https://landsandboat.github.io/server/',
    'MAIN.ENABLE_TRUST_CASTING': 1,
    'MAP.LEVEL_SYNC_ENABLE': true,
    'LOGIN.RISE_OF_ZILART': true,
    'LOGIN.CHAINS_OF_PROMATHIA': true,
    'LOGIN.TREASURES_OF_AHT_URGHAN': true,
    'LOGIN.WINGS_OF_THE_GODDESS': true,
    'LOGIN.SEEKERS_OF_ADOULIN': true,
  },
  login_limit: 0,
  active_sessions: 0,
  updated: new Date().toISOString(),
  up: true,
};

export const ServerSettingsInfo: Record<string, ServerSetting> = {
  'LOGIN.ACCOUNT_CREATION': {
    name: 'Account Creation',
    description: 'Account creation via the loader.',
  },
  'LOGIN.CHARACTER_CREATION': {
    name: 'Character Creation',
    description: 'Character creation through the lobby.',
  },
  'LOGIN.CHARACTER_DELETION': {
    name: 'Character Deletion',
    description: 'Character deletion through the lobby.',
  },
  'LOGIN.CLIENT_VER': {
    name: 'Client Version',
    description: 'Expected client version.',
  },
  'LOGIN.LOG_USER_IP': {
    name: 'Logs IP',
    description: 'User IP address logging.',
  },
  'LOGIN.VER_LOCK': {
    name: 'Version Locked',
    description: 'Requires the exact client version specified.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.ABSORB_SPELL_AMOUNT': {
    name: 'Absorb Spell Amount',
    description: 'How much of a stat gets absorbed by DRK absorb spells.',
  },
  'MAIN.ABSORB_SPELL_TICK': {
    name: 'Absorb Spell Tick',
    description: 'Duration of 1 absorb spell tick.',
    transform: (arg) => {
      return `${arg}s`;
    },
  },
  'MAIN.ABYSSEA_BONUSLIGHT_AMOUNT': {
    name: 'Abyssea Bonus Light',
    description:
      'Bonus added to player lights upon entering Abyssea, mainly used during events.',
    transform: (arg) => {
      return `+${arg}`;
    },
  },
  'MAIN.ABYSSEA_LIGHTS_DROP_RATE': {
    name: 'Abyssea Lights Drop Rate',
    description: 'Rate that mobs drop Abyssea light.',
    transform: (arg) => {
      return `${arg}%`;
    },
  },
  'MAIN.ACTIVATE_LAMP_TIME': {
    name: 'Nyzul Lamps',
    description: 'Time that lamps in Nyzul stay lit.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${(numValue / 1000).toFixed()}s`;
      }
      return '???';
    },
  },
  'MAIN.ADVANCED_JOB_LEVEL': {
    name: 'Advanced Jobs',
    description: 'Minimum level to accept advanced job quests.',
    transform: (arg) => {
      return `Lv.${arg}`;
    },
  },
  'MAIN.AF1_QUEST_LEVEL': {
    name: 'AF1 Quest',
    description: 'Minimum level to start AF1 quest.',
    transform: (arg) => {
      return `Lv.${arg}`;
    },
  },
  'MAIN.AF2_QUEST_LEVEL': {
    name: 'AF2 Quest',
    description: 'Minimum level to start AF2 quest.',
    transform: (arg) => {
      return `Lv.${arg}`;
    },
  },
  'MAIN.AF3_QUEST_LEVEL': {
    name: 'AF3 Quest',
    description: 'Minimum level to start AF3 quest.',
    transform: (arg) => {
      return `Lv.${arg}`;
    },
  },
  'MAIN.ALLOW_MULTIPLE_EXP_RINGS': {
    name: 'Multiple EXP Rings',
    description:
      'Removes ownership restrictions on the Chariot, Empress, Emperor Band trio.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.ALL_MAPS': {
    name: 'All Maps',
    description: 'New characters receive all maps.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.AQUAVEIL_COUNTER': {
    name: 'Aquaveil Counter',
    description:
      'Base amount of hits Aquaveil absorbs to prevent spell interrupts.',
  },
  'MAIN.ASSAULT_MINIMUM': {
    name: 'Assault Minimum',
    description:
      'Minimum amount of players required to start an assault mission.',
  },
  'MAIN.BAYLD_RATE': {
    name: 'Quest Bayld Rate',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.BETWEEN_2DYNA_WAIT_TIME': {
    name: 'Dynamis Lockout',
    description: 'Time before Dynamis re-entry.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue}hr`;
      }
      return '???';
    },
  },
  'MAIN.BIO_OVERWRITE': {
    name: 'Dia Overwrites Bio',
    description: 'Dia overwrites same tier Bio.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.BLINK_SHADOWS': {
    name: 'Blink Shadows',
    description: 'Number of shadows supplied by Blink spell.',
  },
  'MAIN.BLUE_POWER': {
    name: 'Blue Magic Power',
    description: 'Multiplies damage dealt by Blue Magic.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.BOOK_EXP_RATE': {
    name: 'FoV/GoV EXP Rate',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.BYPASS_EXP_RING_ONE_PER_WEEK': {
    name: 'Multiple EXP Rings Per Week',
    description: 'Bypass the limit of one ring per Conquest Tally week.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.CAPACITY_RATE': {
    name: 'Quest Capacity Points Rate',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.CAP_CURRENCY_ACCOLADES': {
    name: 'Unity Accolades Cap',
    description: 'Unity Accolades currency cap.',
  },
  'MAIN.CAP_CURRENCY_BALLISTA': {
    name: 'Ballista Points Cap',
    description: 'Ballista Points currency cap.',
  },
  'MAIN.CAP_CURRENCY_SPARKS': {
    name: 'Sparks Cap',
    description: 'Sparks currency cap.',
  },
  'MAIN.CAP_CURRENCY_VALOR': {
    name: 'Valor Cap',
    description: 'Valor currency cap.',
  },
  'MAIN.CASKET_DROP_RATE': {
    name: 'Treasure Casket Drop Rate',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue * 100}%`;
      }
      return '???';
    },
  },
  'MAIN.CHEST_MAX_ILLUSION_TIME': {
    name: 'Chest Max Illusion',
    description:
      'Together with min time, determines the random range in which loot is unavailable from treasure chests.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${(numValue / 60).toFixed()} min`;
      }
      return '???';
    },
  },
  'MAIN.CHEST_MIN_ILLUSION_TIME': {
    name: 'Chest Min Illusion',
    description:
      'Together with max time, determines the random range in which loot is unavailable from treasure chests.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${(numValue / 60).toFixed()} min`;
      }
      return '???';
    },
  },
  'MAIN.COFFER_MAX_ILLUSION_TIME': {
    name: 'Coffer Max Illusion',
    description:
      'Together with min time, determines the random range in which loot is unavailable from treasure coffers.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${(numValue / 60).toFixed()} min`;
      }
      return '???';
    },
  },
  'MAIN.COFFER_MIN_ILLUSION_TIME': {
    name: 'Coffer Min Illusion',
    description:
      'Together with min time, determines the random range in which loot is unavailable from treasure coffers.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${(numValue / 60).toFixed()} min`;
      }
      return '???';
    },
  },
  'MAIN.COSMO_CLEANSE_BASE_COST': {
    name: 'Cosmo Cleanse Cost',
    description: 'Base gil cost for a Cosmo Cleanse from Sagheera.',
  },
  'MAIN.CURE_POWER': {
    name: 'Cure Power',
    description:
      'Multiplies amount healed from Healing Magic, including the relevant Blue Magic.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.CURRENCY_EXCHANGE_RATE': {
    name: 'Dynamis Exchange Rate',
    description: 'Currency exchange rate for small to large Dynamis currency.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue}:1`;
      }
      return '???';
    },
  },
  'MAIN.DAILY_TALLY_AMOUNT': {
    name: 'Daily Tally',
    description: 'Amount of Daily Tally points granted per day.',
  },
  'MAIN.DAILY_TALLY_LIMIT': {
    name: 'Daily Tally Cap',
    description: 'Daily Tally currency cap.',
  },
  'MAIN.DARK_POWER': {
    name: 'Dark Magic Power',
    description: 'Multiplies amount drained by Dark Magic.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.DIA_OVERWRITE': {
    name: 'Bio Overwrites Dia',
    description: 'Bio overwrites same tier Dia.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.DIGGING_RATE': {
    name: 'Dig Rate',
    description:
      'Chance to receive an item from chocobo digging during favorable weather.',
    transform: (arg) => {
      return `${arg}%`;
    },
  },
  'MAIN.DIG_FATIGUE': {
    name: 'Dig Fatigue',
    description: 'Fatigue system for chocobo digging.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.DIG_GRANT_BORE': {
    name: 'Dig Grant Bore',
    description: 'Grants Bore dig ability.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.DIG_GRANT_BURROW': {
    name: 'Dig Grant Burrow',
    description: 'Grants Burrow dig ability.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.DISABLE_PARTY_EXP_PENALTY': {
    name: 'Party EXP Penalty',
    description: 'EXP is not penalized by party size.',
    transform: (arg) => {
      return !arg;
    },
  },
  'MAIN.DIVINE_POWER': {
    name: 'Divine Magic Power',
    description: 'Multiplies damage dealt by Divine Magic.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.DYNA_LEVEL_MIN': {
    name: 'Dynamis Entry',
    description: 'Minimum level for entering Dynamis.',
    transform: (arg) => {
      return `Lv.${arg}`;
    },
  },
  'MAIN.DYNA_MIDNIGHT_RESET': {
    name: 'Dynamis Midnight Reset',
    description:
      'Dynamis lockout resets at midnight instead of hours since last entry.',
  },
  'MAIN.ELEMENTAL_DEBUFF_DURATION': {
    name: 'Elemental Debuff Duration',
    description: 'Base duration of elemental debuffs.',
    transform: (arg) => {
      return `${arg}s`;
    },
  },
  'MAIN.ELEMENTAL_POWER': {
    name: 'Elemental Magic Power',
    description:
      'Multiplies damage dealt by Elemental and non-drain Dark Magic.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.ENABLE_CHOCOBO_RAISING': {
    name: 'Chocobo Raising',
    description: '',
  },
  'MAIN.ENABLE_COP_ZONE_CAP': {
    name: 'Capped CoP Zones',
    description: 'CoP zones use their original level cap.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.ENABLE_DAILY_TALLY': {
    name: 'Daily Tally',
    description: 'Allows acquisition of daily points for gobbie mystery box.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.ENABLE_EXCHANGE_100S_TO_1S': {
    name: 'Can Downgrade Dynamis Currency',
    description:
      'Allows exchange of 100s to 1s, like you can with 10Ks to 100s.',
  },
  'MAIN.ENABLE_EXCHANGE_LIMIT': {
    name: 'Sparks Spend Limit',
    description:
      'Limits amount of sparks and Unity accolades that can be spent per week.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.ENABLE_FIELD_MANUALS': {
    name: 'Fields of Valor',
    description: '',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.ENABLE_GARRISON': {
    name: 'Garrison',
    description: '',
  },
  'MAIN.ENABLE_GROUNDS_TOMES': {
    name: 'Grounds of Valor',
    description: '',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.ENABLE_IMMUNOBREAK': {
    name: 'Immunobreak',
    description: '',
  },
  'MAIN.ENABLE_LOGIN_CAMPAIGN': {
    name: 'Login Campaign',
    description: '',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.ENABLE_MAGIAN_TRIALS': {
    name: 'Magian Trials',
    description: '',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.ENABLE_MONSTROSITY': {
    name: 'Monstrosity',
    description: '',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.ENABLE_NYZUL_CASKETS': {
    name: 'Nyzul Caskets',
    description: 'Treasure caskets drop from NMs.',
  },
  'MAIN.ENABLE_ROE': {
    name: 'Records of Eminence',
    description: '',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.ENABLE_ROE_TIMED': {
    name: 'RoE Timed Objectives',
    description: '4-hour timed records.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.ENABLE_SURVIVAL_GUIDE': {
    name: 'Survival Guides',
    description: '',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.ENABLE_TRUST_ALTER_EGO_EXPO': {
    name: 'Alter Ego Expo',
    description: 'HP%/MP%/Status Resistance',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.ENABLE_TRUST_ALTER_EGO_EXTRAVAGANZA': {
    name: 'Alter Ego Extravaganza',
    description: 'Certain extra trusts are available.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.ENABLE_TRUST_CASTING': {
    name: 'Trusts',
    description: '',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.ENABLE_TRUST_QUESTS': {
    name: 'Trust Quests',
    description: 'Trust unlock quests.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.ENABLE_VIGIL_DROPS': {
    name: 'Nyzul Vigil Weapon',
    description: 'Vigil weapons drops from NMs.',
  },
  'MAIN.ENABLE_VOIDWALKER': {
    name: 'Voidwalker',
    description: 'Voidwalker NMs are enabled.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.ENM_COOLDOWN': {
    name: 'ENM Cooldown',
    description: 'Time before a player can obtain same KI for ENMs.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue}hr`;
      }
      return '???';
    },
  },
  'MAIN.EQUIP_FROM_OTHER_CONTAINERS': {
    name: 'Equip From Bags',
    description:
      'Allows equipping items from Mog Satchel, Sack, and Case. Only possible with the use of client addons.',
  },
  'MAIN.EXCAVATION_BREAK_CHANCE': {
    name: 'Excavation Break Chance',
    description: 'Chance for the pickaxe to break during excavation.',
    transform: (arg) => {
      return `${arg}%`;
    },
  },
  'MAIN.EXCAVATION_RATE': {
    name: 'Excavation Rate',
    description: 'Chance to receive an item from excavation.',
    transform: (arg) => {
      return `${arg}%`;
    },
  },
  'MAIN.EXPLORER_MOOGLE_LV': {
    name: 'Explorer Moogle',
    description: 'Explorer Moogle teleportation.',
    transform: (arg) => {
      if (arg === 0) {
        return 'disabled';
      }
      return `Lv.${arg}`;
    },
  },
  'MAIN.EXP_RATE': {
    name: 'Quest EXP Rate',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.FORCE_SPAWN_QM_RESET_TIME': {
    name: '??? Respawn',
    description: 'Time ??? remains hidden after the mob it spawns despawns.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${(numValue / 60).toFixed()} min`;
      }
      return '???';
    },
  },
  'MAIN.FOV_REWARD_ALLIANCE': {
    name: 'FoV Alliance',
    description:
      'Allows Fields of Valor rewards while being a member of an alliance.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.FREE_COP_DYNAMIS': {
    name: 'Unlocked CoP Dynamis',
    description: 'Allows entry to CoP Dynamis without mission completion.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.GARRISON_LOCKOUT': {
    name: 'Garrison Lockout',
    description: 'Time before a new garrison can be started.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${(numValue / 60).toFixed()} min`;
      }
      return '???';
    },
  },
  'MAIN.GARRISON_NATION_BYPASS': {
    name: 'Garrison Nation Bypass',
    description: 'Bypasses garrison nation requirements.',
  },
  'MAIN.GARRISON_ONCE_PER_WEEK': {
    name: 'Multiple Garrisons Per Week',
    description: 'Allows more than one garrison per Conquest tally week.',
    transform: (arg) => {
      return !arg;
    },
  },
  'MAIN.GARRISON_PARTY_LIMIT': {
    name: 'Garrison Party Limit',
    description: 'Max party members for garrison.',
  },
  'MAIN.GARRISON_RANK': {
    name: 'Garrison Nation Rank',
    description: 'Minimum nation rank to start garrison.',
  },
  'MAIN.GARRISON_TIME_LIMIT': {
    name: 'Garrison Time Limit',
    description: 'Time before lose ongoing garrison.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${(numValue / 60).toFixed()} min`;
      }
      return '???';
    },
  },
  'MAIN.GIL_RATE': {
    name: 'Quest Gil Rate',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.GOBBIE_BOX_MIN_AGE': {
    name: 'Mystery Box Age',
    description:
      'Minimum age before a character can sign up for Gobbie Mystery Box.',
    transform: (arg) => {
      return `${arg} days`;
    },
  },
  'MAIN.GOV_REWARD_ALLIANCE': {
    name: 'GoV Alliance',
    description:
      'Allows Grounds of Valor rewards while being a member of an alliance.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.HARVESTING_BREAK_CHANCE': {
    name: 'Harvesting Break Chance',
    description: 'Chance for the sickle to break during harvesting.',
    transform: (arg) => {
      return `${arg}%`;
    },
  },
  'MAIN.HARVESTING_RATE': {
    name: 'Harvesting Rate',
    description: 'Chance to receive an item from harvesting.',
    transform: (arg) => {
      return `${arg}%`;
    },
  },
  'MAIN.HEALING_TP_CHANGE': {
    name: 'Healing TP Change',
    description: 'Change in TP for each healing tick. (/heal)',
  },
  'MAIN.HOMEPOINT_TELEPORT': {
    name: 'Home Point Teleport',
    description: '',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.INITIAL_LEVEL_CAP': {
    name: 'Initial Level Cap',
    description: '',
    transform: (arg) => {
      return `Lv.${arg}`;
    },
  },
  'MAIN.ITEM_POWER': {
    name: 'Item Power',
    description: 'Effect of items such as Potions and Ethers.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.LANTERNS_STAY_LIT': {
    name: 'Den of Rancor Lanterns',
    description: 'Time that lanterns in the Den of Rancor stay lit.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${(numValue / 60).toFixed()} min`;
      }
      return '???';
    },
  },
  'MAIN.LOGGING_BREAK_CHANCE': {
    name: 'Logging Break Chance',
    description: 'Chance for the hatchet to break during logging.',
    transform: (arg) => {
      return `${arg}%`;
    },
  },
  'MAIN.LOGGING_RATE': {
    name: 'Logging Rate',
    description: 'Chance to receive an item from logging.',
    transform: (arg) => {
      return `${arg}%`;
    },
  },
  'MAIN.MINING_BREAK_CHANCE': {
    name: 'Mining Break Chance',
    description: 'Chance for the pickaxe to break during mining.',
    transform: (arg) => {
      return `${arg}%`;
    },
  },
  'MAIN.MINING_RATE': {
    name: 'Mining Rate',
    description: 'Chance to receive an item from mining.',
    transform: (arg) => {
      return `${arg}%`;
    },
  },
  'MAIN.NEW_CHARACTER_CUTSCENE': {
    name: 'New Character Cutscene',
    description: '',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.NINJUTSU_POWER': {
    name: 'Ninjutsu Power',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.NM_LOTTERY_CHANCE': {
    name: 'NM Lottery Chance',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        if (numValue < 0) {
          return '100%';
        }
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.NM_LOTTERY_COOLDOWN': {
    name: 'NM Lottery Cooldown',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        if (numValue < 0) {
          return '0s';
        }
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.NORMAL_MOB_MAX_LEVEL_RANGE_MAX': {
    name: 'Mob Max Level Range Max',
    description: 'Upper bound of max level range for normal mobs.',
    transform: (arg) => {
      return arg === 0 ? 'none' : arg;
    },
  },
  'MAIN.NORMAL_MOB_MAX_LEVEL_RANGE_MIN': {
    name: 'Mob Max Level Range Min',
    description: 'Lower bound of max level range for normal mobs.',
    transform: (arg) => {
      return arg === 0 ? 'none' : arg;
    },
  },
  'MAIN.NUMBER_OF_DM_EARRINGS': {
    name: 'Divine Might Earrings',
    description:
      'Number of earrings players can simultaneously own from Divine Might.',
  },
  'MAIN.OLDSCHOOL_G1': {
    name: 'Old School Limit Break 1',
    description:
      'Requires farming Exoray Mold, Bomb Coal, and Ancient Papyrus drops instead of allowing key item method.',
  },
  'MAIN.OLDSCHOOL_G2': {
    name: 'Old School Limit Break 2',
    description:
      'Requires the NMs for "Atop the Highest Mountains" be dead to get KI.',
  },
  'MAIN.PRISMATIC_HOURGLASS_COST': {
    name: 'Prismatic Hourglass Cost',
    description: 'Cost of the prismatic hourglass for Dynamis.',
  },
  'MAIN.REGIME_REWARD_THRESHOLD': {
    name: 'Regime Reward Threshold',
    description:
      'Max levels below FoV/GoV minimum suggested range player can earn EXP.',
  },
  'MAIN.REGIME_WAIT': {
    name: 'Regime Cooldown',
    description: 'Enables FoV/GoV game day cooldown.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.RELIC_2ND_UPGRADE_WAIT_TIME': {
    name: 'Relic 2nd Stage Wait',
    description: 'Wait time for 2nd relic upgrade.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${(numValue / 60 / 60).toFixed()}hr`;
      }
      return '???';
    },
  },
  'MAIN.RELIC_3RD_UPGRADE_WAIT_TIME': {
    name: 'Relic 3rd Stage Wait',
    description: 'Wait time for 3rd relic upgrade.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${(numValue / 60 / 60).toFixed()}hr`;
      }
      return '???';
    },
  },
  'MAIN.RIVERNE_PORTERS': {
    name: 'Riverne Teleports',
    description:
      'Time that Unstable Displacements in Cape Riverne stay open after trading a scale.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue}s`;
      }
      return '???';
    },
  },
  'MAIN.ROE_EXP_RATE': {
    name: 'RoE EXP Rate',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.RUNIC_DISK_SAVE': {
    name: 'Runic Disk Save',
    description: 'Allows anyone participating in Nyzul to save progress.',
  },
  'MAIN.SHOP_PRICE': {
    name: 'Shop Prices',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.SNEAK_INVIS_DURATION_MULTIPLIER': {
    name: 'Sneak/Invis Duration',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.SPARKS_RATE': {
    name: 'Sparks Rate',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.SPIKE_EFFECT_DURATION': {
    name: 'Spikes Effect Duration',
    description: 'Duration of RDM, BLM spikes effects.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue}s`;
      }
      return '???';
    },
  },
  'MAIN.START_GIL': {
    name: 'Starting Gil',
    description: 'Amount of gil given to newly created characters.',
  },
  'MAIN.START_INVENTORY': {
    name: 'Starting Inventory Size',
    description: 'Starting inventory and satchel size.',
  },
  'MAIN.STONESKIN_CAP': {
    name: 'Stoneskin Cap',
    description: 'Soft cap for hp absorbed by stoneskin.',
  },
  'MAIN.SUBJOB_QUEST_LEVEL': {
    name: 'Subjob Quest Level',
    description: 'Minimum level to accept either subjob quest.',
    transform: (arg) => {
      return `Lv.${arg}`;
    },
  },
  'MAIN.TABS_RATE': {
    name: 'Tabs Rate',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.TIMELESS_HOURGLASS_COST': {
    name: 'Timeless Hourglass Cost',
    description: 'Refund for the timeless hourglass for Dynamis.',
  },
  'MAIN.UNLOCK_OUTPOST_WARPS': {
    name: 'All Outposts',
    description: 'New characters receive all outpost warps.',
    transform: (arg) => {
      return !!arg;
    },
  },
  'MAIN.USE_ADOULIN_WEAPON_SKILL_CHANGES': {
    name: 'Adoulin Weapon Skill Calculations',
    description: 'Uses new Adoulin weapon skill damage calculations.',
  },
  'MAIN.USE_OLD_CURE_FORMULA': {
    name: 'Old Cure Formula',
    description: 'Uses older cure formula.',
  },
  'MAIN.USE_OLD_MAGIC_DAMAGE': {
    name: 'Old Magic Damage',
    description: 'Uses older magic damage formulas.',
  },
  'MAIN.WEAPON_SKILL_POWER': {
    name: 'Weapon Skill Power',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAIN.WEEKLY_EXCHANGE_LIMIT': {
    name: 'Sparks Weekly Limit',
    description:
      'Maximum amount of sparks and Unity accolades that can be spent per week.',
  },
  'MAP.ABILITY_RECAST_MULTIPLIER': {
    name: 'Ability Recast',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.AH_BASE_FEE_SINGLE': {
    name: 'AH Base Fee Single',
    description: 'Base auction house fee for single items.',
  },
  'MAP.AH_BASE_FEE_STACKS': {
    name: 'AH Base Fee Stack',
    description: 'Base auction house fee for stacks.',
  },
  'MAP.AH_LIST_LIMIT': {
    name: 'AH List Limit',
    description: 'Max open listings per player.',
    transform: (arg) => {
      if (arg === 0) {
        return 'unlimited';
      }
      return arg;
    },
  },
  'MAP.AH_MAX_FEE': {
    name: 'AH Max Fee',
    description: 'Max auction house fee.',
  },
  'MAP.AH_TAX_RATE_SINGLE': {
    name: 'AH Tax Rate Single',
    description: '',
    transform: (arg) => {
      return `${arg}%`;
    },
  },
  'MAP.AH_TAX_RATE_STACKS': {
    name: 'AH Tax Rate Stack',
    description: '',
    transform: (arg) => {
      return `${arg}%`;
    },
  },
  'MAP.ALL_JOBS_WIDESCAN': {
    name: 'All Jobs Widescan',
    description: 'Jobs other than BST and RNG have widescan.',
  },
  'MAP.ALL_MOBS_GIL_BONUS': {
    name: 'All Mobs Bonus Gil',
    description:
      'All mobs drop this much extra gil per mob level even if they normally drop zero.',
  },
  'MAP.ALTER_EGO_HP_MULTIPLIER': {
    name: 'Trust HP',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.ALTER_EGO_MP_MULTIPLIER': {
    name: 'Trust MP',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.ALTER_EGO_SKILL_MULTIPLIER': {
    name: 'Trust Skill',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.ALTER_EGO_STAT_MULTIPLIER': {
    name: 'Trust Stats',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.AUDIT_LINKSHELL': {
    name: 'Logs Linkshell Chat',
    description: '',
  },
  'MAP.AUDIT_PARTY': {
    name: 'Logs Party Chat',
    description: '',
  },
  'MAP.AUDIT_SAY': {
    name: 'Logs Say Chat',
    description: '',
  },
  'MAP.AUDIT_SHOUT': {
    name: 'Logs Shout Chat',
    description: '',
  },
  'MAP.AUDIT_TELL': {
    name: 'Logs Tells',
    description: '',
  },
  'MAP.AUDIT_UNITY': {
    name: 'Logs Unity Chat',
    description: '',
  },
  'MAP.AUDIT_YELL': {
    name: 'Logs Yells',
    description: '',
  },
  'MAP.BATTLE_CAP_TWEAK': {
    name: 'Battlefield Level Cap',
    description:
      'Globally adjusts ALL battlefield level caps by this many levels.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 0 ? '' : '+'}${numValue}`;
      }
      return '???';
    },
  },
  'MAP.BLOCK_OLD_SKILLUP_STYLE': {
    name: 'Old Block Skill Increase',
    description: 'Allows block to skill up regardless of the action occurring.',
  },
  'MAP.BLOOD_PACT_SHARED_TIMER': {
    name: 'Blood Pact Shared Timer',
    description: '"Blood Pact: Rage" and "Blood Pact: Ward" share a timer.',
  },
  'MAP.CAPACITY_RATE': {
    name: 'Capacity Points Rate',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.CRAFT_AMOUNT_MULTIPLIER': {
    name: 'Craft Skill Increase',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.CRAFT_CHANCE_MULTIPLIER': {
    name: 'Craft Skill Increase Rate',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.CRAFT_COMMON_CAP': {
    name: 'Craft Common Cap',
    description:
      'Craft level limit from which specialization points beginning to count.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${(numValue / 10).toFixed()}`;
      }
      return '???';
    },
  },
  'MAP.CRAFT_MODERN_SYSTEM': {
    name: 'Original Crafting System',
    description: 'Uses original skill up rates and margins.',
    transform: (arg) => {
      return !arg;
    },
  },
  'MAP.CRAFT_SPECIALIZATION_POINTS': {
    name: 'Craft Specialization Points',
    description: 'Amount of points allowed in crafts over the common cap.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${(numValue / 10).toFixed()}`;
      }
      return '???';
    },
  },
  'MAP.DESPAWN_JUGPETS_BELOW_MINIMUM_LEVEL': {
    name: 'Despawn Jug Pets When Capped',
    description:
      'Despawns jug pets that have a minimum level below level sync or zone level restriction.',
  },
  'MAP.DISABLE_GEAR_SCALING': {
    name: 'Gear Scaling',
    description:
      'Ability to equip higher level gear when level cap/sync effect is on.',
    transform: (arg) => {
      return !arg;
    },
  },
  'MAP.DROP_RATE_MULTIPLIER': {
    name: 'Mob Drop Rate',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.ENABLE_ITEM_RECYCLE_BIN': {
    name: 'Recycling Bin',
    description: '',
  },
  'MAP.ENMITY_CAP': {
    name: 'Enmity Cap',
    description: '',
  },
  'MAP.EXP_LOSS_LEVEL': {
    name: 'EXP Loss',
    description: 'Minimum level at which experience points can be lost.',
    transform: (arg) => {
      return `Lv.${arg}`;
    },
  },
  'MAP.EXP_LOSS_RATE': {
    name: 'EXP Loss Rate',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.EXP_PARTY_GAP_NO_EXP': {
    name: 'EXP Max Party Level Gap',
    description:
      "A party member's experience points are nullified if the level difference with the highest-level party member exceeds this value.",
  },
  'MAP.EXP_PARTY_GAP_PENALTIES': {
    name: 'EXP Party Level Penalties',
    description: 'Penalizes EXP based on level differences in the party.',
  },
  'MAP.EXP_RATE': {
    name: 'EXP Rate',
    description: 'Does not account for EXP table changes.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.EXP_RETAIN': {
    name: 'EXP Retained on Death',
    description: 'Percentage of experience normally lost kept upon death.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `+${numValue * 100}%`;
      }
      return '???';
    },
  },
  'MAP.FAME_MULTIPLIER': {
    name: 'Fame Rate',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.FELLOW_TP_MULTIPLIER': {
    name: 'Fellow TP',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.FISHING_ENABLE': {
    name: 'Fishing',
    description: '',
  },
  'MAP.FISHING_SKILL_MULTIPLIER': {
    name: 'Fishing Skill Increase Rate',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.GARDEN_DAY_MATTERS': {
    name: 'Gardening Day Matters',
    description: '',
  },
  'MAP.GARDEN_MH_AURA_MATTERS': {
    name: 'Gardening Aura Matters',
    description: '',
  },
  'MAP.GARDEN_MOONPHASE_MATTERS': {
    name: 'Gardening Moon Phase Matters',
    description: '',
  },
  'MAP.GARDEN_POT_MATTERS': {
    name: 'Gardening Pot Matters',
    description: '',
  },
  'MAP.GUARD_OLD_SKILLUP_STYLE': {
    name: 'Old Guard Skill Increase',
    description: 'Allows guard to skill up regardless of the action occurring.',
  },
  'MAP.HEALING_TICK_DELAY': {
    name: 'Healing Tick',
    description: 'Delay between healing ticks.',
    transform: (arg) => {
      return `${arg}s`;
    },
  },
  'MAP.INCLUDE_MOB_SJ': {
    name: 'Mob Subjob Adjust',
    description: 'Mob subjobs are affected by subjob ratio.',
  },
  'MAP.KEEP_JUGPET_THROUGH_ZONING': {
    name: 'Keep Jug Pets Through Zone',
    description: '',
  },
  'MAP.LEVEL_SYNC_ENABLE': {
    name: 'Level Sync',
    description: '',
  },
  'MAP.LV_CAP_MISSION_BCNM': {
    name: 'Level Cap Mission BCNM',
    description: '',
  },
  'MAP.MAX_GIL_BONUS': {
    name: 'Max Gil Bonus',
    description:
      'Maximum total bonus gil that can be dropped. (All Mobs Bonus Gil)',
  },
  'MAP.MAX_MERIT_POINTS': {
    name: 'Merit Points Cap',
    description: 'Initial max allowed merits points players can hold.',
  },
  'MAP.MINIMUM_LEVEL_CONQUEST_INFUENCE_LOSS': {
    name: 'Conquest Influence Loss',
    description:
      'Minimum level at which regional influence is lost in conquest when a player dies.',
    transform: (arg) => {
      return `Lv.${arg}`;
    },
  },
  'MAP.MOB_ADDITIONAL_TIME_TO_DEAGGRO': {
    name: 'Mob Additional Despawn Time',
    description: 'Extra time before a mob despawns after deaggro.',
    transform: (arg) => {
      return `+${arg}s`;
    },
  },
  'MAP.MOB_GIL_MULTIPLIER': {
    name: 'Mob Gil Drops',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.MOB_HP_MULTIPLIER': {
    name: 'Mob HP',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.MOB_MP_MULTIPLIER': {
    name: 'Mob MP',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.MOB_NO_DESPAWN': {
    name: 'Mob No Despawn',
    description: 'Allows mobs to walk back home instead of despawning.',
  },
  'MAP.MOB_SPEED_MOD': {
    name: 'Mob Aggro Speed',
    description:
      'Modifier to apply to monster speed after aggro as a percentage of retail speed.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 0 ? '' : '+'}${(((50 + numValue) / 50 - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.MOB_STAT_MULTIPLIER': {
    name: 'Mob Stats',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.MOB_TP_MULTIPLIER': {
    name: 'Mob TP',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.MOUNT_SPEED_MOD': {
    name: 'Mount Speed',
    description: 'Mount speed compared to retail.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 0 ? '' : '+'}${(((40 + numValue) / 40 - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.NM_HP_MULTIPLIER': {
    name: 'NM HP',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.NM_MP_MULTIPLIER': {
    name: 'NM MP',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.NM_STAT_MULTIPLIER': {
    name: 'NM Stats',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.PARRY_OLD_SKILLUP_STYLE': {
    name: 'Old Parry Skill Increase',
    description: 'Allows parry to skill up regardless of the action occurring.',
  },
  'MAP.PET_TP_MULTIPLIER': {
    name: 'Pet TP',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.PLAYER_HP_MULTIPLIER': {
    name: 'Player HP',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.PLAYER_MP_MULTIPLIER': {
    name: 'Player MP',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.PLAYER_STAT_MULTIPLIER': {
    name: 'Player Stats',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.PLAYER_TP_MULTIPLIER': {
    name: 'Player TP',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.PREVENT_UNENGAGED_WS': {
    name: 'Prevent Unengaged Weapon Skills',
    description: '',
  },
  'MAP.SJ_MP_DIVISOR': {
    name: 'Subjob MP',
    description: 'The amount of MP a subjob provides to the main job.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${((1 / numValue) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.SKILLUP_AMOUNT_MULTIPLIER': {
    name: 'Combat Skill Increase',
    description: 'Skill increase amount.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.SKILLUP_BLOODPACT': {
    name: 'Blood Pact Skill Increase',
    description: 'Allows skill ups from blood pacts.',
  },
  'MAP.SKILLUP_CHANCE_MULTIPLIER': {
    name: 'Combat Skill Increase Rate',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.SPEED_MOD': {
    name: 'Player Speed',
    description: 'Player speed compared to retail.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 0 ? '' : '+'}${(((50 + numValue) / 50 - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.SUBJOB_RATIO': {
    name: 'Subjob Ratio',
    description: 'Subjob to main job ratio.',
    transform: (arg) => {
      let ret = '???';
      switch (arg) {
        case 0:
          ret = 'none';
          break;
        case 1:
          ret = '1:2';
          break;
        case 2:
          ret = '2:3';
          break;
        case 3:
          ret = '1:1';
          break;
        default:
      }
      return ret;
    },
  },
  'MAP.TRUST_TP_MULTIPLIER': {
    name: 'Trust TP',
    description: '',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${numValue < 1 ? '' : '+'}${((numValue - 1) * 100).toFixed()}%`;
      }
      return '???';
    },
  },
  'MAP.WS_POINTS_BASE': {
    name: 'Weapon Skill Point Base',
    description:
      'Weapon skill point base (before skillchain) for breaking latent.',
  },
  'MAP.WS_POINTS_SKILLCHAIN': {
    name: 'Weapon Skill Point Skillchain',
    description: 'Weapon skill points per skillchain element.',
  },
  'MAP.YELL_COOLDOWN': {
    name: 'Yell Cooldown',
    description: 'Minimum time between uses of yell command.',
    transform: (arg) => {
      return `${arg}s`;
    },
  },
  'SEARCH.EXPIRE_AUCTIONS': {
    name: 'Expire Auctions',
    description: 'Expires Auction House listings.',
  },
  'SEARCH.EXPIRE_DAYS': {
    name: 'Auction List Duration',
    description: 'Expires items older than this number of days.',
    transform: (arg) => {
      return `${arg} day`;
    },
  },
  'SEARCH.EXPIRE_INTERVAL': {
    name: 'Auction Expire Interval',
    description: 'Interval server checks for expired auctions.',
    transform: (arg) => {
      const numValue = Number(arg);
      if (!Number.isNaN(numValue)) {
        return `${(numValue / 60).toFixed()} min`;
      }
      return '???';
    },
  },
  'SEARCH.OMIT_NO_HISTORY': {
    name: 'AH Omit No History',
    description:
      'Items with no listing history are omitted from auction house results.',
  },
};
