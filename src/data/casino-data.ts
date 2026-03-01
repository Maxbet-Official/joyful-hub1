export interface SubRating {
  label: string;
  value: number;
}

export interface Badge {
  icon: string;
  text: string;
}

export interface Provider {
  name: string;
  abbr: string;
}

export interface Payment {
  name: string;
  abbr: string;
  color: string;
}

export interface Language {
  name: string;
  flag: string;
}

export interface CasinoData {
  id: string;
  name: string;
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
  providers: Provider[];
  totalProviders: number;
  visibleProviders: number;
  payments: Payment[];
  totalPayments: number;
  visiblePayments: number;
  languages: Language[];
  totalLanguages: number;
  visibleLanguages: number;
  allowedCountries: string[];
}

export const CASINO_DATA: CasinoData = {
  id: '196885',
  name: 'CatCasino',
  logo: 'https://casino.ru/wp-content/uploads/casino/196885/pinco.png',
  logoWidth: 285,
  logoHeight: 70,
  ratingPosition: 10,
  catalogUrl: '/casino/rating/',
  officialSiteUrl: 'https://catcasino.com',

  bonusOffer: '350 FS + 125%',
  bonusDesc: 'на первый депозит от 500 ₽',
  promoCode: 'CASINORU',
  promoLabel: 'Эксклюзивный бонус',

  usedCount: 505,
  timerMinutes: 56,

  overallRating: 4.7,
  subRatings: [
    { label: 'Надежность', value: 4.8 },
    { label: 'Скорость', value: 4.6 },
    { label: 'Вывод средств', value: 4.5 },
    { label: 'Оценка игроков', value: 4.7 },
    { label: 'Бонусы', value: 4.9 },
  ],

  badges: [
    { icon: 'trophy', text: 'Выбор игроков' },
    { icon: 'shield', text: 'Лицензия Кюрасао' },
    { icon: 'bolt', text: 'Быстрые выплаты' },
    { icon: 'gift', text: 'VIP программа' },
  ],

  providers: [
    { name: 'Pragmatic Play', abbr: 'PP' },
    { name: 'Microgaming', abbr: 'MG' },
    { name: 'NetEnt', abbr: 'NE' },
    { name: "Play'n GO", abbr: 'PG' },
    { name: 'Evolution', abbr: 'EV' },
    { name: 'Yggdrasil', abbr: 'YG' },
    { name: 'Red Tiger', abbr: 'RT' },
    { name: 'Hacksaw', abbr: 'HS' },
    { name: 'Nolimit City', abbr: 'NL' },
    { name: 'Push Gaming', abbr: 'PU' },
    { name: 'Relax Gaming', abbr: 'RX' },
    { name: 'BGaming', abbr: 'BG' },
    { name: 'ELK Studios', abbr: 'EK' },
    { name: 'Thunderkick', abbr: 'TK' },
    { name: 'Quickspin', abbr: 'QS' },
    { name: 'Big Time Gaming', abbr: 'BT' },
    { name: 'iSoftBet', abbr: 'IS' },
    { name: 'Booongo', abbr: 'BO' },
    { name: 'Endorphina', abbr: 'EN' },
    { name: 'Wazdan', abbr: 'WZ' },
    { name: 'Betsoft', abbr: 'BS' },
    { name: 'Spinomenal', abbr: 'SP' },
    { name: 'Amatic', abbr: 'AM' },
    { name: 'Belatra', abbr: 'BL' },
    { name: 'Habanero', abbr: 'HB' },
  ],
  totalProviders: 58,
  visibleProviders: 6,

  payments: [
    { name: 'Visa', abbr: 'V', color: '#1E3A8A' },
    { name: 'Mastercard', abbr: 'MC', color: '#DC2626' },
    { name: 'Bitcoin', abbr: '₿', color: '#F97316' },
    { name: 'USDT', abbr: '₮', color: '#10B981' },
    { name: 'WebMoney', abbr: 'WM', color: '#2563EB' },
    { name: 'Skrill', abbr: 'SK', color: '#9333EA' },
    { name: 'Neteller', abbr: 'NT', color: '#3B82F6' },
    { name: 'ecoPayz', abbr: 'eP', color: '#22C55E' },
    { name: 'MiFinity', abbr: 'MF', color: '#6366F1' },
    { name: 'Jeton', abbr: 'JT', color: '#EF4444' },
    { name: 'Ethereum', abbr: 'Ξ', color: '#6366F1' },
    { name: 'Litecoin', abbr: 'Ł', color: '#94A3B8' },
    { name: 'Ripple', abbr: 'XR', color: '#3B82F6' },
    { name: 'AstroPay', abbr: 'AP', color: '#F59E0B' },
    { name: 'MuchBetter', abbr: 'MB', color: '#EC4899' },
  ],
  totalPayments: 24,
  visiblePayments: 5,

  languages: [
    { name: 'Русский', flag: '🇷🇺' },
    { name: 'English', flag: '🇬🇧' },
    { name: 'Deutsch', flag: '🇩🇪' },
    { name: 'Türkçe', flag: '🇹🇷' },
    { name: 'Español', flag: '🇪🇸' },
    { name: 'Português', flag: '🇵🇹' },
    { name: 'Français', flag: '🇫🇷' },
    { name: 'Italiano', flag: '🇮🇹' },
    { name: 'Polski', flag: '🇵🇱' },
    { name: '日本語', flag: '🇯🇵' },
  ],
  totalLanguages: 10,
  visibleLanguages: 3,

  allowedCountries: ['UA', 'RU', 'KZ', 'BY', 'UZ', 'AZ', 'GE', 'TR', 'DE'],
};
