# NLYTN Studio - Portfolio & Booking Website

A modern, high-performance static website for music studios and audio post-production facilities. Built with pure HTML, vanilla CSS, and JavaScript.

## ✨ Features

- **Interactive Landing Page**: Full-screen video/image hero, smooth section navigation, and animations.
- **Studio Showcase**: Acoustic room details, gear highlights, and living-room style production overview.
- **Equipment Showcase**: High-res visual equipment cards (Digital Synthesizers, Keyboards, Audio Monitors, Outboard Gear).
- **3-Column Technical Specifications**: High-contrast, clean equipment specs for Microphones, Monitoring, and Compression/Limiting.
- **Interactive Calendar & Slot Selector**:
  - Browse calendar months and days.
  - Select continuous hourly slots (up to 5 hours).
  - Validation ensures valid, continuous bookings without double-booking.
- **Booking Request Modal**:
  - Collects client name, email, phone, and project notes.
  - Pre-fills selected date and time slots.
  - Submits requests via standard form services (Web3Forms, Formspree, or custom webhook).
  - Displays instant on-page confirmation.
- **Client Testimonials**: Social proof and artist review cards.
- **Social & Music Streaming Links**: Spotify, Apple Music, YouTube, SoundCloud, Instagram, Facebook, and Email.
- **Zero-Dependency & Zero Server Maintenance**: Pure static files ready to deploy anywhere for free.

---

## 🚀 Quick Start (Local Preview)

No installations, build steps, or database configurations required.

You can preview the site using any static web server:

### Option A: Python Built-in Server
```bash
python -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

### Option B: Node / npx
```bash
npx serve .
```

### Option C: VS Code Live Server
Right-click `index.html` and select **"Open with Live Server"**.

---

## 🌐 Deployment (Ready for Any Platform)

Since this is a pure static website, you can deploy it in seconds with zero configuration:

### 1. GitHub Pages
1. Push this repository to GitHub.
2. In your repo settings, go to **Pages**.
3. Under **Build and deployment**, select **Source: Deploy from a branch** -> `main` / `root`.
4. Click **Save**. Your site is live!

### 2. Vercel
1. Import this repository in [vercel.com](https://vercel.com).
2. Framework Preset: **Other** (Root directory: `./`).
3. Click **Deploy**.

### 3. Netlify
1. Drag and drop this folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or connect your Git repository.
2. Publish directory: `.`
3. Click **Deploy Site**.

### 4. Cloudflare Pages
1. Connect repo in Cloudflare Dashboard -> **Pages**.
2. Build command: *(leave empty)*
3. Build output directory: `.`

---

## ⚙️ Configuring Booking Form Notifications

By default, the booking modal simulates submission with instant on-page confirmation.

To receive instant email notifications whenever a client books:
1. Get a free form access key from [Web3Forms](https://web3forms.com/) or a form endpoint from [Formspree](https://formspree.io/).
2. In `index.html`, update the `<form id="booking-request-form" ...>` action attribute:
   ```html
   <form id="booking-request-form" action="https://api.web3forms.com/submit" method="POST">
       <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```
3. That's it! Booking requests will be delivered directly to your inbox.

---

## 📁 Project Structure

```
├── index.html                   # Complete Studio Landing Page
├── Readme.md                    # Documentation & Deployment Guide
├── LICENSE.md                   # License
├── .gitignore                   # Git Ignore configuration
└── static/
    ├── css/
    │   ├── main-studio.css      # Studio layout & core styles
    │   ├── style-studio.css     # Studio typography & components
    │   ├── style-calendar.css   # Interactive calendar styles
    │   ├── booking-modal.css    # Booking request modal popup styles
    │   ├── menu-image.css       # Navigation header styles
    │   └── libse.css            # Base utilities
    ├── js/
    │   ├── script-calendar.js   # Interactive booking calendar logic
    │   ├── booking-modal.js     # Modal controller & submission handler
    │   ├── script-studio.js     # Navigation & animations
    │   ├── skip-link-focus-fix.js
    │   └── vendors/
    │       └── jquery-3.7.1.min.js
    ├── images/                  # Studio photography, showcase, & icons
    └── fonts/                   # Space Grotesk fonts
```
