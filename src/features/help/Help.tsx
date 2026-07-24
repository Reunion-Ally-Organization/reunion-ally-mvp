import '../../shared/page.css'
import './Help.css'
import { Navbar } from '../homepage/components/Navbar'
import { Footer } from '../homepage/components/Footer'
import type { AuthView } from '../homepage/components/AuthModal'
import type { PageType } from '../../types'

// ── Content ───────────────────────────────────────────
const SECTIONS = [
  {
    emoji: '🏠',
    title: 'Setting Up Your Hub',
    faqs: [
      {
        q: '"How do I actually get started?"',
        a: 'Once you\'ve shared your basic reunion details with us (dates, location, and vision), our team configures your custom hub. You\'ll receive a unique link that serves as your "Mission Control." If you need to change a venue address or update the itinerary later, just let us know, and we\'ll update the hub for you.',
      },
      {
        q: '"Can I customize the look of my page?"',
        a: "Absolutely. We want this to feel like your family or class. You can send us photos, logos, or even a specific color scheme, and we'll bake it right into the design.",
      },
    ],
  },
  {
    emoji: '✉️',
    title: 'Invites & Access',
    faqs: [
      {
        q: '"What if some of my guests aren\'t \'tech-savvy\'?"',
        a: 'We built this service with Grandma and Grandpa in mind. Our interface is high-contrast, simple, and requires zero complicated logins. If someone is having trouble, they can reach out to our support line directly so you don\'t have to play "IT Support" during dinner.',
      },
      {
        q: '"I have a guest who didn\'t receive their invitation. Help!"',
        a: "Spam folders are the uninvited guests of every reunion. If an invite goes missing, we can provide you with a direct access link to text them, or we can re-send the formal invitation from our end.",
      },
    ],
  },
  {
    emoji: '💳',
    title: 'Payments & Logistics',
    faqs: [
      {
        q: '"Is it safe for guests to pay for tickets here?"',
        a: 'Security is our top priority. We use industry-standard encryption for all transactions. Whether guests are buying tickets or chipping in for the taco bar, their data stays private and protected.',
      },
      {
        q: '"How do I track who has paid?"',
        a: 'No more messy spreadsheets! Your Hub includes a real-time "Guest List Status" that shows you exactly who has RSVP\'d and who has cleared their balance.',
      },
      {
        q: '"What is your refund policy?"',
        a: "Life happens. While our service fees are generally non-refundable to cover the setup work we do, individual ticket refunds are handled based on the specific guidelines you set for your event.",
      },
    ],
  },
  {
    emoji: '🔧',
    title: 'Technical Troubleshooting',
    faqs: [
      {
        q: '"The page isn\'t loading correctly."',
        a: 'Before you toss your laptop, try a quick "refresh." If that doesn\'t work, ensure you\'re using a modern browser (like Chrome, Safari, or Edge). Still stuck? Click the "Talk to a Human" button at the bottom of the screen.',
      },
      {
        q: '"I found a typo in the itinerary!"',
        a: "Don't panic—it happens to the best of us. Just send us a quick message through your organizer dashboard, and we'll have it polished and corrected within the hour.",
      },
    ],
  },
]

// ── Props ─────────────────────────────────────────────
interface HelpProps {
  onNavigate: (page: PageType) => void
  onAuthOpen: (view: AuthView) => void
}

export default function Help({ onNavigate, onAuthOpen }: HelpProps) {
  return (
    <div className="inner-page help-page">
      <Navbar
        onAuthOpen={onAuthOpen}
        activeItem="Help"
        onNavigate={(item) => {
          const map: Record<string, PageType> = {
            Dashboard: 'dashboard',
            'Attendance Tracker': 'attendance-tracker',
            'Budget Tracker': 'budget-tracker',
            'Manage Event': 'manage-event',
            Help: 'help',
          }
          if (map[item]) onNavigate(map[item])
        }}
      />

      <div className="help-body">
        {/* Page title */}
        <h1 className="help-title">How Can We Help?</h1>

        {/* Intro */}
        <section className="help-intro">
          <h2 className="help-intro__heading">Are there any return exclusions?</h2>
          <p className="help-intro__text">
            You focus on the memories; we'll handle the "how-to." Planning a reunion is a labor of
            love, but let's be honest—it can also feel like herding cats. Whether you're stuck on a
            technical detail or just need a hand navigating the guest list, we're here to make sure
            your experience is as smooth as the event itself.
          </p>
        </section>

        {/* FAQ sections */}
        {SECTIONS.map((section) => (
          <section key={section.title} className="help-section">
            <h2 className="help-section__title">
              <span className="help-section__emoji">{section.emoji}</span>
              {section.title}
            </h2>
            {section.faqs.map((faq, i) => (
              <div key={i} className="help-faq">
                <p className="help-faq__question">{faq.q}</p>
                <p className="help-faq__answer">{faq.a}</p>
              </div>
            ))}
          </section>
        ))}

        {/* Still have questions CTA */}
        <div className="help-cta">
          <h3 className="help-cta__title">Still have questions?</h3>
          <p className="help-cta__text">
            If you're facing a problem we haven't covered here, our support team is standing by.
            We aim to respond to all inquiries within 24 hours (because we know reunion deadlines
            wait for no one).
          </p>
          <p className="help-cta__contact">
            Contact Support at{' '}
            <a href="mailto:hello@reunionally.com" className="help-cta__email">
              hello@reunionally.com
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
