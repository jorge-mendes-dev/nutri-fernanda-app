# nutri-fernanda-app

A web application for nutritionist Fernanda Souza — allowing clients to browse nutrition plans, add them to a cart, check out, manage their profile, and authenticate via Supabase.

**Live:** [app.nutrifernandasouza.com.br](https://app.nutrifernandasouza.com.br)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth & Database | Supabase (`@supabase/ssr`) |
| i18n | next-intl (EN / PT) |
| UI Components | Headless UI, Heroicons |
| Deployment | Netlify |

## Features

- **Product catalog** — browse and add nutrition plans to a cart
- **Shopping cart** — adjust quantities, remove items, view subtotal
- **Checkout** — order summary and payment details form
- **Authentication** — Google OAuth via Supabase with protected routes
- **User profile** — view account details and membership info
- **Internationalization** — English and Portuguese (BR) with `next-intl`
- **Responsive design** — mobile-first layout with Tailwind CSS

## Project Structure

```
app/
  [locale]/         # Locale-scoped pages (home, cart, checkout, login, profile, dashboard)
  auth/callback/    # Supabase OAuth callback route
  components/       # Shared components (Navbar, CartProvider, AuthGuard, etc.)
  globals.css
locales/
  en.json           # English translations
  pt.json           # Portuguese translations
src/
  supabase/         # Supabase client (browser + server)
  i18n/             # next-intl request config
```

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project with Google OAuth configured

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 4000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment

This project is deployed on **Netlify** using the `@netlify/plugin-nextjs` plugin. The build command is `yarn run build` and the publish directory is `.next`.

Set the environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`) in your Netlify site settings.
