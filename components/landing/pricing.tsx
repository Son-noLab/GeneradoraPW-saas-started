import Link from 'next/link'
import { Check, Minus } from 'lucide-react'

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'For individuals and side projects.',
    cta: 'Get started free',
    href: '/signup',
    highlighted: false,
    features: [
      { text: '100 passwords / day', included: true },
      { text: '1 vault', included: true },
      { text: 'Browser extension', included: true },
      { text: 'API access', included: false },
      { text: 'Team sharing', included: false },
      { text: 'SSO & SAML', included: false },
    ],
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    description: 'For power users and growing teams.',
    cta: 'Start Pro trial',
    href: '/signup?plan=pro',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      { text: 'Unlimited passwords', included: true },
      { text: '10 vaults', included: true },
      { text: 'Browser extension', included: true },
      { text: 'Full API access', included: true },
      { text: 'Team sharing (up to 10)', included: true },
      { text: 'SSO & SAML', included: false },
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations with compliance needs.',
    cta: 'Contact sales',
    href: 'mailto:sales@securepass.io',
    highlighted: false,
    features: [
      { text: 'Unlimited passwords', included: true },
      { text: 'Unlimited vaults', included: true },
      { text: 'Browser extension', included: true },
      { text: 'Full API access', included: true },
      { text: 'Unlimited team sharing', included: true },
      { text: 'SSO & SAML', included: true },
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-navy-950 py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold text-sky-brand tracking-widest uppercase mb-4">
            Pricing
          </p>
          <h2
            className="font-serif font-light text-white mb-5"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)' }}
          >
            Simple, transparent pricing
          </h2>
          <p className="text-bg-light/60" style={{ fontSize: '1.05rem' }}>
            Start free, scale when you need to. No hidden fees.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border-brand/10 border border-border-brand/10">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-10 flex flex-col ${
                tier.highlighted ? 'bg-navy-800' : 'bg-navy-900'
              }`}
            >
              {tier.badge && (
                <div className="absolute top-0 right-8 -translate-y-1/2">
                  <span className="bg-sky-brand text-white text-xs font-semibold px-3 py-1 rounded-sm tracking-wider uppercase">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="mb-8">
                <p className="text-xs font-semibold text-sky-brand tracking-widest uppercase mb-4">{tier.name}</p>
                <div className="flex items-baseline gap-1 mb-3">
                  <span
                    className="font-serif font-light text-white"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
                  >
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-muted text-sm">{tier.period}</span>
                  )}
                </div>
                <p className="text-sm text-bg-light/50">{tier.description}</p>
              </div>

              <ul className="space-y-3.5 mb-10 flex-1">
                {tier.features.map(({ text, included }) => (
                  <li key={text} className="flex items-center gap-3 text-sm">
                    {included ? (
                      <Check className="w-4 h-4 text-sky-brand shrink-0" strokeWidth={1.5} />
                    ) : (
                      <Minus className="w-4 h-4 text-white/20 shrink-0" strokeWidth={1.5} />
                    )}
                    <span className={included ? 'text-bg-light/80' : 'text-white/25'}>{text}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`block w-full text-center text-sm font-semibold py-3 rounded-sm tracking-wide transition-all ${
                  tier.highlighted
                    ? 'bg-sky-brand text-white hover:brightness-110 shadow-[0_8px_32px_rgba(27,168,224,0.25)]'
                    : 'border border-white/20 text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
