// ── Country name (RU) → ISO mapping ──
export const RU_TO_ISO: Record<string, string> = {
  'Украина': 'UA', 'Великобритания': 'GB', 'Испания': 'ES', 'Италия': 'IT',
  'Нидерланды': 'NL', 'США': 'US', 'Франция': 'FR', 'КНДР': 'KP', 'Иран': 'IR',
  'Россия': 'RU', 'Казахстан': 'KZ', 'Беларусь': 'BY', 'Узбекистан': 'UZ',
  'Азербайджан': 'AZ', 'Грузия': 'GE', 'Турция': 'TR', 'Германия': 'DE',
  'Армения': 'AM', 'Латвия': 'LV', 'Литва': 'LT', 'Австрия': 'AT',
  'Бельгия': 'BE', 'Дания': 'DK', 'Кипр': 'CY', 'Китай': 'CN',
  'Таджикистан': 'TJ', 'Киргизия': 'KG', 'Канада': 'CA',
};

export const ISO_TO_RU: Record<string, string> = Object.fromEntries(
  Object.entries(RU_TO_ISO).map(([ru, iso]) => [iso, ru])
);

// ── Helpers to generate display data from plain string arrays ──

const PROVIDER_ABBR: Record<string, string> = {
  'Pragmatic Play': 'PP', 'Microgaming': 'MG', 'NetEnt': 'NE', 'Evolution Gaming': 'EV',
  'Yggdrasil Gaming': 'YG', 'Red Tiger': 'RT', 'Hacksaw Gaming': 'HS', 'Nolimit City': 'NL',
  'BGaming': 'BG', 'Endorphina': 'EN', 'Betsoft': 'BS', 'Spinomenal': 'SP',
  'Amatic': 'AM', 'Belatra': 'BL', 'Habanero': 'HB', 'Evoplay': 'EP',
  'Playson': 'PS', 'Thunderkick': 'TK', 'Igrosoft': 'IS', 'Amusnet': 'AN',
  'NOVOMATIC': 'NV', 'Booming Games': 'BM', 'PG SOFT': 'PG', 'Fugaso': 'FG',
  '1x2 Gaming': '1x', 'Kalamba Games': 'KL', 'Skywind': 'SW', 'GameArt': 'GA',
  'Iron Dog Studio': 'ID', 'Tom Horn Gaming': 'TH', 'Platipus': 'PL',
  'Felix Gaming': 'FX', 'Swintt': 'ST', 'BF Games': 'BF', 'Gamomat': 'GM',
  'WorldMatch': 'WM', 'RubyPlay': 'RP', 'Spadegaming': 'SG', 'Zeus': 'ZS',
  'Onetouch': 'OT', 'KA Gaming': 'KA', 'Spinmatic': 'SM', 'Fazi': 'FZ',
  'Nucleus': 'NC', 'SmartSoft Games': 'SS', 'CT Interactive': 'CT', 'Mascot': 'MC',
  '4ThePlayer': '4P', 'Caleta Gaming': 'CG', 'Truelab': 'TL', '5MEN': '5M',
  'Mancala Gaming': 'MA', 'Triple Cherry': 'TC', '7 Mojos': '7M', 'Spearhead': 'SH',
  'JDB': 'JD', 'Amigo Gaming': 'AG', 'Onlyplay': 'OP', 'Gamzix': 'GX',
  'Gaming Corps': 'GC', 'SlotMill': 'SL', 'AvatarUX': 'AX', '1spin4win': '1S',
  'GameBeat': 'GB', 'Zillion Games': 'ZG', 'R.Franco': 'RF', 'InOut Games': 'IO',
  'TaDa Gaming': 'TD', 'Red Rake': 'RR', 'Evolution': 'EV',
};

function makeAbbr(name: string): string {
  if (PROVIDER_ABBR[name]) return PROVIDER_ABBR[name];
  const words = name.split(/\s+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
}

const PAYMENT_COLORS: Record<string, string> = {
  'Visa': '#1E3A8A', 'Mastercard': '#DC2626', 'Bitcoin': '#F97316', 'Ethereum': '#6366F1',
  'Litecoin': '#94A3B8', 'Tether': '#10B981', 'Dogecoin': '#F59E0B', 'Tron': '#EF4444',
  'Piastrix': '#22C55E', 'Сбербанк': '#21A038', 'SberPay': '#21A038', 'Криптовалюта': '#8B5CF6',
  'VouWallet': '#3B82F6', 'Binance Pay': '#F59E0B', 'T-Pay': '#FFDD2D', 'Bybit Pay': '#F7A600',
  'СБП': '#5B2D8E', 'Банк ВТБ': '#009FDF', 'Альфа-Банк': '#EF3124', 'Мир': '#4DB45E',
  'Т-Банк': '#FFDD2D', 'ETH': '#6366F1', 'DOGE': '#C2A633', 'TRON': '#EF4444',
};

const PAYMENT_ABBR: Record<string, string> = {
  'Bitcoin': '₿', 'Ethereum': 'Ξ', 'Litecoin': 'Ł', 'Tether': '₮', 'Dogecoin': 'Ð',
  'Tron': 'T', 'Visa': 'V', 'Mastercard': 'MC', 'Piastrix': 'PX', 'Сбербанк': 'СБ',
  'SberPay': 'SP', 'Криптовалюта': '₡', 'VouWallet': 'VW', 'Binance Pay': 'BN',
  'T-Pay': 'TP', 'Bybit Pay': 'BB', 'СБП': 'СБП', 'Банк ВТБ': 'ВТБ',
  'Альфа-Банк': 'АБ', 'Мир': 'М', 'Т-Банк': 'ТБ', 'ETH': 'Ξ', 'DOGE': 'Ð', 'TRON': 'T',
};

const LANG_FLAGS: Record<string, string> = {
  'Русский': '🇷🇺', 'Английский': '🇬🇧', 'Французский': '🇫🇷', 'Турецкий': '🇹🇷',
  'Казахский': '🇰🇿', 'Узбекский': '🇺🇿', 'Азербайджанский': '🇦🇿', 'Таджикский': '🇹🇯',
  'Киргизский': '🇰🇬', 'Немецкий': '🇩🇪', 'Испанский': '🇪🇸', 'Итальянский': '🇮🇹',
  'Португальский': '🇵🇹', 'Польский': '🇵🇱', 'Японский': '🇯🇵',
  'Английский (Канада)': '🇨🇦', 'Французский (Канада)': '🇨🇦',
};

// ── Language name → 3-letter code mapping ──
export const LANG_CODES: Record<string, string> = {
  'Русский': 'RUS', 'Английский': 'ENG', 'Немецкий': 'DEU', 'Французский': 'FRA',
  'Турецкий': 'TUR', 'Казахский': 'KAZ', 'Узбекский': 'UZB', 'Азербайджанский': 'AZE',
  'Таджикский': 'TJK', 'Киргизский': 'KGZ', 'Испанский': 'ESP', 'Итальянский': 'ITA',
  'Португальский': 'POR', 'Польский': 'POL', 'Японский': 'JPN', 'Китайский': 'CHN',
  'Корейский': 'KOR', 'Арабский': 'ARA', 'Хинди': 'HIN', 'Чешский': 'CES',
  'Шведский': 'SWE', 'Норвежский': 'NOR', 'Финский': 'FIN', 'Датский': 'DAN',
  'Голландский': 'NLD', 'Греческий': 'ELL', 'Румынский': 'RON', 'Венгерский': 'HUN',
  'Болгарский': 'BUL', 'Сербский': 'SRP', 'Хорватский': 'HRV', 'Словацкий': 'SLK',
  'Словенский': 'SLV', 'Литовский': 'LIT', 'Латышский': 'LAV', 'Эстонский': 'EST',
  'Грузинский': 'KAT', 'Армянский': 'HYE', 'Украинский': 'UKR', 'Белорусский': 'BEL',
  'Тайский': 'THA', 'Вьетнамский': 'VIE', 'Индонезийский': 'IND', 'Малайский': 'MSA',
  'Английский (Канада)': 'ENC', 'Французский (Канада)': 'FRC',
};

// ── Interfaces ──

export interface SubRating {
  label: string;
  value: number;
}

export interface Badge {
  icon: string;
  text: string;
}

export interface ProviderItem {
  name: string;
  abbr: string;
}

export interface PaymentItem {
  name: string;
  abbr: string;
  color: string;
}

export interface LanguageItem {
  name: string;
  flag: string;
  code: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CasinoData {
  id: string;
  name: string;
  slug: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  ratingPosition: number;
  catalogUrl: string;
  officialSiteUrl: string;

  bonusOffer: string;
  bonusDesc: string;
  promoCode: string;
  promoLabel: string;

  usedCount: number;
  timerMinutes: number;

  overallRating: number;
  subRatings: SubRating[];
  badges: Badge[];

  advantages: string[];
  disadvantages: string[];

  // General info
  owner: string;
  license: string;
  jurisdiction: string;
  founded: string;
  casinoType: string[];
  gamesCount: string;
  platform: string;

  // Providers
  providers: ProviderItem[];
  totalProviders: number;
  visibleProviders: number;

  // Payments (deposit + withdrawal merged, deduplicated)
  payments: PaymentItem[];
  totalPayments: number;
  visiblePayments: number;

  // Languages
  languages: LanguageItem[];
  totalLanguages: number;
  visibleLanguages: number;

  // Geo
  bannedCountriesRu: string[];
  bannedCountriesISO: string[];

  // Finance
  minDeposit: string;
  minWithdrawal: string;
  payoutSpeed: string;
  withdrawalLimit: string;
  currencies: string[];
  cryptoCurrencies: string[];
  depositMethods: string[];
  withdrawalMethods: string[];

  // Support
  supportLiveChat: boolean;
  supportEmail: boolean;
  supportTelegram: boolean;
  supportLanguages: string[];

  // FAQ
  faq: FaqItem[];
}

// ── Raw JSON ──
const RAW = {
  name: 'Онлайн-казино Pinco',
  slug: 'casino-pinco',
  rating_score: 5.0,
  bonus_title: '250 FS + 180% до 450 000 ₽',
  min_deposit: '500',
  advantages: [
    'подтвержденная лицензия',
    'лутбоксы с бонусами',
    'более 10 000 игр',
    'поддержка криптовалют',
    'кешбэк до 10%',
  ],
  disadvantages: ['нет мобильного приложения для iOS'],
  sidebar_data: {
    general: {
      owner: 'Carlitta N.V., зарегистрированная на о. Кюрасао',
      license: 'Curacao: OGL/2024/1516/0841',
      jurisdiction: 'Кюрасао',
      founded: '2024',
      casinoType: ['Браузерный', 'Мобильный', 'Приложение', 'Лайв'],
      platform: 'Собственная',
      gamesCount: '15 286',
    },
    access: {
      languages: [
        'Французский (Канада)', 'Английский (Канада)', 'Таджикский', 'Киргизский',
        'Казахский', 'Узбекский', 'Французский', 'Азербайджанский', 'Турецкий',
        'Английский', 'Русский',
      ],
      providers: [
        'Betsoft', 'BGaming', 'Pragmatic Play', 'Endorphina', 'Igrosoft', 'NetEnt',
        'Amusnet', 'NOVOMATIC', 'Amatic', 'Belatra', '1x2 Gaming', 'Fugaso',
        'Booming Games', 'Microgaming', 'Yggdrasil Gaming', 'Evolution Gaming',
        'Evoplay', 'Playson', 'Red Rake', 'Red Tiger', 'Habanero', 'Kalamba Games',
        'Nolimit City', 'Thunderkick', 'Skywind', 'GameArt', 'Iron Dog Studio',
        'Tom Horn Gaming', 'Spinomenal', 'Platipus', 'Felix Gaming', 'Swintt',
        'BF Games', 'Gamomat', 'PG SOFT', 'WorldMatch', 'RubyPlay', 'Spadegaming',
        'Zeus', 'Onetouch', 'KA Gaming', 'Spinmatic', 'Fazi', 'Nucleus',
        'Hacksaw Gaming', 'SmartSoft Games', 'CT Interactive', 'Mascot', '4ThePlayer',
        'Caleta Gaming', 'Truelab', '5MEN', 'Mancala Gaming', 'Triple Cherry',
        '7 Mojos', 'Spearhead', 'JDB', 'Amigo Gaming', 'Onlyplay', 'Gamzix',
        'Gaming Corps', 'SlotMill', 'AvatarUX', '1spin4win', 'GameBeat',
        'Zillion Games', 'R.Franco', 'InOut Games', 'TaDa Gaming',
      ],
    },
    geography: {
      bannedCountries: [
        'Латвия', 'Литва', 'Австрия', 'Бельгия', 'Великобритания',
        'Дания', 'Испания', 'Италия', 'Кипр', 'Китай',
      ],
    },
    finance: {
      minDeposit: '500',
      minWithdrawal: '1500',
      payoutSpeed: '0-24 часов',
      withdrawalLimit: '400 000 в день',
      currencies: ['RUB', 'TJS', 'UZS', 'AZN', 'KGS', 'KZT', 'TRY', 'CAD'],
      cryptoCurrencies: ['Bitcoin', 'Ethereum', 'Litecoin', 'Tether', 'Dogecoin', 'TRON'],
      paymentMethods: [
        'Bitcoin', 'Ethereum', 'Dogecoin', 'Litecoin', 'Tron', 'Piastrix',
        'Сбербанк', 'Tether', 'Криптовалюта', 'SberPay', 'VouWallet',
        'Binance Pay', 'T-Pay', 'Bybit Pay',
      ],
      withdrawalMethods: [
        'Visa', 'Mastercard', 'Bitcoin', 'Ethereum', 'Dogecoin', 'Litecoin',
        'Tron', 'Binance Pay', 'VouWallet', 'СБП', 'Криптовалюта', 'Банк ВТБ',
        'Сбербанк', 'Piastrix', 'Альфа-Банк', 'Tether', 'Мир', 'Т-Банк',
      ],
    },
    support: {
      liveChat: true,
      email: true,
      telegram: true,
      languages: ['Английский', 'Русский'],
    },
  },
  faq: [
    { question: '❓ Можно ли изменить валюту?', answer: 'Игрок выбирает ее при регистрации. В будущем изменить валюту нельзя.' },
    { question: '🤔 Как восстановить доступ к сайту, если утеряна почта?', answer: 'Необходимо обратиться в службу поддержки. При этом может потребоваться верификация.' },
    { question: '⚡ Депозиты совершаются с комиссией?', answer: 'Нет, оператор не берет дополнительную плату при пополнении счета игроками.' },
    { question: '⏰ Сколько времени занимает первый вывод?', answer: 'На обналичивание денег может потребоваться до 2 дней. Последующие выводы проходят быстрее.' },
    { question: '🧩 Почему в аккаунте не отображается ранее активированный бонус?', answer: 'Такое происходит, если истек срок действия акции.' },
  ],
};

// ── Build providers ──
const providers: ProviderItem[] = RAW.sidebar_data.access.providers.map((name) => ({
  name,
  abbr: makeAbbr(name),
}));

// ── Build payments (merge deposit + withdrawal, deduplicate) ──
const allPaymentNames = [
  ...RAW.sidebar_data.finance.paymentMethods,
  ...RAW.sidebar_data.finance.withdrawalMethods,
];
const uniquePayments = [...new Set(allPaymentNames)];
const payments: PaymentItem[] = uniquePayments.map((name) => ({
  name,
  abbr: PAYMENT_ABBR[name] || name.substring(0, 2).toUpperCase(),
  color: PAYMENT_COLORS[name] || '#64748B',
}));

// ── Build languages ──
const languages: LanguageItem[] = RAW.sidebar_data.access.languages.map((name) => ({
  name,
  flag: LANG_FLAGS[name] || '🌐',
  code: LANG_CODES[name] || name.substring(0, 3).toUpperCase(),
}));

// ── Build banned countries ISO ──
const bannedCountriesISO = RAW.sidebar_data.geography.bannedCountries
  .map((ru) => RU_TO_ISO[ru])
  .filter(Boolean) as string[];

// ── Export final object ──
export const CASINO_DATA: CasinoData = {
  id: '196885',
  name: RAW.name.replace('Онлайн-казино ', ''),
  slug: RAW.slug,
  logo: 'https://casino.ru/wp-content/uploads/casino/196885/pinco.png',
  logoWidth: 285,
  logoHeight: 70,
  ratingPosition: 1,
  catalogUrl: '/casino/rating/',
  officialSiteUrl: 'https://pinco-casino.com',

  bonusOffer: RAW.bonus_title,
  bonusDesc: `на первый депозит от ${RAW.min_deposit} ₽`,
  promoCode: 'CASINORU',
  promoLabel: 'Эксклюзивный бонус',

  usedCount: 505,
  timerMinutes: 56,

  overallRating: RAW.rating_score,
  subRatings: [
    { label: 'Надежность', value: 4.8 },
    { label: 'Скорость', value: 4.6 },
    { label: 'Вывод средств', value: 4.5 },
    { label: 'Оценка игроков', value: 4.7 },
    { label: 'Бонусы', value: 4.9 },
  ],
  badges: [
    { icon: 'trophy', text: 'Выбор игроков' },
    { icon: 'shield', text: `Лицензия ${RAW.sidebar_data.general.jurisdiction}` },
    { icon: 'bolt', text: 'Быстрые выплаты' },
    { icon: 'gift', text: 'VIP программа' },
  ],

  advantages: RAW.advantages,
  disadvantages: RAW.disadvantages,

  owner: RAW.sidebar_data.general.owner,
  license: RAW.sidebar_data.general.license,
  jurisdiction: RAW.sidebar_data.general.jurisdiction,
  founded: RAW.sidebar_data.general.founded,
  casinoType: RAW.sidebar_data.general.casinoType,
  gamesCount: RAW.sidebar_data.general.gamesCount,
  platform: RAW.sidebar_data.general.platform,

  providers,
  totalProviders: providers.length,
  visibleProviders: 3,

  payments,
  totalPayments: payments.length,
  visiblePayments: 3,

  languages,
  totalLanguages: languages.length,
  visibleLanguages: 3,

  bannedCountriesRu: RAW.sidebar_data.geography.bannedCountries,
  bannedCountriesISO,

  minDeposit: RAW.sidebar_data.finance.minDeposit,
  minWithdrawal: RAW.sidebar_data.finance.minWithdrawal,
  payoutSpeed: RAW.sidebar_data.finance.payoutSpeed,
  withdrawalLimit: RAW.sidebar_data.finance.withdrawalLimit,
  currencies: RAW.sidebar_data.finance.currencies,
  cryptoCurrencies: RAW.sidebar_data.finance.cryptoCurrencies,
  depositMethods: RAW.sidebar_data.finance.paymentMethods,
  withdrawalMethods: RAW.sidebar_data.finance.withdrawalMethods,

  supportLiveChat: RAW.sidebar_data.support.liveChat,
  supportEmail: RAW.sidebar_data.support.email,
  supportTelegram: RAW.sidebar_data.support.telegram,
  supportLanguages: RAW.sidebar_data.support.languages,

  faq: RAW.faq,
};
