# Phase 3 Plan: Royal 3D Cake Cutting Showstopper Experience

## Goal
Transform Slide 5 (3D Cake Cutting) from a plain, hurried interaction into a luxurious, highly interactive showstopper moment featuring a realistic 3-tier birthday cake, candle flame, glossy cherries, golden "20" topper, satisfying slicing mechanics, sweet music box chimes, and an unhurried, joyous post-cut celebration.

---

## Tasks

### Task 1: 3D Cake Visual Overhaul in Three.js
* **Target:** `script.js` (`init3DCake()`)
* **Actions:**
  1. Upgrade cake materials to high-spec `MeshStandardMaterial` with clearcoat-like specular highlights and metallic gold rims.
  2. Add piped whipped-cream rosettes around each tier.
  3. Add specular red glazed cherries with little stems on the tier edges.
  4. Add an illuminated Birthday Candle on the top tier with a soft flickering flame light and procedural flame mesh.
  5. Add a 3D Golden Crown "20" emblem on top of the cake.
  6. Add a porcelain gilded dessert plate in front of the cake where the cut slice glides out.

### Task 2: Interactive Slicing & Sparkle FX
* **Target:** `index.html`, `style.css`, `script.js` (`setupInteractiveKnife()`, `completeCakeCut()`)
* **Actions:**
  1. Add a glowing cutting guide line on the cake that intensifies as the knife approaches.
  2. Implement progressive slicing feedback: as the knife drags down, emit sweet musical bell chimes and a trail of gold/pink stardust sparks.
  3. When cut completes: animate the cake slice smoothly forward onto its own gold-trimmed porcelain plate.
  4. Blow out the candle flame with an animated smoke puff particle.

### Task 3: Post-Cut Celebration & User-Paced Transition
* **Target:** `index.html`, `style.css`, `script.js`
* **Actions:**
  1. Remove the abrupt 1.2s auto-transition.
  2. Display a celebratory pop-in card: *"✨ Make a Wish, Queen Sandhiya! 🎂 Happy 20th Birthday! 👑💕"*.
  3. Trigger a massive multi-color confetti explosion and golden sparkler celebration.
  4. Add an animated, inviting button: *"Ready for what's next? 😜✨"* letting Sandhiya control when to transition to Slide 6.

### Task 4: Sweet Music Box Audio Upgrade
* **Target:** `script.js` (`startSlide5Music()`, `playChimeTone()`)
* **Actions:**
  1. Replace flat oscillator tones with a warm, crystalline music-box synthesizer (sine + soft harmonic overtones with gentle exponential envelope).
  2. Add sweet slicing sound effects when dragging the knife through the cake.

---

## Success Criteria
- [x] 3D cake looks rich, realistic, and celebratory with candle, cherries, cream rosettes, and golden "20" topper.
- [x] Dragging the knife gives tactile cutting feedback with sparks and chimes.
- [x] Cake slice glides out gracefully onto its own dessert plate.
- [x] Sandhiya is never rushed; she gets to enjoy the moment and clicks to proceed at her own pace.
- [x] Buttery 60fps performance on laptop displays.
