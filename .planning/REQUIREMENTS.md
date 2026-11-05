# Requirements Specification

## Milestone: Polish & Enhance Existing Experience

### 🎵 1. Audio & Media System
- [ ] **REQ-AUDIO-01:** Background audio (`audio/birthday-song.mp3`) reliably triggers on login across major browsers (Chrome, Safari, Edge, Mobile Safari/Chrome) without requiring a second click.
- [ ] **REQ-AUDIO-02:** Background audio smoothly pauses when transitioning to Slide 5 (3D cake) and Slide 7 (Video), resuming cleanly if the user navigates back.
- [ ] **REQ-AUDIO-03:** Video player (`#surprise-video`) plays with full sound and provides clear fallback tap-to-play prompt if browser blocks automatic unmuted playback.

### 🎨 2. Visual Polish & Styling
- [ ] **REQ-UI-01:** Standardize typography scale, letter-spacing, and line-heights across cards to prevent text overflow or clipping on small screens.
- [ ] **REQ-UI-02:** Refine the aesthetic of Slide 4 (Vintage Scrapbook Letter) with realistic burnt edges, paper grain, and legible vintage cursive/serif font styling.
- [ ] **REQ-UI-03:** Smooth card enter/exit animations (`fadeInScale`, slide transitions) without visual jitter or sudden height jumps.

### 📱 3. Mobile Responsiveness & Touch Ergonomics
- [ ] **REQ-MOBILE-01:** Login inputs and buttons fit comfortably within mobile viewports (down to 360px width) without triggering horizontal scrolling.
- [ ] **REQ-MOBILE-02:** Draggable knife in Slide 5 responds smoothly to mobile `touchstart`, `touchmove`, and `touchend` events without scrolling the page while cutting.
- [ ] **REQ-MOBILE-03:** Runaway "YESS!!" button in Slide 6 operates smoothly with mobile touch taps within the bounded arena.
- [ ] **REQ-MOBILE-04:** Final video container fits mobile aspect ratios cleanly without black letterboxing or clipping controls.

### ⚡ 4. Performance & Robustness
- [ ] **REQ-PERF-01:** Canvas glitter and celebratory confetti perform at 60fps without lagging or leaking animation frames.
- [ ] **REQ-PERF-02:** Three.js render loop cleanly pauses/resumes when Slide 5 is visible/hidden to preserve battery and GPU usage on mobile.

