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

    // Immediately reveal celebration slide in initial cake-only state
    if (loginSec) loginSec.style.display = "none";
    if (celebSec) {
      celebSec.style.display = "block";
      celebSec.style.animation = "fadeInScale 0.4s ease forwards";
      resetCelebrationSlide();
      celebSec.scrollIntoView({ behavior: "smooth" });
    }

    try {
      showToast("👑 Identity verified! Welcome Queen Sandhiya! 💕✨");
      triggerCelebrationConfetti(70);
    } catch (e) {
      console.warn("Celebration effect error:", e);
    }

    // Auto-play background music on successful login
    startMusic();

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
// 2. CELEBRATION SECTION & INTERACTIVE CANDLE ("LIGHTS OUT" SURPRISE)
// ============================================================================
function playLightSwitchSound() {
  try {
    if (!audioContext && (window.AudioContext || window.webkitAudioContext)) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext && audioContext.state === "suspended") {
      audioContext.resume().catch(() => {});
    }
    if (!audioContext) return;
    const now = audioContext.currentTime;

    // Crisp light switch click
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(1100, now);
    osc.frequency.setValueAtTime(420, now + 0.012);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  } catch (_) {}
}

let blackoutTimer = null;

function resetCelebrationSlide() {
  candleExtinguished = false;
  if (candleFlame) candleFlame.classList.remove("extinguished");
  if (blowBtn) blowBtn.textContent = "Blow Out Candle 💨";

  if (blackoutTimer) {
    clearTimeout(blackoutTimer);
    blackoutTimer = null;
  }

  // Hide blackout overlay completely
  const blackout = document.getElementById("blackout-overlay");
  const blackoutContent = document.getElementById("blackout-content");
  if (blackoutContent) blackoutContent.classList.remove("is-visible");
  if (blackout) {
    blackout.classList.remove("is-active");
    blackout.style.display = "none";
  }

  // Hide message box until lights are turned on
  const revealBox = document.getElementById("celebration-reveal-box");
  if (revealBox) revealBox.style.display = "none";

  const instructionSubtitle = document.getElementById("cake-instruction-subtitle");
  if (instructionSubtitle) {
    instructionSubtitle.textContent = "Make a special wish and blow out the candle to reveal your birthday message! 💕";
  }
}

function toggleCandle() {
  if (!candleExtinguished) {
    candleExtinguished = true;
    candleFlame.classList.add("extinguished");
    smokePuff.classList.add("rise");
    setTimeout(() => smokePuff.classList.remove("rise"), 1800);
    blowBtn.textContent = "Relight Candle 🕯️";

    // Immediate pitch black full screen blackout
    const blackout = document.getElementById("blackout-overlay");
    const blackoutContent = document.getElementById("blackout-content");

    if (blackout) {
      blackout.style.display = "flex";
      blackout.classList.remove("is-active");
      if (blackoutContent) blackoutContent.classList.remove("is-visible");
      void blackout.offsetWidth;
      blackout.classList.add("is-active");

      // In the dark, reveal the glowing "Turn On Light" button after 5 seconds (5000ms)
      if (blackoutTimer) clearTimeout(blackoutTimer);
      blackoutTimer = setTimeout(() => {
        if (blackoutContent) {
          blackoutContent.classList.add("is-visible");
        }
      }, 5000);
    }
  } else {
    candleExtinguished = false;
    candleFlame.classList.remove("extinguished");
    blowBtn.textContent = "Blow Out Candle 💨";
    showToast("✨ Candle relit! Make another wish! 💕");
  }
}

// "Turn On Light 💡" Button Trigger: Instantly snaps back to bright screen with message (ZERO DELAY)
const turnOnLightBtn = document.getElementById("turn-on-light-btn");
if (turnOnLightBtn) {
  turnOnLightBtn.addEventListener("click", () => {
    // Play light switch click sound immediately
    playLightSwitchSound();

    // Instantly dismiss blackout overlay (zero lag/delay)
    const blackout = document.getElementById("blackout-overlay");
    const blackoutContent = document.getElementById("blackout-content");
    if (blackoutContent) blackoutContent.classList.remove("is-visible");
    if (blackout) {
      blackout.classList.remove("is-active");
      blackout.style.display = "none";
    }

    // Immediately reveal heartfelt message on the bright card
    const revealBox = document.getElementById("celebration-reveal-box");
    if (revealBox) {
      revealBox.style.display = "block";
      revealBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    const instructionSubtitle = document.getElementById("cake-instruction-subtitle");
    if (instructionSubtitle) {
      instructionSubtitle.textContent = "Lights are on & your twenties are shining bright, Queen! ✨💕";
    }

    // Immediate celebration audio & confetti burst
    playSparkleChime();
    triggerCelebrationConfetti(120);
    showToast("💡 Lights on! Happy 20th Birthday, Sandhiya! ✨❤️");
  });
}

if (cakeWrapper) cakeWrapper.addEventListener("click", toggleCandle);
if (blowBtn) blowBtn.addEventListener("click", toggleCandle);

// Transition from Celebration to Game
if (openGameBtn) {
  openGameBtn.addEventListener("click", () => {
    document.body.classList.remove("candle-dark-mode");
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
    if (candleExtinguished) {
      document.body.classList.add("candle-dark-mode");
      const revealBox = document.getElementById("celebration-reveal-box");
      if (revealBox) revealBox.style.display = "block";
    }
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

// Final Surprise Button Trigger (from Burnt Letter to Slide 5: The Golden Fortune Cookie & Runaway Yes)
const finalSurpriseBtn = document.getElementById("final-surprise-btn");
if (finalSurpriseBtn) {
  finalSurpriseBtn.addEventListener("click", () => {
    const burntSection = document.getElementById("burnt-letter-section");
    const slide5 = document.getElementById("slide5-surprise");
    if (burntSection) burntSection.style.display = "none";

    if (slide5) {
      slide5.style.display = "block";
      slide5.scrollIntoView({ behavior: "smooth" });
      triggerCelebrationConfetti(90);
      playSparkleChime();
      showToast("🍪 Break open your warm birthday choco-chip cookie, Queen! 💖✨");
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
    startMusic();
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
    resetCelebrationSlide();
    celebrationSection.scrollIntoView({ behavior: "smooth" });
    startMusic();
    showToast("💌 Back to the birthday message!");
  });
}

// ============================================================================
// 4. AUDIO SYSTEM: MP3 CONTROLLER WITH AUTOPLAY FALLBACK
// ============================================================================
if (bgAudio && !bgAudio.src.includes(BIRTHDAY_CONFIG.audioPath)) {
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
  if (!bgAudio) return;

  // Stop any procedural synth notes if running
  stopSynthMusicBox();

  bgAudio.volume = 0.8;
  const playPromise = bgAudio.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        setMusicPlayingState(true, "Audio Playing");
      })
      .catch((err) => {
        console.warn("Autoplay was prevented or audio failed to load:", err);
        setMusicPlayingState(false, "Play Audio");

        // If autoplay was blocked for any reason, trigger it on the user's very next click/touch
        const unlockAudio = () => {
          if (!isAudioPlaying) {
            bgAudio.play().then(() => {
              setMusicPlayingState(true, "Audio Playing");
            }).catch(() => {});
          }
          document.removeEventListener("click", unlockAudio);
          document.removeEventListener("touchstart", unlockAudio);
        };
        document.addEventListener("click", unlockAudio, { once: true });
        document.addEventListener("touchstart", unlockAudio, { once: true });
      });
  }
}

function stopMusic() {
  if (bgAudio) {
    try {
      bgAudio.pause();
    } catch (_) {}
  }
  stopSynthMusicBox();
  setMusicPlayingState(false, "Play Audio");
}

function setMusicPlayingState(playing, label) {
  isAudioPlaying = playing;
  if (!musicBtn) return;
  if (playing) {
    musicBtn.classList.add("is-playing");
    if (musicIcon) musicIcon.textContent = "🔊";
    if (musicLabel) musicLabel.textContent = label || "Audio Playing";
  } else {
    musicBtn.classList.remove("is-playing");
    if (musicIcon) musicIcon.textContent = "🎵";
    if (musicLabel) musicLabel.textContent = "Play Audio";
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
    const now = audioContext.currentTime;

    // Fundamental Bell Tone
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(frequency, now);

    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc1.connect(gain1);
    gain1.connect(audioContext.destination);

    // Sweet Celesta / Music-Box Harmonic Shimmer (2x Octave)
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(frequency * 2, now);

    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.linearRampToValueAtTime(0.06, now + 0.015);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.55);

    osc2.connect(gain2);
    gain2.connect(audioContext.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration * 0.55);
  } catch (e) {}
}

function playSliceCrunchSound() {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (_) {}
  }
  if (!audioContext) return;
  try {
    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(840 + Math.random() * 260, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.09);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start(now);
    osc.stop(now + 0.09);
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
const GLITTER_COUNT = 260;

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
    this.size = Math.random() * 4.8 + 1.6;
    this.speedY = Math.random() * 0.65 + 0.2;
    this.speedX = (Math.random() - 0.5) * 0.35;
    this.alpha = Math.random() * 0.75 + 0.25;
    this.alphaSpeed = (Math.random() * 0.025 + 0.01) * (Math.random() > 0.5 ? 1 : -1);
    this.twinklePhase = Math.random() * Math.PI * 2;
    this.colorType = Math.floor(Math.random() * 8);
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.03;
    
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
    this.twinklePhase += 0.06;
    
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

    // Luxurious Champagne Gold, Diamond & Electric Rose Palette
    let fill = "#ffffff";
    if (this.colorType === 0) fill = "#ffffff"; // Diamond Brilliant White
    else if (this.colorType === 1) fill = "#ffd700"; // 24K Champagne Gold
    else if (this.colorType === 2) fill = "#ffe082"; // Warm Golden Starlight
    else if (this.colorType === 3) fill = "#ff1493"; // Electric Pink
    else if (this.colorType === 4) fill = "#ff69b4"; // Radiant Hot Pink
    else if (this.colorType === 5) fill = "#e0aaff"; // Celestial Amethyst
    else if (this.colorType === 6) fill = "#ff85a2"; // Rose Gold
    else if (this.colorType === 7) fill = "#fff3e0"; // Pearlescent White

    ctx.fillStyle = fill;
    ctx.shadowBlur = this.size * 3.6;
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

// Sparkle trail following cursor on laptop
window.addEventListener("pointermove", (e) => {
  if (Math.random() > 0.45) {
    glitterParticles.push(new GlitterParticle(e.clientX, e.clientY));
    if (glitterParticles.length > GLITTER_COUNT + 40) {
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

// Auto-focus username input on load & prepare celebration slide state
document.addEventListener("DOMContentLoaded", () => {
  if (usernameInput) {
    usernameInput.focus();
  }
  resetCelebrationSlide();
});

// ============================================================================
// 8. SLIDE 5: THE GOLDEN BIRTHDAY FORTUNE COOKIE & RUNAWAY YES BUTTON
// ============================================================================
let isCookieCracked = false;
let runawayTimer = null;
let runawaySecondsLeft = 20;
let isRunawayActive = false;
let runawayPointerListener = null;

/**
 * Initializes the Slide 5 Choco-Chip Cookie experience with custom hammer cursor
 */
function initSlide5Experience() {
  isCookieCracked = false;

  const cookieBox = document.getElementById("cookie-interactive");
  const fortuneSlip = document.getElementById("fortune-slip");
  const proceedBtn = document.getElementById("fortune-proceed-btn");
  const hammer = document.getElementById("cookie-hammer");

  if (cookieBox) {
    cookieBox.classList.remove("is-cracked");
    cookieBox.onclick = crackFortuneCookie;

    // Interactive Floating Hammer Cursor tracking
    if (hammer) {
      hammer.style.opacity = "0";
      hammer.classList.remove("is-striking");

      cookieBox.onpointermove = (e) => {
        if (isCookieCracked) {
          hammer.style.opacity = "0";
          return;
        }
        const rect = cookieBox.getBoundingClientRect();
        const x = e.clientX - rect.left + 4;
        const y = e.clientY - rect.top - 32;
        hammer.style.opacity = "1";
        hammer.style.transform = `translate(${x}px, ${y}px) rotate(-15deg)`;
      };

      cookieBox.onpointerleave = () => {
        hammer.style.opacity = "0";
      };

      cookieBox.onpointerdown = () => {
        if (!isCookieCracked) {
          hammer.classList.add("is-striking");
        }
      };

      window.addEventListener("pointerup", () => {
        if (hammer) hammer.classList.remove("is-striking");
      });
    }
  }

  if (fortuneSlip) {
    fortuneSlip.style.display = "none";
  }

  if (proceedBtn) {
    proceedBtn.onclick = transitionFromFortuneToKidding;
  }
}

/**
 * Sound effect: Satisfying hammer whack & crispy golden biscuit crunch
 */
function playCookieCrackSound() {
  try {
    if (!audioContext && (window.AudioContext || window.webkitAudioContext)) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext && audioContext.state === "suspended") {
      audioContext.resume().catch(() => {});
    }
    if (!audioContext) return;
    const now = audioContext.currentTime;

    // Hammer impact 'thump'
    const whackOsc = audioContext.createOscillator();
    const whackGain = audioContext.createGain();
    whackOsc.type = "sine";
    whackOsc.frequency.setValueAtTime(260, now);
    whackOsc.frequency.exponentialRampToValueAtTime(75, now + 0.08);
    whackGain.gain.setValueAtTime(0.65, now);
    whackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    whackOsc.connect(whackGain);
    whackGain.connect(audioContext.destination);
    whackOsc.start(now);
    whackOsc.stop(now + 0.08);

    // Biscuit noise crack
    const bufferSize = Math.floor(audioContext.sampleRate * 0.09);
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioContext.sampleRate * 0.016));
    }
    const noise = audioContext.createBufferSource();
    noise.buffer = buffer;

    const filter = audioContext.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(3.0, now);

    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);
    noise.start(now);

    // Warm snap tone
    const osc = audioContext.createOscillator();
    const oscGain = audioContext.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.07);
    oscGain.gain.setValueAtTime(0.35, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    osc.connect(oscGain);
    oscGain.connect(audioContext.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  } catch (e) {}
}

/**
 * Breaks open the choco-chip cookie with hammer strike, revealing the secret message note
 */
function crackFortuneCookie() {
  if (isCookieCracked) return;
  isCookieCracked = true;

  const cookieBox = document.getElementById("cookie-interactive");
  const fortuneSlip = document.getElementById("fortune-slip");
  const hammer = document.getElementById("cookie-hammer");

  if (cookieBox) {
    cookieBox.classList.add("is-cracked");
  }

  if (hammer) {
    hammer.style.opacity = "0";
    hammer.classList.remove("is-striking");
  }

  // Play realistic hammer impact + cookie crunch sound
  playCookieCrackSound();

  // Magical chime + burst of celebration confetti
  setTimeout(() => {
    playSparkleChime();
    triggerCelebrationConfetti(110);
  }, 120);

  // Smoothly reveal prophecy note
  setTimeout(() => {
    if (fortuneSlip) {
      fortuneSlip.style.display = "block";
      fortuneSlip.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    showToast("🍪 Cookie broken! Read your secret birthday message, Sandhiya! ✨📜");
  }, 380);
}

/**
 * Transition from Fortune Cookie Slide to "We were kidding..." Prank Slide
 */
function transitionFromFortuneToKidding() {
  const slide5 = document.getElementById("slide5-surprise");
  const slide6 = document.getElementById("slide6-kidding");

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

  yesBtn.ontouchend = (e) => {
    if (!isRunawayActive) {
      e.preventDefault();
      handleYesButtonClick();
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

  // Cleanup Slide 5 & 6 and ensure background music is stopped
  stopMusic();
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

  // Visual celebration effects
  triggerCelebrationConfetti(120);

  // Transition from Slide 6 to Slide 7 (Video Final Slide)
  const slide6 = document.getElementById("slide6-kidding");
  const slide7 = document.getElementById("slide7-video-final");

  if (slide6) slide6.style.display = "none";
  if (slide7) {
    slide7.style.display = "block";
    slide7.scrollIntoView({ behavior: "smooth" });
    showToast("🎬 Happy 20th Birthday, Sandhiya! 👑💖");

    // Start video playback cleanly
    startSurpriseVideo();
  }
}

/**
 * Starts the Birthday Surprise Video Player
 */
function startSurpriseVideo() {
  stopMusic();
  const video = document.getElementById("surprise-video");
  const overlay = document.getElementById("video-play-overlay");
  const tapBtn = document.getElementById("tap-to-play-video-btn");

  if (!video) return;

  video.muted = false;
  video.currentTime = 0;
  try {
    video.load();
  } catch (_) {}

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

window.handleYesButtonClick = handleYesButtonClick;

// Slide 5 audio cleanups (replaced by ambient song)
function startSlide5Music() {}
function stopSlide5Music() {}
function toggleSlide5Music() {}
function updateSlide5MusicStatus() {}
