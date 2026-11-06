import { useEffect, useState } from "react"

// ─── Brand tokens ─────────────────────────────────────────────────────────────

const T = {
  purple: "#7C3AED",
  purpleDk: "#5B21B6",
  purpleLt: "#EDE9FE",
  purpleSoft: "#F5F3FF",
  orange: "#F97316",
  orangeLt: "#FFF7ED",
  green: "#10B981",
  greenLt: "#ECFDF5",
  bg: "#FFFFFF",
  surface: "#F9F8FD",
  text: "#1E1B4B",
  muted: "#6B7280",
  border: "#E5E7EB",
  shadow: "rgba(124,58,237,0.09)",
}

type IconName = "arrowRight" | "bell" | "briefcase" | "broccoli" | "building" | "calendar" | "cart" | "check" | "cheese" | "chef" | "chicken" | "chevronDown" | "clock" | "droplet" | "eye" | "eyeOff" | "filter" | "fire" | "heart" | "home" | "info" | "leaf" | "lock" | "mail" | "map" | "milk" | "onion" | "package" | "pepper" | "pin" | "profile" | "rice" | "search" | "shield" | "scan" | "sparkle" | "star" | "store" | "strawberry" | "tree" | "users" | "wallet" | "plus" | "share" | "navigation" | "bookmark" | "phone" | "x" | "camera"

function Icon({
  name,
  size = 20,
  color = "currentColor",
  strokeWidth = 1.8,
}: {
  name: IconName
  size?: number
  color?: string
  strokeWidth?: number
}) {
  const common = {
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }
  const paths: Record<IconName, React.ReactNode> = {
    arrowRight: (
      <>
        <path {...common} d="M5 12h14M14 7l5 5-5 5" />
      </>
    ),
    chevronDown: <path {...common} d="m7 10 5 5 5-5" />,
    check: <path {...common} d="m5 12 4 4L19 6" />,
    mail: (
      <>
        <rect {...common} x="3" y="5" width="18" height="14" rx="3" />
        <path {...common} d="m4 7 8 6 8-6" />
      </>
    ),
    calendar: (
      <>
        <rect {...common} x="3" y="5" width="18" height="16" rx="3" />
        <path
          {...common}
          d="M8 3v4M16 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"
        />
      </>
    ),
    briefcase: (
      <>
        <rect {...common} x="3" y="7" width="18" height="13" rx="3" />
        <path {...common} d="M9 7V4h6v3M3 12h18M10 12v2h4v-2" />
      </>
    ),
    wallet: (
      <>
        <path
          {...common}
          d="M4 5h14a2 2 0 0 1 2 2v12H5a3 3 0 0 1-3-3V7a2 2 0 0 1 2-2Z"
        />
        <path {...common} d="M2 8h16M15 12h7v5h-7a2.5 2.5 0 0 1 0-5Z" />
      </>
    ),
    filter: (
      <>
        <path {...common} d="M4 6h16M7 12h10M10 18h4" />
        <circle cx="8" cy="6" r="1.5" fill={color} />
        <circle cx="15" cy="12" r="1.5" fill={color} />
        <circle cx="12" cy="18" r="1.5" fill={color} />
      </>
    ),
    fire: (
      <path
        {...common}
        d="M13 2c1 5-3 5-1 9 1-2 3-3 5-4 2 3 3 5 3 8a8 8 0 1 1-16 0c0-4 2-7 6-10 0 3 1 4 3 5 2-3 1-5 0-8Z"
      />
    ),
    scan: (
      <>
        <path {...common} d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M7 12h10" />
      </>
    ),
    home: (
      <>
        <path {...common} d="M3 11.5 12 4l9 7.5" />
        <path {...common} d="M5.5 10v10h13V10M9.5 20v-6h5v6" />
      </>
    ),
    map: (
      <>
        <path {...common} d="m3 6 5-2 8 3 5-2v13l-5 2-8-3-5 2Z" />
        <path {...common} d="M8 4v13M16 7v13" />
      </>
    ),
    chef: (
      <>
        <path
          {...common}
          d="M7 10a4 4 0 0 1 1-7.8A4.8 4.8 0 0 1 16 3a3.7 3.7 0 0 1 1 7"
        />
        <path {...common} d="M7 10v4h10v-4M8 18h8M9 14v4M15 14v4" />
      </>
    ),
    users: (
      <>
        <circle {...common} cx="9" cy="8" r="3" />
        <circle {...common} cx="17" cy="9" r="2.5" />
        <path
          {...common}
          d="M3.5 20v-2a5.5 5.5 0 0 1 11 0v2M14 14.5a4.5 4.5 0 0 1 6.5 4V20"
        />
      </>
    ),
    profile: (
      <>
        <circle {...common} cx="12" cy="8" r="4" />
        <path {...common} d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </>
    ),
    lock: (
      <>
        <rect {...common} x="5" y="10" width="14" height="11" rx="3" />
        <path {...common} d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </>
    ),
    pin: (
      <>
        <path {...common} d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle {...common} cx="12" cy="10" r="2.5" />
      </>
    ),
    search: (
      <>
        <circle {...common} cx="10.5" cy="10.5" r="6.5" />
        <path {...common} d="m16 16 5 5" />
      </>
    ),
    bell: (
      <>
        <path
          {...common}
          d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"
        />
      </>
    ),
    heart: (
      <path
        {...common}
        d="M20.8 5.7a5.5 5.5 0 0 0-7.8 0L12 6.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z"
      />
    ),
    info: (
      <>
        <circle {...common} cx="12" cy="12" r="9" />
        <path {...common} d="M12 11v6M12 7h.01" />
      </>
    ),
    plus: <path {...common} d="M12 5v14M5 12h14" />,
    x: <path {...common} d="m6 6 12 12M18 6 6 18" />,
    share: (
      <>
        <circle {...common} cx="18" cy="5" r="3" />
        <circle {...common} cx="6" cy="12" r="3" />
        <circle {...common} cx="18" cy="19" r="3" />
        <path {...common} d="m8.7 10.7 6.6-4.2M8.7 13.3l6.6 4.2" />
      </>
    ),
    navigation: <path {...common} d="m3 11 18-8-8 18-2-8-8-2Z" />,
    bookmark: <path {...common} d="M6 3h12v18l-6-4-6 4Z" />,
    phone: (
      <path
        {...common}
        d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-1.5 2.5a14 14 0 0 1-8-8L9 8Z"
      />
    ),
    camera: (
      <>
        <rect {...common} x="3" y="6" width="18" height="14" rx="3" />
        <circle {...common} cx="12" cy="13" r="4" />
        <path {...common} d="m8 6 1.5-2h5L16 6" />
      </>
    ),
    eye: (
      <>
        <path
          {...common}
          d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
        />
        <circle {...common} cx="12" cy="12" r="2.5" />
      </>
    ),
    eyeOff: (
      <>
        <path
          {...common}
          d="m3 3 18 18M10.5 6.2A10.8 10.8 0 0 1 12 6c6 0 9.5 6 9.5 6a15 15 0 0 1-2.1 2.8M6.6 6.6C4 8.4 2.5 12 2.5 12s3.5 6 9.5 6a9 9 0 0 0 3-.5M9.9 9.9a3 3 0 0 0 4.2 4.2"
        />
      </>
    ),
    shield: (
      <>
        <path
          {...common}
          d="M12 2 4.5 5v6c0 5 3.2 8.5 7.5 11 4.3-2.5 7.5-6 7.5-11V5Z"
        />
        <path {...common} d="m8.5 12 2.2 2.2 4.8-5" />
      </>
    ),
    sparkle: (
      <>
        <path
          {...common}
          d="m12 2 1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5ZM19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7Z"
        />
      </>
    ),
    store: (
      <>
        <path {...common} d="M4 9v11h16V9M3 9l2-6h14l2 6" />
        <path
          {...common}
          d="M3 9a3 3 0 0 0 5 2 3 3 0 0 0 4 0 3 3 0 0 0 4 0 3 3 0 0 0 5-2M9 20v-5h6v5"
        />
      </>
    ),
    building: (
      <>
        <rect {...common} x="4" y="3" width="16" height="18" rx="2" />
        <path {...common} d="M8 7h2M14 7h2M8 11h2M14 11h2M9 21v-5h6v5" />
      </>
    ),
    cart: (
      <>
        <path {...common} d="M3 4h2l2.2 10h10.9l2-7H6" />
        <circle {...common} cx="9" cy="19" r="1.5" />
        <circle {...common} cx="18" cy="19" r="1.5" />
      </>
    ),
    tree: (
      <>
        <path {...common} d="M12 13v9" />
        <path
          {...common}
          d="M12 3a5 5 0 0 0-4.7 3.3A4.5 4.5 0 0 0 8.5 15h7a4 4 0 0 0 1-7.9A5 5 0 0 0 12 3Z"
        />
      </>
    ),
    package: (
      <>
        <path {...common} d="m4 7 8-4 8 4-8 4Z" />
        <path {...common} d="M4 7v10l8 4 8-4V7M12 11v10M8 5l8 4" />
      </>
    ),
    clock: (
      <>
        <circle {...common} cx="12" cy="12" r="9" />
        <path {...common} d="M12 7v5l3 2" />
      </>
    ),
    star: (
      <path
        {...common}
        d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"
      />
    ),
    leaf: (
      <>
        <path {...common} d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16Z" />
        <path {...common} d="M4 21c3-6 7-9 12-12" />
      </>
    ),
    droplet: (
      <path {...common} d="M12 3S6 10 6 15a6 6 0 0 0 12 0c0-5-6-12-6-12Z" />
    ),
    milk: (
      <>
        <path {...common} d="m8 3 8 0 2 5v13H6V8Z" />
        <path {...common} d="m8 3-2 5h12M9 12c2-2 4 2 6 0v5c-2 2-4-2-6 0Z" />
      </>
    ),
    onion: (
      <>
        <path
          {...common}
          d="M12 5c-1.5 3-6 5-6 10a6 6 0 0 0 12 0c0-5-4.5-7-6-10Z"
        />
        <path {...common} d="M12 5V2M12 5 9 3M12 5l3-2M9 11c-1 3 0 6 3 8" />
      </>
    ),
    rice: (
      <>
        <path {...common} d="M4 11h16a8 8 0 0 1-16 0Z" />
        <path {...common} d="M7 10c1-5 9-5 10 0M9 6l1-3M13 6l1-3" />
      </>
    ),
    strawberry: (
      <>
        <path {...common} d="M7 8c-1 7 2 12 5 14 3-2 6-7 5-14Z" />
        <path
          {...common}
          d="m7 8 3-1 2-3 2 3 3 1M9 12h.01M14 11h.01M12 16h.01"
        />
      </>
    ),
    chicken: (
      <>
        <path {...common} d="M14 5c-4-1-8 3-7 7s6 5 9 2c2-2 2-7-2-9Z" />
        <path {...common} d="m8 15-3 3M5 18l-2-1M5 18l1 2" />
      </>
    ),
    pepper: (
      <>
        <path
          {...common}
          d="M11 6c-5 0-7 4-6 9s5 7 8 4c3 3 7 1 7-5 0-5-4-8-9-8Z"
        />
        <path {...common} d="M11 6c0-2 1-3 3-4M12 8v10" />
      </>
    ),
    cheese: (
      <>
        <path {...common} d="M4 10 16 4l4 6v10H4Z" />
        <path {...common} d="M4 10h16" />
        <circle {...common} cx="10" cy="14" r="1.5" />
        <circle {...common} cx="16" cy="17" r="1" />
      </>
    ),
    broccoli: (
      <>
        <path {...common} d="M10 10v11M14 10v11M9 21h7" />
        <circle {...common} cx="8" cy="8" r="4" />
        <circle {...common} cx="14" cy="6" r="4" />
        <circle {...common} cx="17" cy="10" r="4" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ display: "block", flexShrink: 0 }}
    >
      {paths[name]}
    </svg>
  )
}

// ─── Static data ──────────────────────────────────────────────────────────────

type Offer = {
  icon: IconName
  grad: string
  photo: string
  product: string
  store: string
  pct: number
  dist: string
  price: string
  orig: string
}

const OFFERS: Offer[] = [
  {
    icon: "droplet",
    grad: "linear-gradient(135deg,#EDE9FE,#DDD6FE)",
    photo:
      "https://images.unsplash.com/photo-1687293375398-65aadbb792d1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=600",
    product: "Protector solar facial 50ml",
    store: "Farmacia San Pablo",
    pct: 30,
    dist: "0.4km",
    price: "$189",
    orig: "$270",
  },
  {
    icon: "heart",
    grad: "linear-gradient(135deg,#FFF7ED,#FED7AA)",
    photo:
      "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=600",
    product: "Premios naturales para perro",
    store: "Pet House Local",
    pct: 25,
    dist: "0.8km",
    price: "$89",
    orig: "$119",
  },
  {
    icon: "package",
    grad: "linear-gradient(135deg,#F5F3FF,#EDE9FE)",
    photo:
      "https://images.unsplash.com/photo-1576602976047-174e57a47881?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=600",
    product: "Organizador modular para hogar",
    store: "Casa Práctica",
    pct: 20,
    dist: "1.1km",
    price: "$159",
    orig: "$199",
  },
  {
    icon: "sparkle",
    grad: "linear-gradient(135deg,#FFF7ED,#FFEDD5)",
    photo:
      "https://images.unsplash.com/photo-1784269273416-bb59288be8d4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=600",
    product: "Cable USB-C carga rápida",
    store: "Tecno Centro",
    pct: 40,
    dist: "1.6km",
    price: "$149",
    orig: "$249",
  },
]

const ML_OFFERS: Offer[] = [
  {
    icon: "chicken",
    grad: "linear-gradient(135deg,#FFF7ED,#FED7AA)",
    photo:
      "https://images.unsplash.com/photo-1566454825481-4e48f80aa4d7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=600",
    product: "Pollo Entero 1.5kg",
    store: "Chedraui",
    pct: 35,
    dist: "0.8km",
    price: "$89",
    orig: "$137",
  },
  {
    icon: "pepper",
    grad: "linear-gradient(135deg,#F5F3FF,#DDD6FE)",
    photo:
      "https://images.unsplash.com/photo-1642042313561-3b5b06125ff5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=600",
    product: "Pimientos Mixtos 500g",
    store: "Mercado Local",
    pct: 28,
    dist: "1.6km",
    price: "$22",
    orig: "$31",
  },
  {
    icon: "cheese",
    grad: "linear-gradient(135deg,#FFF7ED,#FFEDD5)",
    photo:
      "https://images.unsplash.com/photo-1595275522477-c3ce3ca9714b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=600",
    product: "Queso Oaxaca 400g",
    store: "Walmart Express",
    pct: 22,
    dist: "1.1km",
    price: "$62",
    orig: "$79",
  },
  {
    icon: "broccoli",
    grad: "linear-gradient(135deg,#EDE9FE,#DDD6FE)",
    photo:
      "https://images.unsplash.com/photo-1506617420156-8e4536971650?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=600",
    product: "Brócoli Orgánico 1kg",
    store: "Bodega Aurrera",
    pct: 33,
    dist: "0.4km",
    price: "$38",
    orig: "$57",
  },
]

const FRIENDS = [
  {
    name: "María G.",
    initials: "MG",
    color: "#DB2777",
    bg: "#FCE7F3",
    note: "3 ofertas compartidas",
  },
  {
    name: "Carlos R.",
    initials: "CR",
    color: "#2563EB",
    bg: "#DBEAFE",
    note: "Activo esta semana",
  },
  {
    name: "Sofía M.",
    initials: "SM",
    color: "#059669",
    bg: "#D1FAE5",
    note: "Vecina • compras juntas",
  },
  {
    name: "Luis V.",
    initials: "LV",
    color: "#EA580C",
    bg: "#FFEDD5",
    note: "Amigo de confianza",
  },
]

// ─── Micro-components ─────────────────────────────────────────────────────────

function Logo({ size = 32 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <img
        src="/logo.png"
        alt="Sensus"
        width={size}
        height={size}
        style={{ objectFit: "cover", display: "block" }}
      />
    </div>
  )
}

function StatusBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? "rgba(255,255,255,0.85)" : T.text
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 22px 6px",
        flexShrink: 0,
        position: "relative",
        zIndex: 30,
      }}
    >
      {/* Time */}
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: c,
          fontFamily: "var(--font-display)",
          width: 48,
        }}
      >
        9:41
      </span>

      {/* Dynamic Island */}
      <div
        style={{
          width: 106,
          height: 26,
          background: "#000000",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 8px",
          gap: 5,
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: "#12121e",
            border: "1px solid #222232",
          }}
        />
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#090912",
          }}
        />
      </div>

      {/* Status icons */}
      <div
        style={{
          display: "flex",
          gap: 6,
          alignItems: "center",
          width: 48,
          justifyContent: "flex-end",
        }}
      >
        {/* Signal */}
        <svg width="15" height="11" viewBox="0 0 17 12" fill={c}>
          <rect x="0" y="6" width="3" height="6" rx="1" />
          <rect x="4.5" y="4" width="3" height="8" rx="1" />
          <rect x="9" y="2" width="3" height="10" rx="1" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" />
        </svg>
        {/* Wifi */}
        <svg
          width="13"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <circle cx="12" cy="20" r="1" fill={c} />
        </svg>
        {/* Battery */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: `1.5px solid ${c}`,
            borderRadius: 3.5,
            padding: "1px",
            gap: 1,
            height: 11,
          }}
        >
          <div
            style={{
              width: 14,
              height: 6,
              background: T.green,
              borderRadius: 1,
            }}
          />
          <div
            style={{
              width: 2,
              height: 4,
              background: c,
              borderRadius: "0 1px 1px 0",
              marginRight: -2,
            }}
          />
        </div>
      </div>
    </div>
  )
}

function HomeIndicator({ dark = false }: { dark?: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 6,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 40,
      }}
    >
      <div
        style={{
          width: 130,
          height: 4.5,
          borderRadius: 3,
          background: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.25)",
        }}
      />
    </div>
  )
}

function BottomNav({
  active = "home",
  locked = false,
  onNavigate,
}: {
  active?: string
  locked?: boolean
  onNavigate?: (id: string) => void
}) {
  const items: { id: string; label: string; icon: IconName }[] = [
    { id: "home", label: "Inicio", icon: "home" },
    { id: "map", label: "Mapa", icon: "map" },
    { id: "chat", label: "Chef", icon: locked ? "lock" : "chef" },
    { id: "social", label: "Amigos", icon: locked ? "lock" : "users" },
    { id: "profile", label: "Perfil", icon: locked ? "lock" : "profile" },
  ]
  return (
    <div
      style={{
        display: "flex",
        borderTop: `1px solid ${T.border}`,
        background: T.bg,
        paddingBottom: 20,
        flexShrink: 0,
      }}
    >
      {items.map((item) => {
        const isActive = item.id === active
        const isLocked = locked && item.id !== "home" && item.id !== "map"
        return (
          <button
            key={item.id}
            onClick={() => !isLocked && onNavigate?.(item.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px 0 4px",
              gap: 2,
              opacity: isLocked ? 0.3 : 1,
              border: "none",
              background: "transparent",
              cursor: isLocked ? "default" : "pointer",
            }}
          >
            <Icon
              name={item.icon}
              size={20}
              color={isActive ? T.purple : T.muted}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: isActive ? 700 : 400,
                color: isActive ? T.purple : T.muted,
                fontFamily: "var(--font-sans)",
              }}
            >
              {item.label}
            </span>
            {isActive && (
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: T.purple,
                }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

function OfferCard({ o, onClick }: { o: Offer; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "white",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: `0 2px 16px ${T.shadow}`,
        flexShrink: 0,
        width: 150,
        cursor: onClick ? "pointer" : "default",
        position: "relative",
      }}
    >
      <div
        style={{
          height: 92,
          background: o.grad,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={o.photo}
          alt={o.product}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(transparent 45%,rgba(30,27,75,.25))",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: T.orange,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 10px rgba(249,115,22,0.45)",
          }}
        >
          <span
            style={{
              fontSize: 9,
              color: "white",
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            -{o.pct}%
          </span>
        </div>
      </div>
      <div style={{ padding: "8px 10px 10px" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: T.text,
            lineHeight: 1.35,
            marginBottom: 3,
            fontFamily: "var(--font-display)",
          }}
        >
          {o.product}
        </div>
        <div
          style={{
            fontSize: 10,
            color: T.muted,
            marginBottom: 5,
            fontFamily: "var(--font-sans)",
          }}
        >
          {o.store}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: T.orange,
                fontFamily: "var(--font-display)",
              }}
            >
              {o.price}
            </span>
            <span
              style={{
                fontSize: 9,
                color: T.muted,
                textDecoration: "line-through",
              }}
            >
              {o.orig}
            </span>
          </div>
          <span
            style={{
              fontSize: 9,
              color: T.muted,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Icon name="pin" size={10} color={T.muted} />
            {o.dist}
          </span>
        </div>
      </div>
    </div>
  )
}

function Av({ f, size = 36 }: { f: typeof FRIENDS[0]; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: f.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.33,
        fontWeight: 700,
        color: f.color,
        flexShrink: 0,
        border: "2px solid white",
        fontFamily: "var(--font-display)",
      }}
    >
      {f.initials}
    </div>
  )
}

// ─── City map SVG ─────────────────────────────────────────────────────────────

function CityMap() {
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", position: "relative" }}>
      <svg viewBox="0 0 340 175" style={{ width: "100%", display: "block" }}>
        <rect width="340" height="175" fill="#E8EDF5" />
        {/* Streets */}
        <rect x="0" y="78" width="340" height="11" fill="#CDD5E0" />
        <rect x="0" y="136" width="340" height="9" fill="#CDD5E0" />
        <rect x="0" y="22" width="340" height="9" fill="#CDD5E0" />
        <rect x="78" y="0" width="9" height="175" fill="#CDD5E0" />
        <rect x="176" y="0" width="9" height="175" fill="#CDD5E0" />
        <rect x="265" y="0" width="9" height="175" fill="#CDD5E0" />
        {/* Blocks */}
        {[
          [0, 31, 76, 45],
          [89, 31, 85, 45],
          [187, 31, 76, 45],
          [276, 31, 62, 45],
          [0, 91, 76, 43],
          [89, 91, 85, 43],
          [187, 91, 76, 43],
          [276, 91, 62, 43],
          [0, 147, 76, 28],
          [89, 147, 85, 28],
          [187, 147, 76, 28],
        ].map(([x, y, w, h], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            rx="2"
            fill="#F1F5F9"
          />
        ))}
        {/* Park */}
        <rect x="276" y="147" width="62" height="28" rx="2" fill="#D1FAE5" />
        <g
          transform="translate(301 151)"
          fill="none"
          stroke={T.green}
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <circle cx="6" cy="6" r="5" />
          <path d="M6 11v7M3 18h6" />
        </g>
        {/* Radius ring */}
        <circle
          cx="183"
          cy="84"
          r="68"
          fill="none"
          stroke={T.purple}
          strokeWidth="1.2"
          strokeDasharray="4 3"
          opacity="0.4"
        />
        {/* User pin */}
        <circle cx="183" cy="84" r="18" fill={T.purple} opacity="0.12" />
        <circle
          cx="183"
          cy="84"
          r="9"
          fill="white"
          stroke={T.purple}
          strokeWidth="2.5"
        />
        <circle cx="183" cy="84" r="4" fill={T.purple} />
        {/* Store pins */}
        {[
          [137, 62, "-30%"],
          [228, 112, "-25%"],
          [38, 112, "-20%"],
          [310, 62, "-40%"],
        ].map(([cx, cy, label], i) => (
          <g key={i}>
            <circle
              cx={cx as number}
              cy={cy as number}
              r="15"
              fill={T.orange}
              opacity="0.92"
            />
            <path
              d={`M${cx as number - 5} ${cy as number - 8}h10l2 5h-14Z`}
              fill="none"
              stroke="white"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d={`M${cx as number - 5} ${cy as number - 3}v5h10v-5`}
              fill="none"
              stroke="white"
              strokeWidth="1.2"
            />
            <text
              x={cx as number}
              y={cy as number + 9}
              textAnchor="middle"
              fontSize="7.5"
              fill="white"
              fontWeight="800"
            >
              {label}
            </text>
          </g>
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          bottom: 8,
          right: 8,
          background: "white",
          borderRadius: 8,
          padding: "4px 8px",
          fontSize: 10,
          color: T.muted,
          fontFamily: "var(--font-sans)",
          boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
        }}
      >
        Radio 2km
      </div>
    </div>
  )
}

// ─── Screen 1: Splash ─────────────────────────────────────────────────────────

function ScreenSplash({
  onNext,
  onRegister,
  onLogin,
}: {
  onNext: () => void
  onRegister?: () => void
  onLogin?: () => void
}) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <StatusBar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 32px 32px",
          position: "relative",
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -70,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: T.purpleLt,
            opacity: 0.45,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -70,
            left: -60,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "#FFF7ED",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: -30,
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: T.orangeLt,
            opacity: 0.6,
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Logo */}
          <div
            style={{
              width: 130,
              height: 130,
              borderRadius: 36,
              overflow: "hidden",
              marginBottom: 22,
              boxShadow:
                "0 20px 64px rgba(124,58,237,0.28), 0 6px 20px rgba(249,115,22,0.2)",
            }}
          >
            <img
              src="/logo.png"
              alt="Sensus"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Brand name */}
          <div
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: T.purple,
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginBottom: 10,
            }}
          >
            Sensus
          </div>

          {/* Slogan */}
          <div
            style={{
              fontSize: 13.5,
              color: T.muted,
              textAlign: "center",
              lineHeight: 1.6,
              maxWidth: 260,
              marginBottom: 40,
              fontFamily: "var(--font-sans)",
            }}
          >
            Centralizando Ofertas, Reduciendo Mermas,{" "}
            <span style={{ color: T.purple, fontWeight: 600 }}>
              Ahorrando a las Familias.
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={onRegister || onNext}
            style={{
              width: "100%",
              padding: "16px 0",
              background: `linear-gradient(135deg,${T.purple},${T.purpleDk})`,
              color: "white",
              border: "none",
              borderRadius: 16,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              cursor: "pointer",
              letterSpacing: "0.01em",
              boxShadow: "0 10px 28px rgba(124,58,237,0.38)",
              marginBottom: 12,
            }}
          >
            Unirse Ahora
          </button>

          <button
            onClick={onNext}
            style={{
              background: "transparent",
              border: "none",
              color: T.muted,
              fontSize: 13.5,
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
            }}
          >
            Continuar como invitado →
          </button>

          {onLogin && (
            <div
              style={{
                marginTop: 18,
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 12.5,
                color: T.muted,
                fontFamily: "var(--font-sans)",
              }}
            >
              <span>¿Ya tienes una cuenta?</span>
              <button
                onClick={onLogin}
                style={{
                  background: "transparent",
                  border: "none",
                  color: T.purple,
                  fontWeight: 700,
                  cursor: "pointer",
                  padding: 0,
                  fontSize: 12.5,
                  fontFamily: "var(--font-sans)",
                  textDecoration: "underline",
                }}
              >
                Iniciar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Screen 2: Guest Home ─────────────────────────────────────────────────────

function ScreenGuestHome({
  onLogin,
  onSearch,
  onMap,
}: {
  onLogin: () => void
  onSearch: () => void
  onMap: () => void
}) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.surface,
        overflow: "hidden",
      }}
    >
      <StatusBar />

      {/* Header */}
      <div
        style={{
          padding: "8px 16px 12px",
          background: "white",
          borderBottom: `1px solid ${T.border}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <Logo size={34} />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 17,
              fontWeight: 800,
              color: T.purple,
              fontFamily: "var(--font-display)",
              lineHeight: 1,
            }}
          >
            Sensus
          </div>
          <div
            style={{
              fontSize: 11,
              color: T.muted,
              fontFamily: "var(--font-sans)",
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Icon name="pin" size={11} color={T.purple} />
            <span>Colonia Del Valle, CDMX · 2km</span>
          </div>
        </div>
        <button
          onClick={onSearch}
          aria-label="Buscar"
          style={{
            background: T.purpleLt,
            border: "none",
            borderRadius: 10,
            padding: "8px 10px",
            cursor: "pointer",
            color: T.purple,
          }}
        >
          <Icon name="search" size={18} />
        </button>
      </div>

      {/* Scroll area */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {/* Map */}
        <div style={{ padding: "12px 16px 8px", background: "white" }}>
          <CityMap />
        </div>

        {/* Offers */}
        <div style={{ padding: "12px 16px 8px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: T.text,
                  fontFamily: "var(--font-display)",
                }}
              >
                Ofertas Cercanas
              </span>
              <span
                style={{
                  fontSize: 10,
                  background: T.orangeLt,
                  color: T.orange,
                  padding: "2px 7px",
                  borderRadius: 20,
                  fontWeight: 600,
                  fontFamily: "var(--font-sans)",
                }}
              >
                &lt;2km
              </span>
            </div>
            <span
              style={{
                fontSize: 12,
                color: T.purple,
                fontWeight: 500,
                fontFamily: "var(--font-sans)",
              }}
            >
              Ver todas →
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              overflowX: "auto",
              paddingBottom: 4,
            }}
          >
            {OFFERS.map((o, i) => (
              <OfferCard key={i} o={o} />
            ))}
          </div>
        </div>

        {/* Locked banner */}
        <div
          style={{
            margin: "4px 16px 16px",
            background: `linear-gradient(135deg,${T.purpleLt},#DDD6FE)`,
            borderRadius: 16,
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            border: `1px solid ${T.purpleLt}`,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: T.purple,
            }}
          >
            <Icon name="lock" size={21} />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: T.purple,
                fontFamily: "var(--font-display)",
                marginBottom: 2,
              }}
            >
              Más funciones te esperan
            </div>
            <div
              style={{
                fontSize: 11,
                color: T.purpleDk,
                fontFamily: "var(--font-sans)",
                lineHeight: 1.4,
              }}
            >
              Regístrate gratis: recomendaciones ML, Chef Sensus, Red Social
            </div>
          </div>
          <button
            onClick={onLogin}
            style={{
              background: T.purple,
              color: "white",
              border: "none",
              borderRadius: 10,
              padding: "8px 13px",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(124,58,237,0.35)",
            }}
          >
            Unirse
          </button>
        </div>
      </div>

      <BottomNav
        active="home"
        locked
        onNavigate={(id) => (id === "map" ? onMap() : undefined)}
      />
    </div>
  )
}

// ─── Screen 3: Registration ───────────────────────────────────────────────────

function ScreenRegistration({
  onBack,
  onSuccess,
  onSellerSuccess,
  onLogin,
}: {
  onBack: () => void
  onSuccess: () => void
  onSellerSuccess: () => void
  onLogin: () => void
}) {
  const [role, setRole] = useState<"client" | "seller">("client")
  const [form, setForm] = useState({
    nombre: "",
    dob: "",
    genero: "",
    ocup: "",
    ing: "",
    tienda: "",
    categoria: "",
    direccion: "",
    horario: "",
    rfc: "",
  })
  const field = (
    label: string,
    key: keyof typeof form,
    icon: IconName,
    type = "text",
    placeholder = "",
  ) => (
    <div>
      <label
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: T.text,
          display: "block",
          marginBottom: 7,
          fontFamily: "var(--font-sans)",
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: T.purple,
            pointerEvents: "none",
          }}
        >
          <Icon name={icon} size={18} />
        </span>
        <input
          type={type}
          placeholder={placeholder}
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          style={{
            width: "100%",
            height: 48,
            padding: "0 14px 0 43px",
            borderRadius: 14,
            border: `1.5px solid ${T.border}`,
            fontSize: 13,
            fontFamily: "var(--font-sans)",
            color: T.text,
            background: T.surface,
            outline: "none",
          }}
        />
      </div>
    </div>
  )
  const sel = (
    label: string,
    key: keyof typeof form,
    icon: IconName,
    opts: string[],
  ) => (
    <div>
      <label
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: T.text,
          display: "block",
          marginBottom: 7,
          fontFamily: "var(--font-sans)",
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: T.purple,
            pointerEvents: "none",
          }}
        >
          <Icon name={icon} size={18} />
        </span>
        <select
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          style={{
            width: "100%",
            height: 48,
            padding: "0 42px 0 43px",
            borderRadius: 14,
            border: `1.5px solid ${T.border}`,
            fontSize: 13,
            fontFamily: "var(--font-sans)",
            color: form[key] ? T.text : T.muted,
            background: T.surface,
            outline: "none",
            appearance: "none",
          }}
        >
          <option value="">Seleccionar</option>
          {opts.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <span
          style={{
            position: "absolute",
            right: 13,
            top: "50%",
            transform: "translateY(-50%)",
            color: T.muted,
            pointerEvents: "none",
          }}
        >
          <Icon name="chevronDown" size={17} />
        </span>
      </div>
    </div>
  )

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.surface,
        overflow: "hidden",
      }}
    >
      <StatusBar />
      <div
        style={{
          padding: "8px 16px 12px",
          background: "white",
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <button
          onClick={onBack}
          aria-label="Volver"
          style={{
            background: T.purpleSoft,
            border: "none",
            borderRadius: 11,
            width: 38,
            height: 38,
            cursor: "pointer",
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: T.purple,
          }}
        >
          ←
        </button>
        <Logo size={30} />
        <div
          style={{
            flex: 1,
            fontSize: 15,
            fontWeight: 800,
            color: T.text,
            fontFamily: "var(--font-display)",
          }}
        >
          Crear cuenta
        </div>
        <button
          onClick={onLogin}
          style={{
            background: T.orangeLt,
            border: "none",
            borderRadius: 10,
            padding: "8px 11px",
            color: T.orange,
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
          }}
        >
          Ingresar
        </button>
      </div>

      <div style={{ flex: 1, overflow: "auto" }}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "22px 20px 42px",
            background: `linear-gradient(135deg,${T.purple},${T.purpleDk})`,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 130,
              height: 130,
              borderRadius: "50%",
              right: -36,
              top: -50,
              background: "rgba(255,255,255,0.08)",
            }}
          />
          <div
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "5px 9px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.14)",
              color: "white",
              fontSize: 10,
              fontWeight: 600,
              fontFamily: "var(--font-sans)",
              marginBottom: 10,
            }}
          >
            <Icon name="sparkle" size={13} /> Experiencia personalizada
          </div>
          <div
            style={{
              position: "relative",
              color: "white",
              fontSize: 25,
              lineHeight: 1.15,
              fontWeight: 800,
              fontFamily: "var(--font-display)",
              marginBottom: 7,
            }}
          >
            Cuéntanos sobre ti
          </div>
          <div
            style={{
              position: "relative",
              color: "rgba(255,255,255,0.72)",
              fontSize: 12,
              lineHeight: 1.5,
              fontFamily: "var(--font-sans)",
              maxWidth: 310,
            }}
          >
            Usaremos estos datos para recomendarte ofertas que sí encajen con tu
            día a día.
          </div>
        </div>

        <div
          style={{
            margin: "-24px 14px 18px",
            position: "relative",
            background: "white",
            borderRadius: 22,
            padding: "18px",
            boxShadow: "0 14px 38px rgba(45,28,90,0.12)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: T.text,
                  fontFamily: "var(--font-display)",
                  marginBottom: 8,
                }}
              >
                ¿Cómo usarás Sensus?
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 9,
                }}
              >
                {[
                  {
                    id: "client" as const,
                    icon: "profile" as IconName,
                    title: "Soy comprador",
                    note: "Encuentro ofertas",
                  },
                  {
                    id: "seller" as const,
                    icon: "store" as IconName,
                    title: "Soy comercio",
                    note: "Publico productos",
                  },
                ].map((item) => {
                  const selected = role === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => setRole(item.id)}
                      style={{
                        textAlign: "left",
                        padding: "11px",
                        borderRadius: 14,
                        border: `1.5px solid ${selected ? T.purple : T.border}`,
                        background: selected ? T.purpleSoft : "white",
                        cursor: "pointer",
                        display: "flex",
                        gap: 9,
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 10,
                          background: selected ? T.purple : T.surface,
                          color: selected ? "white" : T.muted,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon name={item.icon} size={17} />
                      </span>
                      <span>
                        <span
                          style={{
                            display: "block",
                            color: selected ? T.purpleDk : T.text,
                            fontSize: 11,
                            fontWeight: 700,
                            fontFamily: "var(--font-display)",
                            lineHeight: 1.25,
                          }}
                        >
                          {item.title}
                        </span>
                        <span
                          style={{
                            display: "block",
                            color: T.muted,
                            fontSize: 9,
                            fontFamily: "var(--font-sans)",
                            marginTop: 2,
                          }}
                        >
                          {item.note}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {role === "client" ? (
              <>
                {field(
                  "Nombre completo",
                  "nombre",
                  "profile",
                  "text",
                  "Ej. Ana García López",
                )}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                  }}
                >
                  {field("Fecha de nacimiento", "dob", "calendar", "date")}
                  {sel("Género", "genero", "users", [
                    "Femenino",
                    "Masculino",
                    "No binario",
                    "Prefiero no decir",
                  ])}
                </div>
                {sel("Ocupación", "ocup", "briefcase", [
                  "Empleado de tiempo completo",
                  "Trabajador independiente",
                  "Estudiante",
                  "Ama/amo de casa",
                  "Jubilado/a",
                  "Desempleado/a",
                ])}
                {sel("Ingresos mensuales (MXN)", "ing", "wallet", [
                  "Menos de $5,000",
                  "$5,001 – $10,000",
                  "$10,001 – $20,000",
                  "$20,001 – $40,000",
                  "$40,001 – $70,000",
                  "Más de $70,000",
                ])}
              </>
            ) : (
              <>
                {field(
                  "Nombre de la tienda o supermercado",
                  "tienda",
                  "store",
                  "text",
                  "Ej. Mercado La Esquina",
                )}
                {sel("Categoría de negocio", "categoria", "building", [
                  "Supermercado",
                  "Abarrotes",
                  "Frutas y verduras",
                  "Panadería",
                  "Carnicería",
                  "Restaurante",
                  "Otro",
                ])}
                {field(
                  "Dirección física",
                  "direccion",
                  "pin",
                  "text",
                  "Calle, número y colonia",
                )}
                {field(
                  "Rango de horario",
                  "horario",
                  "clock",
                  "text",
                  "Ej. 8:00 a.m. – 9:00 p.m.",
                )}
                {field(
                  "RFC o identificación comercial",
                  "rfc",
                  "shield",
                  "text",
                  "Ej. MEL920310AB1",
                )}
              </>
            )}

            <button
              onClick={role === "client" ? onSuccess : onSellerSuccess}
              style={{
                width: "100%",
                padding: "15px 18px",
                background: `linear-gradient(135deg,${T.orange},#EA580C)`,
                color: "white",
                border: "none",
                borderRadius: 16,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "var(--font-display)",
                boxShadow: "0 9px 22px rgba(249,115,22,0.28)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {role === "client" ? "Crear mi cuenta" : "Registrar mi comercio"}{" "}
              <Icon name="arrowRight" size={18} />
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                color: T.muted,
                fontSize: 10,
                lineHeight: 1.4,
                fontFamily: "var(--font-sans)",
              }}
            >
              <Icon name="shield" size={14} color={T.purple} />
              Tus datos son privados y nunca se comparten con terceros.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Screen 4: Login ──────────────────────────────────────────────────────────

function ScreenLogin({
  onBack,
  onSuccess,
  onRegister,
  onSellerSuccess,
}: {
  onBack: () => void
  onSuccess: () => void
  onRegister: () => void
  onSellerSuccess?: () => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [role, setRole] = useState<"client" | "seller">("client")

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.surface,
        overflow: "hidden",
      }}
    >
      <div style={{ flex: 1, overflow: "auto" }}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: 292,
            background: `linear-gradient(145deg,${T.purpleDk} 0%,${T.purple} 68%,#A855F7 100%)`,
          }}
        >
          <StatusBar dark />
          <div
            style={{
              position: "absolute",
              width: 180,
              height: 180,
              borderRadius: "50%",
              right: -68,
              top: -38,
              background: "rgba(255,255,255,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 90,
              height: 90,
              borderRadius: "50%",
              left: -36,
              bottom: 18,
              background: "rgba(249,115,22,0.22)",
            }}
          />

          <div
            style={{
              position: "relative",
              padding: "8px 18px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <button
              onClick={onBack}
              aria-label="Volver"
              style={{
                width: 38,
                height: 38,
                borderRadius: 11,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.12)",
                color: "white",
                cursor: "pointer",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ←
            </button>
            <Logo size={34} />
            <div>
              <div
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: 800,
                  lineHeight: 1.1,
                  fontFamily: "var(--font-display)",
                }}
              >
                Sensus
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.62)",
                  fontSize: 10,
                  fontFamily: "var(--font-sans)",
                }}
              >
                Compra mejor, desperdicia menos
              </div>
            </div>
          </div>

          <div style={{ position: "relative", padding: "22px 24px 54px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                color: "#FED7AA",
                fontSize: 10,
                fontWeight: 600,
                fontFamily: "var(--font-sans)",
                marginBottom: 10,
              }}
            >
              <Icon name="shield" size={14} /> Acceso privado y seguro
            </div>
            <div
              style={{
                color: "white",
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.12,
                fontFamily: "var(--font-display)",
                marginBottom: 8,
              }}
            >
              Bienvenido de nuevo
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: 12,
                lineHeight: 1.55,
                maxWidth: 290,
                fontFamily: "var(--font-sans)",
              }}
            >
              Tus ofertas guardadas y recomendaciones te están esperando.
            </div>
          </div>
        </div>

        <div
          style={{
            margin: "-40px 14px 18px",
            position: "relative",
            background: "white",
            borderRadius: 24,
            padding: "21px 18px 18px",
            boxShadow: "0 16px 42px rgba(45,28,90,0.16)",
          }}
        >
          <div
            style={{
              fontSize: 17,
              fontWeight: 800,
              color: T.text,
              fontFamily: "var(--font-display)",
              marginBottom: 4,
            }}
          >
            Inicia sesión
          </div>
          <div
            style={{
              fontSize: 11,
              color: T.muted,
              fontFamily: "var(--font-sans)",
              marginBottom: 18,
            }}
          >
            Usa las credenciales de tu cuenta Sensus.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            {/* Selector de rol para login */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              {[
                {
                  id: "client" as const,
                  label: "Soy comprador",
                  icon: "profile" as IconName,
                },
                {
                  id: "seller" as const,
                  label: "Soy comercio",
                  icon: "store" as IconName,
                },
              ].map((item) => {
                const isSelected = role === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      padding: "9px 8px",
                      borderRadius: 12,
                      border: `1.5px solid ${isSelected ? T.purple : T.border}`,
                      background: isSelected ? T.purpleSoft : "white",
                      color: isSelected ? T.purple : T.muted,
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: isSelected ? 700 : 500,
                      fontFamily: "var(--font-sans)",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <Icon
                      name={item.icon}
                      size={15}
                      color={isSelected ? T.purple : T.muted}
                    />
                    {item.label}
                  </button>
                )
              })}
            </div>

            <div>
              <label
                htmlFor="login-email"
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: T.text,
                  display: "block",
                  marginBottom: 7,
                  fontFamily: "var(--font-sans)",
                }}
              >
                Correo electrónico
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: T.purple,
                  }}
                >
                  <Icon name="mail" size={18} />
                </span>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    height: 50,
                    padding: "0 14px 0 44px",
                    borderRadius: 14,
                    border: `1.5px solid ${T.border}`,
                    fontSize: 13,
                    fontFamily: "var(--font-sans)",
                    color: T.text,
                    background: T.surface,
                    outline: "none",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="login-password"
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: T.text,
                  display: "block",
                  marginBottom: 7,
                  fontFamily: "var(--font-sans)",
                }}
              >
                Contraseña
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: T.purple,
                  }}
                >
                  <Icon name="lock" size={18} />
                </span>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    height: 50,
                    padding: "0 50px 0 44px",
                    borderRadius: 14,
                    border: `1.5px solid ${T.border}`,
                    fontSize: 13,
                    fontFamily: "var(--font-sans)",
                    color: T.text,
                    background: T.surface,
                    outline: "none",
                  }}
                />
                <button
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  style={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 34,
                    height: 34,
                    border: "none",
                    borderRadius: 10,
                    background: T.purpleSoft,
                    color: T.purple,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name={showPassword ? "eyeOff" : "eye"} size={17} />
                </button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  color: T.muted,
                  fontSize: 11,
                  fontFamily: "var(--font-sans)",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: T.purple }}
                />
                Recordarme
              </label>
              <button
                style={{
                  padding: 0,
                  border: "none",
                  background: "none",
                  color: T.purple,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Recuperar contraseña
              </button>
            </div>

            <button
              onClick={() => {
                if (role === "seller" && onSellerSuccess) {
                  onSellerSuccess()
                } else {
                  onSuccess()
                }
              }}
              style={{
                width: "100%",
                padding: "15px 18px",
                background: `linear-gradient(135deg,${T.orange},#EA580C)`,
                color: "white",
                border: "none",
                borderRadius: 16,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "var(--font-display)",
                boxShadow: "0 9px 22px rgba(249,115,22,0.28)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              Entrar {role === "seller" ? "al Panel de Comercio" : "a Sensus"}{" "}
              <Icon name="arrowRight" size={18} />
            </button>
          </div>

          <div
            style={{
              margin: "18px 0 14px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ height: 1, flex: 1, background: T.border }} />
            <span
              style={{
                color: T.muted,
                fontSize: 10,
                fontFamily: "var(--font-sans)",
              }}
            >
              ¿Primera vez aquí?
            </span>
            <div style={{ height: 1, flex: 1, background: T.border }} />
          </div>

          <button
            onClick={onRegister}
            style={{
              width: "100%",
              padding: "12px",
              background: T.purpleSoft,
              border: `1px solid ${T.purpleLt}`,
              borderRadius: 14,
              color: T.purple,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
            }}
          >
            Crear una cuenta gratis
          </button>

          <div
            style={{
              marginTop: 14,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              color: T.muted,
              fontSize: 9,
              fontFamily: "var(--font-sans)",
            }}
          >
            <Icon name="shield" size={12} color={T.purple} /> Sin accesos de
            Google, Facebook ni terceros
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Screen 5: User Home ──────────────────────────────────────────────────────

function ScreenUserHome({
  onChat,
  onProduct,
  onProfile,
  onNotifications,
  onMap,
  onFriends,
}: {
  onChat: () => void
  onProduct: () => void
  onProfile: () => void
  onNotifications: () => void
  onMap: () => void
  onFriends?: () => void
}) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.surface,
        overflow: "hidden",
      }}
    >
      <StatusBar />
      {/* Header */}
      <div
        style={{
          padding: "8px 16px 12px",
          background: "white",
          borderBottom: `1px solid ${T.border}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <Logo size={34} />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 17,
              fontWeight: 800,
              color: T.purple,
              fontFamily: "var(--font-display)",
              lineHeight: 1,
            }}
          >
            Sensus
          </div>
          <div
            style={{
              fontSize: 11,
              color: T.muted,
              fontFamily: "var(--font-sans)",
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Icon name="pin" size={11} color={T.purple} />
            <span>Colonia Del Valle, CDMX · 2km</span>
          </div>
        </div>
        <button
          onClick={onNotifications}
          aria-label="Notificaciones"
          style={{
            background: T.purpleSoft,
            border: "none",
            borderRadius: 10,
            padding: 8,
            color: T.purple,
            cursor: "pointer",
            position: "relative",
          }}
        >
          <Icon name="bell" size={19} />
          <span
            style={{
              position: "absolute",
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: T.orange,
              right: 6,
              top: 5,
              border: "1.5px solid white",
            }}
          />
        </button>
        <div onClick={onProfile} style={{ cursor: "pointer" }}>
          <Av f={FRIENDS[0]} size={34} />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <div style={{ padding: "12px 16px 8px", background: "white" }}>
          <CityMap />
        </div>

        {/* ML carousel */}
        <div style={{ padding: "14px 16px 8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: T.text,
                fontFamily: "var(--font-display)",
              }}
            >
              Recomendado para Ti
            </span>
            <Icon name="sparkle" size={16} color={T.orange} />
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: T.purple,
                  opacity: 0.8,
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  color: T.muted,
                  fontFamily: "var(--font-sans)",
                }}
              >
                Personalizado por ML
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              overflowX: "auto",
              paddingBottom: 4,
            }}
          >
            {ML_OFFERS.map((o, i) => (
              <OfferCard key={i} o={o} onClick={onProduct} />
            ))}
          </div>
        </div>

        {/* Friends offers */}
        <div style={{ padding: "6px 16px 16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: T.text,
                fontFamily: "var(--font-display)",
              }}
            >
              Ofertas de tus Amigos
            </span>
            <Icon name="users" size={17} color={T.purple} />
          </div>
          {[
            {
              f: FRIENDS[1],
              o: OFFERS[0],
              note: "¡Ahorramos $12 MXN esta semana juntos!",
            },
            {
              f: FRIENDS[2],
              o: OFFERS[3],
              note: "Perfectas para el postre del domingo",
            },
          ].map(({ f, o, note }, i) => (
            <div
              key={i}
              onClick={onProduct}
              style={{
                background: "white",
                borderRadius: 14,
                padding: 12,
                marginBottom: 8,
                boxShadow: `0 2px 10px ${T.shadow}`,
                display: "flex",
                gap: 12,
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img
                src={o.photo}
                alt={o.product}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    marginBottom: 3,
                  }}
                >
                  <Av f={f} size={20} />
                  <span
                    style={{
                      fontSize: 11,
                      color: T.muted,
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    Compartido por{" "}
                    <strong style={{ color: T.text }}>{f.name}</strong>
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: T.text,
                    fontFamily: "var(--font-display)",
                    marginBottom: 2,
                  }}
                >
                  {o.product}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: T.muted,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {note}
                </div>
              </div>
              <div
                style={{
                  background: T.orange,
                  color: "white",
                  borderRadius: 8,
                  padding: "4px 8px",
                  fontSize: 11,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                -{o.pct}%
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav
        active="home"
        onNavigate={(id) =>
          id === "chat"
            ? onChat()
            : id === "profile"
              ? onProfile()
              : id === "map"
                ? onMap()
                : id === "social"
                  ? onFriends?.()
                  : undefined
        }
      />
    </div>
  )
}

// ─── Screen 5: Chatbot ────────────────────────────────────────────────────────

function ScreenChatbot({
  onBack,
  onMap,
}: {
  onBack: () => void
  onMap: () => void
}) {
  const [input, setInput] = useState("")

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.surface,
        overflow: "hidden",
      }}
    >
      <StatusBar />
      {/* Header */}
      <div
        style={{
          padding: "8px 16px 14px",
          background: "white",
          borderBottom: `1px solid ${T.border}`,
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: T.purpleLt,
            border: "none",
            borderRadius: 10,
            width: 36,
            height: 36,
            cursor: "pointer",
            color: T.purple,
            fontSize: 17,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ←
        </button>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 14,
            background: `linear-gradient(135deg,${T.purple},#A855F7)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
          }}
        >
          <Icon name="chef" size={25} />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: T.text,
              fontFamily: "var(--font-display)",
            }}
          >
            Chef Sensus
          </div>
          <div
            style={{
              fontSize: 11,
              color: T.green,
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
            }}
          >
            ● En línea
          </div>
        </div>
        <Icon name="info" size={21} color={T.purple} />
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Bot greeting */}
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 10,
              background: T.purpleLt,
              color: T.purple,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon name="chef" size={18} />
          </div>
          <div style={{ maxWidth: "75%" }}>
            <div
              style={{
                background: "white",
                borderRadius: "16px 16px 16px 4px",
                padding: "11px 14px",
                fontSize: 13,
                color: T.text,
                fontFamily: "var(--font-sans)",
                lineHeight: 1.5,
                boxShadow: `0 2px 10px ${T.shadow}`,
              }}
            >
              ¡Hola! Soy Chef Sensus. Te ayudo a cocinar con las{" "}
              <strong>ofertas de tu zona</strong>. ¿Qué ingredientes tienes hoy?
            </div>
            <div
              style={{
                fontSize: 10,
                color: T.muted,
                marginTop: 4,
                fontFamily: "var(--font-sans)",
              }}
            >
              10:32 a.m.
            </div>
          </div>
        </div>

        {/* User message */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ maxWidth: "80%" }}>
            <div
              style={{
                background: `linear-gradient(135deg,${T.purple},${T.purpleDk})`,
                borderRadius: "16px 16px 4px 16px",
                padding: "11px 14px",
                fontSize: 13,
                color: "white",
                fontFamily: "var(--font-sans)",
                lineHeight: 1.5,
                boxShadow: "0 4px 14px rgba(124,58,237,0.32)",
              }}
            >
              Tengo pollo y pimientos de las ofertas, ¿alguna receta?
            </div>
            <div
              style={{
                fontSize: 10,
                color: T.muted,
                marginTop: 4,
                textAlign: "right",
                fontFamily: "var(--font-sans)",
              }}
            >
              10:33 a.m. ✓✓
            </div>
          </div>
        </div>

        {/* Bot reply + recipe card */}
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 10,
              background: T.purpleLt,
              color: T.purple,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon name="chef" size={18} />
          </div>
          <div
            style={{
              maxWidth: "88%",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "16px 16px 16px 4px",
                padding: "11px 14px",
                fontSize: 13,
                color: T.text,
                fontFamily: "var(--font-sans)",
                lineHeight: 1.5,
                boxShadow: `0 2px 10px ${T.shadow}`,
              }}
            >
              ¡Perfecto combo! Con pollo y pimientos tengo una receta ideal que
              aprovecha las <strong>ofertas de tu zona</strong>:
            </div>

            {/* Recipe card */}
            <div
              style={{
                background: "white",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: `0 4px 18px ${T.shadow}`,
              }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg,#FEF3C7,#FDBA74)",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 15,
                    background: "rgba(255,255,255,0.65)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: T.orange,
                  }}
                >
                  <Icon name="chicken" size={32} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: T.text,
                      fontFamily: "var(--font-display)",
                      marginBottom: 4,
                    }}
                  >
                    Pollo con Pimientos al Ajillo
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      fontSize: 11,
                      color: "#78350F",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 3 }}
                    >
                      <Icon name="clock" size={12} />
                      25 min
                    </span>
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 3 }}
                    >
                      <Icon name="users" size={12} />4 porciones
                    </span>
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 3 }}
                    >
                      <Icon name="star" size={12} />
                      4.8
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ padding: "12px 14px" }}>
                {[
                  {
                    icon: "chicken" as IconName,
                    text: "Pollo 500g · en oferta en Chedraui",
                  },
                  {
                    icon: "pepper" as IconName,
                    text: "Pimientos 500g · en oferta en Mercado Local",
                  },
                  { icon: "onion" as IconName, text: "Ajo 4 dientes" },
                  { icon: "droplet" as IconName, text: "Aceite de oliva" },
                  {
                    icon: "leaf" as IconName,
                    text: "Sal, pimienta y hierbas al gusto",
                  },
                ].map((item, i, arr) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 12,
                      color: T.text,
                      padding: "5px 0",
                      borderBottom:
                        i < arr.length - 1 ? `1px solid ${T.border}` : "none",
                      fontFamily: "var(--font-sans)",
                      lineHeight: 1.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                    }}
                  >
                    <Icon
                      name={item.icon}
                      size={15}
                      color={i < 2 ? T.orange : T.purple}
                    />
                    {item.text}
                  </div>
                ))}
                <button
                  onClick={onMap}
                  style={{
                    width: "100%",
                    marginTop: 12,
                    padding: "12px 0",
                    background: `linear-gradient(135deg,${T.orange},#EA580C)`,
                    color: "white",
                    border: "none",
                    borderRadius: 12,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "var(--font-display)",
                    boxShadow: "0 4px 14px rgba(249,115,22,0.32)",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 7,
                    }}
                  >
                    <Icon name="map" size={17} />
                    Ver ingredientes en mapa →
                  </span>
                </button>
              </div>
            </div>

            <div
              style={{
                fontSize: 10,
                color: T.muted,
                fontFamily: "var(--font-sans)",
              }}
            >
              10:33 a.m.
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div
        style={{
          padding: "10px 16px 24px",
          background: "white",
          borderTop: `1px solid ${T.border}`,
          display: "flex",
          gap: 10,
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="¿Qué ingredientes tienes hoy?"
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: 24,
            border: `1.5px solid ${T.border}`,
            fontSize: 14,
            fontFamily: "var(--font-sans)",
            background: T.surface,
            outline: "none",
            color: T.text,
          }}
        />
        <button
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: `linear-gradient(135deg,${T.purple},${T.purpleDk})`,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            boxShadow: "0 4px 14px rgba(124,58,237,0.35)",
            flexShrink: 0,
            color: "white",
          }}
        >
          ➤
        </button>
      </div>
    </div>
  )
}

// ─── Screen 6: Product Detail ─────────────────────────────────────────────────

function ScreenProductDetail({
  onBack,
  onReserve,
}: {
  onBack: () => void
  onReserve: () => void
}) {
  const [shared, setShared] = useState<string[]>([])

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "white",
        overflow: "hidden",
      }}
    >
      <StatusBar />
      {/* Hero image */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div
          style={{ height: 210, background: T.purpleSoft, overflow: "hidden" }}
        >
          <img
            src="https://images.unsplash.com/photo-1635436338433-89747d0ca0ef?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900"
            alt="Leche entera LALA de un litro"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <button
          onClick={onBack}
          style={{
            position: "absolute",
            top: 12,
            left: 16,
            width: 36,
            height: 36,
            background: "rgba(255,255,255,0.92)",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
          }}
        >
          ←
        </button>
        <button
          aria-label="Guardar en favoritos"
          style={{
            position: "absolute",
            top: 12,
            right: 16,
            width: 36,
            height: 36,
            background: "rgba(255,255,255,0.92)",
            color: T.orange,
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
          }}
        >
          <Icon name="heart" size={19} />
        </button>
        {/* Floating badges */}
        <div
          style={{
            position: "absolute",
            bottom: -14,
            left: 16,
            display: "flex",
            gap: 8,
          }}
        >
          <div
            style={{
              background: T.green,
              color: "white",
              borderRadius: 20,
              padding: "5px 12px",
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "var(--font-sans)",
              boxShadow: "0 2px 10px rgba(16,185,129,0.4)",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Icon name="leaf" size={13} />
            Reduce Mermas
          </div>
          <div
            style={{
              background: "#F59E0B",
              color: "white",
              borderRadius: 20,
              padding: "5px 12px",
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "var(--font-sans)",
              boxShadow: "0 2px 10px rgba(245,158,11,0.4)",
            }}
          >
            Caduca en 3 días
          </div>
        </div>
      </div>

      {/* Details */}
      <div style={{ flex: 1, overflow: "auto", padding: "28px 16px 16px" }}>
        <div
          style={{
            fontSize: 11,
            color: T.muted,
            fontFamily: "var(--font-sans)",
            marginBottom: 4,
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Icon name="store" size={13} color={T.purple} />
          Bodega Aurrera · 0.4km · Hoy 8 a.m.–10 p.m.
        </div>
        <div
          style={{
            fontSize: 21,
            fontWeight: 800,
            color: T.text,
            fontFamily: "var(--font-display)",
            marginBottom: 14,
            lineHeight: 1.2,
          }}
        >
          Leche Entera LALA 1L
        </div>

        {/* Price block */}
        <div
          style={{
            background: T.orangeLt,
            borderRadius: 16,
            padding: "14px 16px",
            marginBottom: 14,
            border: "1px solid #FDBA74",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: T.muted,
                fontFamily: "var(--font-sans)",
                marginBottom: 2,
              }}
            >
              Precio oferta
            </div>
            <div
              style={{
                fontSize: 34,
                fontWeight: 900,
                color: T.orange,
                fontFamily: "var(--font-display)",
                lineHeight: 1,
              }}
            >
              $28
            </div>
            <div
              style={{
                fontSize: 12,
                textDecoration: "line-through",
                color: T.muted,
                fontFamily: "var(--font-sans)",
              }}
            >
              $45 MXN
            </div>
          </div>
          <div
            style={{
              flex: 1,
              background: T.orange,
              color: "white",
              borderRadius: 14,
              padding: "10px 14px",
              textAlign: "center",
              boxShadow: "0 4px 14px rgba(249,115,22,0.4)",
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                fontFamily: "var(--font-display)",
              }}
            >
              38% OFF
            </div>
            <div
              style={{
                fontSize: 11,
                fontFamily: "var(--font-sans)",
                opacity: 0.92,
              }}
            >
              Ahorras $17 MXN
            </div>
          </div>
        </div>

        {/* Stock */}
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            padding: "10px 12px",
            background: T.surface,
            borderRadius: 12,
            fontSize: 12,
            fontFamily: "var(--font-sans)",
            color: T.muted,
            marginBottom: 16,
          }}
        >
          <Icon name="package" size={17} color={T.purple} />
          <span>
            Disponibles: <strong style={{ color: T.text }}>14 unidades</strong>
          </span>
          <span style={{ marginLeft: "auto", fontSize: 10 }}>
            hasta agotar existencias
          </span>
        </div>

        <button
          onClick={onReserve}
          style={{
            width: "100%",
            padding: "17px 0",
            background: `linear-gradient(135deg,${T.orange},#EA580C)`,
            color: "white",
            border: "none",
            borderRadius: 18,
            fontSize: 16,
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "var(--font-display)",
            boxShadow: "0 10px 28px rgba(249,115,22,0.3)",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Icon name="bookmark" size={19} /> Apartar oferta
        </button>
        {/* Share CTA */}
        <button
          style={{
            width: "100%",
            padding: "14px 0",
            background: T.purpleSoft,
            color: T.purple,
            border: `1.5px solid ${T.purpleLt}`,
            borderRadius: 16,
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "var(--font-display)",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Icon name="users" size={19} /> Compartir con Amigos
        </button>

        {/* Friends list */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: T.text,
            fontFamily: "var(--font-display)",
            marginBottom: 10,
          }}
        >
          Compartir directamente
        </div>
        {FRIENDS.map((f, i) => {
          const sent = shared.includes(f.name)
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 0",
                borderBottom:
                  i < FRIENDS.length - 1 ? `1px solid ${T.border}` : "none",
              }}
            >
              <Av f={f} size={44} />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: T.text,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {f.name}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: T.muted,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {f.note}
                </div>
              </div>
              <button
                onClick={() =>
                  setShared((s) =>
                    sent ? s.filter((n) => n !== f.name) : [...s, f.name],
                  )
                }
                style={{
                  padding: "7px 14px",
                  borderRadius: 20,
                  border: `1.5px solid ${sent ? T.green : T.purple}`,
                  background: sent ? T.greenLt : T.purpleLt,
                  color: sent ? T.green : T.purple,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s",
                }}
              >
                {sent ? "✓ Enviado" : "Enviar"}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const GROCERY_PHOTO =
  "https://images.unsplash.com/photo-1601600576337-c1d8a0d1373c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800"

function SellerNav({
  active,
  onDashboard,
  onPublish,
  onProfile,
}: {
  active: "dashboard" | "offers" | "profile"
  onDashboard: () => void
  onPublish: () => void
  onProfile: () => void
}) {
  const items = [
    {
      id: "dashboard",
      label: "Panel",
      icon: "home" as IconName,
      action: onDashboard,
    },
    {
      id: "offers",
      label: "Ofertas",
      icon: "package" as IconName,
      action: onPublish,
    },
    {
      id: "profile",
      label: "Comercio",
      icon: "store" as IconName,
      action: onProfile,
    },
  ]
  return (
    <div
      style={{
        display: "flex",
        background: "white",
        borderTop: `1px solid ${T.border}`,
        padding: "8px 26px 20px",
        flexShrink: 0,
      }}
    >
      {items.map((item) => {
        const selected = active === item.id
        return (
          <button
            key={item.id}
            onClick={item.action}
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              color: selected ? T.purple : T.muted,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
              fontSize: 10,
              fontWeight: selected ? 700 : 500,
              fontFamily: "var(--font-sans)",
            }}
          >
            <span
              style={{
                width: 34,
                height: 28,
                borderRadius: 10,
                background: selected ? T.purpleSoft : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name={item.icon} size={19} />
            </span>
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

function ScreenSellerDashboard({
  onPublish,
  onProfile,
}: {
  onPublish: () => void
  onProfile: () => void
}) {
  const products = [
    {
      icon: "broccoli" as IconName,
      name: "Brócoli orgánico",
      price: "$38",
      stock: "12 disponibles",
      status: "Activa",
      color: T.green,
    },
    {
      icon: "milk" as IconName,
      name: "Leche entera 1L",
      price: "$28",
      stock: "8 disponibles",
      status: "Activa",
      color: T.green,
    },
    {
      icon: "package" as IconName,
      name: "Pan artesanal",
      price: "$24",
      stock: "Agotado",
      status: "Pausada",
      color: T.muted,
    },
  ]
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.surface,
        overflow: "hidden",
      }}
    >
      <StatusBar />
      <div
        style={{
          padding: "8px 16px 13px",
          background: "white",
          borderBottom: `1px solid ${T.border}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Logo size={34} />
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: T.text,
              fontSize: 15,
              fontWeight: 800,
              fontFamily: "var(--font-display)",
            }}
          >
            Mercado La Esquina
          </div>
          <div
            style={{
              color: T.muted,
              fontSize: 10,
              fontFamily: "var(--font-sans)",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Icon name="pin" size={11} color={T.purple} />
            Del Valle · radio de 2km
          </div>
        </div>
        <div
          style={{
            padding: "6px 9px",
            borderRadius: 20,
            background: T.greenLt,
            color: T.green,
            fontSize: 10,
            fontWeight: 700,
            fontFamily: "var(--font-sans)",
          }}
        >
          ● Abierto
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "17px 16px 20px" }}>
        <div
          style={{
            fontSize: 11,
            color: T.muted,
            fontFamily: "var(--font-sans)",
            marginBottom: 3,
          }}
        >
          Resumen de hoy
        </div>
        <div
          style={{
            fontSize: 22,
            color: T.text,
            fontWeight: 800,
            fontFamily: "var(--font-display)",
            marginBottom: 14,
          }}
        >
          Tu impacto en Sensus
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 9,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg,${T.purple},${T.purpleDk})`,
              color: "white",
              borderRadius: 18,
              padding: 14,
              boxShadow: "0 8px 20px rgba(124,58,237,0.22)",
            }}
          >
            <Icon name="package" size={20} />
            <div
              style={{
                fontSize: 25,
                fontWeight: 800,
                fontFamily: "var(--font-display)",
                marginTop: 12,
              }}
            >
              8
            </div>
            <div
              style={{
                fontSize: 10,
                opacity: 0.76,
                fontFamily: "var(--font-sans)",
              }}
            >
              Ofertas activas
            </div>
          </div>
          <div
            style={{
              background: T.orangeLt,
              color: T.orange,
              borderRadius: 18,
              padding: 14,
              border: "1px solid #FED7AA",
            }}
          >
            <Icon name="leaf" size={20} />
            <div
              style={{
                fontSize: 25,
                fontWeight: 800,
                fontFamily: "var(--font-display)",
                marginTop: 12,
              }}
            >
              47.5 kg
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#9A3412",
                fontFamily: "var(--font-sans)",
              }}
            >
              Mermas salvadas
            </div>
          </div>
        </div>
        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            border: `1px solid ${T.border}`,
            marginBottom: 14,
          }}
        >
          <span
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: T.purpleSoft,
              color: T.purple,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="eye" size={20} />
          </span>
          <div>
            <div
              style={{
                color: T.text,
                fontSize: 18,
                fontWeight: 800,
                fontFamily: "var(--font-display)",
              }}
            >
              1,284
            </div>
            <div
              style={{
                color: T.muted,
                fontSize: 10,
                fontFamily: "var(--font-sans)",
              }}
            >
              Visualizaciones cercanas esta semana
            </div>
          </div>
          <div
            style={{
              marginLeft: "auto",
              color: T.green,
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            +18%
          </div>
        </div>

        <button
          onClick={onPublish}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: 16,
            background: `linear-gradient(135deg,${T.orange},#EA580C)`,
            color: "white",
            fontSize: 14,
            fontWeight: 800,
            fontFamily: "var(--font-display)",
            cursor: "pointer",
            boxShadow: "0 9px 22px rgba(249,115,22,0.28)",
            marginBottom: 19,
          }}
        >
          + Publicar nueva oferta
        </button>

        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
        >
          <div
            style={{
              flex: 1,
              color: T.text,
              fontSize: 15,
              fontWeight: 800,
              fontFamily: "var(--font-display)",
            }}
          >
            Productos publicados
          </div>
          <div style={{ color: T.purple, fontSize: 10, fontWeight: 700 }}>
            Ver todos
          </div>
        </div>
        {products.map((p, i) => (
          <div
            key={p.name}
            style={{
              background: "white",
              borderRadius: 16,
              padding: 11,
              display: "flex",
              gap: 11,
              alignItems: "center",
              marginBottom: 9,
              boxShadow: `0 3px 14px ${T.shadow}`,
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 13,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src={[GROCERY_PHOTO, SKINCARE_PHOTO, BREAD_PHOTO][i]}
                alt={p.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: T.text,
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: "var(--font-display)",
                }}
              >
                {p.name}
              </div>
              <div
                style={{
                  color: T.orange,
                  fontSize: 13,
                  fontWeight: 800,
                  fontFamily: "var(--font-display)",
                  margin: "2px 0",
                }}
              >
                {p.price}
              </div>
              <div
                style={{
                  color: T.muted,
                  fontSize: 9,
                  fontFamily: "var(--font-sans)",
                }}
              >
                {p.stock}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  color: p.color,
                  fontSize: 9,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                ● {p.status}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                  maxWidth: 105,
                }}
              >
                <button
                  style={{
                    border: "none",
                    borderRadius: 7,
                    background: T.purpleSoft,
                    color: T.purple,
                    padding: "5px 7px",
                    fontSize: 8,
                    fontWeight: 700,
                  }}
                >
                  Editar
                </button>
                <button
                  style={{
                    border: "none",
                    borderRadius: 7,
                    background: T.surface,
                    color: T.muted,
                    padding: "5px 7px",
                    fontSize: 8,
                    fontWeight: 700,
                  }}
                >
                  Pausar
                </button>
                <button
                  style={{
                    border: "none",
                    borderRadius: 7,
                    background: T.orangeLt,
                    color: T.orange,
                    padding: "5px 7px",
                    fontSize: 8,
                    fontWeight: 700,
                  }}
                >
                  Marcar agotado
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SellerNav
        active="dashboard"
        onDashboard={() => {}}
        onPublish={onPublish}
        onProfile={onProfile}
      />
    </div>
  )
}

function ScreenPublishOffer({
  onBack,
  onProfile,
  onSuccess,
}: {
  onBack: () => void
  onProfile: () => void
  onSuccess: () => void
}) {
  const [original, setOriginal] = useState("80")
  const [offer, setOffer] = useState("48")
  const discount =
    original && offer
      ? Math.max(0, Math.round((1 - Number(offer) / Number(original)) * 100))
      : 0
  const inputStyle = {
    width: "100%",
    height: 46,
    padding: "0 13px",
    borderRadius: 13,
    border: `1.5px solid ${T.border}`,
    background: T.surface,
    color: T.text,
    fontSize: 12,
    fontFamily: "var(--font-sans)",
    outline: "none",
  }
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.surface,
        overflow: "hidden",
      }}
    >
      <StatusBar />
      <div
        style={{
          padding: "8px 16px 12px",
          background: "white",
          borderBottom: `1px solid ${T.border}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <button
          onClick={onBack}
          style={{
            width: 37,
            height: 37,
            border: "none",
            borderRadius: 11,
            background: T.purpleSoft,
            color: T.purple,
            fontSize: 18,
          }}
        >
          ←
        </button>
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: T.text,
              fontSize: 15,
              fontWeight: 800,
              fontFamily: "var(--font-display)",
            }}
          >
            Nueva oferta
          </div>
          <div style={{ color: T.muted, fontSize: 10 }}>
            Publica en menos de un minuto
          </div>
        </div>
        <Logo size={30} />
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "15px 16px 20px" }}>
        <div
          style={{
            height: 130,
            borderRadius: 18,
            overflow: "hidden",
            position: "relative",
            marginBottom: 15,
            background: T.purpleSoft,
          }}
        >
          <img
            src={GROCERY_PHOTO}
            alt="Vista previa del producto"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(transparent,rgba(30,27,75,.62))",
            }}
          />
          <button
            style={{
              position: "absolute",
              left: 12,
              bottom: 11,
              border: "1px solid rgba(255,255,255,.45)",
              background: "rgba(255,255,255,.18)",
              color: "white",
              borderRadius: 11,
              padding: "8px 11px",
              fontSize: 10,
              fontWeight: 700,
              backdropFilter: "blur(8px)",
            }}
          >
            Cambiar foto del producto
          </button>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: 16,
            boxShadow: `0 4px 18px ${T.shadow}`,
            display: "flex",
            flexDirection: "column",
            gap: 13,
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                color: T.text,
                fontSize: 11,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              Nombre del producto
            </label>
            <input
              defaultValue="Canasta de frutas y verduras"
              style={inputStyle}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                color: T.text,
                fontSize: 11,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              Categoría
            </label>
            <select
              style={{ ...inputStyle, appearance: "none" }}
              defaultValue="Frutas y verduras"
            >
              <option>Frutas y verduras</option>
              <option>Lácteos</option>
              <option>Panadería</option>
              <option>Abarrotes</option>
            </select>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  color: T.text,
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                Precio original
              </label>
              <input
                value={original}
                onChange={(e) => setOriginal(e.target.value)}
                type="number"
                style={inputStyle}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  color: T.text,
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                Precio oferta
              </label>
              <input
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                type="number"
                style={{
                  ...inputStyle,
                  borderColor: T.orange,
                  color: T.orange,
                  fontWeight: 700,
                }}
              />
            </div>
          </div>
          <div
            style={{
              padding: "9px 12px",
              borderRadius: 12,
              background: T.orangeLt,
              color: "#9A3412",
              fontSize: 10,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Descuento calculado automáticamente</span>
            <strong style={{ color: T.orange }}>-{discount}%</strong>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  color: T.text,
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                Stock disponible
              </label>
              <input defaultValue="12 unidades" style={inputStyle} />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  color: T.text,
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                Fecha límite
              </label>
              <input type="date" style={inputStyle} />
            </div>
          </div>
          <div>
            <label
              style={{
                display: "block",
                color: T.text,
                fontSize: 11,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              Hora límite
            </label>
            <input type="time" style={inputStyle} />
          </div>
          <div>
            <label
              style={{
                display: "block",
                color: T.text,
                fontSize: 11,
                fontWeight: 700,
                marginBottom: 7,
              }}
            >
              Etiqueta de impacto
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                style={{
                  border: `1.5px solid ${T.purple}`,
                  background: T.purpleSoft,
                  color: T.purple,
                  borderRadius: 20,
                  padding: "7px 10px",
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                Anti-Mermas
              </button>
              <button
                style={{
                  border: `1px solid ${T.border}`,
                  background: "white",
                  color: T.muted,
                  borderRadius: 20,
                  padding: "7px 10px",
                  fontSize: 10,
                  fontWeight: 600,
                }}
              >
                Aprovechamiento rápido
              </button>
            </div>
          </div>
          <button
            onClick={onSuccess}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: 16,
              background: `linear-gradient(135deg,${T.purple},${T.purpleDk})`,
              color: "white",
              fontSize: 13,
              fontWeight: 800,
              fontFamily: "var(--font-display)",
              boxShadow: "0 9px 22px rgba(124,58,237,.28)",
            }}
          >
            Publicar oferta al mapa cercano
          </button>
        </div>
      </div>
      <SellerNav
        active="offers"
        onDashboard={onBack}
        onPublish={() => {}}
        onProfile={onProfile}
      />
    </div>
  )
}

function ScreenClientProfile({
  onBack,
  onSellerMode,
  onFriends,
  onSaved,
  onMap,
  onChat,
}: {
  onBack: () => void
  onSellerMode: () => void
  onFriends: () => void
  onSaved: () => void
  onMap?: () => void
  onChat?: () => void
}) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.surface,
        overflow: "hidden",
      }}
    >
      <StatusBar />
      <div
        style={{
          background: `linear-gradient(135deg,${T.purple},${T.purpleDk})`,
          padding: "10px 18px 25px",
          color: "white",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 18 }}
        >
          <button
            onClick={onBack}
            style={{
              width: 36,
              height: 36,
              border: "1px solid rgba(255,255,255,.2)",
              borderRadius: 11,
              background: "rgba(255,255,255,.12)",
              color: "white",
              fontSize: 18,
            }}
          >
            ←
          </button>
          <div
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Mi perfil
          </div>
          <Logo size={34} />
        </div>
        <div style={{ display: "flex", gap: 13, alignItems: "center" }}>
          <Av f={FRIENDS[0]} size={58} />
          <div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                fontFamily: "var(--font-display)",
              }}
            >
              María González
            </div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>
              Cliente Sensus desde 2025
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "14px 16px 22px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 8,
            marginBottom: 14,
          }}
        >
          {[
            ["$1,248", "Ahorro total"],
            ["14", "Amigos"],
            ["22", "Guardados"],
          ].map(([value, label]) => (
            <div
              key={label}
              style={{
                background: "white",
                borderRadius: 15,
                padding: "12px 6px",
                textAlign: "center",
                boxShadow: `0 3px 12px ${T.shadow}`,
              }}
            >
              <div
                style={{
                  color: T.purple,
                  fontSize: 17,
                  fontWeight: 800,
                  fontFamily: "var(--font-display)",
                }}
              >
                {value}
              </div>
              <div style={{ color: T.muted, fontSize: 9 }}>{label}</div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: "white",
            borderRadius: 18,
            padding: 14,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              color: T.text,
              fontSize: 13,
              fontWeight: 800,
              marginBottom: 11,
            }}
          >
            Datos personales
          </div>
          {[
            [
              "briefcase" as IconName,
              "Ocupación",
              "Empleado de tiempo completo",
            ],
            ["wallet" as IconName, "Ingresos mensuales", "$10,001 – $20,000"],
          ].map(([icon, label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                padding: "8px 0",
                borderTop: `1px solid ${T.border}`,
              }}
            >
              <span style={{ color: T.purple }}>
                <Icon name={icon as IconName} size={18} />
              </span>
              <div>
                <div style={{ color: T.muted, fontSize: 9 }}>{label}</div>
                <div style={{ color: T.text, fontSize: 11, fontWeight: 600 }}>
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: "white",
            borderRadius: 18,
            padding: 14,
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", marginBottom: 10 }}>
            <div
              style={{ flex: 1, color: T.text, fontSize: 13, fontWeight: 800 }}
            >
              Amigos agregados
            </div>
            <button
              onClick={onFriends}
              style={{
                color: T.purple,
                fontSize: 10,
                border: "none",
                background: "transparent",
                fontWeight: 700,
              }}
            >
              Ver todos
            </button>
          </div>
          <div style={{ display: "flex", gap: 13 }}>
            {FRIENDS.map((f) => (
              <div key={f.name} style={{ textAlign: "center" }}>
                <Av f={f} size={40} />
                <div style={{ color: T.muted, fontSize: 8, marginTop: 4 }}>
                  {f.name.split(" ")[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            background: "white",
            borderRadius: 18,
            padding: 14,
            marginBottom: 14,
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
          >
            <div
              style={{ color: T.text, fontSize: 13, fontWeight: 800, flex: 1 }}
            >
              Productos guardados
            </div>
            <button
              onClick={onSaved}
              style={{
                color: T.purple,
                fontSize: 10,
                border: "none",
                background: "transparent",
                fontWeight: 700,
              }}
            >
              Ver todos
            </button>
          </div>
          <div style={{ display: "flex", gap: 9 }}>
            {[OFFERS[0], OFFERS[3], ML_OFFERS[2]].map((o) => (
              <div
                key={o.product}
                style={{
                  width: 83,
                  borderRadius: 13,
                  background: "white",
                  textAlign: "center",
                  color: T.purple,
                  overflow: "hidden",
                  border: `1px solid ${T.border}`,
                }}
              >
                <img
                  src={o.photo}
                  alt={o.product}
                  style={{ width: "100%", height: 48, objectFit: "cover" }}
                />
                <div
                  style={{
                    color: T.text,
                    fontSize: 8,
                    padding: "6px 5px 8px",
                    lineHeight: 1.2,
                  }}
                >
                  {o.product}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={onSellerMode}
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: 15,
            border: `1.5px solid ${T.orange}`,
            background: T.orangeLt,
            color: T.orange,
            fontSize: 12,
            fontWeight: 800,
          }}
        >
          Cambiar a modo vendedor
        </button>
      </div>
      <BottomNav
        active="profile"
        onNavigate={(id) =>
          id === "home"
            ? onBack()
            : id === "map"
              ? onMap?.()
              : id === "chat"
                ? onChat?.()
                : id === "social"
                  ? onFriends()
                  : undefined
        }
      />
    </div>
  )
}

function ScreenSellerProfile({
  onDashboard,
  onPublish,
}: {
  onDashboard: () => void
  onPublish: () => void
}) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.surface,
        overflow: "hidden",
      }}
    >
      <StatusBar />
      <div style={{ height: 128, position: "relative", overflow: "hidden" }}>
        <img
          src={GROCERY_PHOTO}
          alt="Mercado La Esquina"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg,rgba(91,33,182,.92),rgba(124,58,237,.55))",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 16,
            right: 16,
            bottom: 14,
            color: "white",
            display: "flex",
            alignItems: "flex-end",
            gap: 11,
          }}
        >
          <Logo size={46} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 800 }}>
              Mercado La Esquina
            </div>
            <div style={{ fontSize: 10, opacity: 0.76 }}>
              Frutas, verduras y abarrotes
            </div>
          </div>
          <div
            style={{
              background: T.green,
              borderRadius: 20,
              padding: "5px 8px",
              fontSize: 9,
              fontWeight: 700,
            }}
          >
            ● Abierto
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "14px 16px 20px" }}>
        <div
          style={{
            background: "white",
            borderRadius: 17,
            padding: 13,
            marginBottom: 12,
            boxShadow: `0 3px 14px ${T.shadow}`,
          }}
        >
          <div
            style={{
              color: T.text,
              fontSize: 13,
              fontWeight: 800,
              marginBottom: 9,
            }}
          >
            Información pública
          </div>
          {[
            ["pin" as IconName, "Av. Universidad 920, Del Valle"],
            ["clock" as IconName, "Lun–Dom · 8:00 a.m.–9:00 p.m."],
            ["shield" as IconName, "Comercio verificado por Sensus"],
          ].map(([icon, text]) => (
            <div
              key={text}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                color: T.muted,
                fontSize: 10,
                padding: "5px 0",
              }}
            >
              <Icon name={icon as IconName} size={15} color={T.purple} />
              {text}
            </div>
          ))}
        </div>
        <div
          style={{
            background: "white",
            borderRadius: 17,
            padding: 12,
            marginBottom: 12,
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
          >
            <div
              style={{ flex: 1, color: T.text, fontSize: 13, fontWeight: 800 }}
            >
              Ubicación en el mapa
            </div>
            <div style={{ color: T.purple, fontSize: 9 }}>Visible a 2km</div>
          </div>
          <CityMap />
        </div>
        <div
          style={{
            background: "white",
            borderRadius: 17,
            padding: 13,
            marginBottom: 12,
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 9 }}
          >
            <div
              style={{ flex: 1, color: T.text, fontSize: 13, fontWeight: 800 }}
            >
              Reseñas de clientes
            </div>
            <div style={{ color: T.orange, fontSize: 11, fontWeight: 800 }}>
              4.8 / 5
            </div>
          </div>
          {[
            ["María G.", "Muy buenas ofertas y productos frescos."],
            ["Carlos R.", "La promoción estaba disponible al llegar."],
          ].map(([name, text], i) => (
            <div
              key={name}
              style={{
                padding: "8px 0",
                borderTop: `1px solid ${T.border}`,
                display: "flex",
                gap: 9,
              }}
            >
              <Av f={FRIENDS[i]} size={30} />
              <div>
                <div style={{ color: T.text, fontSize: 10, fontWeight: 700 }}>
                  {name} <span style={{ color: T.orange }}>★★★★★</span>
                </div>
                <div style={{ color: T.muted, fontSize: 9, marginTop: 2 }}>
                  {text}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 14,
            border: `1px solid ${T.purpleLt}`,
            background: T.purpleSoft,
            color: T.purple,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          Centro de soporte para comercios
        </button>
      </div>
      <SellerNav
        active="profile"
        onDashboard={onDashboard}
        onPublish={onPublish}
        onProfile={() => {}}
      />
    </div>
  )
}

const MARKET_PHOTO =
  "https://images.unsplash.com/photo-1762494743525-bf2f92b142b7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900"

function ScreenInteractiveMap({
  onBack,
  onProduct,
  onSearch,
  onChat,
  onProfile,
  onFriends,
}: {
  onBack: () => void
  onProduct: () => void
  onSearch: () => void
  onChat?: () => void
  onProfile?: () => void
  onFriends?: () => void
}) {
  const stores = [
    {
      name: "Mercado La Esquina",
      distance: "450 m",
      rating: "4.8",
      hours: "Abierto hasta 9:00 p.m.",
      offers: 8,
      x: "44%",
      y: "25%",
    },
    {
      name: "Bodega Aurrera",
      distance: "300 m",
      rating: "4.6",
      hours: "Abierto hasta 10:00 p.m.",
      offers: 12,
      x: "68%",
      y: "40%",
    },
    {
      name: "Panadería Lupita",
      distance: "720 m",
      rating: "4.9",
      hours: "Abierto hasta 8:00 p.m.",
      offers: 5,
      x: "25%",
      y: "47%",
    },
  ]
  const [selected, setSelected] = useState(0)
  const store = stores[selected]
  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        background: "#E8EDF5",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <svg
          viewBox="0 0 390 844"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        >
          <rect width="390" height="844" fill="#EEF1F6" />
          {[55, 135, 225, 315, 405, 505, 605, 705].map((y) => (
            <path
              key={`h${y}`}
              d={`M-20 ${y} C90 ${y - 28},250 ${y + 32},420 ${y - 12}`}
              fill="none"
              stroke="white"
              strokeWidth="17"
            />
          ))}
          {[45, 125, 215, 305, 370].map((x) => (
            <path
              key={`v${x}`}
              d={`M${x} -20 C${x + 30} 190,${x - 25} 520,${x + 20} 880`}
              fill="none"
              stroke="#D9DFE8"
              strokeWidth="10"
            />
          ))}
          <path
            d="M0 595C105 555 245 650 390 595"
            fill="none"
            stroke="#C7D2FE"
            strokeWidth="26"
          />
          <path
            d="M0 595C105 555 245 650 390 595"
            fill="none"
            stroke="#A5B4FC"
            strokeWidth="2"
            strokeDasharray="7 5"
          />
          <circle
            cx="195"
            cy="320"
            r="168"
            fill="rgba(124,58,237,.035)"
            stroke={T.purple}
            strokeWidth="1.5"
            strokeDasharray="6 6"
            opacity=".55"
          />
          <circle
            cx="195"
            cy="320"
            r="8"
            fill="white"
            stroke={T.purple}
            strokeWidth="3"
          />
          <circle cx="195" cy="320" r="3" fill={T.purple} />
        </svg>
      </div>
      <StatusBar />
      <div
        style={{
          position: "absolute",
          top: 46,
          left: 14,
          right: 14,
          zIndex: 5,
          display: "flex",
          gap: 8,
        }}
      >
        <button
          onClick={onBack}
          aria-label="Volver"
          style={{
            width: 42,
            height: 42,
            border: "none",
            borderRadius: 14,
            background: "white",
            color: T.purple,
            fontSize: 19,
            boxShadow: "0 5px 18px rgba(30,27,75,.15)",
          }}
        >
          ←
        </button>
        <button
          onClick={onSearch}
          style={{
            flex: 1,
            height: 42,
            border: "none",
            borderRadius: 14,
            background: "white",
            color: T.muted,
            boxShadow: "0 5px 18px rgba(30,27,75,.15)",
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "0 14px",
            fontSize: 11,
            fontFamily: "var(--font-sans)",
          }}
        >
          <Icon name="search" size={17} color={T.purple} />
          Buscar producto o tienda
        </button>
        <button
          aria-label="Centrar mapa"
          style={{
            width: 42,
            height: 42,
            border: "none",
            borderRadius: 14,
            background: T.purple,
            color: "white",
            boxShadow: "0 5px 18px rgba(124,58,237,.28)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="pin" size={18} />
        </button>
      </div>
      <div
        style={{
          position: "absolute",
          top: 98,
          left: 16,
          padding: "6px 10px",
          borderRadius: 20,
          background: "rgba(255,255,255,.92)",
          color: T.purple,
          fontSize: 9,
          fontWeight: 700,
          boxShadow: "0 3px 12px rgba(30,27,75,.1)",
        }}
      >
        Radio visible · 2 km
      </div>

      {stores.map((s, i) => (
        <button
          key={s.name}
          onClick={() => setSelected(i)}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            transform: "translate(-50%,-50%)",
            width: i === selected ? 46 : 40,
            height: i === selected ? 46 : 40,
            borderRadius: "50% 50% 50% 10px",
            rotate: "-45deg",
            border: "3px solid white",
            background: i === selected ? T.purple : T.purpleDk,
            color: "white",
            boxShadow: "0 7px 18px rgba(91,33,182,.3)",
            zIndex: 3,
          }}
        >
          <span
            style={{
              rotate: "45deg",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="store" size={18} />
          </span>
          <span
            style={{
              position: "absolute",
              rotate: "45deg",
              right: -10,
              top: -9,
              minWidth: 20,
              height: 20,
              borderRadius: 10,
              background: T.orange,
              border: "2px solid white",
              color: "white",
              fontSize: 8,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {s.offers}
          </span>
        </button>
      ))}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 75,
          zIndex: 6,
          background: "white",
          borderRadius: "26px 26px 0 0",
          padding: "9px 16px 15px",
          boxShadow: "0 -12px 38px rgba(30,27,75,.16)",
        }}
      >
        <div
          style={{
            width: 42,
            height: 4,
            background: T.border,
            borderRadius: 3,
            margin: "0 auto 11px",
          }}
        />
        <div
          style={{
            display: "flex",
            gap: 11,
            alignItems: "center",
            marginBottom: 13,
          }}
        >
          <img
            src={MARKET_PHOTO}
            alt={store.name}
            style={{
              width: 62,
              height: 62,
              borderRadius: 15,
              objectFit: "cover",
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                color: T.text,
                fontSize: 15,
                fontWeight: 800,
                fontFamily: "var(--font-display)",
              }}
            >
              {store.name}
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                color: T.muted,
                fontSize: 9,
                margin: "4px 0",
              }}
            >
              <span style={{ display: "flex", gap: 3 }}>
                <Icon name="pin" size={11} color={T.purple} />
                {store.distance}
              </span>
              <span style={{ color: T.orange }}>★ {store.rating}</span>
            </div>
            <div style={{ color: T.green, fontSize: 9, fontWeight: 700 }}>
              ● {store.hours}
            </div>
          </div>
          <button
            style={{
              border: "none",
              borderRadius: 11,
              background: T.purpleSoft,
              color: T.purple,
              padding: "9px",
              display: "flex",
            }}
          >
            <Icon name="arrowRight" size={17} />
          </button>
        </div>
        <div
          style={{
            color: T.text,
            fontSize: 12,
            fontWeight: 800,
            fontFamily: "var(--font-display)",
            marginBottom: 9,
          }}
        >
          Productos en oferta de esta tienda
        </div>
        <div style={{ display: "flex", gap: 9, overflowX: "auto" }}>
          {[ML_OFFERS[0], OFFERS[0], OFFERS[3]].map((o, i) => (
            <div
              key={o.product}
              style={{
                width: 132,
                flexShrink: 0,
                borderRadius: 14,
                background: T.surface,
                border: `1px solid ${T.border}`,
                padding: 9,
              }}
            >
              <img
                src={o.photo}
                alt={o.product}
                style={{
                  width: "100%",
                  height: 52,
                  borderRadius: 10,
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  color: T.text,
                  fontSize: 9,
                  fontWeight: 700,
                  lineHeight: 1.25,
                  margin: "7px 0 4px",
                  minHeight: 22,
                }}
              >
                {o.product}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    flex: 1,
                    color: T.orange,
                    fontSize: 13,
                    fontWeight: 800,
                  }}
                >
                  {o.price}
                </span>
                <button
                  onClick={onProduct}
                  style={{
                    border: "none",
                    borderRadius: 8,
                    padding: "5px 7px",
                    background: i === 0 ? T.orange : T.purple,
                    color: "white",
                    fontSize: 8,
                    fontWeight: 700,
                  }}
                >
                  {i === 0 ? "Reservar" : "Ver"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 7,
        }}
      >
        <BottomNav
          active="map"
          onNavigate={(id) =>
            id === "home"
              ? onBack()
              : id === "chat"
                ? onChat?.()
                : id === "profile"
                  ? onProfile?.()
                  : id === "social"
                    ? onFriends?.()
                    : undefined
          }
        />
      </div>
    </div>
  )
}

function ScreenNotifications({
  onBack,
  onMap,
  onProduct,
}: {
  onBack: () => void
  onMap: () => void
  onProduct: () => void
}) {
  const filters = ["Todas", "Ofertas Relámpago", "Amigos", "Mermas"]
  const [activeFilter, setActiveFilter] = useState("Todas")
  const notices = [
    {
      type: "Ofertas Relámpago",
      icon: "fire" as IconName,
      color: T.orange,
      bg: T.orangeLt,
      title: "¡5 pollos al 50% OFF a 300 m de ti!",
      body: "Bodega Aurrera acaba de publicar una oferta relámpago.",
      time: "hace 5 min",
      cta: "Ver oferta",
      action: onProduct,
      unread: true,
    },
    {
      type: "Amigos",
      icon: "users" as IconName,
      color: T.purple,
      bg: T.purpleSoft,
      title: "A Carlos G. le gustó tu receta",
      body: "También guardó la receta de pollo con pimientos.",
      time: "hace 1 h",
      cta: "Ver actividad",
      action: onBack,
      unread: true,
    },
    {
      type: "Mermas",
      icon: "leaf" as IconName,
      color: T.green,
      bg: T.greenLt,
      title: "Últimas 3 canastas anti-mermas",
      body: "Mercado La Esquina cierra en 45 minutos. Aún estás a tiempo.",
      time: "hace 2 h",
      cta: "Ir a la tienda",
      action: onMap,
      unread: false,
    },
    {
      type: "Ofertas Relámpago",
      icon: "bell" as IconName,
      color: T.orange,
      bg: T.orangeLt,
      title: "Tu producto guardado bajó de precio",
      body: "Leche Entera LALA ahora cuesta $28 en Bodega Aurrera.",
      time: "ayer",
      cta: "Ver oferta",
      action: onProduct,
      unread: false,
    },
  ]
  const visible =
    activeFilter === "Todas"
      ? notices
      : notices.filter((n) => n.type === activeFilter)
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.surface,
        overflow: "hidden",
      }}
    >
      <StatusBar />
      <div
        style={{
          background: "white",
          padding: "8px 16px 13px",
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={onBack}
            style={{
              width: 38,
              height: 38,
              border: "none",
              borderRadius: 11,
              background: T.purpleSoft,
              color: T.purple,
              fontSize: 18,
            }}
          >
            ←
          </button>
          <div
            style={{
              flex: 1,
              color: T.text,
              fontSize: 19,
              fontWeight: 800,
              fontFamily: "var(--font-display)",
            }}
          >
            Notificaciones
          </div>
          <button
            aria-label="Filtrar"
            style={{
              width: 38,
              height: 38,
              border: "none",
              borderRadius: 11,
              background: T.surface,
              color: T.purple,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="filter" size={18} />
          </button>
        </div>
        <button
          style={{
            margin: "9px 0 0 48px",
            border: "none",
            background: "none",
            padding: 0,
            color: T.purple,
            fontSize: 10,
            fontWeight: 700,
          }}
        >
          Marcar todas como leídas
        </button>
      </div>
      <div
        style={{
          display: "flex",
          gap: 7,
          padding: "12px 16px 10px",
          overflowX: "auto",
          flexShrink: 0,
        }}
      >
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              flexShrink: 0,
              border: `1px solid ${activeFilter === f ? T.purple : T.border}`,
              borderRadius: 20,
              padding: "8px 11px",
              background: activeFilter === f ? T.purple : "white",
              color: activeFilter === f ? "white" : T.muted,
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            {f}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "2px 16px 20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "8px 0 10px",
          }}
        >
          <div
            style={{ flex: 1, color: T.text, fontSize: 13, fontWeight: 800 }}
          >
            Actividad reciente
          </div>
          <div
            style={{
              color: T.orange,
              background: T.orangeLt,
              borderRadius: 20,
              padding: "4px 8px",
              fontSize: 9,
              fontWeight: 700,
            }}
          >
            {visible.filter((n) => n.unread).length} nuevas
          </div>
        </div>
        {visible.map((n, i) => (
          <div
            key={n.title}
            style={{
              position: "relative",
              background: "white",
              borderRadius: 17,
              padding: 13,
              marginBottom: 10,
              border: `1px solid ${n.unread ? T.purpleLt : T.border}`,
              boxShadow: n.unread ? `0 4px 16px ${T.shadow}` : "none",
            }}
          >
            {n.unread && (
              <span
                style={{
                  position: "absolute",
                  right: 11,
                  top: 11,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: T.orange,
                }}
              />
            )}
            <div style={{ display: "flex", gap: 11 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 13,
                  background: n.bg,
                  color: n.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon name={n.icon} size={21} />
              </div>
              <div style={{ flex: 1, paddingRight: 8 }}>
                <div
                  style={{
                    color: T.text,
                    fontSize: 12,
                    lineHeight: 1.35,
                    fontWeight: 800,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {n.title}
                </div>
                <div
                  style={{
                    color: T.muted,
                    fontSize: 10,
                    lineHeight: 1.45,
                    marginTop: 4,
                  }}
                >
                  {n.body}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 10,
                paddingLeft: 51,
              }}
            >
              <span style={{ flex: 1, color: T.muted, fontSize: 9 }}>
                {n.time}
              </span>
              <button
                onClick={n.action}
                style={{
                  border: "none",
                  borderRadius: 9,
                  background: i === 0 ? T.orange : T.purpleSoft,
                  color: i === 0 ? "white" : T.purple,
                  padding: "7px 10px",
                  fontSize: 9,
                  fontWeight: 800,
                }}
              >
                {n.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
      <BottomNav
        active="home"
        onNavigate={(id) =>
          id === "home" ? onBack() : id === "map" ? onMap() : undefined
        }
      />
    </div>
  )
}

function ScreenSearchDiscovery({
  onBack,
  onProduct,
  onMap,
}: {
  onBack: () => void
  onProduct: () => void
  onMap: () => void
}) {
  const [showFilters, setShowFilters] = useState(false)
  const [distance, setDistance] = useState(2)
  const [discount, setDiscount] = useState("30%+")
  const [sort, setSort] = useState("Más cercano")
  const categories: { label: string; icon: IconName }[] = [
    { label: "Frutas y verduras", icon: "strawberry" },
    { label: "Lácteos y huevos", icon: "milk" },
    { label: "Panadería", icon: "package" },
    { label: "Carnes y pescados", icon: "chicken" },
    { label: "Abarrotes", icon: "rice" },
  ]
  const results = [ML_OFFERS[0], OFFERS[0], OFFERS[3], ML_OFFERS[2]]
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.surface,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <StatusBar />
      <div
        style={{
          padding: "8px 14px 13px",
          background: "white",
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 11,
          }}
        >
          <button
            onClick={onBack}
            style={{
              width: 38,
              height: 44,
              border: "none",
              borderRadius: 12,
              background: T.purpleSoft,
              color: T.purple,
              fontSize: 18,
            }}
          >
            ←
          </button>
          <div
            style={{
              height: 44,
              flex: 1,
              borderRadius: 14,
              background: T.surface,
              border: `1.5px solid ${T.border}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 12px",
            }}
          >
            <Icon name="search" size={18} color={T.purple} />
            <input
              placeholder="¿Qué quieres ahorrar hoy?"
              style={{
                flex: 1,
                minWidth: 0,
                border: "none",
                outline: "none",
                background: "transparent",
                color: T.text,
                fontSize: 11,
              }}
            />
          </div>
          <button
            aria-label="Escanear producto"
            style={{
              width: 42,
              height: 44,
              border: "none",
              borderRadius: 12,
              background: T.orangeLt,
              color: T.orange,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="scan" size={19} />
          </button>
          <button
            onClick={() => setShowFilters(true)}
            aria-label="Abrir filtros"
            style={{
              width: 42,
              height: 44,
              border: "none",
              borderRadius: 12,
              background: T.purple,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="filter" size={19} />
          </button>
        </div>
        <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
          {["Lácteos", "Pan del día", "Frutas", "Pollo"].map((tag, i) => (
            <button
              key={tag}
              style={{
                flexShrink: 0,
                border: "none",
                borderRadius: 20,
                background: i === 0 ? T.orangeLt : T.purpleSoft,
                color: i === 0 ? T.orange : T.purple,
                padding: "7px 10px",
                fontSize: 9,
                fontWeight: 700,
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "15px 14px 22px" }}>
        <div
          style={{
            color: T.text,
            fontSize: 14,
            fontWeight: 800,
            fontFamily: "var(--font-display)",
            marginBottom: 10,
          }}
        >
          Explora por categoría
        </div>
        <div
          style={{
            display: "flex",
            gap: 9,
            overflowX: "auto",
            marginBottom: 18,
          }}
        >
          {categories.map((c, i) => (
            <button
              key={c.label}
              style={{
                width: 91,
                minWidth: 91,
                height: 86,
                border: `1px solid ${i === 0 ? T.purpleLt : T.border}`,
                borderRadius: 16,
                background: i === 0 ? T.purpleSoft : "white",
                color: i === 0 ? T.purple : T.muted,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Icon name={c.icon} size={25} />
              <span
                style={{
                  color: T.text,
                  fontSize: 8,
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {c.label}
              </span>
            </button>
          ))}
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ color: T.text, fontSize: 14, fontWeight: 800 }}>
              Más ahorradas cerca de ti
            </div>
            <div style={{ color: T.muted, fontSize: 9, marginTop: 2 }}>
              24 resultados · radio de {distance} km
            </div>
          </div>
          <button
            onClick={() => setShowFilters(true)}
            style={{
              border: "none",
              background: "none",
              color: T.purple,
              fontSize: 9,
              fontWeight: 700,
            }}
          >
            Ordenar
          </button>
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          {results.map((o) => (
            <button
              key={o.product}
              onClick={onProduct}
              style={{
                textAlign: "left",
                padding: 0,
                overflow: "hidden",
                border: `1px solid ${T.border}`,
                borderRadius: 17,
                background: "white",
                boxShadow: `0 3px 13px ${T.shadow}`,
              }}
            >
              <div
                style={{
                  height: 100,
                  background: o.grad,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={o.photo}
                  alt={o.product}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span
                  style={{
                    position: "absolute",
                    right: 7,
                    top: 7,
                    borderRadius: 20,
                    background: T.orange,
                    color: "white",
                    padding: "5px 7px",
                    fontSize: 8,
                    fontWeight: 800,
                  }}
                >
                  -{o.pct}%
                </span>
              </div>
              <div style={{ padding: 10 }}>
                <div
                  style={{
                    color: T.text,
                    fontSize: 10,
                    fontWeight: 700,
                    lineHeight: 1.3,
                    minHeight: 27,
                  }}
                >
                  {o.product}
                </div>
                <div
                  style={{ color: T.muted, fontSize: 8, margin: "4px 0 6px" }}
                >
                  {o.store} · {o.dist}
                </div>
                <div
                  style={{ display: "flex", alignItems: "baseline", gap: 5 }}
                >
                  <span
                    style={{ color: T.orange, fontSize: 15, fontWeight: 800 }}
                  >
                    {o.price}
                  </span>
                  <span
                    style={{
                      color: T.muted,
                      fontSize: 8,
                      textDecoration: "line-through",
                    }}
                  >
                    {o.orig}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <BottomNav
        active="home"
        onNavigate={(id) =>
          id === "home" ? onBack() : id === "map" ? onMap() : undefined
        }
      />

      {showFilters && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
            background: "rgba(30,27,75,.38)",
            display: "flex",
            alignItems: "flex-end",
          }}
          onClick={() => setShowFilters(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              background: "white",
              borderRadius: "26px 26px 0 0",
              padding: "10px 18px 27px",
              boxShadow: "0 -18px 50px rgba(30,27,75,.2)",
            }}
          >
            <div
              style={{
                width: 42,
                height: 4,
                borderRadius: 3,
                background: T.border,
                margin: "0 auto 16px",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  flex: 1,
                  color: T.text,
                  fontSize: 18,
                  fontWeight: 800,
                  fontFamily: "var(--font-display)",
                }}
              >
                Filtrar resultados
              </div>
              <button
                onClick={() => setShowFilters(false)}
                style={{
                  width: 34,
                  height: 34,
                  border: "none",
                  borderRadius: 10,
                  background: T.surface,
                  color: T.muted,
                  fontSize: 16,
                }}
              >
                ×
              </button>
            </div>
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", marginBottom: 8 }}>
                <label
                  style={{
                    flex: 1,
                    color: T.text,
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  Distancia máxima
                </label>
                <span
                  style={{ color: T.purple, fontSize: 11, fontWeight: 800 }}
                >
                  {distance === 0.5 ? "500 m" : `${distance} km`}
                </span>
              </div>
              <input
                type="range"
                min=".5"
                max="2"
                step=".5"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                style={{ width: "100%", accentColor: T.purple }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: T.muted,
                  fontSize: 8,
                }}
              >
                <span>500 m</span>
                <span>2 km</span>
              </div>
            </div>
            <div style={{ marginBottom: 18 }}>
              <label
                style={{
                  display: "block",
                  color: T.text,
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 9,
                }}
              >
                Descuento mínimo
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                {["30%+", "50%+", "70%+"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDiscount(d)}
                    style={{
                      flex: 1,
                      border: `1.5px solid ${
                        discount === d ? T.orange : T.border
                      }`,
                      borderRadius: 12,
                      padding: 10,
                      background: discount === d ? T.orangeLt : "white",
                      color: discount === d ? T.orange : T.muted,
                      fontSize: 11,
                      fontWeight: 800,
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  color: T.text,
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 9,
                }}
              >
                Ordenar por
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {[
                  "Más cercano",
                  "Mayor descuento",
                  "Próximo a caducar / Anti-mermas",
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSort(s)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "left",
                      border: `1px solid ${sort === s ? T.purpleLt : T.border}`,
                      borderRadius: 12,
                      padding: "10px 12px",
                      background: sort === s ? T.purpleSoft : "white",
                      color: sort === s ? T.purple : T.text,
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  >
                    <span style={{ flex: 1 }}>{s}</span>
                    {sort === s && <Icon name="check" size={15} />}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowFilters(false)}
              style={{
                width: "100%",
                border: "none",
                borderRadius: 16,
                padding: 15,
                background: `linear-gradient(135deg,${T.purple},${T.purpleDk})`,
                color: "white",
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              Ver 24 resultados
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Complementary flows ─────────────────────────────────────────────────────

const BREAD_PHOTO =
  "https://images.unsplash.com/photo-1599819055803-717bba43890f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=600"
const PET_PHOTO =
  "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=600"
const SKINCARE_PHOTO =
  "https://images.unsplash.com/photo-1687293375398-65aadbb792d1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=600"

function QRCode({ purple = false }: { purple?: boolean }) {
  const cells = Array.from(
    { length: 121 },
    (_, i) => (i * 17 + Math.floor(i / 11) * 7 + 3) % 5 < 2,
  )
  return (
    <svg
      viewBox="0 0 132 132"
      aria-label="Código QR Sensus"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <rect width="132" height="132" rx="10" fill="white" />
      {cells.map(
        (on, i) =>
          on && (
            <rect
              key={i}
              x={11 + (i % 11) * 10}
              y={11 + Math.floor(i / 11) * 10}
              width="8"
              height="8"
              rx="1.5"
              fill={purple ? T.purple : T.text}
            />
          ),
      )}
      {[
        [11, 11],
        [91, 11],
        [11, 91],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="31" height="31" rx="4" fill="white" />
          <rect
            x={x + 2}
            y={y + 2}
            width="27"
            height="27"
            rx="3"
            fill={purple ? T.purple : T.text}
          />
          <rect
            x={x + 8}
            y={y + 8}
            width="15"
            height="15"
            rx="2"
            fill="white"
          />
        </g>
      ))}
      <rect x="52" y="52" width="28" height="28" rx="8" fill="white" />
      <rect x="56" y="56" width="20" height="20" rx="6" fill={T.orange} />
      <path
        d="M62 66h8M66 62v8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function TopHeader({
  title,
  subtitle,
  onBack,
}: {
  title: string
  subtitle?: string
  onBack: () => void
}) {
  return (
    <div
      style={{
        padding: "8px 16px 13px",
        background: "white",
        borderBottom: `1px solid ${T.border}`,
        display: "flex",
        alignItems: "center",
        gap: 11,
      }}
    >
      <button
        onClick={onBack}
        style={{
          width: 38,
          height: 38,
          border: "none",
          borderRadius: 12,
          background: T.purpleSoft,
          color: T.purple,
          fontSize: 19,
        }}
      >
        ←
      </button>
      <div style={{ flex: 1 }}>
        <div
          style={{
            color: T.text,
            fontSize: 16,
            fontWeight: 800,
            fontFamily: "var(--font-display)",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ color: T.muted, fontSize: 9, marginTop: 2 }}>
            {subtitle}
          </div>
        )}
      </div>
      <Logo size={32} />
    </div>
  )
}

function ScreenReservation({
  onBack,
  onReview,
}: {
  onBack: () => void
  onReview: () => void
}) {
  const [seconds, setSeconds] = useState(44 * 60 + 59)
  const [redeemed, setRedeemed] = useState(false)
  useEffect(() => {
    const timer = window.setInterval(
      () => setSeconds((s) => Math.max(0, s - 1)),
      1000,
    )
    return () => window.clearInterval(timer)
  }, [])
  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.surface,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <StatusBar />
      <TopHeader
        title="Tu oferta está apartada"
        subtitle="Muéstrala en caja para completar el canje"
        onBack={onBack}
      />
      <div style={{ flex: 1, overflow: "auto", padding: "15px 16px 22px" }}>
        <div
          style={{
            background: T.orangeLt,
            border: "1px solid #FED7AA",
            borderRadius: 16,
            padding: "11px 14px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 13,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 11,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "white",
              color: T.orange,
            }}
          >
            <Icon name="clock" size={19} />
          </div>
          <div>
            <div style={{ color: "#9A3412", fontSize: 9, fontWeight: 700 }}>
              TIEMPO PARA RECOGER
            </div>
            <div
              style={{
                color: T.orange,
                fontSize: 22,
                lineHeight: 1.1,
                fontWeight: 800,
                fontFamily: "var(--font-display)",
              }}
            >
              {time} min
            </div>
          </div>
        </div>
        <div
          style={{
            background: "white",
            borderRadius: 24,
            padding: "18px 20px",
            textAlign: "center",
            boxShadow: `0 8px 28px ${T.shadow}`,
            marginBottom: 13,
          }}
        >
          <div
            style={{
              color: T.text,
              fontSize: 14,
              fontWeight: 800,
              fontFamily: "var(--font-display)",
            }}
          >
            Código único de canje
          </div>
          <div style={{ color: T.muted, fontSize: 9, marginTop: 3 }}>
            No compartas este código con otras personas
          </div>
          <div
            style={{
              width: 184,
              height: 184,
              margin: "13px auto 8px",
              padding: 8,
              borderRadius: 20,
              border: `1.5px solid ${T.purpleLt}`,
            }}
          >
            <QRCode />
          </div>
          <div
            style={{
              color: T.muted,
              fontSize: 8,
              letterSpacing: ".1em",
              fontWeight: 700,
            }}
          >
            CÓDIGO MANUAL
          </div>
          <div
            style={{
              color: T.purple,
              fontSize: 19,
              fontWeight: 800,
              letterSpacing: ".16em",
              marginTop: 3,
            }}
          >
            SNS-84K2
          </div>
        </div>
        <div
          style={{
            background: "white",
            borderRadius: 18,
            padding: 13,
            marginBottom: 12,
            display: "flex",
            gap: 11,
            alignItems: "center",
          }}
        >
          <img
            src={BREAD_PHOTO}
            alt="Pan artesanal reservado"
            style={{
              width: 64,
              height: 64,
              objectFit: "cover",
              borderRadius: 13,
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ color: T.text, fontSize: 12, fontWeight: 800 }}>
              Paquete de pan artesanal
            </div>
            <div style={{ color: T.muted, fontSize: 9, marginTop: 3 }}>
              Panadería San Miguel · 1 unidad
            </div>
            <div
              style={{
                color: T.orange,
                fontSize: 11,
                fontWeight: 800,
                marginTop: 4,
              }}
            >
              Ahorras $58 MXN
            </div>
          </div>
          <div style={{ color: T.text, fontWeight: 800, fontSize: 15 }}>
            $42
          </div>
        </div>
        <div
          style={{
            background: "white",
            borderRadius: 18,
            padding: 13,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: T.purpleSoft,
              color: T.purple,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="pin" size={19} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: T.text, fontSize: 11, fontWeight: 700 }}>
              Panadería San Miguel
            </div>
            <div style={{ color: T.muted, fontSize: 9, marginTop: 2 }}>
              Av. Coyoacán 614 · a 8 min
            </div>
          </div>
          <button
            style={{
              border: "none",
              borderRadius: 12,
              padding: "9px 10px",
              background: T.purple,
              color: "white",
              fontSize: 9,
              fontWeight: 800,
              display: "flex",
              gap: 5,
              alignItems: "center",
            }}
          >
            <Icon name="navigation" size={13} />
            Cómo llegar
          </button>
        </div>
        <button
          onClick={() => setRedeemed(true)}
          style={{
            width: "100%",
            marginTop: 12,
            padding: 12,
            borderRadius: 14,
            border: "none",
            color: T.purple,
            background: T.purpleSoft,
            fontSize: 10,
            fontWeight: 700,
          }}
        >
          Simular escaneo del comercio
        </button>
      </div>
      {redeemed && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(30,27,75,.55)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "flex-end",
            zIndex: 5,
          }}
        >
          <div
            style={{
              width: "100%",
              background: "white",
              borderRadius: "28px 28px 0 0",
              padding: "26px 22px 30px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: 25,
                background: T.greenLt,
                color: T.green,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 14px",
                boxShadow: "0 12px 30px rgba(16,185,129,.18)",
              }}
            >
              <Icon name="check" size={42} strokeWidth={2.4} />
            </div>
            <div
              style={{
                color: T.text,
                fontSize: 22,
                fontWeight: 800,
                fontFamily: "var(--font-display)",
              }}
            >
              ¡Canje exitoso!
            </div>
            <div
              style={{
                color: T.muted,
                fontSize: 11,
                lineHeight: 1.6,
                margin: "8px 20px 17px",
              }}
            >
              Recogiste tu oferta y ayudaste a que un producto local se
              aprovechara.
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "center",
                marginBottom: 18,
              }}
            >
              {["$58 ahorrados", "1 merma evitada"].map((x) => (
                <div
                  key={x}
                  style={{
                    background: T.greenLt,
                    color: "#047857",
                    borderRadius: 20,
                    padding: "7px 11px",
                    fontSize: 9,
                    fontWeight: 700,
                  }}
                >
                  {x}
                </div>
              ))}
            </div>
            <button
              onClick={onReview}
              style={{
                width: "100%",
                padding: 15,
                border: "none",
                borderRadius: 16,
                background: T.purple,
                color: "white",
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              Calificar mi experiencia
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function ScreenFriends({ onBack }: { onBack: () => void }) {
  const [added, setAdded] = useState<string[]>([])
  const suggestions = [
    { name: "Diego Ruiz", note: "@diegor · 3 amigos en común", f: FRIENDS[1] },
    { name: "Ana Torres", note: "@anat · Cerca de ti", f: FRIENDS[2] },
  ]
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.surface,
        overflow: "hidden",
      }}
    >
      <StatusBar />
      <TopHeader
        title="Amigos Sensus"
        subtitle="Descubran y compartan ahorros locales"
        onBack={onBack}
      />
      <div style={{ flex: 1, overflow: "auto", padding: "14px 16px 22px" }}>
        <div
          style={{
            height: 46,
            borderRadius: 15,
            background: "white",
            border: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            padding: "0 13px",
            gap: 9,
            marginBottom: 13,
          }}
        >
          <Icon name="search" size={18} color={T.muted} />
          <input
            placeholder="Nombre de usuario o teléfono"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              color: T.text,
              fontSize: 11,
              fontFamily: "var(--font-sans)",
            }}
          />
        </div>
        <div
          style={{
            background: `linear-gradient(145deg,${T.purpleDk},${T.purple})`,
            borderRadius: 24,
            padding: "17px 18px",
            color: "white",
            position: "relative",
            overflow: "hidden",
            marginBottom: 13,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 170,
              height: 170,
              borderRadius: "50%",
              background: "rgba(255,255,255,.07)",
              right: -55,
              top: -60,
            }}
          />
          <div
            style={{
              position: "relative",
              display: "flex",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 118,
                height: 118,
                borderRadius: 18,
                background: "white",
                padding: 6,
                flexShrink: 0,
              }}
            >
              <QRCode purple />
            </div>
            <div>
              <div style={{ fontSize: 9, opacity: 0.7, fontWeight: 700 }}>
                MI CÓDIGO SENSUS
              </div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  fontFamily: "var(--font-display)",
                  marginTop: 4,
                }}
              >
                María G.
              </div>
              <div
                style={{
                  fontSize: 9,
                  opacity: 0.72,
                  lineHeight: 1.5,
                  marginTop: 6,
                }}
              >
                Pide que escaneen tu código para agregarte al instante.
              </div>
              <button
                style={{
                  marginTop: 9,
                  border: "1px solid rgba(255,255,255,.3)",
                  background: "rgba(255,255,255,.12)",
                  color: "white",
                  borderRadius: 10,
                  padding: "7px 9px",
                  fontSize: 8,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Icon name="scan" size={12} />
                Abrir escáner
              </button>
            </div>
          </div>
        </div>
        <button
          style={{
            width: "100%",
            border: "none",
            borderRadius: 16,
            padding: 14,
            background: "#25D366",
            color: "white",
            fontSize: 11,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: "0 7px 18px rgba(37,211,102,.2)",
            marginBottom: 17,
          }}
        >
          <Icon name="share" size={17} />
          Invitar por WhatsApp / Enlace
        </button>
        <div
          style={{
            color: T.text,
            fontSize: 13,
            fontWeight: 800,
            fontFamily: "var(--font-display)",
            marginBottom: 8,
          }}
        >
          Personas que quizá conozcas
        </div>
        {suggestions.map(({ name, note, f }) => {
          const isAdded = added.includes(name)
          return (
            <div
              key={name}
              style={{
                background: "white",
                borderRadius: 16,
                padding: 11,
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <Av f={f} size={42} />
              <div style={{ flex: 1 }}>
                <div style={{ color: T.text, fontSize: 11, fontWeight: 700 }}>
                  {name}
                </div>
                <div style={{ color: T.muted, fontSize: 8, marginTop: 2 }}>
                  {note}
                </div>
              </div>
              <button
                onClick={() =>
                  setAdded((v) =>
                    isAdded ? v.filter((x) => x !== name) : [...v, name],
                  )
                }
                style={{
                  width: 78,
                  padding: "8px 0",
                  borderRadius: 12,
                  border: `1px solid ${isAdded ? T.green : T.purple}`,
                  color: isAdded ? T.green : "white",
                  background: isAdded ? T.greenLt : T.purple,
                  fontSize: 9,
                  fontWeight: 800,
                }}
              >
                {isAdded ? "Agregado" : "Agregar"}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ScreenReview({ onBack }: { onBack: () => void }) {
  const [rating, setRating] = useState(5)
  const [selected, setSelected] = useState(["Ahorro real"])
  const chips = [
    "Producto en excelente estado",
    "Atención rápida",
    "Ahorro real",
  ]
  return (
    <div
      style={{
        flex: 1,
        background: T.surface,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <StatusBar />
      <div style={{ padding: 16 }}>
        <div
          style={{
            height: 185,
            borderRadius: 22,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={BREAD_PHOTO}
            alt="Compra en Panadería San Miguel"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(transparent,rgba(30,27,75,.75))",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 14,
              left: 15,
              color: "white",
            }}
          >
            <div style={{ fontSize: 10, opacity: 0.75 }}>Tu compra de hoy</div>
            <div style={{ fontSize: 16, fontWeight: 800 }}>
              Panadería San Miguel
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(30,27,75,.42)",
          backdropFilter: "blur(3px)",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            width: "100%",
            borderRadius: "28px 28px 0 0",
            background: "white",
            padding: "14px 20px 28px",
          }}
        >
          <div
            style={{
              width: 40,
              height: 4,
              borderRadius: 4,
              background: T.border,
              margin: "0 auto 16px",
            }}
          />
          <button
            onClick={onBack}
            aria-label="Cerrar"
            style={{
              position: "absolute",
              right: 17,
              top: 17,
              width: 32,
              height: 32,
              borderRadius: 11,
              border: "none",
              background: T.surface,
              color: T.muted,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="x" size={16} />
          </button>
          <div
            style={{
              textAlign: "center",
              color: T.text,
              fontSize: 19,
              fontWeight: 800,
              fontFamily: "var(--font-display)",
            }}
          >
            ¿Cómo estuvo tu compra?
          </div>
          <div
            style={{
              textAlign: "center",
              color: T.muted,
              fontSize: 10,
              marginTop: 5,
            }}
          >
            Tu opinión ayuda a fortalecer el comercio local
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              margin: "18px 0 8px",
            }}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setRating(n)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: n <= rating ? T.orange : T.border,
                  padding: 1,
                  transform: n === rating ? "scale(1.16)" : "none",
                  transition: "all .15s",
                }}
              >
                <Icon name="star" size={34} strokeWidth={2.1} />
              </button>
            ))}
          </div>
          <div
            style={{
              textAlign: "center",
              color: T.orange,
              fontSize: 10,
              fontWeight: 800,
              marginBottom: 16,
            }}
          >
            {rating === 5
              ? "¡Excelente experiencia!"
              : `${rating} de 5 estrellas`}
          </div>
          <div
            style={{
              color: T.text,
              fontSize: 11,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            ¿Qué destacó?
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 7,
              marginBottom: 14,
            }}
          >
            {chips.map((c) => {
              const on = selected.includes(c)
              return (
                <button
                  key={c}
                  onClick={() =>
                    setSelected((v) =>
                      on ? v.filter((x) => x !== c) : [...v, c],
                    )
                  }
                  style={{
                    border: `1px solid ${on ? T.purple : T.border}`,
                    background: on ? T.purpleSoft : "white",
                    color: on ? T.purple : T.muted,
                    borderRadius: 20,
                    padding: "8px 10px",
                    fontSize: 9,
                    fontWeight: 700,
                  }}
                >
                  {on && "✓ "}
                  {c}
                </button>
              )
            })}
          </div>
          <textarea
            placeholder="Cuéntanos algo más (opcional)"
            style={{
              width: "100%",
              height: 76,
              resize: "none",
              borderRadius: 14,
              border: `1px solid ${T.border}`,
              background: T.surface,
              padding: 11,
              color: T.text,
              fontFamily: "var(--font-sans)",
              fontSize: 10,
              outline: "none",
              marginBottom: 12,
            }}
          />
          <button
            onClick={onBack}
            style={{
              width: "100%",
              padding: 15,
              border: "none",
              borderRadius: 16,
              color: "white",
              background: T.purple,
              fontWeight: 800,
              fontSize: 12,
            }}
          >
            Enviar calificación
          </button>
        </div>
      </div>
    </div>
  )
}

function ScreenPublishSuccess({
  onMap,
  onAgain,
}: {
  onMap: () => void
  onAgain: () => void
}) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "white",
        overflow: "hidden",
      }}
    >
      <StatusBar />
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: "28px 22px 25px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 194,
            height: 194,
            margin: "0 auto 18px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 13,
              borderRadius: "50%",
              background: T.purpleSoft,
            }}
          />
          <svg
            viewBox="0 0 194 194"
            style={{ position: "relative", width: "100%", height: "100%" }}
          >
            <path
              d="M30 51l9-15M48 42l-1-18M153 45l10-14M165 62l17-3"
              stroke={T.orange}
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx="99" cy="95" r="57" fill={T.purple} />
            <path d="M67 86h64l-5-18H72Z" fill="white" opacity=".92" />
            <path d="M72 87v37h54V87" fill="white" />
            <path d="M83 124V99h18v25" fill={T.purpleLt} />
            <path
              d="M76 68l7-13h33l8 13"
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <circle cx="143" cy="129" r="24" fill={T.orange} />
            <path
              d="m132 129 8 8 15-17"
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="45" cy="117" r="5" fill={T.orange} />
            <circle cx="151" cy="79" r="4" fill="#FDBA74" />
          </svg>
        </div>
        <div
          style={{
            color: T.green,
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: ".12em",
            marginBottom: 7,
          }}
        >
          OFERTA PUBLICADA
        </div>
        <div
          style={{
            color: T.text,
            fontSize: 26,
            fontWeight: 800,
            fontFamily: "var(--font-display)",
            lineHeight: 1.15,
          }}
        >
          ¡Tu oferta ya está activa!
        </div>
        <div
          style={{
            color: T.muted,
            fontSize: 12,
            lineHeight: 1.65,
            margin: "11px 12px 18px",
          }}
        >
          Estamos notificando a compradores en un radio de{" "}
          <strong style={{ color: T.purple }}>2 km</strong> para evitar mermas.
        </div>
        <div
          style={{
            background: T.surface,
            borderRadius: 20,
            padding: 12,
            display: "flex",
            textAlign: "left",
            alignItems: "center",
            gap: 11,
            marginBottom: 13,
          }}
        >
          <img
            src={GROCERY_PHOTO}
            alt="Canasta de frutas y verduras publicada"
            style={{
              width: 70,
              height: 70,
              borderRadius: 15,
              objectFit: "cover",
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ color: T.text, fontSize: 11, fontWeight: 800 }}>
              Canasta de frutas y verduras
            </div>
            <div style={{ color: T.muted, fontSize: 9, marginTop: 4 }}>
              12 disponibles · Hasta hoy 8 p.m.
            </div>
            <div
              style={{
                color: T.orange,
                fontSize: 12,
                fontWeight: 800,
                marginTop: 5,
              }}
            >
              $48{" "}
              <span
                style={{
                  color: T.muted,
                  fontSize: 8,
                  textDecoration: "line-through",
                }}
              >
                $80
              </span>
            </div>
          </div>
          <div
            style={{
              borderRadius: 12,
              background: T.orangeLt,
              color: T.orange,
              padding: "6px 8px",
              fontSize: 9,
              fontWeight: 800,
            }}
          >
            -40%
          </div>
        </div>
        <div
          style={{
            background: T.greenLt,
            color: "#047857",
            borderRadius: 14,
            padding: "10px 12px",
            fontSize: 9,
            lineHeight: 1.5,
            marginBottom: 18,
          }}
        >
          <strong>Impacto estimado:</strong> hasta 6 kg de alimentos
          aprovechados.
        </div>
        <button
          onClick={onMap}
          style={{
            width: "100%",
            padding: 15,
            border: "none",
            borderRadius: 16,
            background: T.purple,
            color: "white",
            fontSize: 12,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
          }}
        >
          <Icon name="map" size={17} />
          Ver en el mapa
        </button>
        <button
          onClick={onAgain}
          style={{
            width: "100%",
            padding: 13,
            border: "none",
            background: "transparent",
            color: T.purple,
            fontSize: 11,
            fontWeight: 800,
            marginTop: 5,
          }}
        >
          <Icon name="plus" size={14} /> Publicar otra oferta
        </button>
      </div>
    </div>
  )
}

function EmptyIllustration({ type }: { type: "map" | "bell" | "saved" }) {
  return (
    <div
      style={{
        width: 178,
        height: 150,
        margin: "0 auto 17px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "8px 20px",
          borderRadius: "50%",
          background:
            type === "map"
              ? T.purpleSoft
              : type === "bell"
                ? T.orangeLt
                : T.greenLt,
        }}
      />
      <svg
        viewBox="0 0 178 150"
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        {type === "map" && (
          <>
            <path
              d="m28 44 38-13 46 15 38-13v73l-38 13-46-15-38 13Z"
              fill="white"
              stroke={T.purpleLt}
              strokeWidth="3"
            />
            <path d="M66 31v73M112 46v73" stroke={T.purpleLt} strokeWidth="3" />
            <path
              d="M89 31c-15 0-27 12-27 27 0 21 27 47 27 47s27-26 27-47c0-15-12-27-27-27Z"
              fill={T.purple}
            />
            <circle cx="89" cy="58" r="9" fill="white" />
            <circle cx="140" cy="39" r="8" fill={T.orangeLt} />
            <path
              d="m136 39 3 3 6-7"
              fill="none"
              stroke={T.orange}
              strokeWidth="2"
            />
          </>
        )}
        {type === "bell" && (
          <>
            <path
              d="M62 94h55c-7-10-8-21-8-34a20 20 0 0 0-40 0c0 13-1 24-7 34Z"
              fill="white"
              stroke={T.orange}
              strokeWidth="4"
            />
            <path
              d="M81 105h16"
              stroke={T.orange}
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M42 52h12M124 52h12M52 31l9 9M117 40l9-9"
              stroke={T.purpleLt}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="127" cy="98" r="17" fill={T.purple} />
            <path
              d="m120 98 5 5 10-12"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        )}
        {type === "saved" && (
          <>
            <rect
              x="42"
              y="25"
              width="93"
              height="101"
              rx="18"
              fill="white"
              stroke="#A7F3D0"
              strokeWidth="3"
            />
            <path d="M71 25h36v49L89 63 71 74Z" fill={T.green} />
            <path
              d="m56 100 14-15 13 12 16-20 22 23"
              fill="none"
              stroke={T.purpleLt}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="124" cy="38" r="17" fill={T.orange} />
            <path
              d="M116 38h16M124 30v16"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </div>
  )
}

function ScreenEmpty({
  type,
  onBack,
  onPrimary,
}: {
  type: "map" | "notifications" | "saved"
  onBack: () => void
  onPrimary: () => void
}) {
  const content = {
    map: {
      title: "Aún no hay ofertas cerca",
      body: "No encontramos comercios activos dentro de 2 km. Ayúdanos a sumar tus lugares favoritos.",
      cta: "Sugerir un comercio cercano",
      icon: "map" as const,
    },
    notifications: {
      title: "Todo está tranquilo por aquí",
      body: "Cuando tus comercios y amigos tengan novedades, las verás en este espacio.",
      cta: "Explorar ofertas cercanas",
      icon: "bell" as const,
    },
    saved: {
      title: "Tu lista espera su primer hallazgo",
      body: "Guarda ofertas para compararlas después o pídele a Sensi ideas con ingredientes locales.",
      cta: "Explorar el feed",
      icon: "saved" as const,
    },
  }[type]
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "white",
        overflow: "hidden",
      }}
    >
      <StatusBar />
      <TopHeader
        title={
          type === "map"
            ? "Ofertas cercanas"
            : type === "notifications"
              ? "Notificaciones"
              : "Productos guardados"
        }
        onBack={onBack}
      />
      {type === "map" && (
        <div
          style={{
            height: 155,
            margin: "12px 16px 0",
            borderRadius: 20,
            overflow: "hidden",
            opacity: 0.72,
          }}
        >
          <CityMap />
        </div>
      )}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "16px 28px 28px",
          textAlign: "center",
        }}
      >
        <EmptyIllustration type={content.icon} />
        <div
          style={{
            color: T.text,
            fontSize: 21,
            fontWeight: 800,
            fontFamily: "var(--font-display)",
            lineHeight: 1.2,
          }}
        >
          {content.title}
        </div>
        <div
          style={{
            color: T.muted,
            fontSize: 11,
            lineHeight: 1.65,
            margin: "9px 5px 19px",
          }}
        >
          {content.body}
        </div>
        <button
          onClick={onPrimary}
          style={{
            width: "100%",
            border: "none",
            borderRadius: 16,
            padding: 15,
            background: type === "map" ? T.orange : T.purple,
            color: "white",
            fontSize: 11,
            fontWeight: 800,
          }}
        >
          {content.cta}
        </button>
        {type === "saved" && (
          <button
            onClick={onPrimary}
            style={{
              width: "100%",
              border: `1px solid ${T.purpleLt}`,
              borderRadius: 16,
              padding: 13,
              background: T.purpleSoft,
              color: T.purple,
              fontSize: 10,
              fontWeight: 800,
              marginTop: 9,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <Icon name="sparkle" size={15} />
            Preguntarle a Sensi
          </button>
        )}
        {type === "notifications" && (
          <div
            style={{
              marginTop: 16,
              color: T.muted,
              fontSize: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Icon name="bell" size={12} />
            Te avisaremos sobre descuentos, amigos y mermas
          </div>
        )}
      </div>
    </div>
  )
}

// ─── App shell ────────────────────────────────────────────────────────────────

const SCREEN_IDS = [
  "splash",
  "guest",
  "register",
  "login",
  "home",
  "chat",
  "product",
  "reservation",
  "review",
  "map",
  "notifications",
  "search",
  "client-profile",
  "friends",
  "empty-saved",
  "seller-dashboard",
  "publish-offer",
  "publish-success",
  "seller-profile",
  "empty-map",
  "empty-notifications",
] as const
type ScreenId = typeof SCREEN_IDS[number]

const SCREEN_META: Record<ScreenId, { label: string; tag: string }> = {
  splash: { label: "Bienvenida", tag: "01" },
  guest: { label: "Inicio · Invitado", tag: "02" },
  register: { label: "Registro", tag: "03" },
  login: { label: "Inicio de Sesión", tag: "04" },
  home: { label: "Inicio Personalizado", tag: "05" },
  chat: { label: "Chatbot de Recetas", tag: "06" },
  product: { label: "Detalle y Compartir", tag: "07" },
  reservation: { label: "Reserva y Código QR", tag: "08" },
  review: { label: "Calificación Post-compra", tag: "09" },
  map: { label: "Mapa Interactivo", tag: "10" },
  notifications: { label: "Centro de Notificaciones", tag: "11" },
  search: { label: "Búsqueda y Filtros", tag: "12" },
  "client-profile": { label: "Perfil · Cliente", tag: "13" },
  friends: { label: "Agregar Amigos", tag: "14" },
  "empty-saved": { label: "Vacío · Guardados", tag: "15" },
  "seller-dashboard": { label: "Panel · Comercio", tag: "16" },
  "publish-offer": { label: "Publicar Nueva Oferta", tag: "17" },
  "publish-success": { label: "Oferta Publicada", tag: "18" },
  "seller-profile": { label: "Perfil · Comercio", tag: "19" },
  "empty-map": { label: "Vacío · Sin Ofertas", tag: "20" },
  "empty-notifications": { label: "Vacío · Notificaciones", tag: "21" },
}

const PHONE_W = 390
const PHONE_H = 844

const FIGMA_IMAGE_MAP: Record<ScreenId, string> = {
  splash: "/figma_screens/01_Sensus_Bienvenida_3_861.png",
  login: "/figma_screens/02_Sensus_Inicio_de_sesion_3_878.png",
  register: "/figma_screens/03_Sensus_Registro_3_920.png",
  guest: "/figma_screens/04_Sensus_Inicio_invitado_3_975.png",
  home: "/figma_screens/05_Sensus_Sensi_AI_asistente_de_presupuesto_5_1385.png",
  chat: "/figma_screens/05_Sensus_Sensi_AI_asistente_de_presupuesto_89_689.png",
  product: "/figma_screens/07_Sensus_Detalle_de_producto_y_apartado_5_1571.png",
  reservation: "/figma_screens/08_Sensus_Reserva_con_codigo_QR_5_1623.png",
  review: "/figma_screens/08_Sensus_Reserva_con_codigo_QR_5_1623.png",
  map: "/figma_screens/04b_Inicio_Invitado_Vista_Mapa_16_1143.png",
  notifications: "/figma_screens/Notifications_Center_96_304.png",
  search: "/figma_screens/06_Sensus_Busqueda_y_filtros_diversos_5_1452.png",
  "client-profile": "/figma_screens/12_Perfil_del_Vendedor_79_116.png",
  friends: "/figma_screens/12_Amigos_Sensus_28_551.png",
  "empty-saved": "/figma_screens/11_Estados_vacios_9_2048.png",
  "seller-dashboard": "/figma_screens/09_Panel_de_vendedor_9_1859.png",
  "publish-offer": "/figma_screens/10_Publicacion_rapida_9_1971.png",
  "publish-success": "/figma_screens/08_Sensus_Reserva_con_codigo_QR_5_1623.png",
  "seller-profile": "/figma_screens/12_Perfil_del_Vendedor_79_116.png",
  "empty-map": "/figma_screens/11_Estados_vacios_9_2048.png",
  "empty-notifications": "/figma_screens/11_Estados_vacios_9_2048.png",
}

const FIGMA_GALLERY = [
  { id: "3:861", name: "01 · Bienvenida", file: "/figma_screens/01_Sensus_Bienvenida_3_861.png", screenId: "splash" as ScreenId },
  { id: "3:878", name: "02 · Inicio de sesión", file: "/figma_screens/02_Sensus_Inicio_de_sesion_3_878.png", screenId: "login" as ScreenId },
  { id: "3:920", name: "03 · Registro", file: "/figma_screens/03_Sensus_Registro_3_920.png", screenId: "register" as ScreenId },
  { id: "3:975", name: "04 · Inicio invitado", file: "/figma_screens/04_Sensus_Inicio_invitado_3_975.png", screenId: "guest" as ScreenId },
  { id: "3:1087", name: "04 · Apartar como invitado", file: "/figma_screens/04_Sensus_Apartar_como_invitado_3_1087.png", screenId: "guest" as ScreenId },
  { id: "16:1143", name: "04b · Vista Mapa", file: "/figma_screens/04b_Inicio_Invitado_Vista_Mapa_16_1143.png", screenId: "map" as ScreenId },
  { id: "5:1385", name: "05 · Sensi AI Asistente", file: "/figma_screens/05_Sensus_Sensi_AI_asistente_de_presupuesto_5_1385.png", screenId: "home" as ScreenId },
  { id: "5:1452", name: "06 · Búsqueda y filtros", file: "/figma_screens/06_Sensus_Busqueda_y_filtros_diversos_5_1452.png", screenId: "search" as ScreenId },
  { id: "5:1571", name: "07 · Detalle de producto", file: "/figma_screens/07_Sensus_Detalle_de_producto_y_apartado_5_1571.png", screenId: "product" as ScreenId },
  { id: "5:1623", name: "08 · Reserva con código QR", file: "/figma_screens/08_Sensus_Reserva_con_codigo_QR_5_1623.png", screenId: "reservation" as ScreenId },
  { id: "9:1859", name: "09 · Panel de vendedor", file: "/figma_screens/09_Panel_de_vendedor_9_1859.png", screenId: "seller-dashboard" as ScreenId },
  { id: "9:1971", name: "10 · Publicación rápida", file: "/figma_screens/10_Publicacion_rapida_9_1971.png", screenId: "publish-offer" as ScreenId },
  { id: "79:2", name: "11 · Ventas y Canjes", file: "/figma_screens/11_Ventas_y_Canjes_79_2.png", screenId: "seller-profile" as ScreenId },
  { id: "9:2048", name: "11 · Estados vacíos", file: "/figma_screens/11_Estados_vacios_9_2048.png", screenId: "empty-saved" as ScreenId },
  { id: "79:116", name: "12 · Perfil del Vendedor", file: "/figma_screens/12_Perfil_del_Vendedor_79_116.png", screenId: "seller-profile" as ScreenId },
  { id: "28:551", name: "12 · Amigos Sensus", file: "/figma_screens/12_Amigos_Sensus_28_551.png", screenId: "friends" as ScreenId },
  { id: "96:304", name: "Notifications Center", file: "/figma_screens/Notifications_Center_96_304.png", screenId: "notifications" as ScreenId },
]

export default function App() {
  const [active, setActive] = useState<ScreenId>("splash")
  const [loginFrom, setLoginFrom] = useState<ScreenId>("splash")
  const [showFrame, setShowFrame] = useState(true)
  const [viewMode, setViewMode] = useState<"figma" | "interactive">("figma")
  const [showGallery, setShowGallery] = useState(false)
  const [scale, setScale] = useState(1)
  const [isMobileView, setIsMobileView] = useState(false)

  // Auto-scale to ensure the entire phone fits in viewport height comfortably without page scroll
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 480
      setIsMobileView(mobile)
      if (mobile) {
        setScale(1)
      } else {
        const availableHeight = window.innerHeight - 95
        const availableWidth = window.innerWidth - 40
        const sH = availableHeight / (PHONE_H + 28)
        const sW = availableWidth / (PHONE_W + 28)
        const s = Math.min(1, Math.min(sH, sW))
        setScale(Math.max(0.65, Number(s.toFixed(3))))
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const g = (to: ScreenId) => () => setActive(to)

  const goToLogin = (from: ScreenId) => () => {
    setLoginFrom(from)
    setActive("login")
  }

  const renderScreen = (id: ScreenId) => {
    switch (id) {
      case "splash":
        return (
          <ScreenSplash
            onNext={g("guest")}
            onRegister={g("register")}
            onLogin={goToLogin("splash")}
          />
        )
      case "guest":
        return (
          <ScreenGuestHome
            onLogin={goToLogin("guest")}
            onSearch={g("search")}
            onMap={g("map")}
          />
        )
      case "register":
        return (
          <ScreenRegistration
            onBack={g("guest")}
            onSuccess={g("home")}
            onSellerSuccess={g("seller-dashboard")}
            onLogin={goToLogin("register")}
          />
        )
      case "login":
        return (
          <ScreenLogin
            onBack={() => setActive(loginFrom)}
            onSuccess={g("home")}
            onSellerSuccess={g("seller-dashboard")}
            onRegister={g("register")}
          />
        )
      case "home":
        return (
          <ScreenUserHome
            onChat={g("chat")}
            onProduct={g("product")}
            onProfile={g("client-profile")}
            onNotifications={g("notifications")}
            onMap={g("map")}
            onFriends={g("friends")}
          />
        )
      case "chat":
        return <ScreenChatbot onBack={g("home")} onMap={g("map")} />
      case "product":
        return (
          <ScreenProductDetail
            onBack={g("home")}
            onReserve={g("reservation")}
          />
        )
      case "reservation":
        return (
          <ScreenReservation onBack={g("product")} onReview={g("review")} />
        )
      case "review":
        return <ScreenReview onBack={g("home")} />
      case "map":
        return (
          <ScreenInteractiveMap
            onBack={g("home")}
            onProduct={g("product")}
            onSearch={g("search")}
            onChat={g("chat")}
            onProfile={g("client-profile")}
            onFriends={g("friends")}
          />
        )
      case "notifications":
        return (
          <ScreenNotifications
            onBack={g("home")}
            onMap={g("map")}
            onProduct={g("product")}
          />
        )
      case "search":
        return (
          <ScreenSearchDiscovery
            onBack={g("home")}
            onProduct={g("product")}
            onMap={g("map")}
          />
        )
      case "client-profile":
        return (
          <ScreenClientProfile
            onBack={g("home")}
            onSellerMode={g("seller-dashboard")}
            onFriends={g("friends")}
            onSaved={g("empty-saved")}
            onMap={g("map")}
            onChat={g("chat")}
          />
        )
      case "friends":
        return <ScreenFriends onBack={g("client-profile")} />
      case "empty-saved":
        return (
          <ScreenEmpty
            type="saved"
            onBack={g("client-profile")}
            onPrimary={g("home")}
          />
        )
      case "seller-dashboard":
        return (
          <ScreenSellerDashboard
            onPublish={g("publish-offer")}
            onProfile={g("seller-profile")}
          />
        )
      case "publish-offer":
        return (
          <ScreenPublishOffer
            onBack={g("seller-dashboard")}
            onProfile={g("seller-profile")}
            onSuccess={g("publish-success")}
          />
        )
      case "publish-success":
        return (
          <ScreenPublishSuccess onMap={g("map")} onAgain={g("publish-offer")} />
        )
      case "seller-profile":
        return (
          <ScreenSellerProfile
            onDashboard={g("seller-dashboard")}
            onPublish={g("publish-offer")}
          />
        )
      case "empty-map":
        return (
          <ScreenEmpty type="map" onBack={g("map")} onPrimary={g("friends")} />
        )
      case "empty-notifications":
        return (
          <ScreenEmpty
            type="notifications"
            onBack={g("notifications")}
            onPrimary={g("home")}
          />
        )
    }
  }

  const currentIndex = SCREEN_IDS.indexOf(active)
  const prevScreen = currentIndex > 0 ? SCREEN_IDS[currentIndex - 1] : null
  const nextScreen =
    currentIndex < SCREEN_IDS.length - 1 ? SCREEN_IDS[currentIndex + 1] : null
  const currentMeta = SCREEN_META[active]

  const renderCurrentView = () => {
    if (viewMode === "figma") {
      const imgSrc =
        FIGMA_IMAGE_MAP[active] ||
        "/figma_screens/01_Sensus_Bienvenida_3_861.png"
      return (
        <div
          style={{
            flex: 1,
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            background: "#f9fafb",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={imgSrc}
            alt={currentMeta.label}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          {/* Badge informativo de Figma */}
          <div
            style={{
              position: "absolute",
              bottom: 22,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(23, 17, 36, 0.8)",
              backdropFilter: "blur(10px)",
              color: "white",
              fontSize: 10,
              fontWeight: 600,
              padding: "4px 12px",
              borderRadius: 20,
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.12)",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: "#A78BFA" }}>🎨</span>
            <span>Diseño Oficial Figma HD (iwlrDS420Bsbgtn5GeOhNn)</span>
          </div>
        </div>
      )
    }
    return renderScreen(active)
  }

  // In pure mobile viewport or when frame toggle is off
  if (isMobileView || !showFrame) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "100dvh",
          background: "white",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {renderCurrentView()}
        <HomeIndicator />
      </div>
    )
  }

  // Desktop Realistic Phone Mockup
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at 50% 25%, #231B34 0%, #0E0A16 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "14px 20px",
        fontFamily: "var(--font-sans)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle ambient lighting */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "25%",
          width: 450,
          height: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }}
      />

      {/* Floating Top Control Bar */}
      <div
        style={{
          zIndex: 50,
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(28, 22, 42, 0.85)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "6px 14px",
          borderRadius: 28,
          boxShadow: "0 12px 32px rgba(0,0,0,0.45)",
          maxWidth: "95vw",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            paddingRight: 8,
            borderRight: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <Logo size={24} />
          <span
            style={{
              color: "white",
              fontWeight: 800,
              fontSize: 13,
              fontFamily: "var(--font-display)",
            }}
          >
            Sensus
          </span>
        </div>

        {/* Screen Select Dropdown */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
            📱
          </span>
          <select
            value={active}
            onChange={(e) => setActive(e.target.value as ScreenId)}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 10,
              padding: "5px 10px",
              color: "white",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "var(--font-sans)",
              outline: "none",
              cursor: "pointer",
            }}
          >
            {SCREEN_IDS.map((id) => (
              <option
                key={id}
                value={id}
                style={{ background: "#1C162A", color: "white" }}
              >
                {SCREEN_META[id].tag} · {SCREEN_META[id].label}
              </option>
            ))}
          </select>
        </div>

        {/* Prev / Next Arrows */}
        <div style={{ display: "flex", gap: 4 }}>
          <button
            onClick={() => prevScreen && setActive(prevScreen)}
            disabled={!prevScreen}
            style={{
              background: prevScreen
                ? "rgba(255,255,255,0.1)"
                : "rgba(255,255,255,0.03)",
              border: "none",
              borderRadius: 8,
              width: 28,
              height: 28,
              color: prevScreen ? "white" : "rgba(255,255,255,0.25)",
              cursor: prevScreen ? "pointer" : "default",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Pantalla anterior"
          >
            ‹
          </button>
          <button
            onClick={() => nextScreen && setActive(nextScreen)}
            disabled={!nextScreen}
            style={{
              background: nextScreen
                ? "rgba(255,255,255,0.1)"
                : "rgba(255,255,255,0.03)",
              border: "none",
              borderRadius: 8,
              width: 28,
              height: 28,
              color: nextScreen ? "white" : "rgba(255,255,255,0.25)",
              cursor: nextScreen ? "pointer" : "default",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Pantalla siguiente"
          >
            ›
          </button>
        </div>

        {/* Reset flow button */}
        <button
          onClick={() => setActive("splash")}
          style={{
            background: "rgba(124,58,237,0.2)",
            border: "1px solid rgba(124,58,237,0.4)",
            borderRadius: 10,
            padding: "5px 10px",
            color: "#DDD6FE",
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
          title="Volver a la pantalla inicial de bienvenida"
        >
          ↺ Inicio
        </button>

        {/* Toggle frame button */}
        <button
          onClick={() => setShowFrame((v) => !v)}
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "none",
            borderRadius: 10,
            padding: "5px 10px",
            color: "rgba(255,255,255,0.7)",
            fontSize: 11,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
          }}
          title="Alternar entre marco de teléfono y pantalla pura"
        >
          {showFrame ? "⛶ Sin marco" : "📱 Con marco"}
        </button>

        {/* Toggle Mode: Figma HD vs Interactivo */}
        <div
          style={{
            display: "flex",
            background: "rgba(255,255,255,0.08)",
            padding: 2,
            borderRadius: 12,
            gap: 2,
            marginLeft: 4,
          }}
        >
          <button
            onClick={() => setViewMode("figma")}
            style={{
              background: viewMode === "figma" ? T.purple : "transparent",
              color: "white",
              border: "none",
              borderRadius: 9,
              padding: "5px 11px",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
              transition: "all 0.15s ease",
            }}
          >
            🎨 Figma HD
          </button>
          <button
            onClick={() => setViewMode("interactive")}
            style={{
              background: viewMode === "interactive" ? T.purple : "transparent",
              color: "white",
              border: "none",
              borderRadius: 9,
              padding: "5px 11px",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
              transition: "all 0.15s ease",
            }}
          >
            ⚡ React Interactivo
          </button>
        </div>

        {/* Gallery button */}
        <button
          onClick={() => setShowGallery(true)}
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 10,
            padding: "5px 11px",
            color: "white",
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
          title="Ver mural con las 22 pantallas descargadas de Figma"
        >
          🖼️ Ver 22 Pantallas
        </button>
      </div>

      {/* Scaling container for comfortable laptop viewport fit */}
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          transition: "transform 0.15s ease-out",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: PHONE_W + 32,
          height: (PHONE_H + 28) * scale,
          marginBottom: 10,
        }}
      >
        {/* Physical Smartphone Frame (Titanium Black iPhone Style) */}
        <div
          style={{
            position: "relative",
            width: PHONE_W + 26,
            height: PHONE_H + 26,
            borderRadius: 54,
            background:
              "linear-gradient(145deg, #2D2D33 0%, #17171C 45%, #24242A 100%)",
            padding: 13,
            boxShadow:
              "0 35px 90px -15px rgba(0,0,0,0.8), 0 0 0 1.5px rgba(255,255,255,0.15), inset 0 0 0 2px rgba(255,255,255,0.06)",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          {/* Left Hardware Buttons */}
          <div
            style={{
              position: "absolute",
              left: -4,
              top: 110,
              width: 4,
              height: 28,
              background: "#3F3F48",
              borderRadius: "3px 0 0 3px",
              boxShadow: "inset 1px 0 1px rgba(255,255,255,0.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: -4,
              top: 155,
              width: 4,
              height: 52,
              background: "#3F3F48",
              borderRadius: "3px 0 0 3px",
              boxShadow: "inset 1px 0 1px rgba(255,255,255,0.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: -4,
              top: 220,
              width: 4,
              height: 52,
              background: "#3F3F48",
              borderRadius: "3px 0 0 3px",
              boxShadow: "inset 1px 0 1px rgba(255,255,255,0.2)",
            }}
          />

          {/* Right Hardware Button (Power / Side) */}
          <div
            style={{
              position: "absolute",
              right: -4,
              top: 175,
              width: 4,
              height: 78,
              background: "#3F3F48",
              borderRadius: "0 3px 3px 0",
              boxShadow: "inset -1px 0 1px rgba(255,255,255,0.2)",
            }}
          />

          {/* Top Speaker Mic Bezel */}
          <div
            style={{
              position: "absolute",
              top: 6,
              left: "50%",
              transform: "translateX(-50%)",
              width: 50,
              height: 4,
              background: "#0D0D11",
              borderRadius: 2,
              zIndex: 40,
            }}
          />

          {/* Phone Screen Glass */}
          <div
            style={{
              width: PHONE_W,
              height: PHONE_H,
              borderRadius: 42,
              overflow: "hidden",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              background: "white",
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.35)",
            }}
          >
            {renderCurrentView()}
            <HomeIndicator />
          </div>
        </div>
      </div>

      {/* Screen Meta Label below */}
      <div
        style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: 11.5,
          fontWeight: 500,
          letterSpacing: "0.04em",
          textAlign: "center",
          marginTop: 4,
        }}
      >
        Pantalla {currentMeta.tag}:{" "}
        <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
          {currentMeta.label}
        </span>{" "}
        · {viewMode === "figma" ? "Diseño oficial exportado desde Figma HD" : "Flujo interactivo en React"}
      </div>

      {/* Full Gallery Modal */}
      {showGallery && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(10, 7, 16, 0.94)",
            backdropFilter: "blur(24px)",
            display: "flex",
            flexDirection: "column",
            padding: "24px 32px",
            overflow: "hidden",
          }}
        >
          {/* Gallery Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              paddingBottom: 16,
            }}
          >
            <div>
              <div
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: 800,
                  fontFamily: "var(--font-display)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>🖼️ Mural de Pantallas de Figma</span>
                <span
                  style={{
                    fontSize: 11,
                    background: T.purple,
                    padding: "3px 8px",
                    borderRadius: 12,
                    fontWeight: 700,
                  }}
                >
                  {FIGMA_GALLERY.length} descargadas
                </span>
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                Proyecto SENSUS (iwlrDS420Bsbgtn5GeOhNn) · Renders oficiales descargados a escala 2x retina
              </div>
            </div>
            <button
              onClick={() => setShowGallery(false)}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "none",
                borderRadius: 12,
                color: "white",
                fontSize: 14,
                fontWeight: 700,
                padding: "8px 18px",
                cursor: "pointer",
                transition: "background 0.15s ease",
              }}
            >
              ✕ Cerrar
            </button>
          </div>

          {/* Grid of screens */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
              gap: 20,
              paddingRight: 8,
            }}
          >
            {FIGMA_GALLERY.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setActive(item.screenId)
                  setViewMode("figma")
                  setShowGallery(false)
                }}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 16,
                  border:
                    active === item.screenId
                      ? `2px solid ${T.purple}`
                      : "1px solid rgba(255,255,255,0.1)",
                  padding: 10,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  transition: "transform 0.15s ease, border-color 0.15s ease",
                }}
              >
                <div
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    aspectRatio: "440 / 956",
                    background: "#F9FAFB",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
                  }}
                >
                  <img
                    src={item.file}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    loading="lazy"
                  />
                </div>
                <div>
                  <div
                    style={{
                      color: "white",
                      fontSize: 12.5,
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 10,
                      marginTop: 2,
                    }}
                  >
                    ID: {item.id} · 440 × 956 px
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
