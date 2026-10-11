import {
  Armchair,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleDot,
  Clock3,
  Cpu,
  Gamepad2,
  Gauge,
  Headphones,
  MapPin,
  Menu,
  Monitor,
  MousePointer2,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  Wind,
  X,
  Zap,
} from 'lucide-react'
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { clubConfig } from './club.config'
import {
  TOTAL_GAMING_SEATS,
  branches,
  durationOptions,
  faqs,
  gallery,
  perks,
  seatsByZone,
  tariffs,
  timeOptions,
  zones,
  type ZoneId,
} from './data'

type DialogType = 'booking' | 'privacy' | 'terms' | null

const iconMap = {
  Gauge,
  Armchair,
  Wind,
  Sparkles,
  Users,
  Clock3,
  Gamepad2,
  Headphones,
}

const navItems = [
  ['Клуб', 'club'],
  ['Зоны', 'zones'],
  ['Бронирование', 'booking'],
  ['Цены', 'prices'],
  ['Галерея', 'gallery'],
  ['Контакты', 'contacts'],
] as const

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' }).format(date)
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').replace(/^8/, '7').slice(0, 11)
  const normalized = digits.startsWith('7') ? digits : `7${digits}`
  const parts = normalized.match(/^(7)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/)
  if (!parts) return '+7'
  let result = '+7'
  if (parts[2]) result += ` (${parts[2]}`
  if (parts[2].length === 3) result += ')'
  if (parts[3]) result += ` ${parts[3]}`
  if (parts[4]) result += `-${parts[4]}`
  if (parts[5]) result += `-${parts[5]}`
  return result
}

function Header() {
  const [open, setOpen] = useState(false)

  function navigate(id: string) {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header className="site-header">
      <a className="brand" href="#club" aria-label={`${clubConfig.name} — на главную`}>
        <span className="brand-mark" aria-hidden="true">{clubConfig.initials}</span>
        <span className="brand-word"><b>{clubConfig.brandPrimary}</b> {clubConfig.brandSecondary}<small>{clubConfig.city}</small></span>
      </a>
      <nav className="desktop-nav" aria-label="Основная навигация">
        {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <span className="open-status"><i /> Открыто {clubConfig.scheduleShort}</span>
        <button className="button button-compact" onClick={() => navigate('booking')}>Забронировать</button>
        <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Закрыть меню' : 'Открыть меню'}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav id="mobile-menu" className={`mobile-nav ${open ? 'is-open' : ''}`} aria-label="Мобильная навигация" aria-hidden={!open}>
        {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={17} aria-hidden="true" /></a>)}
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section id="club" className="hero section-shell">
      <div className="hero-media" aria-hidden="true">
        <img src={clubConfig.hero.image} alt="" width={clubConfig.hero.imageWidth} height={clubConfig.hero.imageHeight} fetchPriority="high" />
        <div className="hero-scan" />
      </div>
      <div className="hero-copy reveal-sequence">
        <p className="eyebrow"><span>01</span> {clubConfig.category} · {clubConfig.city}</p>
        <h1>{clubConfig.hero.lineOne}<br />{clubConfig.hero.lineTwo} <em>{clubConfig.hero.accent}</em></h1>
        <p className="hero-lead">{clubConfig.hero.lead}</p>
        <div className="hero-buttons">
          <a className="button" href="#booking">Выбрать место <ArrowDown size={18} aria-hidden="true" /></a>
          <a className="button button-ghost" href="#zones">Посмотреть зоны</a>
        </div>
      </div>
      <div className="hero-rail" aria-label="Ключевые преимущества">
        <div><b>{TOTAL_GAMING_SEATS}</b><span>Игровых станций</span></div>
        <div><b>05</b><span>Форматов игры</span></div>
        <div><b>24/7</b><span>Без выходных</span></div>
        <div><b>01</b><span>Адрес на Черкасской</span></div>
      </div>
      <div className="hero-index" aria-hidden="true">01 / 08</div>
    </section>
  )
}

function SectionHeading({ index, eyebrow, title, text, titleId }: { index: string; eyebrow: string; title: string; text?: string; titleId?: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow"><span>{index}</span> {eyebrow}</p>
      <div className="heading-row"><h2 id={titleId}>{title}</h2>{text ? <p>{text}</p> : null}</div>
    </div>
  )
}

function Zones() {
  return (
    <section id="zones" className="content-section section-shell">
      <SectionHeading index="02" eyebrow="Игровые форматы" title="Выбери свою зону" text="Standard для повседневной игры, VIP для дуо и Boot-Camp для командной сессии." />
      <div className="zone-grid">
        {zones.map((zone, index) => (
          <article className={`zone-card accent-${zone.accent}`} key={zone.id}>
            <div className="zone-visual">
              <img src={zone.image} alt={`Игровая зона ${zone.shortName} в клубе КЛИК`} width="1030" height="648" loading="lazy" />
              <span className="zone-number">0{index + 1}</span>
            </div>
            <div className="zone-content">
              <p>{zone.eyebrow}</p>
              <h3>{zone.name}</h3>
              <p className="zone-description">{zone.description}</p>
              <dl className="spec-list">
                <div><dt><Cpu size={17} aria-hidden="true" /> Формат</dt><dd>{zone.cpu}</dd></div>
                <div><dt><Zap size={17} aria-hidden="true" /> Станции</dt><dd>{zone.gpu}</dd></div>
                <div><dt><Monitor size={17} aria-hidden="true" /> Экран</dt><dd>{zone.display}</dd></div>
                <div><dt><MousePointer2 size={17} aria-hidden="true" /> Комплект</dt><dd>{zone.gear}</dd></div>
              </dl>
              <div className="zone-footer"><div><span>от</span><b>{zone.price.toLocaleString('ru-RU')} ₽</b><span>/ час</span></div><button className="icon-button" onClick={() => { scrollToId('booking'); window.setTimeout(() => window.dispatchEvent(new CustomEvent('select-zone', { detail: zone.id })), 450) }} aria-label={`Забронировать ${zone.shortName}`}><ArrowUpRight aria-hidden="true" /></button></div>
            </div>
          </article>
        ))}
      </div>
      <p className="demo-note"><CircleDot size={15} aria-hidden="true" /> Схема свободных мест демонстрационная. Фактическую доступность и конфигурацию уточняйте у администратора.</p>
    </section>
  )
}

type BookingState = {
  branch: string
  date: string
  time: string
  duration: number
  zone: ZoneId
  seat: string
}

function Booking({ onCheckout }: { onCheckout: (summary: BookingState & { total: number }) => void }) {
  const dates = useMemo(() => Array.from({ length: 5 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() + index)
    return {
      value: date.toISOString().slice(0, 10),
      label: index === 0 ? 'Сегодня' : formatDate(date),
      short: new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit' }).format(date),
    }
  }), [])
  const [booking, setBooking] = useState<BookingState>({ branch: branches[0].id, date: dates[0].value, time: '18:00', duration: 3, zone: 'standard', seat: '' })
  const currentZone = zones.find((zone) => zone.id === booking.zone) ?? zones[0]
  const noSeats = booking.time === '04:00' && booking.zone === 'team'
  const seats = noSeats ? seatsByZone[booking.zone].map((seat) => ({ ...seat, occupied: true })) : seatsByZone[booking.zone]
  const selectedBranch = branches.find((branch) => branch.id === booking.branch) ?? branches[0]
  const total = booking.zone === 'team' ? currentZone.price * Math.ceil(booking.duration / 3) : currentZone.price * booking.duration

  useEffect(() => {
    const handle = (event: Event) => {
      const zone = (event as CustomEvent<ZoneId>).detail
      setBooking((value) => ({ ...value, zone, seat: '' }))
    }
    window.addEventListener('select-zone', handle)
    return () => window.removeEventListener('select-zone', handle)
  }, [])

  function update<K extends keyof BookingState>(key: K, value: BookingState[K]) {
    setBooking((current) => ({ ...current, [key]: value, ...(key === 'zone' || key === 'time' ? { seat: '' } : {}) }))
  }

  return (
    <section id="booking" className="booking-section section-shell">
      <SectionHeading index="03" eyebrow="Демо-бронирование" title="Собери свою сессию" text="Выберите время, зону и место. Это интерактивный макет: реальная заявка не отправляется." />
      <div className="booking-layout">
        <div className="booking-panel">
          <div className="booking-group">
            <div className="group-title"><span>01</span><div><b>Локация</b><small>Где играем</small></div></div>
            <div className="choice-grid two">
              {branches.map((branch) => <button key={branch.id} className={booking.branch === branch.id ? 'choice is-selected' : 'choice'} onClick={() => update('branch', branch.id)}><MapPin size={18} aria-hidden="true" /><span><b>{branch.name}</b><small>{branch.note}</small></span>{booking.branch === branch.id ? <Check size={16} aria-hidden="true" /> : null}</button>)}
            </div>
          </div>
          <div className="booking-group">
            <div className="group-title"><span>02</span><div><b>Дата и время</b><small>Когда начинаем</small></div></div>
            <div className="date-scroll" aria-label="Выберите дату">
              {dates.map((date) => <button key={date.value} className={booking.date === date.value ? 'date-choice is-selected' : 'date-choice'} onClick={() => update('date', date.value)}><b>{date.label}</b><small>{date.short}</small></button>)}
            </div>
            <label className="select-label">Время начала<select value={booking.time} onChange={(event) => update('time', event.target.value)}>{timeOptions.map((time) => <option key={time}>{time}</option>)}</select></label>
            <div className="duration-row" aria-label="Продолжительность">
              {durationOptions.map((duration) => <button key={duration} className={booking.duration === duration ? 'duration is-selected' : 'duration'} onClick={() => update('duration', duration)}>{duration} ч</button>)}
            </div>
          </div>
          <div className="booking-group">
            <div className="group-title"><span>03</span><div><b>Игровая зона</b><small>Выберите уровень</small></div></div>
            <div className="zone-tabs" role="tablist" aria-label="Игровая зона">
              {zones.map((zone) => <button key={zone.id} role="tab" aria-selected={booking.zone === zone.id} className={booking.zone === zone.id ? 'is-selected' : ''} onClick={() => update('zone', zone.id)}><span>{zone.shortName}</span><small>от {zone.price} ₽</small></button>)}
            </div>
          </div>
          <div className="booking-group">
            <div className="group-title"><span>04</span><div><b>Место</b><small>{noSeats ? 'Нет свободных мест' : 'Нажмите на свободное место'}</small></div></div>
            <div className="seat-legend"><span><i className="free" /> Свободно</span><span><i className="busy" /> Занято</span><span><i className="selected" /> Выбрано</span></div>
            {noSeats ? (
              <div className="empty-state"><Armchair aria-hidden="true" /><b>На это время всё занято</b><p>Попробуйте выбрать 01:00 или другую игровую зону.</p><button className="text-button" onClick={() => update('time', '01:00')}>Показать места на 01:00 <ArrowRight size={16} aria-hidden="true" /></button></div>
            ) : (
              <div className={`seat-map seat-map-${booking.zone}`}>
                <div className="seat-map-label">Экран / игровая зона</div>
                <div className="seats">
                  {seats.map((seat) => <button key={seat.id} disabled={seat.occupied} aria-label={`${seat.id}, ${seat.occupied ? 'занято' : booking.seat === seat.id ? 'выбрано' : 'свободно'}`} className={`${seat.occupied ? 'is-occupied' : ''} ${booking.seat === seat.id ? 'is-selected' : ''}`} onClick={() => update('seat', seat.id)}><Monitor size={booking.zone === 'team' ? 24 : 17} aria-hidden="true" /><span>{seat.id}</span></button>)}
                </div>
              </div>
            )}
          </div>
        </div>
        <aside className="booking-summary">
          <p className="eyebrow"><span>Итог</span> Ваша сессия</p>
          <div className="summary-zone"><img src={currentZone.image} alt="" width="900" height="600" /><div><small>Зона</small><b>{currentZone.name}</b></div></div>
          <dl>
            <div><dt>Филиал</dt><dd>{selectedBranch.name}</dd></div>
            <div><dt>Дата</dt><dd>{dates.find((date) => date.value === booking.date)?.label}</dd></div>
            <div><dt>Старт</dt><dd>{booking.time}</dd></div>
            <div><dt>Сессия</dt><dd>{booking.duration} ч</dd></div>
            <div><dt>Место</dt><dd>{booking.seat || 'Не выбрано'}</dd></div>
          </dl>
          <div className="bonus-row"><Sparkles size={18} aria-hidden="true" /><span><b>Демо-расчёт</b><small>реальную стоимость подтвердит администратор</small></span></div>
          <div className="total-row"><span>Итого</span><b>{total.toLocaleString('ru-RU')} ₽</b></div>
          <button className="button summary-button" disabled={!booking.seat} onClick={() => onCheckout({ ...booking, total })}>{booking.seat ? 'Подтвердить бронь' : 'Сначала выберите место'} <ArrowRight size={18} aria-hidden="true" /></button>
          <small className="summary-disclaimer">Демонстрация: оплата и отправка данных отключены.</small>
        </aside>
      </div>
    </section>
  )
}

function Pricing() {
  const [mode, setMode] = useState<'standard' | 'vip'>('standard')
  return (
    <section id="prices" className="content-section section-shell">
      <SectionHeading index="04" eyebrow="Тарифы" title="Выбирай темп" text="Цены перенесены с предоставленной фотографии меню клуба. Перед визитом уточните актуальность у администратора." />
      <div className="pricing-switch" role="group" aria-label="Категория тарифа"><button className={mode === 'standard' ? 'is-selected' : ''} onClick={() => setMode('standard')}>Standard</button><button className={mode === 'vip' ? 'is-selected' : ''} onClick={() => setMode('vip')}>VIP</button></div>
      <div className="pricing-grid">
        {tariffs.map((tariff) => <article key={tariff.id} className={tariff.featured ? 'price-card is-featured' : 'price-card'}>{tariff.featured ? <span className="price-badge">Выгодный выбор</span> : null}<p>{tariff.note}</p><h3>{tariff.name}</h3><div className="price"><b>{tariff[mode].toLocaleString('ru-RU')} ₽</b><span>{tariff.suffix}</span></div><ul><li><Check aria-hidden="true" /> Бронирование места</li><li><Check aria-hidden="true" /> Игровая периферия</li><li><Check aria-hidden="true" /> Поддержка администратора</li></ul><button className="button button-ghost" onClick={() => scrollToId('booking')}>Выбрать пакет</button></article>)}
      </div>
    </section>
  )
}

function Promotions() {
  return (
    <section className="promo-section section-shell" aria-labelledby="promo-title">
      <div className="promo-main"><div><p className="eyebrow"><span>05</span> Больше, чем ПК-зал</p><h2 id="promo-title">Переключай<br /><em>формат игры.</em></h2><p>В «КЛИК» есть стримерская, TV-зона и lounge-пространство — для эфира, консоли или паузы между матчами.</p></div><a className="button button-dark" href={clubConfig.links.telegramChannel} target="_blank" rel="noreferrer">Открыть Telegram <ArrowUpRight size={18} aria-hidden="true" /></a><div className="promo-orbit" aria-hidden="true"><span>05</span></div></div>
      <div className="mini-promos"><article><span>TV</span><h3>Консольная зона</h3><p>Большой экран, диван и геймпады для совместной игры.</p></article><article><span>Live</span><h3>Стримерская</h3><p>Отдельное место с микрофоном, камерой и широким монитором.</p></article></div>
      <p className="demo-note"><CircleDot size={15} aria-hidden="true" /> Наличие свободной зоны и условия бронирования уточняйте у клуба.</p>
    </section>
  )
}

function Advantages() {
  return (
    <section className="content-section section-shell" aria-labelledby="advantages-title">
      <SectionHeading index="06" eyebrow={`Пространство ${clubConfig.name}`} title="Всё для своего сценария" titleId="advantages-title" />
      <div className="perks-grid">
        {perks.map(([icon, title, text], index) => {
          const Icon = iconMap[icon]
          return <article key={title}><span>0{index + 1}</span><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>
        })}
      </div>
    </section>
  )
}

function Gallery() {
  const [active, setActive] = useState<number | null>(null)
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (active === null) return
    const previous = document.activeElement as HTMLElement | null
    document.body.classList.add('no-scroll')
    closeButton.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null)
      if (event.key === 'ArrowRight') setActive((value) => value === null ? 0 : (value + 1) % gallery.length)
      if (event.key === 'ArrowLeft') setActive((value) => value === null ? 0 : (value - 1 + gallery.length) % gallery.length)
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.classList.remove('no-scroll'); window.removeEventListener('keydown', onKey); previous?.focus() }
  }, [active])

  return (
    <section id="gallery" className="content-section section-shell">
      <SectionHeading index="07" eyebrow="Пространство" title="Загляни внутрь" text={`Фотографии ${clubConfig.name}: игровые места, оборудование, фирменное освещение, ресепшен и входная зона.`} />
      <div className="gallery-grid">
        {gallery.map((item, index) => <button key={item.src} className={`gallery-item gallery-item-${index + 1}`} onClick={() => setActive(index)}><img src={item.src} alt={item.title} width="1030" height="648" loading="lazy" /><span><b>{item.title}</b><small>{item.note}</small></span><ArrowUpRight aria-hidden="true" /></button>)}
      </div>
      {active !== null ? createPortal(<div className="lightbox" role="dialog" aria-modal="true" aria-label={`Просмотр: ${gallery[active].title}`} onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null) }}><button ref={closeButton} className="lightbox-close" onClick={() => setActive(null)} aria-label="Закрыть изображение"><X aria-hidden="true" /></button><button className="lightbox-arrow prev" onClick={() => setActive((active - 1 + gallery.length) % gallery.length)} aria-label="Предыдущее изображение"><ArrowLeft aria-hidden="true" /></button><figure><img src={gallery[active].src} alt={gallery[active].title} width="1030" height="648" /><figcaption><b>{gallery[active].title}</b><span>{gallery[active].note}</span></figcaption></figure><button className="lightbox-arrow next" onClick={() => setActive((active + 1) % gallery.length)} aria-label="Следующее изображение"><ArrowRight aria-hidden="true" /></button></div>, document.body) : null}
    </section>
  )
}

function Faq() {
  const [active, setActive] = useState(0)
  return (
    <section className="content-section section-shell faq-section" aria-labelledby="faq-title">
      <SectionHeading index="FAQ" eyebrow="Перед визитом" title="Всё важное — сразу" titleId="faq-title" />
      <div className="faq-list">
        {faqs.map(([question, answer], index) => <div className={active === index ? 'faq-item is-open' : 'faq-item'} key={question}><h3><button aria-expanded={active === index} aria-controls={`faq-${index}`} onClick={() => setActive(active === index ? -1 : index)}><span>{String(index + 1).padStart(2, '0')}</span>{question}<ChevronDown aria-hidden="true" /></button></h3><div id={`faq-${index}`} className="faq-answer" role="region" aria-hidden={active !== index}><div><p>{answer}</p></div></div></div>)}
      </div>
    </section>
  )
}

function Contacts() {
  return (
    <section id="contacts" className="contact-section section-shell">
      <div className="contact-map" aria-label={`Стилизованная схема расположения ${clubConfig.name}`}><div className="map-grid" /><div className="map-road road-one">{clubConfig.addressShort}</div><div className="map-road road-two">{clubConfig.districtLabel}</div><div className="map-pin"><span>{clubConfig.initials}</span><b>{clubConfig.name}</b><small>{clubConfig.addressShort}</small></div></div>
      <div className="contact-copy"><p className="eyebrow"><span>08</span> Контакты</p><h2>До встречи<br />в <em>{clubConfig.name}</em></h2><dl><div><dt><MapPin aria-hidden="true" /> Адрес</dt><dd>{clubConfig.addressFull}</dd></div><div><dt><Clock3 aria-hidden="true" /> Режим</dt><dd>{clubConfig.scheduleFull}</dd></div><div><dt><Phone aria-hidden="true" /> Телефон</dt><dd><a href={clubConfig.phoneHref}>{clubConfig.phoneLabel}</a></dd></div></dl><div className="contact-actions"><a className="button" href={clubConfig.links.twoGis} target="_blank" rel="noreferrer">Построить маршрут <ArrowUpRight size={18} aria-hidden="true" /></a><a className="button button-ghost" href={clubConfig.links.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a className="button button-ghost" href={clubConfig.phoneHref}>Позвонить</a></div></div>
    </section>
  )
}

function Footer({ openLegal }: { openLegal: (type: DialogType) => void }) {
  return (
    <footer className="footer section-shell"><div className="footer-main"><div className="brand footer-brand"><span className="brand-mark">{clubConfig.initials}</span><span className="brand-word"><b>{clubConfig.brandPrimary}</b> {clubConfig.brandSecondary}<small>{clubConfig.slogan}</small></span></div><p>Сайт-концепт компьютерного клуба «КЛИК». Контакты и адрес сверены с карточкой 2ГИС; бронирование остаётся демонстрационным.</p><a className="button" href={clubConfig.links.telegramChannel} target="_blank" rel="noreferrer">Написать клубу</a></div><div className="footer-grid"><nav aria-label="Навигация в подвале">{navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><div><b>Контакты</b><a href={clubConfig.links.telegramChannel} target="_blank" rel="noreferrer">Telegram-канал <ArrowUpRight size={14} aria-hidden="true" /></a><a href={clubConfig.links.whatsapp} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14} aria-hidden="true" /></a><a href={clubConfig.links.twoGis} target="_blank" rel="noreferrer">2ГИС <ArrowUpRight size={14} aria-hidden="true" /></a></div><div><b>Документы</b><button onClick={() => openLegal('privacy')}>Политика конфиденциальности</button><button onClick={() => openLegal('terms')}>Пользовательское соглашение</button></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {clubConfig.name} · Демонстрационный макет</span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Наверх <ArrowUpRight size={14} aria-hidden="true" /></button></div></footer>
  )
}

function CheckoutDialog({ booking, onClose, onSuccess }: { booking: (BookingState & { total: number }) | null; onClose: () => void; onSuccess: (order: string) => void }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+7')
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const [loading, setLoading] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!booking) return
    const previous = document.activeElement as HTMLElement | null
    document.body.classList.add('no-scroll')
    closeRef.current?.focus()
    const handle = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', handle)
    return () => { document.body.classList.remove('no-scroll'); window.removeEventListener('keydown', handle); previous?.focus() }
  }, [booking, onClose])

  if (!booking) return null

  function submit(event: FormEvent) {
    event.preventDefault()
    const nextErrors: { name?: string; phone?: string } = {}
    if (name.trim().length < 2) nextErrors.name = 'Введите имя — минимум 2 символа'
    if (phone.replace(/\D/g, '').length !== 11) nextErrors.phone = 'Введите номер полностью'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      window.requestAnimationFrame(() => (nextErrors.name ? nameRef.current : phoneRef.current)?.focus())
      return
    }
    setLoading(true)
    window.setTimeout(() => onSuccess(`CLICK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`), 850)
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !loading) onClose() }}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title"><button ref={closeRef} className="modal-close" onClick={onClose} disabled={loading} aria-label="Закрыть"><X aria-hidden="true" /></button><p className="eyebrow"><span>Финал</span> Демо-бронирование</p><h2 id="checkout-title">Куда отправить бронь?</h2><p>Данные останутся только в браузере и не будут отправлены.</p><div className="checkout-chip"><ShieldCheck aria-hidden="true" /><div><b>{booking.seat} · {zones.find((zone) => zone.id === booking.zone)?.shortName}</b><span>{booking.date} в {booking.time} · {booking.total.toLocaleString('ru-RU')} ₽</span></div></div><form onSubmit={submit} noValidate><label>Ваше имя<input ref={nameRef} name="name" type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Например, Алексей…" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name ? <span id="name-error" className="field-error" role="alert">{errors.name}</span> : null}</label><label>Телефон<input ref={phoneRef} name="phone" type="tel" value={phone} onChange={(event) => setPhone(formatPhone(event.target.value))} placeholder="Например, +7 (999) 000-00-00…" inputMode="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />{errors.phone ? <span id="phone-error" className="field-error" role="alert">{errors.phone}</span> : null}</label><button className="button submit-button" disabled={loading}>{loading ? <><span className="spinner" aria-hidden="true" /> Создаём демо-бронь…</> : <>Подтвердить <ArrowRight size={18} aria-hidden="true" /></>}</button></form></div></div>
  )
}

function LegalDialog({ type, onClose }: { type: Exclude<DialogType, 'booking' | null>; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    document.body.classList.add('no-scroll')
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.classList.remove('no-scroll'); window.removeEventListener('keydown', onKey) }
  }, [onClose])
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><article className="modal legal-modal" role="dialog" aria-modal="true" aria-labelledby="legal-title"><button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Закрыть"><X aria-hidden="true" /></button><p className="eyebrow"><span>Документ</span> Демонстрационная версия</p><h2 id="legal-title">{type === 'privacy' ? 'Политика конфиденциальности' : 'Пользовательское соглашение'}</h2>{type === 'privacy' ? <><p>Этот демонстрационный сайт не передаёт и не сохраняет персональные данные на сервере. Имя и телефон используются только для показа пользовательского сценария внутри текущей вкладки.</p><h3>Перед публикацией</h3><p>Необходимо подготовить юридически корректную политику, указать оператора данных, цели обработки, сроки хранения и контакты для обращений.</p></> : <><p>Все функции бронирования и оплаты на сайте являются демонстрационными. Созданный номер заказа не подтверждает реальную бронь игрового места.</p><h3>Перед публикацией</h3><p>Нужно добавить реальные правила клуба, порядок оплаты и отмены, возрастные ограничения и ответственность сторон.</p></>}<button className="button" onClick={onClose}>Понятно</button></article></div>
}

function SuccessDialog({ order, onClose }: { order: string; onClose: () => void }) {
  return <div className="modal-backdrop"><div className="modal success-modal" role="dialog" aria-modal="true" aria-labelledby="success-title"><div className="success-mark"><Check aria-hidden="true" /></div><p className="eyebrow"><span>Готово</span> Демонстрация</p><h2 id="success-title">Место условно твоё</h2><p>Мы показали успешный сценарий. Реальная бронь и сообщение администратору не создавались.</p><div className="order-number"><span>Номер демо-заказа</span><b>{order}</b></div><button className="button" onClick={onClose}>Вернуться на сайт</button></div></div>
}

function Toast({ message }: { message: string }) {
  return <div className="toast" role="status"><Check size={17} aria-hidden="true" /> {message}</div>
}

function App() {
  const [checkout, setCheckout] = useState<(BookingState & { total: number }) | null>(null)
  const [legal, setLegal] = useState<Exclude<DialogType, 'booking' | null> | null>(null)
  const [order, setOrder] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 2800)
    return () => window.clearTimeout(timer)
  }, [toast])

  function completed(value: string) {
    setCheckout(null)
    setOrder(value)
    setToast('Демо-бронирование создано')
  }

  return (
    <>
      <a className="skip-link" href="#main">К основному содержимому</a>
      <Header />
      <main id="main">
        <Hero />
        <Zones />
        <Booking onCheckout={setCheckout} />
        <Pricing />
        <Promotions />
        <Advantages />
        <Gallery />
        <Faq />
        <Contacts />
      </main>
      <Footer openLegal={(type) => { if (type === 'privacy' || type === 'terms') setLegal(type) }} />
      <button className="mobile-booking" onClick={() => scrollToId('booking')}><span><small>Быстрая бронь</small><b>Выбрать место</b></span><ArrowUpRight aria-hidden="true" /></button>
      <CheckoutDialog booking={checkout} onClose={() => setCheckout(null)} onSuccess={completed} />
      {legal ? <LegalDialog type={legal} onClose={() => setLegal(null)} /> : null}
      {order ? <SuccessDialog order={order} onClose={() => setOrder('')} /> : null}
      {toast ? <Toast message={toast} /> : null}
    </>
  )
}

export default App
