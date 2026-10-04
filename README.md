# Lai Vathanatola — Portfolio 🚀

> **IT Support Specialist & Network Engineering Student**  
> ACLEDA University of Business · Phnom Penh / Kandal, Cambodia

A high-performance, futuristic portfolio built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Three.js WebGL**. Featuring interactive 3D particle systems, cyberpunk/terminal aesthetics, dynamic hardware & network diagnostics simulations, and seamless contact integration.

---

## ⚡ Live Preview & Features

- **Interactive Three.js 3D Background & Spatial Simulator**: Real-time WebGL particle canvas responding to pointer interactions.
- **Cyberpunk / Terminal Visual Language**: CLI diagnostic simulations (`sfc /scannow`, `DISM`, Cisco VLAN routing logs).
- **High-Tech Splash Screen**: Custom BIOS/kernel-style animated boot sequence.
- **Dynamic Content Management**: Fully structured profile, experience, skills, and project data driven by [`data/portfolioData.ts`](file:///c:/Users/LAI%20VATHANATOLA/Desktop/Dev/New/data/portfolioData.ts).
- **Integrated Contact Hub**: Direct reach via Telegram (`@lai_vathanatola`), phone, email, and API contact route.
- **Mobile Responsive & Accessible**: Fluid typography, responsive grid system, and optimized layout across all device viewports.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router), React 19 |
| **Language** | TypeScript (Strict Mode) |
| **3D & Visuals** | Three.js WebGL, CSS Canvas Animations |
| **Styling** | Modern CSS3 (CSS Variables, Flexbox/Grid, Glassmorphism, Micro-animations) |
| **Runtime & Tooling** | Node.js, npm |

---

## 📂 Project Structure

```text
├── app/
│   ├── api/
│   │   └── contact/route.ts       # Contact form endpoint (Telegram / Email)
│   ├── globals.css                # Core design system & theme variables
│   ├── layout.tsx                 # Root layout & SEO metadata
│   └── page.tsx                   # Main portfolio landing page
├── components/
│   ├── BackgroundCanvas.tsx       # Three.js 3D particle canvas
│   ├── SpatialSimulator.tsx       # Interactive 3D spatial simulation
│   ├── SplashScreen.tsx           # Cyberpunk terminal bootloader screen
│   ├── Hero.tsx                   # Hero section with role typewriter & status badges
│   ├── About.tsx                  # Bio, education facts & academic journey
│   ├── Projects.tsx               # Terminal cards & network lab showcases
│   ├── Stack.tsx                  # Categorized skills matrix & tech chips
│   ├── Writing.tsx                # Technical articles & engineering notes
│   ├── Contact.tsx                # Interactive contact form & quick channels
│   └── Navbar.tsx & Footer.tsx    # Header navigation & footer credentials
├── data/
│   └── portfolioData.ts           # Central source of truth for all content
├── public/                        # Static assets and icons
├── .env.example                   # Template for environment variables
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18.18.0 or newer recommended)
- **npm** (comes with Node.js)

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
npm install
```

### 3. Environment Variables (Optional)
Copy `.env.example` to `.env.local` to configure Telegram or email notification tokens:

```bash
cp .env.example .env.local
```

### 4. Running the Development Server
Start the local Next.js dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the portfolio.

---

## 📦 Production Build

To test or generate the production build:

```bash
npm run build
npm run start
```

---

## 👤 Author

**Lai Vathanatola**
- **Role:** IT Support Specialist & Network Engineering Student
- **University:** ACLEDA University of Business
- **Telegram:** [@lai_vathanatola](https://t.me/lai_vathanatola)
- **Email:** [vathanatola07021@gmail.com](mailto:vathanatola07021@gmail.com)
- **Location:** Cambodia (11.5564° N, 104.9282° E)

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
