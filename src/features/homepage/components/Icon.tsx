export type IconName =
  | 'calendar'
  | 'payment'
  | 'message'
  | 'location'
  | 'budget'
  | 'people'
  | 'plusUser'
  | 'settings'
  | 'check'
  | 'arrow'

interface IconProps {
  name: IconName
  className?: string
  decorative?: boolean
}

export function Icon({ name, className = '', decorative = true }: IconProps) {
  const common = {
    className: `icon ${className}`.trim(),
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 2,
    viewBox: '0 0 24 24',
    'aria-hidden': decorative,
  }

  switch (name) {
    case 'calendar':
      return (
        <svg {...common}>
          <path d="M8 2v4M16 2v4M3 10h18" />
          <rect x="3" y="4" width="18" height="18" rx="3" />
          <path d="M8 14h3M13 14h3M8 18h3" />
        </svg>
      )
    case 'payment':
      return (
        <svg {...common}>
          <rect x="2.5" y="5" width="19" height="14" rx="3" />
          <path d="M2.5 9h19M8 14h2M13 14h3" />
        </svg>
      )
    case 'message':
      return (
        <svg {...common}>
          <path d="M21 11.5a7.5 7.5 0 0 1-10.9 6.7L4 20l1.8-5.5A7.5 7.5 0 1 1 21 11.5Z" />
          <path d="M8.5 10h7M8.5 14h4.5" />
        </svg>
      )
    case 'location':
      return (
        <svg {...common}>
          <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
          <circle cx="12" cy="10" r="2.4" />
        </svg>
      )
    case 'budget':
      return (
        <svg {...common}>
          <path d="M4 19h16M6 17 12 5l6 12M8 13h8" />
        </svg>
      )
    case 'people':
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 'plusUser':
      return (
        <svg {...common}>
          <path d="M15 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <path d="M19 8v6M16 11h6" />
        </svg>
      )
    case 'settings':
      return (
        <svg {...common}>
          <path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" />
          <path d="M19.4 15a1.9 1.9 0 0 0 .38 2.1l.05.05a2.3 2.3 0 1 1-3.25 3.25l-.05-.05a1.9 1.9 0 0 0-2.1-.38 1.9 1.9 0 0 0-1.15 1.75V22a2.3 2.3 0 1 1-4.6 0v-.08a1.9 1.9 0 0 0-1.15-1.75 1.9 1.9 0 0 0-2.1.38l-.05.05a2.3 2.3 0 1 1-3.25-3.25l.05-.05A1.9 1.9 0 0 0 2.6 15a1.9 1.9 0 0 0-1.75-1.15H.77a2.3 2.3 0 1 1 0-4.6h.08A1.9 1.9 0 0 0 2.6 8a1.9 1.9 0 0 0-.38-2.1l-.05-.05A2.3 2.3 0 1 1 5.42 2.6l.05.05A1.9 1.9 0 0 0 7.57 3a1.9 1.9 0 0 0 1.15-1.75V1.2a2.3 2.3 0 1 1 4.6 0v.08A1.9 1.9 0 0 0 14.47 3a1.9 1.9 0 0 0 2.1-.38l.05-.05a2.3 2.3 0 1 1 3.25 3.25l-.05.05A1.9 1.9 0 0 0 19.4 8c.13.52.58.9 1.1.98h.73a2.3 2.3 0 1 1 0 4.6h-.08A1.9 1.9 0 0 0 19.4 15Z" />
        </svg>
      )
    case 'check':
      return (
        <svg {...common}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      )
    case 'arrow':
      return (
        <svg {...common}>
          <path d="m9 18 6-6-6-6" />
        </svg>
      )
  }
}
