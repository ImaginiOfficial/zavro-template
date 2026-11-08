# Aurora – Standalone Zavro Ecommerce Template

![Aurora Preview](https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80)

**Aurora** is a complete, luxury fashion ecommerce website template built with Next.js, React, and Tailwind CSS. It is the official standalone reference template for the **Zavro** ecommerce platform.

Designed with an editorial luxury aesthetic inspired by European fashion ateliers, Aurora serves as the definitive reference project for future Zavro template developers.

---

## 🌟 Key Features

- **Announcement Bar:** Dismissible top banner with promotion announcements and international currency indicator.
- **Header & Navigation:** Responsive navigation with brand identity, live search modal with instant product filtering, and shopping bag counter badge.
- **Hero Banner:** Full-bleed editorial photography, luxury typography, primary and secondary call-to-actions, and trust value badges.
- **Curated Category Grid:** Visual category cards with smooth hover zoom effects and piece counts.
- **Featured Editions:** Highlighting signature atelier releases with color swatches, ratings, and Quick Add.
- **Promotional Campaign Banner:** Split-screen editorial storytelling section for seasonal capsules.
- **New Arrivals & Bestsellers:** Curated product grids with live badge indicators (`New`, `Bestseller`, `Sale`).
- **Brand Ethos / Manifesto:** Editorial quote and sustainability value pillars.
- **Newsletter Subscription:** Interactive client newsletter signup with immediate discount code activation.
- **Footer:** Brand story, categorized navigation links, concierge contact details, social links, and security badges.
- **Product Listing Page (`/products`):**
  - Instant category filtering
  - Price range slider
  - Status filters (New Arrivals, Bestsellers, On Sale)
  - Sorting (Price Low-to-High, High-to-Low, Highest Rated, Newest)
  - Keyword search
  - Active filter chips and reset functionality
- **Product Details Page (`/product/[id]`):**
  - High-resolution gallery with thumbnail switcher
  - Color swatches with active selection
  - Size selector with size guide modal trigger
  - Quantity adjuster
  - Add to Bag with real-time feedback & Instant Buy Now
  - Tailoring details, composition, and shipping policy accordions
  - Recommended ensemble product recommendations
- **Shopping Bag Page (`/cart`):**
  - Dynamic cart management powered by React Context and `localStorage` persistence
  - Quantity increment/decrement and item removal
  - Interactive coupon codes (e.g. `AURORA15` for 15% off, `WELCOME10` for 10% off)
  - Dynamic shipping and tax calculations
  - Checkout integration preview modal

---

## 📐 Zavro Compatibility & `template.json`

Aurora includes a standardized `template.json` configuration file at the repository root. This metadata allows the Zavro platform and template managers to detect, preview, and configure the template:

```json
{
  "id": "aurora",
  "name": "Aurora",
  "version": "1.0.0",
  "category": "Fashion & Apparel",
  "description": "A luxury, minimalist fashion ecommerce template crafted for modern ready-to-wear, footwear, and designer accessory labels.",
  "preview": {
    "thumbnail": "...",
    "desktop": "...",
    "mobile": "..."
  },
  "sections": [
    { "id": "announcement_bar", "name": "Announcement Bar", "order": 1, ... },
    { "id": "header", "name": "Header & Navigation", "order": 2, ... },
    { "id": "hero", "name": "Hero Banner", "order": 3, ... },
    { "id": "categories", "name": "Curated Categories", "order": 4, ... },
    { "id": "featured_products", "name": "Featured Products", "order": 5, ... },
    { "id": "promo_banner", "name": "Promotional Image Banner", "order": 6, ... },
    { "id": "new_arrivals", "name": "New Arrivals", "order": 7, ... },
    { "id": "bestsellers", "name": "Best-Selling Products", "order": 8, ... },
    { "id": "newsletter", "name": "Newsletter Subscription", "order": 9, ... },
    { "id": "footer", "name": "Footer", "order": 10, ... }
  ]
}
```

Each section defines:
- Default text, labels, and image URLs
- Editable field schemas (`text`, `textarea`, `image`, `link`, `number`, `boolean`)
- Configurable display order

---

## 📂 Project Structure

```text
zavro-template/
├── template.json                # Zavro template schema & section registry
├── package.json                 # Dependencies and build scripts
├── tsconfig.json                # TypeScript configuration with @/* path aliases
├── next.config.ts               # Next.js configuration (remote image patterns)
├── postcss.config.mjs           # Tailwind CSS PostCSS plugin config
├── README.md                    # Setup and customization documentation
├── public/
│   ├── images/
│   │   ├── logo.png             # Brand logo asset
│   │   ├── hero.jpg             # Hero photography
│   │   ├── banners/             # Promotional campaign banners
│   │   │   └── promo-banner.jpg
│   │   └── products/            # Sample product images
│   │       ├── product-1.jpg
│   │       ├── product-2.jpg
│   │       └── product-3.jpg
│   └── favicon.ico
└── src/
    ├── app/
    │   ├── layout.tsx           # Root layout with CartProvider & global navigation
    │   ├── page.tsx             # Homepage assembling all sections
    │   ├── products/
    │   │   └── page.tsx         # Product listing & filter page
    │   ├── product/
    │   │   └── [id]/
    │   │       └── page.tsx     # Dynamic product detail page
    │   └── cart/
    │       └── page.tsx         # Shopping bag and order summary page
    ├── components/
    │   ├── AnnouncementBar.tsx  # Top announcement notification
    │   ├── Header.tsx           # Brand header, search modal, and navigation
    │   ├── Hero.tsx             # Hero banner with call-to-actions
    │   ├── CategoryGrid.tsx     # Editorial category visual grid
    │   ├── ProductCard.tsx      # Reusable product card with swatches & Quick Add
    │   ├── ProductGrid.tsx      # Responsive product grid container
    │   ├── PromotionalBanner.tsx# Campaign storytelling banner
    │   ├── Newsletter.tsx       # Newsletter subscription form
    │   └── Footer.tsx           # Multi-column footer with contact details
    ├── context/
    │   └── CartContext.tsx      # Cart state management (local storage & calculations)
    ├── data/
    │   ├── categories.ts        # Modular category sample data
    │   └── products.ts          # Realistic dummy product catalogue
    ├── styles/
    │   └── globals.css          # Design system theme variables and Tailwind imports
    └── types/
        └── index.ts             # TypeScript interfaces for products, categories, cart
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18.0.0 or higher
- `npm`, `pnpm`, or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ImaginiOfficial/zavro-template.git
   cd zavro-template
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view Aurora.

### Production Build

To build the standalone application for production:

```bash
npm run build
npm run start
```

---

## 🎨 Customization Guide for Developers

### 1. Replacing Products & Categories
Dummy data is stored in isolated files for easy modification or API binding:
- **Products:** [`src/data/products.ts`](src/data/products.ts) — Edit, add, or replace products with your store catalogue.
- **Categories:** [`src/data/categories.ts`](src/data/categories.ts) — Configure shop categories and banner imagery.

To connect a live Zavro API or headless ecommerce backend, simply replace the local imports in `src/app` pages with your API client.

### 2. Design System & Theme Colors
Tailwind CSS v4 theme variables are declared in [`src/styles/globals.css`](src/styles/globals.css):

```css
@theme {
  --color-brand-primary: #121212;
  --color-brand-secondary: #242424;
  --color-brand-accent: #c5a880;
  --color-brand-cream: #fbf9f5;
  --color-brand-surface: #f7f6f2;
}
```

Modify these hex values to instantly adjust the palette of the entire template.

### 3. Connecting Checkout
When a user clicks **Proceed to Checkout** in [`src/app/cart/page.tsx`](src/app/cart/page.tsx), `useCart()` provides the complete `cart`, `subtotal`, `shippingFee`, `promoDiscount`, and `total`. Replace the modal preview with your Zavro checkout redirect or payment gateway handler (Stripe, PayPal, etc.).

---

## 📄 License

Created by **Zavro**. Open for developers to customize and build custom ecommerce templates.

