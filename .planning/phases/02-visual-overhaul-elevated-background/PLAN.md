# Phase 2 Plan: Visual Overhaul & Elevated Background Styling

## Goal
Transform the plain/simple background into a rich, magical, luxurious birthday atmosphere tailored specifically for laptop viewports.

---

## Tasks

### Task 1: Rich Multi-Layered Atmosphere & Animated Aurora Orbs
* **Target:** `index.html`, `style.css`
* **Actions:**
  1. Replace the plain flat pastel background in `body` with a deep, romantic, dimensional evening rose & twilight velvet mesh (`#1a0618` base blended into radiant magenta, orchid purple, and champagne gold).
  2. Add an ambient Aurora Orb container (`.aurora-bg`) with 5 floating luminous color orbs (Champagne Gold, Neon Rose, Orchid Twilight, Peach Coral, and Pearl Sparkle).
  3. Animate each orb with independent, smooth, non-linear floating paths (`@keyframes floatOrb1` to `floatOrb5`) to create a constantly evolving, living background across the laptop viewport.

### Task 2: Upgraded Celestial Stardust & Diamond Sparkle Canvas
* **Target:** `script.js` (`glitter-canvas`, `GlitterParticle`)
* **Actions:**
  1. Upgrade the 2D canvas particle engine to draw 4-pointed shimmering diamond stars, soft glowing circular bokeh motes, and golden stardust specks.
  2. Implement breathing sinusoidal opacity and rotation for natural, organic twinkling.
  3. Expand the particle color palette to include Champagne Gold (`#ffd700`), Diamond White (`#ffffff`), Rose Quartz (`#ffb6d2`), and Radiant Pink (`#ff2e93`).
  4. Ensure 60fps performance on laptop displays with hardware-accelerated canvas sizing.

### Task 3: Luxury Frosted Card Polish & Framing for Laptop Screens
* **Target:** `style.css` (`.birthday-card`, `.top-nav`, `.brand-pill`, `.music-toggle-btn`)
* **Actions:**
  1. Enhance `.birthday-card` depth with multi-layered diffused pink/gold shadows and an iridescent gradient border.
  2. Upgrade `.brand-pill` and `.music-toggle-btn` to frosted glass luxury status with subtle neon glow.
  3. Ensure high contrast and crystal-clear readability for all text, headings, and memories over the new rich background.

---

## Success Criteria
- [x] Background feels rich, premium, and alive on laptop screens, completely replacing the simple/plain look.
- [x] Floating bokeh orbs and diamond stardust create a magical, layered depth behind the cards.
- [x] Text and card elements remain sharp, legible, and high-contrast.
- [x] Canvas particle animation runs at buttery 60fps without performance drops.
