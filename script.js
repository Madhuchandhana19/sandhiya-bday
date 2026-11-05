/**
 * ============================================================================
 * 🎂 SANDHIYA'S 20TH BIRTHDAY WEBSITE - JAVASCRIPT
 * ============================================================================
 * Besties: MADHU CHANDHANA K S , RITHIKA SRI S , SRINITHI S
 * Features:
 * 1. Royal VIP Gatekeeper (Username: sandhiya | Passcode: 061106)
 * 2. Heartfelt Birthday Tribute with Real Photo & Interactive Wish Cake
 * 3. Advanced Mind-Reading Rock Paper Scissors AI Engine (Markov + Win-Stay Lose-Shift)
 * 4. Ambient Canvas Glitter & Celebratory Confetti Cannon
 * 5. Audio Player with Procedural Music-Box Synth Fallback
 * ============================================================================
 */

// ============================================================================
// CONFIGURATION
// ============================================================================
const BIRTHDAY_CONFIG = {
  validUsername: "sandhiya",
  validPasscode: "061106",
  friendName: "SANDHIYAAAA <3",
  from: "Yours - MADHU CHANDHANA K S , RITHIKA SRI S , SRINITHI S",
  audioPath: "audio/birthday-song.mp3"
};

// ============================================================================
// DOM ELEMENTS
// ============================================================================
// Sections
const loginSection = document.getElementById("login-section");
const celebrationSection = document.getElementById("celebration-section");
const gameSection = document.getElementById("game-section");

// Login Elements
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const togglePwdBtn = document.getElementById("toggle-pwd-btn");
const authError = document.getElementById("auth-error");
const authErrorText = document.getElementById("auth-error-text");

// Celebration Elements
const cakeWrapper = document.getElementById("cake-interactive");
const blowBtn = document.getElementById("blow-btn");
const candleFlame = document.getElementById("candle-flame");
const smokePuff = document.getElementById("smoke-puff");
const openGameBtn = document.getElementById("open-game-btn");
const loginSubmitBtn = document.getElementById("login-submit-btn");

// RPS Game Elements
const playerScoreEl = document.getElementById("player-score");
const tieScoreEl = document.getElementById("tie-score");
const aiScoreEl = document.getElementById("ai-score");
const streakCountEl = document.getElementById("streak-count");
const playerChoiceDisplay = document.getElementById("player-choice-display");
const computerChoiceDisplay = document.getElementById("computer-choice-display");
const playerChoiceName = document.getElementById("player-choice-name");
const computerChoiceName = document.getElementById("computer-choice-name");
const gameStatusBox = document.getElementById("game-status-box");
const gameStatusText = document.getElementById("game-status-text");
const rpsButtonsGroup = document.getElementById("rps-buttons-group");
const backToLetterBtn = document.getElementById("back-to-letter-btn");
const resetGameBtn = document.getElementById("reset-game-btn");

// Audio Elements
const bgAudio = document.getElementById("bg-audio");
const musicBtn = document.getElementById("music-btn");
const musicIcon = document.getElementById("music-icon");
const musicLabel = document.getElementById("music-label");

// Toast Notification
const toastNotification = document.getElementById("toast-notification");

// ============================================================================
// STATE
// ============================================================================
let isAuthenticated = false;
let candleExtinguished = false;
let isAudioPlaying = false;
let audioContext = null;
let synthTimer = null;

// ============================================================================
// 1. VIP GATEKEEPER / LOGIN CONTROLLER
// ============================================================================
// Toggle password visibility
if (togglePwdBtn && passwordInput) {
  togglePwdBtn.addEventListener("click", () => {
    const isPassword = passwordInput.getAttribute("type") === "password";
    passwordInput.setAttribute("type", isPassword ? "text" : "password");
    togglePwdBtn.textContent = isPassword ? "🙈" : "👁️";
  });
}

// Handle Login Form Submission & Click
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleLoginAttempt();
  });
}

if (loginSubmitBtn) {
  loginSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleLoginAttempt();
  });
}

function handleLoginAttempt() {
  const uInput = document.getElementById("username-input");
  const pInput = document.getElementById("password-input");
  const rawUser = uInput && uInput.value ? uInput.value.trim() : "";
  const enteredUsername = rawUser.toLowerCase();
  const enteredPasscode = pInput && pInput.value ? pInput.value.trim() : "";

  // Flexible username matching: accepts sandhiya in any case or with spaces
  const cleanUser = enteredUsername.replace(/[\s_]/g, "");
  const isUserValid = (
    cleanUser === "sandhiya" ||
    enteredUsername.includes("sandhiya") ||
    rawUser.toLowerCase() === "sandhiya"
  );

  // Flexible passcode matching: accepts 061106, 06112006, 06/11/06, 06-11-2006, etc.
  const cleanPass = enteredPasscode.replace(/[\/\-\s]/g, "");
  const isPassValid = (
    cleanPass === "061106" ||
    cleanPass === "06112006" ||
    cleanPass === "61106" ||
    cleanPass === "6112006" ||
    enteredPasscode === "061106" ||
    enteredPasscode === BIRTHDAY_CONFIG.validPasscode
  );

  const usernameError = document.getElementById("username-error");
  const passcodeError = document.getElementById("passcode-error");

  // Reset errors
  if (usernameError) usernameError.style.display = "none";
  if (passcodeError) passcodeError.style.display = "none";
  if (uInput) uInput.classList.remove("input-error");
  if (pInput) pInput.classList.remove("input-error");

  if (isUserValid && isPassValid) {
    // SUCCESS!
    isAuthenticated = true;
    const loginSec = document.getElementById("login-section");
    const celebSec = document.getElementById("celebration-section");

    // Immediately reveal celebration slide
    if (loginSec) loginSec.style.display = "none";
    if (celebSec) {
      celebSec.style.display = "block";
      celebSec.style.animation = "fadeInScale 0.4s ease forwards";
      celebSec.scrollIntoView({ behavior: "smooth" });
    }

    try {
      showToast("👑 Identity verified! Welcome Queen Sandhiya! 💕✨");
      playSparkleChime();
      triggerCelebrationConfetti(70);
    } catch (e) {
      console.warn("Celebration effect error:", e);
    }

  } else {
    // FAILED ATTEMPT
    const loginSec = document.getElementById("login-section");
    if (loginSec) {
      loginSec.classList.remove("card-shake");
      void loginSec.offsetWidth;
      loginSec.classList.add("card-shake");
    }

    // Show individual username error if invalid
    if (!isUserValid) {
      if (usernameError) usernameError.style.display = "flex";
      if (uInput) uInput.classList.add("input-error");
    }

    // Show individual passcode error if invalid
    if (!isPassValid) {
      if (passcodeError) passcodeError.style.display = "flex";
      if (pInput) pInput.classList.add("input-error");
    }

    try {
      playBuzzTone();
    } catch (e) {
      console.warn("Buzz error:", e);
    }
  }
}
window.handleLoginAttempt = handleLoginAttempt;

// Clear individual errors when user types & handle Enter key
if (usernameInput) {
  usernameInput.addEventListener("input", () => {
    const usernameError = document.getElementById("username-error");
    if (usernameError) usernameError.style.display = "none";
    usernameInput.classList.remove("input-error");
  });
  usernameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLoginAttempt();
    }
  });
}

if (passwordInput) {
  passwordInput.addEventListener("input", () => {
    const passcodeError = document.getElementById("passcode-error");
    if (passcodeError) passcodeError.style.display = "none";
    passwordInput.classList.remove("input-error");
  });
  passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLoginAttempt();
    }
  });
}

// ============================================================================
// 2. CELEBRATION SECTION & INTERACTIVE CANDLE
// ============================================================================
function toggleCandle() {
  if (!candleExtinguished) {
    candleExtinguished = true;
    candleFlame.classList.add("extinguished");
    smokePuff.classList.add("rise");
    setTimeout(() => smokePuff.classList.remove("rise"), 1800);
    blowBtn.textContent = "Relight Candle 🕯️";

    playSparkleChime();
    triggerCelebrationConfetti(90);
    showToast("🎉 WISH MADE! May your 20s be magical, Sandhiya! ✨❤️");
  } else {
    candleExtinguished = false;
    candleFlame.classList.remove("extinguished");
    blowBtn.textContent = "Blow Out Candle 💨";
    showToast("✨ Candle relit! Make another wish! 💕");
  }
}

if (cakeWrapper) cakeWrapper.addEventListener("click", toggleCandle);
if (blowBtn) blowBtn.addEventListener("click", toggleCandle);

// Transition from Celebration to Game
if (openGameBtn) {
  openGameBtn.addEventListener("click", () => {
    celebrationSection.style.display = "none";
    gameSection.style.display = "block";
    gameSection.scrollIntoView({ behavior: "smooth" });
    showToast("🎮 Rock Paper Scissors loaded! Show us what you got! 💅");
  });
}

// Back from Game to Celebration
if (backToLetterBtn) {
  backToLetterBtn.addEventListener("click", () => {
    gameSection.style.display = "none";
    celebrationSection.style.display = "block";
    celebrationSection.scrollIntoView({ behavior: "smooth" });
  });
}

// ============================================================================
// 3. STRONG ROCK PAPER SCISSORS AI ALGORITHM
// ============================================================================
/**
 * Game Theory & Psychology Heuristics:
 * 1. Humans subconscious Win-Stay, Lose-Shift (Wang et al., 2014)
 *    - If player won last turn, ~60% probability they repeat the same move.
 *      -> AI counters the winning move!
 *    - If player lost last turn, ~75% probability they switch to the move that beat them
 *      or the 3rd unused move.
 *      -> AI predicts and counters the switch!
 * 2. 1st-Move bias: Humans open with Rock (~45%) or Scissors (~35%). AI counters accordingly.
 * 3. Markov 1st-Order Transition Chain: Real-time tracking of Sandhiya's actual move patterns.
 */

const MOVES = ["rock", "paper", "scissors"];
const MOVE_DETAILS = {
  rock: { label: "Rock", emoji: "✊", beats: "scissors", losesTo: "paper" },
  paper: { label: "Paper", emoji: "✋", beats: "rock", losesTo: "scissors" },
  scissors: { label: "Scissors", emoji: "✌️", beats: "paper", losesTo: "rock" }
};

let gameHistory = []; // { playerMove, aiMove, outcome: 'win'|'loss'|'tie' }
let playerScores = { player: 0, ai: 0, ties: 0, streak: 0 };
let isDuelAnimating = false;

// Markov transition matrix: counts how often move B follows move A
const transitionMatrix = {
  rock: { rock: 1, paper: 1, scissors: 1 },
  paper: { rock: 1, paper: 1, scissors: 1 },
  scissors: { rock: 1, paper: 1, scissors: 1 }
};

/**
 * Predict player's next move using strong multi-strategy AI
 */
function predictPlayerMove() {
  const totalRounds = gameHistory.length;

  // STRATEGY 1: Opening round psychology
  if (totalRounds === 0) {
    // 70% of people open with Rock; 20% with Scissors; 10% with Paper
    const rand = Math.random();
    if (rand < 0.65) return "rock";
    if (rand < 0.85) return "scissors";
    return "paper";
  }

  const lastRound = gameHistory[totalRounds - 1];

  // STRATEGY 2: Win-Stay, Lose-Shift Heuristic
  if (Math.random() < 0.70) {
    if (lastRound.outcome === "player_won") {
      // Player won! High chance they play the exact same move again
      return lastRound.playerMove;
    } else if (lastRound.outcome === "ai_won") {
      // Player lost! They almost never repeat the losing move.
      // They typically switch to the move that beat them, or the counter
      return MOVE_DETAILS[lastRound.aiMove].beats; // switch to move that would beat AI
    } else {
      // Tie: Player usually switches to the move that beats their previous move
      return MOVE_DETAILS[lastRound.playerMove].losesTo;
    }
  }

  // STRATEGY 3: 1st-order Markov Transition Chain
  const lastMove = lastRound.playerMove;
  const transitions = transitionMatrix[lastMove];
  const totalTransitions = transitions.rock + transitions.paper + transitions.scissors;

  const r = Math.random() * totalTransitions;
  if (r < transitions.rock) return "rock";
  if (r < transitions.rock + transitions.paper) return "paper";
  return "scissors";
}

/**
 * Choose AI Move: Picks the move that beats predicted player move
 */
function getSmartAiChoice() {
  const predictedPlayerMove = predictPlayerMove();
  return MOVE_DETAILS[predictedPlayerMove].losesTo;
}

// RPS Button Listeners
if (rpsButtonsGroup) {
  rpsButtonsGroup.addEventListener("click", (e) => {
    const btn = e.target.closest(".rps-btn");
    if (!btn || isDuelAnimating) return;

    const playerChoice = btn.getAttribute("data-choice");
    playRpsRound(playerChoice);
  });
}

function playRpsRound(playerChoiceId) {
  isDuelAnimating = true;
  enableRpsButtons(false);

  const playerChoice = MOVE_DETAILS[playerChoiceId];
  const aiChoiceId = getSmartAiChoice();
  const aiChoice = MOVE_DETAILS[aiChoiceId];

  // Show Player's move immediately
  playerChoiceDisplay.textContent = playerChoice.emoji;
  playerChoiceName.textContent = playerChoice.label;
  playerChoiceDisplay.classList.add("choice-pop");

  // Computer mind-reading countdown animation
  gameStatusBox.className = "game-status-box";
  gameStatusText.textContent = "AI Reading Brainwaves... 🧠⚡";

  let shuffleIndex = 0;
  const shuffleInterval = setInterval(() => {
    const randomPick = MOVES[Math.floor(Math.random() * MOVES.length)];
    computerChoiceDisplay.textContent = MOVE_DETAILS[randomPick].emoji;
    shuffleIndex++;

    if (shuffleIndex >= 7) {
      clearInterval(shuffleInterval);

      // Reveal AI Move
      computerChoiceDisplay.textContent = aiChoice.emoji;
      computerChoiceName.textContent = aiChoice.label;
      computerChoiceDisplay.classList.add("choice-pop");

      // Update transition matrix for player's move pattern
      if (gameHistory.length > 0) {
        const lastMove = gameHistory[gameHistory.length - 1].playerMove;
        transitionMatrix[lastMove][playerChoiceId]++;
      }

      // Evaluate winner
      evaluateDuel(playerChoiceId, aiChoiceId);
    }
  }, 110);
}

function evaluateDuel(pMove, aiMove) {
  let outcome = "";
  let commentary = "";

  if (pMove === aiMove) {
    // TIE
    outcome = "tie";
    gameStatusBox.className = "game-status-box status-tie";
    commentary = `Tie! Go again 😜`;
  } else if (MOVE_DETAILS[pMove].beats === aiMove) {
    // PLAYER WINS
    outcome = "player_won";
    gameStatusBox.className = "game-status-box status-win";
    commentary = `🎉 You Won! Loading next slide... ✨`;

    playSparkleChime();
    triggerCelebrationConfetti(70);

    // Automatically transition to the burnt letter slide!
    setTimeout(() => {
      gameSection.style.display = "none";
      const burntSection = document.getElementById("burnt-letter-section");
      if (burntSection) {
        burntSection.style.display = "block";
        burntSection.scrollIntoView({ behavior: "smooth" });
        triggerCelebrationConfetti(80);
      }
    }, 1200);
  } else {
    // AI WINS
    outcome = "ai_won";
    gameStatusBox.className = "game-status-box status-loss";
    commentary = `I win! Try again 😈`;
  }

  // Record history for smart prediction
  gameHistory.push({ playerMove: pMove, aiMove, outcome });
  gameStatusText.textContent = commentary;

  isDuelAnimating = false;
  enableRpsButtons(true);
}

function enableRpsButtons(enabled) {
  const buttons = rpsButtonsGroup.querySelectorAll(".rps-btn");
  buttons.forEach(btn => {
    btn.disabled = !enabled;
    btn.style.opacity = enabled ? "1" : "0.5";
    btn.style.cursor = enabled ? "pointer" : "not-allowed";
  });
}

// Next Slide Navigation Handlers
const replayGameBtn = document.getElementById("replay-game-btn");
const restartAllBtn = document.getElementById("restart-all-btn");

// Final Surprise Button Trigger (from Burnt Letter to Slide 5: 3D Cake & Runaway Yes)
const finalSurpriseBtn = document.getElementById("final-surprise-btn");
if (finalSurpriseBtn) {
  finalSurpriseBtn.addEventListener("click", () => {
    const burntSection = document.getElementById("burnt-letter-section");
    const slide5 = document.getElementById("slide5-surprise");
    if (burntSection) burntSection.style.display = "none";

    // Crucial: Turn OFF background "uyire un uyirena" ringtone!
    if (bgAudio) {
      try {
        bgAudio.pause();
        isMusicPlaying = false;
        if (musicBtn) {
          musicBtn.classList.remove("playing");
          const label = musicBtn.querySelector(".music-btn-text");
          if (label) label.textContent = "Play Music";
        }
      } catch (_) {}
    }

    if (slide5) {
      slide5.style.display = "block";
      slide5.scrollIntoView({ behavior: "smooth" });
      triggerCelebrationConfetti(90);
      playSparkleChime();
      showToast("🎂 Welcome to your final surprise! Cut your cake Queen! 💖✨");
      initSlide5Experience();
    }
  });
}

if (replayGameBtn) {
  replayGameBtn.addEventListener("click", () => {
    const slide7 = document.getElementById("slide7-video-final");
    const slide6 = document.getElementById("slide6-kidding");
    const slide5 = document.getElementById("slide5-surprise");
    const burntSection = document.getElementById("burnt-letter-section");
    if (slide7) slide7.style.display = "none";
    if (slide6) slide6.style.display = "none";
    if (slide5) slide5.style.display = "none";
    if (burntSection) burntSection.style.display = "none";

    // Stop video
    const video = document.getElementById("surprise-video");
    if (video) {
      try { video.pause(); video.currentTime = 0; } catch (_) {}
    }

    stopSlide5Music();
    if (runawayTimer) {
      clearInterval(runawayTimer);
      runawayTimer = null;
    }
    if (runawayPointerListener) {
      window.removeEventListener("pointermove", runawayPointerListener);
      runawayPointerListener = null;
    }
    const yesBtn = document.getElementById("runaway-yes-btn");
    if (yesBtn) {
      yesBtn.style.position = "";
      yesBtn.style.left = "";
      yesBtn.style.top = "";
      yesBtn.style.margin = "";
      yesBtn.style.zIndex = "";
      yesBtn.className = "runaway-btn runaway-locked";
    }
    gameSection.style.display = "block";
    playerChoiceDisplay.textContent = "❓";
    computerChoiceDisplay.textContent = "❓";
    playerChoiceName.textContent = "Your Move";
    computerChoiceName.textContent = "Bot Move";
    gameStatusBox.className = "game-status-box";
    gameStatusText.textContent = "Choose Rock, Paper, or Scissors! 💖";
    gameSection.scrollIntoView({ behavior: "smooth" });
  });
}

if (restartAllBtn) {
  restartAllBtn.addEventListener("click", () => {
    const slide7 = document.getElementById("slide7-video-final");
    const slide6 = document.getElementById("slide6-kidding");
    const slide5 = document.getElementById("slide5-surprise");
    const burntSection = document.getElementById("burnt-letter-section");
    if (slide7) slide7.style.display = "none";
    if (slide6) slide6.style.display = "none";
    if (slide5) slide5.style.display = "none";
    if (burntSection) burntSection.style.display = "none";

    // Stop video
    const video = document.getElementById("surprise-video");
    if (video) {
      try { video.pause(); video.currentTime = 0; } catch (_) {}
    }

    stopSlide5Music();
    if (runawayTimer) {
      clearInterval(runawayTimer);
      runawayTimer = null;
    }
    if (runawayPointerListener) {
      window.removeEventListener("pointermove", runawayPointerListener);
      runawayPointerListener = null;
    }
    const yesBtn = document.getElementById("runaway-yes-btn");
    if (yesBtn) {
      yesBtn.style.position = "";
      yesBtn.style.left = "";
      yesBtn.style.top = "";
      yesBtn.style.margin = "";
      yesBtn.style.zIndex = "";
      yesBtn.className = "runaway-btn runaway-locked";
    }
    gameSection.style.display = "none";
    celebrationSection.style.display = "block";
    celebrationSection.scrollIntoView({ behavior: "smooth" });
    showToast("💌 Back to the birthday message!");
  });
}

// ============================================================================
// 4. AUDIO SYSTEM: MP3 WITH PROCEDURAL WEB AUDIO API SYNTHESIZER
// ============================================================================
if (bgAudio) {
  bgAudio.src = BIRTHDAY_CONFIG.audioPath;
}

if (musicBtn) {
  musicBtn.addEventListener("click", () => {
    toggleMusic();
  });
}

function toggleMusic() {
  if (!isAudioPlaying) {
    startMusic();
  } else {
    stopMusic();
  }
}

function startMusic() {
  const playPromise = bgAudio.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        setMusicPlayingState(true, "Music Playing");
      })
      .catch((err) => {
        // Fall back to Web Audio music-box synth
        startSynthMusicBox();
        setMusicPlayingState(true, "Melody Playing");
      });
  } else {
    startSynthMusicBox();
    setMusicPlayingState(true, "Melody Playing");
  }
}

function stopMusic() {
  bgAudio.pause();
  stopSynthMusicBox();
  setMusicPlayingState(false, "Play Music");
}

function setMusicPlayingState(playing, label) {
  isAudioPlaying = playing;
  if (playing) {
    musicBtn.classList.add("is-playing");
    musicIcon.textContent = "🔊";
    musicLabel.textContent = label || "Audio Playing";
  } else {
    musicBtn.classList.remove("is-playing");
    musicIcon.textContent = "🎵";
    musicLabel.textContent = "Play Audio";
  }
}

/**
 * Web Audio API Music Box Synthesizer
 */
const BIRTHDAY_NOTES = [
  { note: "C4", duration: 0.4 }, { note: "C4", duration: 0.4 },
  { note: "D4", duration: 0.8 }, { note: "C4", duration: 0.8 },
  { note: "F4", duration: 0.8 }, { note: "E4", duration: 1.4 },

  { note: "C4", duration: 0.4 }, { note: "C4", duration: 0.4 },
  { note: "D4", duration: 0.8 }, { note: "C4", duration: 0.8 },
  { note: "G4", duration: 0.8 }, { note: "F4", duration: 1.4 },

  { note: "C4", duration: 0.4 }, { note: "C4", duration: 0.4 },
  { note: "C5", duration: 0.8 }, { note: "A4", duration: 0.8 },
  { note: "F4", duration: 0.8 }, { note: "E4", duration: 0.8 },
  { note: "D4", duration: 1.2 },

  { note: "A#4", duration: 0.4 }, { note: "A#4", duration: 0.4 },
  { note: "A4", duration: 0.8 }, { note: "F4", duration: 0.8 },
  { note: "G4", duration: 0.8 }, { note: "F4", duration: 1.6 }
];

const NOTE_FREQS = {
  "C4": 261.63, "D4": 293.66, "E4": 329.63, "F4": 349.23,
  "G4": 392.00, "A4": 440.00, "A#4": 466.16, "B4": 493.88,
  "C5": 523.25, "D5": 587.33, "E5": 659.25, "F5": 698.46
};

let noteIndex = 0;

function startSynthMusicBox() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  stopSynthMusicBox();
  noteIndex = 0;
  playNextSynthNote();
}

function playNextSynthNote() {
  if (!isAudioPlaying) return;

  const current = BIRTHDAY_NOTES[noteIndex];
  playChimeTone(NOTE_FREQS[current.note], current.duration * 0.85);

  const delayMs = current.duration * 620;
  noteIndex = (noteIndex + 1) % BIRTHDAY_NOTES.length;
  synthTimer = setTimeout(playNextSynthNote, delayMs);
}

function stopSynthMusicBox() {
  if (synthTimer) {
    clearTimeout(synthTimer);
    synthTimer = null;
  }
}

function playChimeTone(frequency, duration) {
  if (!audioContext) return;
  try {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, audioContext.currentTime);

    gain.gain.setValueAtTime(0.001, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, audioContext.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start();
    osc.stop(audioContext.currentTime + duration);
  } catch (e) {}
}

function playSparkleChime() {
  try {
    if (!audioContext && (window.AudioContext || window.webkitAudioContext)) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext && audioContext.state === "suspended") {
      audioContext.resume().catch(() => {});
    }

    const arpeggio = [523.25, 659.25, 783.99, 1046.50];
    arpeggio.forEach((freq, idx) => {
      setTimeout(() => {
        playChimeTone(freq, 0.35);
      }, idx * 75);
    });
  } catch (e) {
    console.warn("Chime error:", e);
  }
}

function playBuzzTone() {
  try {
    if (!audioContext && (window.AudioContext || window.webkitAudioContext)) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext) {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, audioContext.currentTime);
      gain.gain.setValueAtTime(0.15, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start();
      osc.stop(audioContext.currentTime + 0.3);
    }
  } catch (e) {
    console.warn("Buzz tone error:", e);
  }
}

// ============================================================================
// 5. LIVE SHINY PINK & WHITE GLITTER ENGINE
// ============================================================================
const glitterCanvas = document.getElementById("glitter-canvas");
const gCtx = glitterCanvas.getContext("2d");
let glitterParticles = [];
const GLITTER_COUNT = 210;

function resizeGlitterCanvas() {
  glitterCanvas.width = window.innerWidth;
  glitterCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeGlitterCanvas);
resizeGlitterCanvas();

class GlitterParticle {
  constructor(x, y) {
    this.reset(x, y);
  }

  reset(x, y) {
    this.x = x !== undefined ? x : Math.random() * glitterCanvas.width;
    this.y = y !== undefined ? y : Math.random() * glitterCanvas.height;
    this.size = Math.random() * 4.6 + 1.8;
    this.speedY = Math.random() * 0.7 + 0.25;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.alpha = Math.random() * 0.75 + 0.25;
    this.alphaSpeed = (Math.random() * 0.03 + 0.012) * (Math.random() > 0.5 ? 1 : -1);
    this.twinklePhase = Math.random() * Math.PI * 2;
    this.colorType = Math.floor(Math.random() * 6);
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.035;
    
    const rand = Math.random();
    if (rand < 0.35) this.type = "flare"; // Radiant 8-ray diamond sparkle
    else if (rand < 0.65) this.type = "star"; // 4-Point shiny star
    else if (rand < 0.82) this.type = "diamond"; // Diamond sparkle
    else this.type = "circle"; // Glowing fairy-dust sequin
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;
    this.twinklePhase += 0.07;
    
    // Dynamic twinkling pulse
    this.alpha += this.alphaSpeed;

    if (this.alpha > 0.95 || this.alpha < 0.15) {
      this.alphaSpeed = -this.alphaSpeed;
    }

    if (this.y < -30 || this.x < -30 || this.x > glitterCanvas.width + 30) {
      this.reset(Math.random() * glitterCanvas.width, glitterCanvas.height + 25);
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    const dynamicAlpha = Math.max(0.12, Math.min(1, this.alpha + Math.sin(this.twinklePhase) * 0.35));
    ctx.globalAlpha = dynamicAlpha;

    // Live Shiny Pink & White Glitter Palette
    let fill = "#ffffff";
    if (this.colorType === 0) fill = "#ffffff"; // Diamond Brilliant White
    else if (this.colorType === 1) fill = "#ffffff"; // Pure White Sparkle
    else if (this.colorType === 2) fill = "#ffb6d2"; // Sweet Baby Pink
    else if (this.colorType === 3) fill = "#ff69b4"; // Radiant Hot Pink
    else if (this.colorType === 4) fill = "#ffd6e7"; // Cotton Candy White
    else if (this.colorType === 5) fill = "#fff1f8"; // Pearlescent White

    ctx.fillStyle = fill;
    ctx.shadowBlur = this.size * 3.2;
    ctx.shadowColor = fill;

    if (this.type === "flare") {
      // Radiant 8-Ray Birthday Sparkler
      const r = this.size * 3.5;
      ctx.strokeStyle = fill;
      ctx.lineWidth = 1.35;
      
      // Horizontal & Vertical rays
      ctx.beginPath();
      ctx.moveTo(-r, 0);
      ctx.lineTo(r, 0);
      ctx.moveTo(0, -r);
      ctx.lineTo(0, r);
      ctx.stroke();

      // Diagonal shorter rays
      const diag = r * 0.42;
      ctx.beginPath();
      ctx.moveTo(-diag, -diag);
      ctx.lineTo(diag, diag);
      ctx.moveTo(-diag, diag);
      ctx.lineTo(diag, -diag);
      ctx.stroke();

      // Glowing white diamond core
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.75, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === "star") {
      // 4-Point Sparkling Star
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 2.2);
      ctx.quadraticCurveTo(0, 0, this.size * 2.2, 0);
      ctx.quadraticCurveTo(0, 0, 0, this.size * 2.2);
      ctx.quadraticCurveTo(0, 0, -this.size * 2.2, 0);
      ctx.quadraticCurveTo(0, 0, 0, -this.size * 2.2);
      ctx.fill();

      // Brilliant white center
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.55, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === "diamond") {
      // Shimmering Diamond Sparkle
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 1.8);
      ctx.lineTo(this.size * 1.2, 0);
      ctx.lineTo(0, this.size * 1.8);
      ctx.lineTo(-this.size * 1.2, 0);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.45, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Glowing Fairy-dust Sequin
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

for (let i = 0; i < GLITTER_COUNT; i++) {
  glitterParticles.push(new GlitterParticle());
}

// Sparkle trail following cursor / touch
window.addEventListener("pointermove", (e) => {
  if (Math.random() > 0.25) {
    glitterParticles.push(new GlitterParticle(e.clientX, e.clientY));
    if (glitterParticles.length > GLITTER_COUNT + 50) {
      glitterParticles.shift();
    }
  }
});

function animateGlitter() {
  gCtx.clearRect(0, 0, glitterCanvas.width, glitterCanvas.height);
  for (let i = 0; i < glitterParticles.length; i++) {
    glitterParticles[i].update();
    glitterParticles[i].draw(gCtx);
  }
  requestAnimationFrame(animateGlitter);
}
animateGlitter();

// ============================================================================
// 6. TIME-TO-TIME FLOATING BIRTHDAY BALLOONS (BEHIND CARDS)
// ============================================================================
const balloonsContainer = document.getElementById("balloons-container");

const BALLOON_PALETTES = [
  { bg: "linear-gradient(135deg, #ffffff 0%, #ffe4ec 100%)", color: "#ffffff" },       // Pearl White
  { bg: "linear-gradient(135deg, #ffb8d2 0%, #ff85a2 100%)", color: "#ff85a2" },       // Baby Blush Pink
  { bg: "linear-gradient(135deg, #ffa3c4 0%, #ff4d88 100%)", color: "#ff4d88" },       // Vibrant Candy Pink
  { bg: "linear-gradient(135deg, #fff0f6 0%, #ffd6e7 100%)", color: "#ffd6e7" },       // Soft Rose Milk
  { bg: "linear-gradient(135deg, #fce4ec 0%, #f48fb1 100%)", color: "#f48fb1" },       // Dreamy Pastel Rose
  { bg: "linear-gradient(135deg, #ffe0ec 0%, #ff6699 100%)", color: "#ff6699" }        // Shimmering Hot Pink
];

function spawnSingleBalloon() {
  if (!balloonsContainer) return;

  const balloon = document.createElement("div");
  balloon.className = "floating-balloon";

  // Random width: 44px to 76px, height proportional
  const width = Math.floor(Math.random() * 32 + 44);
  const height = Math.floor(width * 1.25);
  const leftPercent = Math.random() * 92 + 2; // Across entire width
  const floatDuration = Math.random() * 4.5 + 8.5; // 8.5s to 13s float time
  const swayDuration = Math.random() * 1.5 + 2.5;

  const palette = BALLOON_PALETTES[Math.floor(Math.random() * BALLOON_PALETTES.length)];

  balloon.style.width = `${width}px`;
  balloon.style.height = `${height}px`;
  balloon.style.left = `${leftPercent}%`;
  balloon.style.background = palette.bg;
  balloon.style.animationDuration = `${floatDuration}s, ${swayDuration}s`;

  // Dangling String
  const string = document.createElement("div");
  string.className = "balloon-string";
  string.style.height = `${Math.floor(height * 0.95)}px`;
  balloon.appendChild(string);

  balloonsContainer.appendChild(balloon);

  // Auto remove after float completes
  setTimeout(() => {
    if (balloon.parentNode) {
      balloon.parentNode.removeChild(balloon);
    }
  }, floatDuration * 1000 + 500);
}

// Spawn initial staggered balloons
setTimeout(spawnSingleBalloon, 600);
setTimeout(spawnSingleBalloon, 2400);
setTimeout(spawnSingleBalloon, 4600);

// Continuously release balloons from time to time
function scheduleNextBalloon() {
  const nextDelay = Math.random() * 2200 + 2600; // Every 2.6s - 4.8s
  setTimeout(() => {
    spawnSingleBalloon();
    scheduleNextBalloon();
  }, nextDelay);
}
scheduleNextBalloon();

// ============================================================================
// 7. CONFETTI CANNON
// ============================================================================
const confettiCanvas = document.getElementById("confetti-canvas");
const cCtx = confettiCanvas.getContext("2d");
let confettiPieces = [];

function resizeConfettiCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeConfettiCanvas);
resizeConfettiCanvas();

const CONFETTI_COLORS = ["#ff1493", "#ff69b4", "#ffd1dc", "#ffd700", "#ffffff", "#ff4081", "#e040fb"];

class ConfettiPiece {
  constructor(x, y) {
    this.x = x !== undefined ? x : confettiCanvas.width / 2;
    this.y = y !== undefined ? y : confettiCanvas.height / 2;
    this.w = Math.random() * 10 + 6;
    this.h = Math.random() * 8 + 5;
    this.color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    this.speedX = (Math.random() - 0.5) * 16;
    this.speedY = (Math.random() * -14) - 6;
    this.gravity = 0.38;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 18;
    this.wobble = 0;
    this.wobbleSpeed = Math.random() * 0.1 + 0.05;
    this.life = 1;
    this.decay = Math.random() * 0.012 + 0.008;
    this.isCircle = Math.random() > 0.6;
  }

  update() {
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;
    this.wobble += this.wobbleSpeed;
    this.life -= this.decay;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 6;
    ctx.shadowColor = this.color;

    if (this.isCircle) {
      ctx.beginPath();
      ctx.arc(0, 0, this.w / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    }

    ctx.restore();
  }
}

function triggerCelebrationConfetti(count = 60) {
  const originX = confettiCanvas.width / 2;
  const originY = confettiCanvas.height * 0.45;

  for (let i = 0; i < count; i++) {
    confettiPieces.push(new ConfettiPiece(originX, originY));
  }
}

function animateConfetti() {
  cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  for (let i = confettiPieces.length - 1; i >= 0; i--) {
    const piece = confettiPieces[i];
    piece.update();
    piece.draw(cCtx);

    if (piece.life <= 0 || piece.y > confettiCanvas.height + 30) {
      confettiPieces.splice(i, 1);
    }
  }

  requestAnimationFrame(animateConfetti);
}
animateConfetti();

// ============================================================================
// 7. TOAST NOTIFICATION
// ============================================================================
let toastTimer = null;
function showToast(message) {
  toastNotification.textContent = message;
  toastNotification.classList.add("show");

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastNotification.classList.remove("show");
  }, 3200);
}

// Auto-focus username input on load
document.addEventListener("DOMContentLoaded", () => {
  if (usernameInput) {
    usernameInput.focus();
  }
});

// ============================================================================
// 8. SLIDE 5: 3D INTERACTIVE CAKE, KNIFE CUTTING & RUNAWAY YES BUTTON
// ============================================================================
let cake3dScene = null;
let cake3dCamera = null;
let cake3dRenderer = null;
let cakeRootGroup = null;
let cakeSliceGroup = null;
let cakeAnimFrameId = null;
let isCakeCut = false;
let sliceOffset = 0;
let targetSliceOffset = 0;
let isSlide5MusicPlaying = false;
let slide5MusicTimer = null;
let runawayTimer = null;
let runawaySecondsLeft = 20;
let isRunawayActive = false;
let runawayPointerListener = null;
let isKnifeDragging = false;
let knifeStartY = 0;
let knifeCurrentY = 0;

/**
 * Initializes the entire Slide 5 experience
 */
function initSlide5Experience() {
  // Start Happy Birthday tune
  startSlide5Music();

  // Initialize Three.js 3D Cake
  setTimeout(() => {
    init3DCake();
  }, 100);

  // Bind Knife Controller
  setupInteractiveKnife();

  // Bind "I was kidding" button in Part 2
  const kiddingBtn = document.getElementById("kidding-btn");
  if (kiddingBtn) {
    kiddingBtn.onclick = handleKiddingClick;
  }

  // Bind Slide 5 music button
  const s5MusicBtn = document.getElementById("slide5-music-btn");
  if (s5MusicBtn) {
    s5MusicBtn.onclick = toggleSlide5Music;
  }
}

/**
 * Three.js 3D Three-Layer Birthday Cake
 */
function init3DCake() {
  const container = document.getElementById("cake3d-viewport");
  const canvas = document.getElementById("cake3d-canvas");
  if (!container || !canvas || typeof THREE === "undefined") return;

  // Cleanup existing if already running
  if (cakeAnimFrameId) {
    cancelAnimationFrame(cakeAnimFrameId);
    cakeAnimFrameId = null;
  }

  const width = container.clientWidth || 400;
  const height = container.clientHeight || 420;

  // Scene & Camera
  cake3dScene = new THREE.Scene();
  cake3dCamera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  cake3dCamera.position.set(0, 2.3, 5.8);
  cake3dCamera.lookAt(0, 0.45, 0);

  // Renderer
  cake3dRenderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  cake3dRenderer.setSize(width, height);
  cake3dRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  cake3dRenderer.shadowMap.enabled = true;
  cake3dRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xfff5f8, 0.95);
  cake3dScene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 1.15);
  mainLight.position.set(4, 7, 5);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 1024;
  mainLight.shadow.mapSize.height = 1024;
  cake3dScene.add(mainLight);

  const goldRimLight = new THREE.PointLight(0xffd700, 0.75, 12);
  goldRimLight.position.set(-3.5, 3.2, 2.5);
  cake3dScene.add(goldRimLight);

  const pinkFillLight = new THREE.PointLight(0xff69b4, 0.55, 10);
  pinkFillLight.position.set(3, 1, 3.5);
  cake3dScene.add(pinkFillLight);

  // Master Root Group
  cakeRootGroup = new THREE.Group();
  cake3dScene.add(cakeRootGroup);

  // Materials
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    metalness: 0.9,
    roughness: 0.18,
    envMapIntensity: 1.2
  });

  const ceramicPlateMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.08,
    roughness: 0.12
  });

  const tier1Material = new THREE.MeshStandardMaterial({
    color: 0xffb5cc, // Pastel candy pink
    roughness: 0.28,
    metalness: 0.04
  });

  const tier2Material = new THREE.MeshStandardMaterial({
    color: 0xffffff, // White cream frosting
    roughness: 0.18,
    metalness: 0.04
  });

  const tier3Material = new THREE.MeshStandardMaterial({
    color: 0xff7398, // Strawberry blush pink
    roughness: 0.26,
    metalness: 0.04
  });

  const pearlWhiteMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.1,
    metalness: 0.2
  });

  const pearlPinkMaterial = new THREE.MeshStandardMaterial({
    color: 0xffccd9,
    roughness: 0.1,
    metalness: 0.2
  });

  const spongeInsideMaterial = new THREE.MeshStandardMaterial({
    color: 0xff8fa3, // Sponge cake inside
    roughness: 0.65,
    metalness: 0.0
  });

  // 1. Ceramic Cake Stand with Gold Trim
  const standPlate = new THREE.Mesh(
    new THREE.CylinderGeometry(2.35, 2.35, 0.14, 48),
    ceramicPlateMaterial
  );
  standPlate.position.y = -0.06;
  standPlate.receiveShadow = true;
  cakeRootGroup.add(standPlate);

  const goldPlateRim = new THREE.Mesh(
    new THREE.TorusGeometry(2.36, 0.045, 16, 64),
    goldMaterial
  );
  goldPlateRim.rotation.x = Math.PI / 2;
  goldPlateRim.position.y = -0.01;
  cakeRootGroup.add(goldPlateRim);

  const standPedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.85, 1.45, 0.28, 36),
    new THREE.MeshStandardMaterial({ color: 0xffe4ed, roughness: 0.3 })
  );
  standPedestal.position.y = -0.24;
  cakeRootGroup.add(standPedestal);

  // 2. Main Cake Body (300 degrees) & Wedge Slice (60 degrees)
  const mainCakeGroup = new THREE.Group();
  cakeSliceGroup = new THREE.Group();
  cakeRootGroup.add(mainCakeGroup);
  cakeRootGroup.add(cakeSliceGroup);

  const wedgeAngle = Math.PI / 3; // 60 degrees cut wedge
  const mainAngle = Math.PI * 2 - wedgeAngle;
  const startAngle = wedgeAngle / 2;

  // Tier 1: Bottom Tier
  const t1Radius = 1.7;
  const t1Height = 0.65;
  const t1Y = 0.33;

  const t1Main = new THREE.Mesh(
    new THREE.CylinderGeometry(t1Radius, t1Radius, t1Height, 36, 1, false, startAngle, mainAngle),
    tier1Material
  );
  t1Main.position.y = t1Y;
  t1Main.castShadow = true;
  t1Main.receiveShadow = true;
  mainCakeGroup.add(t1Main);

  const t1Slice = new THREE.Mesh(
    new THREE.CylinderGeometry(t1Radius, t1Radius, t1Height, 16, 1, false, -startAngle, wedgeAngle),
    tier1Material
  );
  t1Slice.position.y = t1Y;
  t1Slice.castShadow = true;
  cakeSliceGroup.add(t1Slice);

  // Tier 2: Middle Tier
  const t2Radius = 1.25;
  const t2Height = 0.58;
  const t2Y = 0.94;

  const t2Main = new THREE.Mesh(
    new THREE.CylinderGeometry(t2Radius, t2Radius, t2Height, 36, 1, false, startAngle, mainAngle),
    tier2Material
  );
  t2Main.position.y = t2Y;
  t2Main.castShadow = true;
  mainCakeGroup.add(t2Main);

  const t2Slice = new THREE.Mesh(
    new THREE.CylinderGeometry(t2Radius, t2Radius, t2Height, 16, 1, false, -startAngle, wedgeAngle),
    tier2Material
  );
  t2Slice.position.y = t2Y;
  t2Slice.castShadow = true;
  cakeSliceGroup.add(t2Slice);

  // Tier 3: Top Tier
  const t3Radius = 0.82;
  const t3Height = 0.52;
  const t3Y = 1.49;

  const t3Main = new THREE.Mesh(
    new THREE.CylinderGeometry(t3Radius, t3Radius, t3Height, 36, 1, false, startAngle, mainAngle),
    tier3Material
  );
  t3Main.position.y = t3Y;
  t3Main.castShadow = true;
  mainCakeGroup.add(t3Main);

  const t3Slice = new THREE.Mesh(
    new THREE.CylinderGeometry(t3Radius, t3Radius, t3Height, 16, 1, false, -startAngle, wedgeAngle),
    tier3Material
  );
  t3Slice.position.y = t3Y;
  t3Slice.castShadow = true;
  cakeSliceGroup.add(t3Slice);

  // Gold Piping Rings between Tiers
  function addGoldRing(radius, y, parentGroup, angleStart, angleLen) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.04, 12, 48, angleLen),
      goldMaterial
    );
    ring.rotation.x = Math.PI / 2;
    ring.rotation.z = angleStart;
    ring.position.y = y;
    parentGroup.add(ring);
  }

  addGoldRing(t1Radius + 0.02, 0.01, mainCakeGroup, startAngle, mainAngle);
  addGoldRing(t1Radius + 0.02, 0.01, cakeSliceGroup, -startAngle, wedgeAngle);

  addGoldRing(t2Radius + 0.02, t1Y + t1Height / 2, mainCakeGroup, startAngle, mainAngle);
  addGoldRing(t2Radius + 0.02, t1Y + t1Height / 2, cakeSliceGroup, -startAngle, wedgeAngle);

  addGoldRing(t3Radius + 0.02, t2Y + t2Height / 2, mainCakeGroup, startAngle, mainAngle);
  addGoldRing(t3Radius + 0.02, t2Y + t2Height / 2, cakeSliceGroup, -startAngle, wedgeAngle);

  // Pearls along Tier Edges
  function addPearls(radius, y, count, parentGroup, angleStart, angleLen) {
    const pearlGeo = new THREE.SphereGeometry(0.055, 12, 12);
    for (let i = 0; i < count; i++) {
      const angle = angleStart + (i / count) * angleLen;
      const pearl = new THREE.Mesh(
        pearlGeo,
        i % 2 === 0 ? pearlWhiteMaterial : pearlPinkMaterial
      );
      pearl.position.set(
        Math.cos(angle) * (radius - 0.03),
        y,
        Math.sin(angle) * (radius - 0.03)
      );
      parentGroup.add(pearl);
    }
  }

  addPearls(t1Radius, t1Y + t1Height / 2 + 0.02, 28, mainCakeGroup, startAngle, mainAngle);
  addPearls(t1Radius, t1Y + t1Height / 2 + 0.02, 7, cakeSliceGroup, -startAngle, wedgeAngle);

  addPearls(t2Radius, t2Y + t2Height / 2 + 0.02, 22, mainCakeGroup, startAngle, mainAngle);
  addPearls(t2Radius, t2Y + t2Height / 2 + 0.02, 5, cakeSliceGroup, -startAngle, wedgeAngle);

  addPearls(t3Radius, t3Y + t3Height / 2 + 0.02, 16, mainCakeGroup, startAngle, mainAngle);
  addPearls(t3Radius, t3Y + t3Height / 2 + 0.02, 4, cakeSliceGroup, -startAngle, wedgeAngle);

  // Inside Sponge & Cream Cut Face Covers for Slice
  const cutFaceGeo1 = new THREE.PlaneGeometry(t1Radius, t1Height);
  const cutFace1A = new THREE.Mesh(cutFaceGeo1, spongeInsideMaterial);
  cutFace1A.position.set(t1Radius / 2 * Math.cos(startAngle), t1Y, t1Radius / 2 * Math.sin(startAngle));
  cutFace1A.rotation.y = -startAngle + Math.PI / 2;
  mainCakeGroup.add(cutFace1A);

  const cutFace1B = new THREE.Mesh(cutFaceGeo1, spongeInsideMaterial);
  cutFace1B.position.set(t1Radius / 2 * Math.cos(-startAngle), t1Y, t1Radius / 2 * Math.sin(-startAngle));
  cutFace1B.rotation.y = startAngle + Math.PI / 2;
  mainCakeGroup.add(cutFace1B);

  // Inside slice planes
  const sliceFaceA = new THREE.Mesh(cutFaceGeo1, spongeInsideMaterial);
  sliceFaceA.position.set(t1Radius / 2 * Math.cos(startAngle), t1Y, t1Radius / 2 * Math.sin(startAngle));
  sliceFaceA.rotation.y = -startAngle - Math.PI / 2;
  cakeSliceGroup.add(sliceFaceA);

  const sliceFaceB = new THREE.Mesh(cutFaceGeo1, spongeInsideMaterial);
  sliceFaceB.position.set(t1Radius / 2 * Math.cos(-startAngle), t1Y, t1Radius / 2 * Math.sin(-startAngle));
  sliceFaceB.rotation.y = startAngle - Math.PI / 2;
  cakeSliceGroup.add(sliceFaceB);

  // 3. Golden "Happy Birthday" Cake Topper Stick on Top Tier
  const topperStem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 0.75, 16),
    goldMaterial
  );
  topperStem.position.set(0, t3Y + t3Height / 2 + 0.35, 0);
  cakeRootGroup.add(topperStem);

  // Topper Badge (Heart + Star Burst)
  const topperBadge = new THREE.Mesh(
    new THREE.TorusGeometry(0.36, 0.045, 16, 32),
    goldMaterial
  );
  topperBadge.position.set(0, t3Y + t3Height / 2 + 0.72, 0);
  cakeRootGroup.add(topperBadge);

  const topperStar = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.18, 0),
    goldMaterial
  );
  topperStar.position.set(0, t3Y + t3Height / 2 + 0.72, 0);
  cakeRootGroup.add(topperStar);

  // Base pearls around topper stick
  for (let p = 0; p < 6; p++) {
    const pAng = (p / 6) * Math.PI * 2;
    const basePearl = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 12, 12),
      pearlWhiteMaterial
    );
    basePearl.position.set(
      Math.cos(pAng) * 0.12,
      t3Y + t3Height / 2 + 0.03,
      Math.sin(pAng) * 0.12
    );
    cakeRootGroup.add(basePearl);
  }

  // Tilt & Pointer tracking
  let targetRotationY = 0;
  let targetRotationX = 0;

  function handlePointerTilt(e) {
    const rect = container.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || rect.left + rect.width / 2;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || rect.top + rect.height / 2;
    const xNorm = ((clientX - rect.left) / rect.width) * 2 - 1;
    const yNorm = ((clientY - rect.top) / rect.height) * 2 - 1;
    targetRotationY = xNorm * 0.45;
    targetRotationX = yNorm * 0.22;
  }

  container.addEventListener("pointermove", handlePointerTilt);
  container.addEventListener("touchmove", handlePointerTilt, { passive: true });

  // Resize handler
  function handleCakeResize() {
    if (!container || !cake3dRenderer || !cake3dCamera) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    cake3dCamera.aspect = w / h;
    cake3dCamera.updateProjectionMatrix();
    cake3dRenderer.setSize(w, h);
  }
  window.addEventListener("resize", handleCakeResize);

  // Render Loop
  sliceOffset = 0;
  targetSliceOffset = 0;
  isCakeCut = false;

  function renderCakeFrame() {
    cakeAnimFrameId = requestAnimationFrame(renderCakeFrame);

    // Smooth tilt towards pointer
    cakeRootGroup.rotation.y += (targetRotationY - cakeRootGroup.rotation.y) * 0.05 + 0.002;
    cakeRootGroup.rotation.x += (targetRotationX - cakeRootGroup.rotation.x) * 0.05;

    // Smooth slice outward translation when cut
    sliceOffset += (targetSliceOffset - sliceOffset) * 0.08;
    if (cakeSliceGroup) {
      cakeSliceGroup.position.z = sliceOffset * 1.1;
      cakeSliceGroup.position.x = sliceOffset * 0.05;
    }

    // Slow gold topper twinkle
    topperStar.rotation.y += 0.02;
    topperBadge.rotation.z = Math.sin(Date.now() * 0.002) * 0.08;

    cake3dRenderer.render(cake3dScene, cake3dCamera);
  }

  renderCakeFrame();
}

/**
 * Setup Draggable Pink Knife Controller
 */
function setupInteractiveKnife() {
  const knife = document.getElementById("interactive-knife");
  const viewport = document.getElementById("cake3d-viewport");
  if (!knife || !viewport) return;

  let isDragging = false;
  let startY = 0;
  let currentY = 0;

  function onPointerDown(e) {
    if (isCakeCut) return;
    isDragging = true;
    knife.classList.add("is-dragging");
    startY = e.clientY || (e.touches && e.touches[0].clientY);
    currentY = startY;
  }

  function onPointerMove(e) {
    if (!isDragging || isCakeCut) return;
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    const deltaY = y - startY;

    if (deltaY > 0) {
      knife.style.transform = `translateY(${Math.min(deltaY, 180)}px) rotate(${deltaY * 0.08 - 6}deg)`;

      // Trigger cut when dragged down across center (> 85px)
      if (deltaY > 85 && !isCakeCut) {
        completeCakeCut();
      }
    }
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    knife.classList.remove("is-dragging");

    if (!isCakeCut) {
      knife.style.transform = "translateY(0) rotate(-6deg)";
    }
  }

  knife.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);

  knife.addEventListener("touchstart", onPointerDown, { passive: true });
  window.addEventListener("touchmove", onPointerMove, { passive: true });
  window.addEventListener("touchend", onPointerUp);
}

/**
 * Executes the cake cut reaction & reveals Part 2
 */
function completeCakeCut() {
  if (isCakeCut) return;
  isCakeCut = true;

  // Animate slice outward
  targetSliceOffset = 0.72;

  // Sound & Celebration
  playSparkleChime();
  triggerCelebrationConfetti(85);

  showToast("🎂 Cake cut! Happy 20th Birthday, Sandhiya! ✨🍰");

  // Hide cut guide line
  const guideLine = document.getElementById("cut-guide-line");
  if (guideLine) guideLine.style.opacity = "0";

  // Knife rests gracefully
  const knife = document.getElementById("interactive-knife");
  if (knife) {
    knife.style.transition = "transform 0.5s ease-out";
    knife.style.transform = "translate(-80px, 140px) rotate(-15deg)";
  }

  // After cake is cut -> automatically transition to next slide ("We were kidding ready for your final surprise")
  setTimeout(() => {
    transitionFromCakeToKidding();
  }, 1200);
}

/**
 * Transition from Cake Cutting to "We were kidding..." Slide
 */
function transitionFromCakeToKidding() {
  const slide5 = document.getElementById("slide5-surprise");
  const slide6 = document.getElementById("slide6-kidding");

  // Silence Happy Birthday tune immediately!
  stopSlide5Music();

  if (slide5) slide5.style.display = "none";
  if (slide6) {
    slide6.style.display = "flex";
    slide6.scrollIntoView({ behavior: "smooth" });
    playSparkleChime();
    startRunawayYesButton();
  }
}

/**
 * Part 3: Runaway YES Button Engine
 * Button is visibly centered and still inside the card, then moves here and there without disappearing!
 */
function startRunawayYesButton() {
  const arena = document.getElementById("runaway-arena");
  const yesBtn = document.getElementById("runaway-yes-btn");
  if (!arena || !yesBtn) return;

  // Crucial: No Happy Birthday tune on this slide!
  stopSlide5Music();

  isRunawayActive = true;
  runawaySecondsLeft = 20;

  // Make sure the button is visibly centered and resting in place!
  yesBtn.style.position = "relative";
  yesBtn.style.left = "auto";
  yesBtn.style.top = "auto";
  yesBtn.style.margin = "0 auto";
  yesBtn.style.transform = "translate(0px, 0px)";
  yesBtn.style.zIndex = "10";
  yesBtn.style.display = "inline-flex";
  yesBtn.style.visibility = "visible";
  yesBtn.style.opacity = "1";
  yesBtn.className = "runaway-btn runaway-locked";

  let lastDodgeAngle = Math.random() * Math.PI * 2;

  // Function to dodge here and there within the card arena (NEVER disappears!)
  function dodgeButton() {
    if (!isRunawayActive) return;

    const arenaRect = arena.getBoundingClientRect();
    const btnRect = yesBtn.getBoundingClientRect();

    const currentW = btnRect.width || 180;
    const currentH = btnRect.height || 60;

    // Boundary limits inside the card arena
    const maxMoveX = Math.max(35, (arenaRect.width - currentW) / 2 - 10);
    const maxMoveY = Math.max(25, (arenaRect.height - currentH) / 2 - 10);

    // Pick an angle far from previous to ensure lively "here and there" jumps
    lastDodgeAngle += Math.PI * (0.65 + Math.random() * 0.7);

    // Pick distance between 65% and 100% of max reach
    const distFactor = 0.65 + Math.random() * 0.35;
    const targetX = Math.cos(lastDodgeAngle) * maxMoveX * distFactor;
    const targetY = Math.sin(lastDodgeAngle) * maxMoveY * distFactor;

    yesBtn.style.position = "relative";
    yesBtn.style.transform = `translate(${Math.round(targetX)}px, ${Math.round(targetY)}px)`;
  }

  // Dodges ONLY when she tries to click it or cursor touches it
  yesBtn.onpointerenter = () => {
    if (isRunawayActive) dodgeButton();
  };

  yesBtn.onpointerdown = (e) => {
    if (isRunawayActive) {
      e.preventDefault();
      dodgeButton();
    }
  };

  yesBtn.ontouchstart = (e) => {
    if (isRunawayActive) {
      e.preventDefault();
      dodgeButton();
    }
  };

  yesBtn.onclick = (e) => {
    if (isRunawayActive) {
      e.preventDefault();
      dodgeButton();
      return;
    }
    // Unlocked click handler: Go to Final Slide 7 & Video!
    handleYesButtonClick();
  };

  // Silent 20-second background timer (no countdown text or comments displayed!)
  if (runawayTimer) clearInterval(runawayTimer);
  runawayTimer = setInterval(() => {
    runawaySecondsLeft--;

    if (runawaySecondsLeft <= 0) {
      clearInterval(runawayTimer);
      runawayTimer = null;
      isRunawayActive = false;

      // Smoothly return to the exact center of the arena
      yesBtn.style.position = "relative";
      yesBtn.style.transform = "translate(0px, 0px)";
      yesBtn.className = "runaway-btn runaway-unlocked";
      try { playSparkleChime(); } catch (_) {}
    }
  }, 1000);
}

/**
 * Final Transition: YESS!! Button Click -> Slide 7 (Video Player & Grand Finale)
 */
function handleYesButtonClick() {
  if (isRunawayActive) return;

  // Cleanup Slide 5 & 6
  stopSlide5Music();
  if (cakeAnimFrameId) {
    cancelAnimationFrame(cakeAnimFrameId);
    cakeAnimFrameId = null;
  }
  if (runawayTimer) {
    clearInterval(runawayTimer);
    runawayTimer = null;
  }
  if (runawayPointerListener) {
    window.removeEventListener("pointermove", runawayPointerListener);
    runawayPointerListener = null;
  }

  // Celebration effects
  playSparkleChime();
  triggerCelebrationConfetti(120);

  // Transition from Slide 6 to Slide 7 (Video Final Slide)
  const slide6 = document.getElementById("slide6-kidding");
  const slide7 = document.getElementById("slide7-video-final");

  if (slide6) slide6.style.display = "none";
  if (slide7) {
    slide7.style.display = "block";
    slide7.scrollIntoView({ behavior: "smooth" });
    showToast("🎬 Happy 20th Birthday, Sandhiya! 👑💖");

    // Start video playback
    startSurpriseVideo();
  }
}

/**
 * Starts the Birthday Surprise Video Player
 */
function startSurpriseVideo() {
  const video = document.getElementById("surprise-video");
  const overlay = document.getElementById("video-play-overlay");
  const tapBtn = document.getElementById("tap-to-play-video-btn");

  if (!video) return;

  video.muted = false;
  video.currentTime = 0;

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      if (overlay) overlay.style.display = "none";
    }).catch(err => {
      console.log("Autoplay with audio prevented by browser:", err);
      if (overlay) overlay.style.display = "flex";
    });
  }

  if (tapBtn) {
    tapBtn.onclick = () => {
      video.muted = false;
      video.play().then(() => {
        if (overlay) overlay.style.display = "none";
      }).catch(err => console.log("Video playback error:", err));
    };
  }
}

/**
 * Slide 5 Happy Birthday Melody Synthesizer (Web Audio API)
 */
const HAPPY_BIRTHDAY_NOTES = [
  { note: "G4", dur: 0.35 },
  { note: "G4", dur: 0.35 },
  { note: "A4", dur: 0.7 },
  { note: "G4", dur: 0.7 },
  { note: "C5", dur: 0.7 },
  { note: "B4", dur: 1.2 },

  { note: "G4", dur: 0.35 },
  { note: "G4", dur: 0.35 },
  { note: "A4", dur: 0.7 },
  { note: "G4", dur: 0.7 },
  { note: "D5", dur: 0.7 },
  { note: "C5", dur: 1.2 },

  { note: "G4", dur: 0.35 },
  { note: "G4", dur: 0.35 },
  { note: "G5", dur: 0.7 },
  { note: "E5", dur: 0.7 },
  { note: "C5", dur: 0.7 },
  { note: "B4", dur: 0.7 },
  { note: "A4", dur: 1.1 },

  { note: "F5", dur: 0.35 },
  { note: "F5", dur: 0.35 },
  { note: "E5", dur: 0.7 },
  { note: "C5", dur: 0.7 },
  { note: "D5", dur: 0.7 },
  { note: "C5", dur: 1.5 }
];

let slide5NoteIndex = 0;

function playSlide5MelodyStep() {
  if (!isSlide5MusicPlaying) return;

  const step = HAPPY_BIRTHDAY_NOTES[slide5NoteIndex];
  if (step && NOTE_FREQS[step.note]) {
    playChimeTone(NOTE_FREQS[step.note], step.dur * 0.9);
  }

  const delay = (step ? step.dur : 0.6) * 620;
  slide5NoteIndex = (slide5NoteIndex + 1) % HAPPY_BIRTHDAY_NOTES.length;
  slide5MusicTimer = setTimeout(playSlide5MelodyStep, delay);
}

function startSlide5Music() {
  if (isSlide5MusicPlaying) return;
  isSlide5MusicPlaying = true;
  slide5NoteIndex = 0;

  // Turn OFF background "uyire un uyirena" ringtone!
  if (bgAudio) {
    try {
      bgAudio.pause();
      isMusicPlaying = false;
      if (musicBtn) {
        musicBtn.classList.remove("playing");
        const label = musicBtn.querySelector(".music-btn-text");
        if (label) label.textContent = "Play Music";
      }
    } catch (_) {}
  }

  try {
    if (!audioContext && (window.AudioContext || window.webkitAudioContext)) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext && audioContext.state === "suspended") {
      audioContext.resume().catch(() => {});
    }
  } catch (e) {}

  updateSlide5MusicStatus(true);
  playSlide5MelodyStep();
}

function stopSlide5Music() {
  isSlide5MusicPlaying = false;
  if (slide5MusicTimer) {
    clearTimeout(slide5MusicTimer);
    slide5MusicTimer = null;
  }
  updateSlide5MusicStatus(false);
}

function toggleSlide5Music() {
  if (isSlide5MusicPlaying) {
    stopSlide5Music();
  } else {
    startSlide5Music();
  }
}

function updateSlide5MusicStatus(playing) {
  const statusSpan = document.getElementById("slide5-music-status");
  const musicBtn = document.getElementById("slide5-music-btn");
  if (statusSpan) {
    statusSpan.textContent = playing
      ? "Happy Birthday Melody: Playing 🎶"
      : "Happy Birthday Melody: Muted 🔇";
  }
  if (musicBtn) {
    if (playing) {
      musicBtn.classList.remove("is-muted");
    } else {
      musicBtn.classList.add("is-muted");
    }
  }
}
