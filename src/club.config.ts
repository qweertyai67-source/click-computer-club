export const assetUrl = (path: string) => `./${path}`

export const clubConfig = {
  name: 'КЛИК',
  brandPrimary: 'КЛИК',
  brandSecondary: 'computer club',
  initials: 'К',
  slogan: 'Level up your night',
  category: 'Компьютерный клуб',
  city: 'Краснодар',
  addressShort: 'Черкасская, 58/2',
  addressFull: 'Краснодар, Черкасская улица, 58/2',
  districtLabel: 'Восточно-Кругликовский м-н',
  scheduleShort: '24/7',
  scheduleFull: 'Круглосуточно, ежедневно',
  phoneLabel: '+7 993 321-50-10',
  phoneHref: 'tel:+79933215010',
  hero: {
    lineOne: 'Нажми',
    lineTwo: 'на игру',
    accent: 'сейчас',
    lead: 'Компьютерный клуб на Черкасской: игровые станции, Boot-Camp, VIP на двоих, стримерская и TV-зона — круглосуточно.',
    image: assetUrl('photos/hero-main-hall.png'),
    imageWidth: 1030,
    imageHeight: 648,
  },
  links: {
    twoGis: 'https://2gis.ru/krasnodar/firm/70000001102893034',
    telegramChannel: 'https://t.me/click_krd',
    telegram: 'https://t.me/+79933215010',
    whatsapp: 'https://wa.me/79933215010',
  },
} as const
