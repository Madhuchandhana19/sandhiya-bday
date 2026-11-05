# Project Context: Sandhiya's 20th Birthday Celebration Website

## 🎂 Executive Overview
A personalized, multi-slide 20th birthday celebration website built for **Sandhiya** by her best friends **Madhu Chandhana K S**, **Rithika Sri S**, and **SRINITHI S**. The website delivers a cohesive interactive narrative journey through 7 distinct slides combining authentication, sentimental letters, interactive games, 3D graphics, a playful prank, and a grand finale video.

---

## 🎯 Milestone Goal: Polish & Enhance Experience
Refine and elevate the existing implementation focusing on:
1. **Audio & Media Harmony:** Flawless audio transitions, resilient autoplay handling across devices, volume leveling, and background/video coexistence.
2. **Visual & UI Polish:** Harmonize typography, smooth out CSS animations, improve spacing, elevate card shadows, and enhance ambient sparkle and confetti cannons.
3. **Mobile & Cross-Device Responsiveness:** Ensure pixel-perfect scaling on mobile phones (where Sandhiya is most likely to view it), including touch gestures for the 3D cake slicing and responsive video player sizing.
4. **Interaction & Feedback Delight:** Micro-interactions on buttons, tactile feedback on candle blowing and RPS game, and flawless runaway button kinematics.

---

## 🛠️ Technology Stack
* **Markup:** Semantic HTML5 (`index.html`)
* **Styling:** Custom CSS3 with flexbox/grid, CSS animations, and Google Fonts (`Caveat`, `Comfortaa`, `Dancing Script`, `Fredoka`, `Pacifico`, `Poppins`, `Quicksand`)
* **Scripting:** Pure ES6+ JavaScript (`script.js`)
* **3D Graphics:** Three.js (`three.min.js`) for procedural 3-tier cake geometry and slice mechanics
* **Media:** HTML5 `<audio>` and `<video>` with custom overlay controls
* **Local Server:** Lightweight Node.js static server with HTTP range request support (`serve.js`, `start-server.bat`)

---

## 🗺️ Slide Flow Overview
1. **Slide 1 (VIP Gatekeeper):** Identity verification (`sandhiya` / `061106`) with photo frame and instant BGM playback on access.
2. **Slide 2 (Candle & Birthday Wish):** Interactive candle blowout with smoke/confetti and heartfelt message.
3. **Slide 3 (Rock Paper Scissors):** Mini-game duel with AI prediction; victory unlocks Slide 4.
4. **Slide 4 (Vintage Scrapbook Letter):** Burnt parchment aesthetic containing deeply sentimental shared memories (B1-007, PG roommates, exam loops).
5. **Slide 5 (3D Cake Cutting):** Interactive 3D cake sliced by dragging a pink knife.
6. **Slide 6 (Runaway "YESS!!" Button):** Playful evasive button that dodges taps before unlocking.
7. **Slide 7 (Grand Finale Video):** Dedicated celebration video player with sound.

