import LsbDefaults from './defaultLsbSettings.json';

interface ServerSettings {
  [key: string]: boolean | string | number;
}

export default interface ServerData {
  id: number;
  url: string;
  settings: ServerSettings;
  active_sessions: number;
  updated: string;
  inactivity_counter: number;
}

export const DemoServerData: ServerData = {
  id: 0,
  url: 'github.com/LandSandBoat/server',
  settings: {
    ...LsbDefaults,
    'MAIN.SERVER_NAME': 'LandSandBoat Demo',
    'API.WEBSITE': 'https://landsandboat.github.io/server/',
  },
  active_sessions: 0,
  updated: new Date().toISOString(),
  inactivity_counter: 0,
};

export const ServerSettingsInfo: Record<
  string,
  Record<string, boolean | string | number>
> = {
  'LOGIN.ACCOUNT_CREATION': {
    name: 'Account Creation',
    description: 'Allows account creation via the loader.',
  },
  'LOGIN.A_CRYSTALLINE_PROPHECY': {
    name: 'A Crystalline Prophecy',
    description: 'Displays "A Crystalline Prophecy" expansion.',
  },
  'LOGIN.A_MOOGLE_KUPOD_ETAT': {
    name: "A Moogle Kupo d'Etat",
    description: 'Displays "A Moogle Kupo d\'Etat" expansion.',
  },
  'LOGIN.A_SHANTOTTO_ASCENSION': {
    name: 'A Shantotto Ascension',
    description: 'Displays "A Shantotto Ascension" expansion.',
  },
  'LOGIN.CHAINS_OF_PROMATHIA': {
    name: 'Chains of Promathia',
    description: 'Displays "Chains of Promathia" expansion.',
  },
  'LOGIN.CHARACTER_CREATION': {
    name: 'Character Creation',
    description: 'Allows character creation through the lobby.',
  },
  'LOGIN.CHARACTER_DELETION': {
    name: 'Character Deletion',
    description: 'Allows character deletion through the lobby.',
  },
  'LOGIN.CLIENT_VER': {
    name: 'Client Version',
    description: 'Expected client version.',
  },
  'LOGIN.DISABLE_MOB_NPC_CHAR_NAMES': {
    name: 'Disable Mob/NPC Character Names',
    description:
      'Blocks character creation with names of NPCs and Mobs in the database',
  },
  'LOGIN.HEROES_OF_ABYSSEA': {
    name: 'Heroes of Abyssea',
    description: 'Displays "Heroes of Abyssea" expansion.',
  },
  'LOGIN.LOGIN_LIMIT': {
    name: 'Login Limit',
    description: 'Number of simultaneous game sessions per IP.',
  },
  'LOGIN.LOG_USER_IP': {
    name: 'Logs User IP',
    description: 'Logs user IP address to database.',
  },
  'LOGIN.MAINT_MODE': {
    name: '',
    description: '',
  },
  'LOGIN.MOG_WARDROBE_3': {
    name: '',
    description: '',
  },
  'LOGIN.MOG_WARDROBE_4': {
    name: '',
    description: '',
  },
  'LOGIN.MOG_WARDROBE_5': {
    name: '',
    description: '',
  },
  'LOGIN.MOG_WARDROBE_6': {
    name: '',
    description: '',
  },
  'LOGIN.MOG_WARDROBE_7': {
    name: '',
    description: '',
  },
  'LOGIN.MOG_WARDROBE_8': {
    name: '',
    description: '',
  },
  'LOGIN.RISE_OF_ZILART': {
    name: 'Rise of the Zilart',
    description: 'Displays "Rise of the Zilart" expansion.',
  },
  'LOGIN.SCARS_OF_ABYSSEA': {
    name: 'Scars of Abyssea',
    description: 'Displays "Scars of Abyssea" expansion.',
  },
  'LOGIN.SECURE_TOKEN': {
    name: '',
    description: '',
  },
  'LOGIN.SEEKERS_OF_ADOULIN': {
    name: 'Seekers of Adoulin',
    description: 'Displays "Seekers of Adoulin" expansion.',
  },
  'LOGIN.TREASURES_OF_AHT_URGHAN': {
    name: 'Treasures of Aht Urghan',
    description: 'Displays "Treasures of Aht Urghan" expansion.',
  },
  'LOGIN.VER_LOCK': {
    name: 'Version Lock',
    description: '0 = disabled; 1 = strict; 2 = greater than or equal',
  },
  'LOGIN.VISIONS_OF_ABYSSEA': {
    name: 'Visions of Abyssea',
    description: 'Displays "Visions of Abyssea" expansion.',
  },
  'LOGIN.WINGS_OF_THE_GODDESS': {
    name: 'Wings of the Goddess',
    description: 'Displays "Wings of the Goddess" expansion.',
  },
  'MAIN.ABSORB_SPELL_AMOUNT': {
    name: '',
    description: '',
  },
  'MAIN.ABSORB_SPELL_TICK': {
    name: '',
    description: '',
  },
  'MAIN.ABYSSEA_BONUSLIGHT_AMOUNT': {
    name: '',
    description: '',
  },
  'MAIN.ABYSSEA_LIGHTS_DROP_RATE': {
    name: '',
    description: '',
  },
  'MAIN.ACTIVATE_LAMP_TIME': {
    name: '',
    description: '',
  },
  'MAIN.ADVANCED_JOB_LEVEL': {
    name: '',
    description: '',
  },
  'MAIN.AF1_QUEST_LEVEL': {
    name: '',
    description: '',
  },
  'MAIN.AF2_QUEST_LEVEL': {
    name: '',
    description: '',
  },
  'MAIN.AF3_QUEST_LEVEL': {
    name: '',
    description: '',
  },
  'MAIN.ALLOW_MULTIPLE_EXP_RINGS': {
    name: '',
    description: '',
  },
  'MAIN.ALL_MAPS': {
    name: '',
    description: '',
  },
  'MAIN.AQUAVEIL_COUNTER': {
    name: '',
    description: '',
  },
  'MAIN.ASSAULT_MINIMUM': {
    name: '',
    description: '',
  },
  'MAIN.BAYLD_RATE': {
    name: '',
    description: '',
  },
  'MAIN.BETWEEN_2DYNA_WAIT_TIME': {
    name: '',
    description: '',
  },
  'MAIN.BIO_OVERWRITE': {
    name: '',
    description: '',
  },
  'MAIN.BLINK_SHADOWS': {
    name: '',
    description: '',
  },
  'MAIN.BLUE_POWER': {
    name: '',
    description: '',
  },
  'MAIN.BOOK_EXP_RATE': {
    name: '',
    description: '',
  },
  'MAIN.BYPASS_EXP_RING_ONE_PER_WEEK': {
    name: '',
    description: '',
  },
  'MAIN.CAPACITY_RATE': {
    name: '',
    description: '',
  },
  'MAIN.CAP_CURRENCY_ACCOLADES': {
    name: '',
    description: '',
  },
  'MAIN.CAP_CURRENCY_BALLISTA': {
    name: '',
    description: '',
  },
  'MAIN.CAP_CURRENCY_SPARKS': {
    name: '',
    description: '',
  },
  'MAIN.CAP_CURRENCY_VALOR': {
    name: '',
    description: '',
  },
  'MAIN.CASKET_DROP_RATE': {
    name: '',
    description: '',
  },
  'MAIN.CHEST_MAX_ILLUSION_TIME': {
    name: '',
    description: '',
  },
  'MAIN.CHEST_MIN_ILLUSION_TIME': {
    name: '',
    description: '',
  },
  'MAIN.CHOCOBO_RAISING_DISABLE_RETIREMENT': {
    name: '',
    description: '',
  },
  'MAIN.CHOCOBO_RAISING_GIL_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAIN.CHOCOBO_RAISING_STAT_GROWTH_CAP': {
    name: '',
    description: '',
  },
  'MAIN.CHOCOBO_RAISING_STAT_NEG_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAIN.CHOCOBO_RAISING_STAT_POS_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAIN.COFFER_MAX_ILLUSION_TIME': {
    name: '',
    description: '',
  },
  'MAIN.COFFER_MIN_ILLUSION_TIME': {
    name: '',
    description: '',
  },
  'MAIN.COSMO_CLEANSE_BASE_COST': {
    name: '',
    description: '',
  },
  'MAIN.CURE_POWER': {
    name: '',
    description: '',
  },
  'MAIN.CURRENCY_EXCHANGE_RATE': {
    name: '',
    description: '',
  },
  'MAIN.DAILY_TALLY_AMOUNT': {
    name: '',
    description: '',
  },
  'MAIN.DAILY_TALLY_LIMIT': {
    name: '',
    description: '',
  },
  'MAIN.DARK_POWER': {
    name: '',
    description: '',
  },
  'MAIN.DEBUG_CHOCOBO_RAISING': {
    name: '',
    description: '',
  },
  'MAIN.DIA_OVERWRITE': {
    name: '',
    description: '',
  },
  'MAIN.DIGGING_RATE': {
    name: '',
    description: '',
  },
  'MAIN.DIG_ABUNDANCE_BONUS': {
    name: '',
    description: '',
  },
  'MAIN.DIG_FATIGUE': {
    name: '',
    description: '',
  },
  'MAIN.DIG_GRANT_BORE': {
    name: '',
    description: '',
  },
  'MAIN.DIG_GRANT_BURROW': {
    name: '',
    description: '',
  },
  'MAIN.DISABLE_INACTIVITY_WATCHDOG': {
    name: '',
    description: '',
  },
  'MAIN.DISABLE_PARTY_EXP_PENALTY': {
    name: '',
    description: '',
  },
  'MAIN.DIVINE_POWER': {
    name: '',
    description: '',
  },
  'MAIN.DYNA_LEVEL_MIN': {
    name: '',
    description: '',
  },
  'MAIN.DYNA_MIDNIGHT_RESET': {
    name: '',
    description: '',
  },
  'MAIN.ELEMENTAL_DEBUFF_DURATION': {
    name: '',
    description: '',
  },
  'MAIN.ELEMENTAL_POWER': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_ABYSSEA': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_ACP': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_AMK': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_ASA': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_CHOCOBO_RAISING': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_COP': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_COP_ZONE_CAP': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_DAILY_TALLY': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_EXCHANGE_100S_TO_1S': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_EXCHANGE_LIMIT': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_FIELD_MANUALS': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_GARRISON': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_GROUNDS_TOMES': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_IMMUNOBREAK': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_LOGIN_CAMPAIGN': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_MAGIAN_TRIALS': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_MONSTROSITY': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_NYZUL_CASKETS': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_ROE': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_ROE_TIMED': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_ROV': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_SOA': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_SURVIVAL_GUIDE': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_TOAU': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_TRUST_ALTER_EGO_EXPO': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_TRUST_ALTER_EGO_EXPO_ANNOUNCE': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_TRUST_ALTER_EGO_EXTRAVAGANZA': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_TRUST_ALTER_EGO_EXTRAVAGANZA_ANNOUNCE': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_TRUST_CASTING': {
    name: 'Trusts',
    description: '',
  },
  'MAIN.ENABLE_TRUST_CUSTOM_ENGAGEMENT': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_TRUST_QUESTS': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_TVR': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_VIGIL_DROPS': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_VOIDWALKER': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_VOIDWATCH': {
    name: '',
    description: '',
  },
  'MAIN.ENABLE_WOTG': {
    name: '',
    description: '',
  },
  'MAIN.ENM_COOLDOWN': {
    name: '',
    description: '',
  },
  'MAIN.EQUIP_FROM_OTHER_CONTAINERS': {
    name: '',
    description: '',
  },
  'MAIN.EXCAVATION_BREAK_CHANCE': {
    name: '',
    description: '',
  },
  'MAIN.EXCAVATION_RATE': {
    name: '',
    description: '',
  },
  'MAIN.EXPLORER_MOOGLE_LV': {
    name: '',
    description: '',
  },
  'MAIN.EXP_RATE': {
    name: '',
    description: '',
  },
  'MAIN.FORCE_SPAWN_QM_RESET_TIME': {
    name: '',
    description: '',
  },
  'MAIN.FOV_REWARD_ALLIANCE': {
    name: '',
    description: '',
  },
  'MAIN.FREE_COP_DYNAMIS': {
    name: '',
    description: '',
  },
  'MAIN.FRIGICITE_TIME': {
    name: '',
    description: '',
  },
  'MAIN.GARRISON_LOCKOUT': {
    name: '',
    description: '',
  },
  'MAIN.GARRISON_NATION_BYPASS': {
    name: '',
    description: '',
  },
  'MAIN.GARRISON_ONCE_PER_WEEK': {
    name: '',
    description: '',
  },
  'MAIN.GARRISON_PARTY_LIMIT': {
    name: '',
    description: '',
  },
  'MAIN.GARRISON_RANK': {
    name: '',
    description: '',
  },
  'MAIN.GARRISON_TIME_LIMIT': {
    name: '',
    description: '',
  },
  'MAIN.GIL_RATE': {
    name: '',
    description: '',
  },
  'MAIN.GOBBIE_BOX_MIN_AGE': {
    name: '',
    description: '',
  },
  'MAIN.GOV_REWARD_ALLIANCE': {
    name: '',
    description: '',
  },
  'MAIN.HALLOWEEN_2005': {
    name: '',
    description: '',
  },
  'MAIN.HALLOWEEN_YEAR_ROUND': {
    name: '',
    description: '',
  },
  'MAIN.HARVESTING_BREAK_CHANCE': {
    name: '',
    description: '',
  },
  'MAIN.HARVESTING_RATE': {
    name: '',
    description: '',
  },
  'MAIN.HEALING_TP_CHANGE': {
    name: '',
    description: '',
  },
  'MAIN.HOMEPOINT_TELEPORT': {
    name: '',
    description: '',
  },
  'MAIN.INACTIVITY_WATCHDOG_PERIOD': {
    name: '',
    description: '',
  },
  'MAIN.INITIAL_LEVEL_CAP': {
    name: '',
    description: '',
  },
  'MAIN.ITEM_POWER': {
    name: '',
    description: '',
  },
  'MAIN.LANTERNS_STAY_LIT': {
    name: '',
    description: '',
  },
  'MAIN.LOGGING_BREAK_CHANCE': {
    name: '',
    description: '',
  },
  'MAIN.LOGGING_RATE': {
    name: '',
    description: '',
  },
  'MAIN.MAX_LEVEL': {
    name: '',
    description: '',
  },
  'MAIN.MINING_BREAK_CHANCE': {
    name: '',
    description: '',
  },
  'MAIN.MINING_RATE': {
    name: '',
    description: '',
  },
  'MAIN.MONSTROSITY_DONT_WIPE_BUFFS': {
    name: '',
    description: '',
  },
  'MAIN.MONSTROSITY_INFAMY_MESSAGING': {
    name: '',
    description: '',
  },
  'MAIN.MONSTROSITY_INFAMY_RATIO': {
    name: '',
    description: '',
  },
  'MAIN.MONSTROSITY_PVP_MODE': {
    name: '',
    description: '',
  },
  'MAIN.MONSTROSITY_PVP_ZONE_BYPASS': {
    name: '',
    description: '',
  },
  'MAIN.MONSTROSITY_TELEPORT_TO_FERETORY': {
    name: '',
    description: '',
  },
  'MAIN.MONSTROSITY_TRIGGER_NPCS': {
    name: '',
    description: '',
  },
  'MAIN.NEW_CHARACTER_CUTSCENE': {
    name: '',
    description: '',
  },
  'MAIN.NINJUTSU_POWER': {
    name: '',
    description: '',
  },
  'MAIN.NM_LOTTERY_CHANCE': {
    name: '',
    description: '',
  },
  'MAIN.NM_LOTTERY_COOLDOWN': {
    name: '',
    description: '',
  },
  'MAIN.NORMAL_MOB_MAX_LEVEL_RANGE_MAX': {
    name: '',
    description: '',
  },
  'MAIN.NORMAL_MOB_MAX_LEVEL_RANGE_MIN': {
    name: '',
    description: '',
  },
  'MAIN.NUMBER_OF_DM_EARRINGS': {
    name: '',
    description: '',
  },
  'MAIN.OLDSCHOOL_G1': {
    name: '',
    description: '',
  },
  'MAIN.OLDSCHOOL_G2': {
    name: '',
    description: '',
  },
  'MAIN.PRISMATIC_HOURGLASS_COST': {
    name: '',
    description: '',
  },
  'MAIN.REGIME_REWARD_THRESHOLD': {
    name: '',
    description: '',
  },
  'MAIN.REGIME_WAIT': {
    name: '',
    description: '',
  },
  'MAIN.RELIC_2ND_UPGRADE_WAIT_TIME': {
    name: '',
    description: '',
  },
  'MAIN.RELIC_3RD_UPGRADE_WAIT_TIME': {
    name: '',
    description: '',
  },
  'MAIN.RESTRICT_CONTENT': {
    name: '',
    description: '',
  },
  'MAIN.RIVERNE_PORTERS': {
    name: '',
    description: '',
  },
  'MAIN.ROE_EXP_RATE': {
    name: '',
    description: '',
  },
  'MAIN.RUNIC_DISK_SAVE': {
    name: '',
    description: '',
  },
  'MAIN.SERVER_MESSAGE': {
    default:
      'Please visit https://github.com/LandSandBoat/server for the latest information on the project.\nThank you, and we hope you enjoy sailing the sands!',
    name: '',
    description: '',
  },
  'MAIN.SERVER_NAME': {
    name: '',
    description: '',
  },
  'MAIN.SHOP_PRICE': {
    name: '',
    description: '',
  },
  'MAIN.SNEAK_INVIS_DURATION_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAIN.SPARKS_RATE': {
    name: '',
    description: '',
  },
  'MAIN.SPIKE_EFFECT_DURATION': {
    name: '',
    description: '',
  },
  'MAIN.START_GIL': {
    name: '',
    description: '',
  },
  'MAIN.START_INVENTORY': {
    name: '',
    description: '',
  },
  'MAIN.STONESKIN_CAP': {
    name: '',
    description: '',
  },
  'MAIN.SUBJOB_QUEST_LEVEL': {
    name: '',
    description: '',
  },
  'MAIN.TABS_RATE': {
    name: '',
    description: '',
  },
  'MAIN.TIMELESS_HOURGLASS_COST': {
    name: '',
    description: '',
  },
  'MAIN.TRUST_ALTER_EGO_EXPO_MESSAGE': {
    default:
      '? ????? The Alter Ego Expo Campaign is active! ?????Trusts gain the benefits of Increased HP, MP, and Status Resistances!',
    name: '',
    description: '',
  },
  'MAIN.TRUST_ALTER_EGO_EXTRAVAGANZA_MESSAGE': {
    default:
      '? ????? The Alter Ego Extravaganza Campaign is active! ?????This is an excellent time to fill out your roster of Trusts!',
    name: '',
    description: '',
  },
  'MAIN.UNLOCK_OUTPOST_WARPS': {
    name: '',
    description: '',
  },
  'MAIN.USE_ADOULIN_WEAPON_SKILL_CHANGES': {
    name: '',
    description: '',
  },
  'MAIN.USE_OLD_CURE_FORMULA': {
    name: '',
    description: '',
  },
  'MAIN.USE_OLD_MAGIC_DAMAGE': {
    name: '',
    description: '',
  },
  'MAIN.WEAPON_SKILL_POWER': {
    name: '',
    description: '',
  },
  'MAIN.WEEKLY_EXCHANGE_LIMIT': {
    name: '',
    description: '',
  },
  'MAP.ABILITY_RECAST_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.AH_BASE_FEE_SINGLE': {
    name: '',
    description: '',
  },
  'MAP.AH_BASE_FEE_STACKS': {
    name: '',
    description: '',
  },
  'MAP.AH_LIST_LIMIT': {
    name: '',
    description: '',
  },
  'MAP.AH_MAX_FEE': {
    name: '',
    description: '',
  },
  'MAP.AH_TAX_RATE_SINGLE': {
    name: '',
    description: '',
  },
  'MAP.AH_TAX_RATE_STACKS': {
    name: '',
    description: '',
  },
  'MAP.ALL_JOBS_WIDESCAN': {
    name: '',
    description: '',
  },
  'MAP.ALL_MOBS_GIL_BONUS': {
    name: '',
    description: '',
  },
  'MAP.ALTER_EGO_HP_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.ALTER_EGO_MP_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.ALTER_EGO_SKILL_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.ALTER_EGO_STAT_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.ANTICHEAT_ENABLED': {
    name: '',
    description: '',
  },
  'MAP.ANTICHEAT_JAIL_DISABLE': {
    name: '',
    description: '',
  },
  'MAP.AUDIT_CHAT': {
    name: '',
    description: '',
  },
  'MAP.AUDIT_GM_CMD': {
    name: '',
    description: '',
  },
  'MAP.AUDIT_LINKSHELL': {
    name: '',
    description: '',
  },
  'MAP.AUDIT_PARTY': {
    name: '',
    description: '',
  },
  'MAP.AUDIT_SAY': {
    name: '',
    description: '',
  },
  'MAP.AUDIT_SHOUT': {
    name: '',
    description: '',
  },
  'MAP.AUDIT_TELL': {
    name: '',
    description: '',
  },
  'MAP.AUDIT_UNITY': {
    name: '',
    description: '',
  },
  'MAP.AUDIT_YELL': {
    name: '',
    description: '',
  },
  'MAP.BATTLE_CAP_TWEAK': {
    name: '',
    description: '',
  },
  'MAP.BLOCK_OLD_SKILLUP_STYLE': {
    name: '',
    description: '',
  },
  'MAP.BLOCK_TELL_TO_HIDDEN_GM': {
    name: '',
    description: '',
  },
  'MAP.BLOOD_PACT_SHARED_TIMER': {
    name: '',
    description: '',
  },
  'MAP.CAPACITY_RATE': {
    name: '',
    description: '',
  },
  'MAP.CRAFT_AMOUNT_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.CRAFT_CHANCE_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.CRAFT_COMMON_CAP': {
    name: '',
    description: '',
  },
  'MAP.CRAFT_MODERN_SYSTEM': {
    name: '',
    description: '',
  },
  'MAP.CRAFT_SPECIALIZATION_POINTS': {
    name: '',
    description: '',
  },
  'MAP.DESPAWN_JUGPETS_BELOW_MINIMUM_LEVEL': {
    name: '',
    description: '',
  },
  'MAP.DISABLE_GEAR_SCALING': {
    name: '',
    description: '',
  },
  'MAP.DROP_RATE_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.ENABLE_ITEM_RECYCLE_BIN': {
    name: '',
    description: '',
  },
  'MAP.ENMITY_CAP': {
    name: '',
    description: '',
  },
  'MAP.EXP_LOSS_LEVEL': {
    name: '',
    description: '',
  },
  'MAP.EXP_LOSS_RATE': {
    name: '',
    description: '',
  },
  'MAP.EXP_PARTY_GAP_NO_EXP': {
    name: '',
    description: '',
  },
  'MAP.EXP_PARTY_GAP_PENALTIES': {
    name: '',
    description: '',
  },
  'MAP.EXP_RATE': {
    name: '',
    description: '',
  },
  'MAP.EXP_RETAIN': {
    name: '',
    description: '',
  },
  'MAP.FAME_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.FELLOW_TP_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.FISHING_ENABLE': {
    name: '',
    description: '',
  },
  'MAP.FISHING_SKILL_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.GARDEN_DAY_MATTERS': {
    name: '',
    description: '',
  },
  'MAP.GARDEN_MH_AURA_MATTERS': {
    name: '',
    description: '',
  },
  'MAP.GARDEN_MOONPHASE_MATTERS': {
    name: '',
    description: '',
  },
  'MAP.GARDEN_POT_MATTERS': {
    name: '',
    description: '',
  },
  'MAP.GUARD_OLD_SKILLUP_STYLE': {
    name: '',
    description: '',
  },
  'MAP.HEALING_TICK_DELAY': {
    name: '',
    description: '',
  },
  'MAP.INCLUDE_MOB_SJ': {
    name: '',
    description: '',
  },
  'MAP.KEEP_JUGPET_THROUGH_ZONING': {
    name: '',
    description: '',
  },
  'MAP.LEVEL_SYNC_ENABLE': {
    name: 'Level Sync',
    description: '',
  },
  'MAP.LIGHTLUGGAGE_BLOCK': {
    name: '',
    description: '',
  },
  'MAP.LV_CAP_MISSION_BCNM': {
    name: '',
    description: '',
  },
  'MAP.MAX_GIL_BONUS': {
    name: '',
    description: '',
  },
  'MAP.MAX_MERIT_POINTS': {
    name: '',
    description: '',
  },
  'MAP.MAX_TIME_LASTUPDATE': {
    name: '',
    description: '',
  },
  'MAP.MINIMUM_LEVEL_CONQUEST_INFUENCE_LOSS': {
    name: '',
    description: '',
  },
  'MAP.MOB_ADDITIONAL_TIME_TO_DEAGGRO': {
    name: '',
    description: '',
  },
  'MAP.MOB_GIL_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.MOB_HP_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.MOB_MP_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.MOB_NO_DESPAWN': {
    name: '',
    description: '',
  },
  'MAP.MOB_SPEED_MOD': {
    name: '',
    description: '',
  },
  'MAP.MOB_STAT_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.MOB_TP_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.MOUNT_SPEED_MOD': {
    name: '',
    description: '',
  },
  'MAP.NM_HP_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.NM_MP_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.NM_STAT_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.PACKETGUARD_ENABLED': {
    name: '',
    description: '',
  },
  'MAP.PARRY_OLD_SKILLUP_STYLE': {
    name: '',
    description: '',
  },
  'MAP.PET_TP_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.PLAYER_HP_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.PLAYER_MP_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.PLAYER_STAT_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.PLAYER_TP_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.PREVENT_UNENGAGED_WS': {
    name: '',
    description: '',
  },
  'MAP.REPORT_LUA_ERRORS_TO_PLAYER_LEVEL': {
    name: '',
    description: '',
  },
  'MAP.SETVAR_RETRY_MAX': {
    name: '',
    description: '',
  },
  'MAP.SJ_MP_DIVISOR': {
    name: '',
    description: '',
  },
  'MAP.SKILLUP_AMOUNT_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.SKILLUP_BLOODPACT': {
    name: '',
    description: '',
  },
  'MAP.SKILLUP_CHANCE_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.SPEED_MOD': {
    name: 'Speed',
    description: 'Player speed compared to retail.',
  },
  'MAP.SUBJOB_RATIO': {
    name: '',
    description: '',
  },
  'MAP.TRUST_TP_MULTIPLIER': {
    name: '',
    description: '',
  },
  'MAP.VANADIEL_TIME_EPOCH': {
    name: '',
    description: '',
  },
  'MAP.WS_POINTS_BASE': {
    name: '',
    description: '',
  },
  'MAP.WS_POINTS_SKILLCHAIN': {
    name: '',
    description: '',
  },
  'MAP.YELL_COOLDOWN': {
    name: '',
    description: '',
  },
  'SEARCH.DEBUG_OUT_PACKETS': {
    name: '',
    description: '',
  },
  'SEARCH.EXPIRE_AUCTIONS': {
    name: '',
    description: '',
  },
  'SEARCH.EXPIRE_DAYS': {
    name: '',
    description: '',
  },
  'SEARCH.EXPIRE_INTERVAL': {
    name: '',
    description: '',
  },
  'SEARCH.OMIT_NO_HISTORY': {
    name: '',
    description: '',
  },
};
