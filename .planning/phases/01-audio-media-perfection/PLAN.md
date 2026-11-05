# Phase 1 Plan: Audio & Media System Perfection

## Goal
Establish a reliable, glitch-free audio and video lifecycle from user login through the final surprise video on laptop browsers.

---

## Tasks

### Task 1: Verify & Harden Login Audio Auto-start
* **Target:** `script.js` (`handleLoginAttempt()`, `startMusic()`, `setMusicPlayingState()`)
* **Actions:**
  1. Verify `bgAudio` initiates immediately when the user clicks "Get Ready ✨" or presses Enter with valid credentials (`sandhiya` / `061106`).
  2. Confirm `bgAudio.volume = 0.8` is applied.
  3. Ensure `#music-btn` reflects active playback (`is-playing` class) with dancing visualizer bars and "Audio Playing" label.
  4. Ensure manual toggle of `#music-btn` pauses and resumes audio cleanly.
* **Verification:** Log in on `http://localhost:8080/` and verify music starts immediately with header sync.

---

### Task 2: Seamless Slide-Transition Audio Orchestration
* **Target:** `script.js` (Slide 4 ➔ Slide 5 transition, Slide 6 ➔ Slide 7 transition, Replay handlers)
* **Actions:**
  1. Verify background music continues playing uninterrupted through Slide 2 (Wish & Candle), Slide 3 (Rock Paper Scissors), and Slide 4 (Vintage Letter).
  2. In `finalSurpriseBtn` handler, ensure `stopMusic()` is called before revealing Slide 5 (3D Cake).
  3. Ensure Slide 5's dedicated melody toggle (`#slide5-music-btn`) operates independently and does not conflict with `bgAudio`.
  4. When transitioning to Slide 7 (Final Video), ensure all prior audio (`stopSlide5Music()` and `stopMusic()`) is completely stopped.
  5. Ensure Replay buttons (`#replay-game-btn`, `#restart-all-btn`) reset audio states cleanly.
* **Verification:** Progress through slides 1 to 7 and ensure no audio overlap or orphaned audio loops occur.

---

### Task 3: Video Player Sound & Overlay Validation
* **Target:** `index.html`, `script.js` (`startSurpriseVideo()`)
* **Actions:**
  1. Ensure `#surprise-video` (`video/birthday-surprise.mp4`) starts playback unmuted upon entering Slide 7.
  2. Verify that if browser policies prevent unmuted video autoplay, `#video-play-overlay` displays prominently with "Tap to Play Video with Sound 🎬🔊".
  3. Clicking the overlay immediately un-mutes, plays video, and dismisses the overlay.
* **Verification:** Inspect Slide 7 video playback and audio output.

---

## Success Criteria
- [x] Music starts without delay upon entering credentials and clicking "Get Ready ✨".
- [x] Header audio button reflects true state and permits manual pause/play.
- [x] No audio collisions across Slide 5 (3D Cake) and Slide 7 (Video).
- [x] Video on Slide 7 plays with full audible sound.
- [x] Replay and restart cleanly resume background audio.

