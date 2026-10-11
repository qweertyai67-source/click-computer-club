import { assetUrl, clubConfig } from './club.config'

export type ZoneId = 'standard' | 'vip' | 'team'

export const ZONE_CAPACITIES: Record<ZoneId, number> = {
  standard: 20,
  vip: 7,
  team: 5,
}

const occupiedSeatNumbers: Record<ZoneId, number[]> = {
  standard: [1, 4, 8, 11, 14, 17, 18, 20],
  vip: [2, 5],
  team: [],
}

export type Zone = {
  id: ZoneId
  name: string
  shortName: string
  eyebrow: string
  description: string
  cpu: string
  gpu: string
  display: string
  gear: string
  price: number
  available: number
  capacity: number
  image: string
  accent: 'mint' | 'amber'
}

export type Tariff = {
  id: string
  name: string
  note: string
  standard: number
  vip: number
  suffix: string
  featured?: boolean
}

export const branches = [
  { id: 'cherkasskaya', name: clubConfig.addressShort, note: 'Единственная подтверждённая локация' },
] as const

export const zones: Zone[] = [
  {
    id: 'standard',
    name: 'Standard',
    shortName: 'Standard',
    eyebrow: 'Основной игровой зал',
    description: 'Ряды пронумерованных игровых станций в тёмном зале с холодной голубой подсветкой.',
    cpu: 'Игровая станция',
    gpu: 'Корпус с подсветкой',
    display: 'Игровой монитор',
    gear: 'Клавиатура, мышь, гарнитура',
    price: 130,
    available: ZONE_CAPACITIES.standard - occupiedSeatNumbers.standard.length,
    capacity: ZONE_CAPACITIES.standard,
    image: assetUrl('photos/standard-row.png'),
    accent: 'mint',
  },
  {
    id: 'vip',
    name: 'VIP на двоих',
    shortName: 'VIP',
    eyebrow: 'Играть своей парой',
    description: 'Два места рядом в камерной зоне — для дуо, кооператива и спокойной игровой сессии.',
    cpu: 'Два игровых места',
    gpu: 'Персональные станции',
    display: 'Два монитора',
    gear: 'Гарнитуры у каждого места',
    price: 200,
    available: ZONE_CAPACITIES.vip - occupiedSeatNumbers.vip.length,
    capacity: ZONE_CAPACITIES.vip,
    image: assetUrl('photos/vip-lounge.png'),
    accent: 'amber',
  },
  {
    id: 'team',
    name: 'Boot-Camp',
    shortName: 'Boot-Camp',
    eyebrow: 'Командный формат',
    description: 'Отдельный формат для командной игры и тренировок в общей игровой атмосфере клуба.',
    cpu: 'Командная зона',
    gpu: 'Игровые станции',
    display: 'Единая посадка',
    gear: 'Полный комплект периферии',
    price: 160,
    available: ZONE_CAPACITIES.team - occupiedSeatNumbers.team.length,
    capacity: ZONE_CAPACITIES.team,
    image: assetUrl('photos/bootcamp-rig.png'),
    accent: 'mint',
  },
]

export const TOTAL_GAMING_SEATS = Object.values(ZONE_CAPACITIES).reduce((total, capacity) => total + capacity, 0)

export const tariffs: Tariff[] = [
  { id: 'hour', name: '1 час', note: 'Быстрая сессия', standard: 130, vip: 200, suffix: '/ сессия' },
  { id: 'triple', name: '3 часа', note: 'Оптимальный пакет', standard: 350, vip: 510, suffix: '/ пакет', featured: true },
  { id: 'five', name: '5 часов', note: 'Для длинной игры', standard: 540, vip: 840, suffix: '/ пакет' },
  { id: 'night', name: 'Ночь', note: 'С 22:00 до 08:00', standard: 650, vip: 900, suffix: '/ ночь' },
]

export const perks = [
  ['Gauge', 'Игровые станции', 'Пронумерованные места в основном зале.'],
  ['Armchair', 'VIP на двоих', 'Отдельный формат для совместной игры.'],
  ['Users', 'Boot-Camp', 'Пространство для командной сессии.'],
  ['Headphones', 'Стримерская', 'Отдельное место с микрофоном и камерой.'],
  ['Gamepad2', 'TV-зона', 'Диван, большой экран и консольный формат.'],
  ['Clock3', 'Открыто 24/7', 'Клуб работает круглосуточно каждый день.'],
  ['Sparkles', 'Сине-бирюзовый свет', 'Фирменная атмосфера во всех залах.'],
  ['Wind', 'Зона отдыха', 'Можно сделать паузу между игровыми сессиями.'],
] as const

export const gallery = [
  { src: assetUrl('photos/reception.png'), title: 'Ресепшен', note: 'Входная стойка клуба «КЛИК»' },
  { src: assetUrl('photos/standard-row.png'), title: 'Основной зал', note: 'Ряд игровых станций Standard' },
  { src: assetUrl('photos/pc-closeup.png'), title: 'Системный блок', note: 'Холодная голубая подсветка станции' },
  { src: assetUrl('photos/tv-zone.png'), title: 'TV-зона', note: 'Большой экран, диван и консоль' },
  { src: assetUrl('photos/streaming-room.png'), title: 'Стримерская', note: 'Микрофон, камера и отдельное рабочее место' },
  { src: assetUrl('photos/exterior.png'), title: 'Вход в клуб', note: 'Черкасская улица, 58/2' },
  { src: assetUrl('photos/light-corridor.png'), title: 'Световой коридор', note: 'Фирменная навигация внутри клуба' },
  { src: assetUrl('photos/controllers.png'), title: 'Консольный формат', note: 'Геймпады в lounge-зоне' },
  { src: assetUrl('photos/level-up.png'), title: 'Level up', note: 'Неоновый акцент интерьера' },
  { src: assetUrl('photos/drinks.png'), title: 'Напитки и снеки', note: 'Холодильник и витрина у ресепшена' },
] as const

export const faqs = [
  ['Где находится клуб?', `${clubConfig.name} находится по адресу: ${clubConfig.addressFull}, Восточно-Кругликовский микрорайон.`],
  ['Клуб работает ночью?', `Да. По данным карточки 2ГИС клуб работает круглосуточно, ежедневно.`],
  ['Как забронировать место?', `Позвоните по номеру ${clubConfig.phoneLabel} или напишите клубу в Telegram или WhatsApp. Форма на этом сайте пока демонстрационная.`],
  ['Какие игровые форматы есть?', 'На фотографиях клуба и в меню указаны Standard, Boot-Camp, VIP на двоих, стримерская и TV-зона.'],
  ['Можно ли прийти без брони?', 'Наличие свободных мест лучше заранее уточнить у администратора клуба.'],
  ['Цены на сайте актуальны?', 'Тарифы перенесены с предоставленной фотографии меню. Перед визитом рекомендуем уточнить актуальную стоимость у администратора.'],
] as const

export const timeOptions = ['10:00', '12:00', '15:00', '18:00', '21:00', '23:00', '01:00', '04:00']
export const durationOptions = [1, 2, 3, 5, 8]

export const seatsByZone: Record<ZoneId, { id: string; occupied: boolean }[]> = {
  standard: Array.from({ length: ZONE_CAPACITIES.standard }, (_, index) => ({
    id: `S${String(index + 1).padStart(2, '0')}`,
    occupied: occupiedSeatNumbers.standard.includes(index + 1),
  })),
  vip: Array.from({ length: ZONE_CAPACITIES.vip }, (_, index) => ({
    id: `V${String(index + 1).padStart(2, '0')}`,
    occupied: occupiedSeatNumbers.vip.includes(index + 1),
  })),
  team: Array.from({ length: ZONE_CAPACITIES.team }, (_, index) => ({
    id: `B${String(index + 1).padStart(2, '0')}`,
    occupied: occupiedSeatNumbers.team.includes(index + 1),
  })),
}
