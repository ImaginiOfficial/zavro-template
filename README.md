# Aurora – Standalone Zavro Ecommerce Template

![Aurora Preview](https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80)

[![GitHub Package](https://img.shields.io/badge/GitHub%20Packages-@imaginiofficial/zavro--template--aurora-blue?logo=github)](https://github.com/ImaginiOfficial/zavro-template/packages)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](package.json)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

**Aurora** is a complete, luxury fashion ecommerce website template built with Next.js, React, and Tailwind CSS. It is packaged as a reusable, versioned npm package distributed via **GitHub Packages** for seamless consumption by the **Zavro** website generation workflow.

---

## 📦 Package Identity

| Property | Value |
| :--- | :--- |
| **Package Name** | `@imaginiofficial/zavro-template-aurora` |
| **Registry** | `https://npm.pkg.github.com` |
| **Repository** | `https://github.com/ImaginiOfficial/zavro-template` |
| **Current Version** | `1.0.0` |
| **Template ID** | `aurora` |
| **Category** | Fashion & Apparel |

---

## 🚀 Publishing to GitHub Packages

### Prerequisites

To publish this package to GitHub Packages, you need a GitHub Personal Access Token (PAT) with `write:packages` and `read:packages` permissions, or you can use the automated GitHub Actions workflow.

### Option A: Local Terminal Publishing

1. **Authenticate with GitHub Packages npm registry:**

   ```bash
   npm login --scope=@imaginiofficial --registry=https://npm.pkg.github.com
   ```

   When prompted:
   - **Username:** Your GitHub username
   - **Password:** Your GitHub Personal Access Token (PAT with `write:packages` scope)
   - **Email:** Your GitHub public email

2. **Verify local build:**

   ```bash
   npm run build
   ```

3. **Publish the package:**

   ```bash
   npm publish
   ```

> [!NOTE]
> Alternatively, you can configure your user-level `~/.npmrc` (`%USERPROFILE%\.npmrc` on Windows) without checking in any secrets:
> ```ini
> @imaginiofficial:registry=https://npm.pkg.github.com
> //npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
> ```

---

### Option B: Automated GitHub Actions Publishing (Recommended)

This repository includes a pre-configured GitHub Actions workflow in [`.github/workflows/publish.yml`](.github/workflows/publish.yml).

- **Via Release:** Creating and publishing a new release in the GitHub repository automatically publishes that version to GitHub Packages using the built-in `GITHUB_TOKEN`.
- **Via Manual Trigger:** Navigate to **GitHub Repository > Actions > Publish to GitHub Packages > Run workflow**.

---

## 📥 Consuming the Template in Zavro or Other Projects

### 1. Authenticate the Consuming Project

In the project or builder service that will download the template, create a `.npmrc` file:

```ini
@imaginiofficial:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 2. Download or Extract the Template

#### Approach 1: Add as a Dependency

```bash
npm install @imaginiofficial/zavro-template-aurora
```

#### Approach 2: Extract Full Source Code (for Zavro Site Builder Generation)

To instantiate a fresh website instance from the package tarball:

```bash
# Download the package tarball
npm pack @imaginiofficial/zavro-template-aurora

# Extract the complete source code
tar -xzf imaginiofficial-zavro-template-aurora-1.0.0.tgz --strip-components=1 -C ./my-new-store

# Enter directory and install dependencies
cd my-new-store
npm install
npm run dev
```

---

## 📐 Template Metadata (`template.json`)

Aurora includes a standardized [`template.json`](template.json) at the root of the package. This metadata allows the Zavro platform to inspect, preview, and inject store data into the template without altering its fixed design:

```json
{
  "id": "aurora",
  "name": "Aurora",
  "version": "1.0.0",
  "category": "Fashion & Apparel",
  "description": "A luxury, minimalist fashion ecommerce template crafted for modern ready-to-wear, footwear, and designer accessory labels.",
  "package": {
    "name": "@imaginiofficial/zavro-template-aurora",
    "registry": "https://npm.pkg.github.com"
  },
  "framework": {
    "name": "Next.js",
    "version": "^16.4.5",
    "router": "App Router",
    "react": "^19.3.1",
    "styling": "Tailwind CSS v4"
  },
  "runtime": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "compatibility": {
    "zavroVersion": ">=1.0.0",
    "fixedDesign": true,
    "builderEditable": false
  },
  "sections": [
    { "id": "announcement_bar", "order": 1, "enabled": true, ... },
    { "id": "header", "order": 2, "enabled": true, ... },
    { "id": "hero", "order": 3, "enabled": true, ... },
    { "id": "categories", "order": 4, "enabled": true, ... },
    { "id": "featured_products", "order": 5, "enabled": true, ... },
    { "id": "promo_banner", "order": 6, "enabled": true, ... },
    { "id": "new_arrivals", "order": 7, "enabled": true, ... },
    { "id": "bestsellers", "order": 8, "enabled": true, ... },
    { "id": "newsletter", "order": 9, "enabled": true, ... },
    { "id": "footer", "order": 10, "enabled": true, ... }
  ]
}
```

---

## 📂 Package Contents

When published, only required source files and public assets are packed. Build directories (`.next`), dependencies (`node_modules`), and git files are automatically excluded:

```text
@imaginiofficial/zavro-template-aurora/
├── template.json                # Template metadata & section field definitions
├── package.json                 # Package manifests & dependencies
├── tsconfig.json                # TypeScript configuration
├── next.config.ts               # Next.js configuration
├── postcss.config.mjs           # Tailwind CSS PostCSS plugin config
├── README.md                    # Documentation
├── public/                      # Static assets (images, banners, icons)
│   ├── favicon.ico
│   └── images/
│       ├── logo.png
│       ├── hero.jpg
│       ├── banners/
│       └── products/
└── src/
    ├── app/                     # Next.js App Router (pages, layouts)
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── products/
    │   ├── product/[id]/
    │   └── cart/
    ├── components/              # Reusable React components
    ├── context/                 # Cart context & state persistence
    ├── data/                    # Modular sample products & categories
    ├── styles/                  # Tailwind theme & global styling
    └── types/                   # TypeScript interfaces
```

---

## 🏷️ Version Management

Aurora follows [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`):

- **Patch (`1.0.1`):** Bug fixes, visual adjustments, styling refinements.
  ```bash
  npm version patch
  ```
- **Minor (`1.1.0`):** New backward-compatible sections, components, or fields.
  ```bash
  npm version minor
  ```
- **Major (`2.0.0`):** Breaking structural changes, major framework upgrades.
  ```bash
  npm version major
  ```

> [!IMPORTANT]
> Once a version is published to GitHub Packages, it cannot be overwritten. Always bump the version prior to publishing.

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/ImaginiOfficial/zavro-template.git
cd zavro-template

# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build
```

---

## 📄 License

MIT © Imagini. Designed for the **Zavro** Ecommerce Platform.
