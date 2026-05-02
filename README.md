# TalentFlow — High-Conversion Recruitment Agency Website

A premium, interactive Next.js 14 recruitment website inspired by Digital Waffle, built for maximum conversions and a memorable user experience.

## ✨ Features

- **Spline 3D Hero** — immersive full-screen hero with lazy-loaded 3D scene
- **Lenis Smooth Scrolling** — physics-based buttery smooth scroll
- **Framer Motion animations** — scroll-triggered section reveals, counters, transitions
- **Custom cursor** — branded dot + ring cursor effect
- **Scroll progress bar** — thin gradient progress indicator
- **Recruiter / Candidate mode toggle** — personalized messaging throughout
- **Interactive Services** — hover cards with roles, salary ranges, demand indicators
- **Salary Calculator** — role + location input with animated range output
- **Hiring Speed Visualizer** — animated bar comparison (traditional vs TalentFlow)
- **Live Job Counter** — animated counter with real-time simulation
- **Testimonials carousel** — auto-advancing with motion transitions
- **Sticky CTA button** — appears after 400px scroll
- **Exit-intent popup** — triggers on mouse-leave (once per session)
- **Logo marquee** — dual-direction scrolling client logos
- **Animated stat counters** — trigger on scroll entry

## 🛠 Tech Stack

| Tech | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| daisyUI | Component system |
| Framer Motion | Animations |
| Lenis | Smooth scrolling |
| Spline | 3D hero scene |
| react-countup | Animated counters |
| react-intersection-observer | Scroll triggers |

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ 
- npm or yarn

### Installation

```bash
# 1. Navigate to the project folder
cd talentflow

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
talentflow/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Main page, composes all sections
├── components/
│   ├── ui/
│   │   ├── LenisProvider.tsx       # Smooth scroll wrapper
│   │   ├── CustomCursor.tsx        # Branded cursor effect
│   │   ├── ScrollProgress.tsx      # Top progress bar
│   │   ├── StickyCtaButton.tsx     # Floating CTA
│   │   └── ExitIntentPopup.tsx     # Exit intent modal
│   └── sections/
│       ├── Navbar.tsx              # Sticky nav + mode toggle
│       ├── HeroSection.tsx         # Spline hero + pipeline flow
│       ├── LogoMarquee.tsx         # Dual-direction logo scroller
│       ├── StatsSection.tsx        # Animated stat counters
│       ├── ServicesSection.tsx     # Interactive service cards
│       ├── HiringSpeedVisualizer.tsx # Timeline comparison tool
│       ├── SalaryCalculator.tsx    # Role/location salary tool
│       ├── LiveJobCounter.tsx      # Animated job counter
│       ├── TestimonialsSection.tsx # Auto-advancing carousel
│       ├── MidpageCtaSection.tsx   # Mid-scroll CTA break
│       ├── FinalCtaSection.tsx     # Bottom dual CTA
│       └── Footer.tsx              # Site footer
├── styles/
│   └── globals.css         # Tailwind + custom design tokens
├── tailwind.config.ts      # Tailwind + daisyUI config
├── next.config.js          # Next.js config
└── tsconfig.json           # TypeScript config
```

## 🎨 Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `obsidian` | `#0A0A0F` | Background |
| `electric` | `#5B6EF5` | Primary brand / CTAs |
| `neon` | `#00FFB2` | Success / highlights |
| `crimson` | `#FF3D5A` | Warnings / urgency |
| `amber` | `#FFB547` | Mid-priority |
| `chalk` | `#F0EDE8` | Body text |
| `chalk-dim` | `#B8B4AE` | Secondary text |

### Typography
- **Display**: Clash Display (bold headlines)
- **Body**: Satoshi (readable body text)
- **Mono**: JetBrains Mono (data, badges, code)

## 🔧 Customization

### Replace the Spline scene
In `HeroSection.tsx`, change the `scene` prop on the `<Spline>` component:
```tsx
<Spline scene="https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode" />
```

### Update salary data
In `SalaryCalculator.tsx`, edit the `salaryData` object with your real figures.

### Change job counts
In `LiveJobCounter.tsx`, update the `categories` array with real data or connect to an API.

### Personalization copy
In `HeroSection.tsx` and `MidpageCtaSection.tsx`, update the `copy` objects for recruiter/candidate modes.

## 📈 Performance Notes

- Spline is lazy-loaded to prevent blocking first paint
- All animations use `will-change: transform` via Framer Motion
- Intersection Observer prevents off-screen animation overhead
- Font preconnect headers added in layout for faster font loading
- Images should use Next.js `<Image>` for automatic optimization

## 📦 Deploy

Optimized for **Vercel** deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

Built with ❤️ for conversion-focused recruitment experiences.
