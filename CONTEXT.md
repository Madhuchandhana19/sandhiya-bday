# 🎂 Sandhiya's 20th Birthday Website - Context & Architecture Reference

This document serves as the persistent technical and contextual reference for the project to ensure precision, continuity, and high-performance development.

---

## 📌 1. Project Overview & People
* **Celebrant / Recipient:** Sandhiya (turning 20)
* **Created By:** Madhu Chandhana K S, Rithika Sri S, Srinithi S
* **Tone & Theme:** Warm, playful, heartfelt, aesthetic (cute pastel pinks, gold accents, vintage parchment, emotional BGM).
* **Location & Memories Referenced:**
  * Room B1-007
  * 3rd-year PG roommates
  * Exam loops & panic stress-buster
  * Long-running inside jokes ("dropped by a nurse as a baby", 18+ jokes tutoring)

---

## 🔑 2. VIP Gatekeeper & Access Credentials
* **Slide ID:** `#login-section`
* **Username Accepted:** `sandhiya` (case-insensitive, strips spaces and underscores)
* **Secret Passcode Accepted:** `061106` (also accepts formats like `06/11/06`, `06-11-2006`, `06112006`)
* **Trigger Element:** `#login-submit-btn` (`handleLoginAttempt()`)
* **Audio Behavior on Login:** As soon as credentials match, `startMusic()` is triggered directly within the user gesture, auto-playing the background BGM (`audio/birthday-song.mp3`).

---

## 🗺️ 3. Complete Slide-by-Slide Experience

### Slide 1: VIP Gatekeeper (`#login-section`)
* Queen crown badge, header "Hey Birthday Girl! ✨"
* Sandhiya's profile photo (`images/sandhiya.jpg`) inside `.auth-photo-frame`
* Username and passcode input fields with show/hide password toggle (`#toggle-pwd-btn`)
* Inline error indicators: `#username-error` and `#passcode-error`
* "Get Ready ✨" CTA button

### Slide 2: Birthday Wish & Interactive Candle (`#celebration-section`)
* Interactive Birthday Cake (`#cake-interactive`) with flame (`#candle-flame`), wick, and smoke puff (`#smoke-puff`)
* "Blow Out Candle 💨" button (`#blow-btn` / `toggleCandle()`)
* Confetti burst and flame extinguishing animation
* Opening heartfelt letter paragraph
* Transition button to next challenge: `#open-game-btn` ("Ready for the next slide? 🎮✨")

### Slide 3: Rock Paper Scissors Challenge (`#game-section`)
* Header: "Win to see the next slide"
* Duel Arena with player choice (`#player-choice-display`) and computer choice (`#computer-choice-display`)
* Markov prediction model & win-stay-lose-shift AI in `script.js`
* Buttons: Rock (✊), Paper (✋), Scissors (✌️)
* Condition: Winning automatically triggers a victory confetti cannon and advances to Slide 4.

### Slide 4: Vintage Scrapbook Letter (`#burnt-letter-section`)
* Aged coffee-brown parchment styling with charred burnt edges (`.vintage-scrapbook-letter`)
* Unfiltered, deeply sentimental best-friend letter detailing shared college and PG memories
* Button: `#final-surprise-btn` ("Ready for your final surprise? ✨🎁")
* Transition: Stops the background MP3 audio via `stopMusic()` and mounts Slide 5.

### Slide 5: 3D Cake & Pink Knife Slicing (`#slide5-surprise`)
* Powered by Three.js canvas (`#cake3d-canvas`)
* 3D three-tiered pastel cake with decorative frosting and cherry toppers
* Interactive draggable pink knife controller (`#interactive-knife`)
* Mechanics: Dragging the knife downward across the cake triggers cutting animations, slice separation, and cake completion.
* Slide 5 melody controller: `#slide5-music-btn` / `startSlide5Music()`

### Slide 6: Playful Prank / Runaway Button (`#slide6-kidding`)
* Header: "We were kidding ready for your final surprise 😜✨"
* Runaway button (`#runaway-yes-btn` labeled "YESS!! 💖")
* Button playfully darts away from the cursor/finger when hovered or touched for 4 attempts before locking into place and turning clickable.
* Clicking the unlocked button transitions to Slide 7.

### Slide 7: The Grand Finale Celebration Video (`#slide7-video-final`)
* Header: "Happy 20th Birthday, Sandhiya! 💖✨"
* Video player (`#surprise-video`) rendering `video/birthday-surprise.mp4`
* Autoplay with sound handling and tap-to-play fallback overlay (`#video-play-overlay`)
* Replay controls to revisit earlier memories

---

## 🎵 4. Audio & Media System Architecture
* **Primary Audio Element:** `#bg-audio` pointing to `audio/birthday-song.mp3`
* **Audio File:** 1.39 MB MPEG Audio track (instrumental/melodic BGM)
* **Key Functions:**
  * `startMusic()`: Safe HTML5 audio playback with volume 0.8 and click/touch fallback unlocker.
  * `stopMusic()`: Pauses `#bg-audio`, clears procedural synth timers, and updates UI button `#music-btn`.
  * `setMusicPlayingState(playing, label)`: Synchronizes the top navigation pill and visualizer bars.
  * `startSlide5Music()` & `stopSlide5Music()`: Manages Slide 5 specific melody.
  * `startSurpriseVideo()`: Handles video play and overlay management.

---

## 📁 5. Directory & Asset Map
```text
sandhiya-bday/
├── audio/
│   ├── birthday-song.mp3              # Main celebration background audio
│   └── Uyire-Un-Uyirena_Ringtone.mp3  # Matching audio source
├── images/
│   ├── sandhiya.jpg                   # Primary portrait for Slide 1 & video poster
│   ├── memory1.jpg, memory2.jpg...   # Gallery memories
│   ├── vintage-paper.jpg              # Burnt parchment texture
│   └── pink-glitter-bg.png            # Ambient backdrop texture
├── video/
│   └── birthday-surprise.mp4          # Final slide celebration video (20MB)
├── index.html                         # Full 7-slide HTML structure
├── style.css                          # Styles, animations, responsive layouts
├── script.js                          # Game logic, 3D engine hooks, audio controllers
├── three.min.js                       # Three.js 3D library
├── serve.js                           # Node.js local streaming server (Range header support)
├── start-server.bat                   # 1-click launcher for Windows
└── CONTEXT.md                         # This reference document
```

---

## 🛠️ 6. Development & Preview Workflow
* **Local Server:** Port `8080` via `node serve.js` or `start-server.bat`
* **Local URL:** `http://localhost:8080/`
* **Script Cache Buster:** Update `?v=X` in `index.html` after modifying `script.js`.

