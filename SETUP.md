# R.K. Electricals — Setup Guide

## Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier is fine): https://supabase.com
- An ImageKit account (free tier): https://imagekit.io

---

## Step 1 — Install Dependencies

```bash
cd rk-electricals-website
npm install
```

---

## Step 2 — Supabase Setup

### 2a. Create a Project
1. Go to https://app.supabase.com
2. Click **New Project**
3. Set a name, password, and region (Mumbai → `ap-south-1`)

### 2b. Run the Database Schema
1. In Supabase Dashboard → **SQL Editor** → **New Query**
2. Paste the contents of `supabase/schema.sql`
3. Click **Run**

### 2c. Create an Admin User
1. Supabase Dashboard → **Authentication** → **Users** → **Add User**
2. Use email: `admin@rkelectricals.com` (or any email you prefer)
3. Set a strong password — this is what you'll use to log in at `/login`

### 2d. Get API Keys
1. Supabase Dashboard → **Project Settings** → **API**
2. Copy **Project URL** and **anon public** key

---

## Step 3 — ImageKit Setup

### 3a. Create an Account
1. Sign up at https://imagekit.io
2. Go to your dashboard to get credentials

### 3b. Get Your Keys
1. Dashboard → **Developer** → **API Keys**
2. Copy **URL Endpoint**, **Public Key**, and **Private Key** (keep the Private Key highly secure!)

### 3c. Set Up Secure Media Upload Auth (Supabase Edge Function)
To authorize client-side image uploads securely to ImageKit, the project includes a Supabase Edge Function that acts as the serverless authentication endpoint:
1. Make sure you have the Supabase CLI installed on your machine.
2. Link your Supabase project in the terminal:
   ```bash
   supabase login
   supabase link --project-ref your-project-ref-id
   ```
3. Set your ImageKit Private Key securely in Supabase Secrets:
   ```bash
   supabase secrets set IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   ```
4. Deploy the authentication Edge Function:
   ```bash
   supabase functions deploy imagekit-auth
   ```
This activates direct, secure file uploading inside your R.K. Electricals website dashboard!

---

## Step 4 — Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

VITE_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-imagekit-id
VITE_IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxx
```

---

## Step 5 — Run Development Server

```bash
npm run dev
```

Open http://localhost:5173

---

## Step 6 — Admin Panel

1. Go to http://localhost:5173/login
2. Sign in with the admin email/password you created in Supabase
3. Manage testimonials, projects, and leads from the dashboard

---

## Step 7 — Build for Production

```bash
npm run build
```

Deploy the `dist/` folder to:
- **Vercel** (recommended — free, fast)
- **Netlify**
- **Firebase Hosting**

---

## Project Structure

```
src/
├── components/
│   ├── public/       # Website sections (Header, Hero, Services, etc.)
│   ├── admin/        # Admin layout and sidebar
│   └── ui/           # Reusable UI (Modal, StarRating, etc.)
├── pages/
│   ├── Home.jsx      # Public homepage
│   ├── Login.jsx     # Admin login
│   └── admin/        # Admin CRUD pages
├── hooks/            # React Query + Supabase data hooks
├── lib/              # Supabase client
└── utils/            # ImageKit upload utility
```

---

## Key URLs

| Route              | Description             |
|--------------------|-------------------------|
| `/`                | Public website          |
| `/login`           | Admin login             |
| `/admin`           | Admin dashboard         |
| `/admin/testimonials` | Manage reviews        |
| `/admin/projects`  | Manage gallery          |
| `/admin/leads`     | View & manage enquiries |

---

## Business Contacts (Pre-filled in Website)

| Contact        | Number           |
|----------------|------------------|
| Kirit Bhai     | +91 87799 79519  |
| Rajesh         | +91 98197 50137  |
| Jasmine        | +91 99202 49933  |
| Shop Landline  | 022 2833 7226    |

**WhatsApp** links to Rajesh's number by default.

---

## Customisation Tips

- **Change phone numbers**: Search for `87799` in `src/` to find all hardcoded phone references
- **Add services**: Edit `src/components/public/Services.jsx` — the `SERVICES` array
- **Change trust points**: Edit `src/components/public/TrustSection.jsx` — the `REASONS` array
- **Change colour theme**: Edit `tailwind.config.js` — the `navy` and `amber` colour scales
- **Update address/map**: Edit `src/components/public/Contact.jsx` — update the Google Maps `iframe` src
