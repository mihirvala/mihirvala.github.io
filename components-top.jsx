/* Hero (scattered scrapbook), Marquee, About, Stack, Sticker drag */

const TYPING_LINES = [
  { c: "whoami", out: "Full Stack Engineer · 4 yrs · ASP.NET Core · React.js" },
  { c: "cat skills", out: ".NET Core · React.js · Docker · Azure DevOps · CQRS" },
  { c: "git log -1", out: "feat(cart-sync): Amazon SP-API + Shopify GraphQL sync" },
  { c: "echo $TAGLINE", out: "I ship clean code, not just commits." },
];

function MiniTerm() {
  const [phase, setPhase] = React.useState(0);
  const [step, setStep] = React.useState(0);
  const [typed, setTyped] = React.useState("");
  const [userInput, setUserInput] = React.useState("");
  const [history, setHistory] = React.useState([]);
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (focused) return; // pause auto-typing when user is focused
    const line = TYPING_LINES[phase];
    if (step === 0) {
      if (typed.length < line.c.length) {
        const t = setTimeout(() => setTyped(line.c.slice(0, typed.length + 1)), 60 + Math.random() * 40);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setStep(1), 250);
      return () => clearTimeout(t);
    }
    if (step === 1) {
      const t = setTimeout(() => setStep(2), 1800);
      return () => clearTimeout(t);
    }
    if (step === 2) {
      const t = setTimeout(() => {
        setPhase((phase + 1) % TYPING_LINES.length);
        setTyped("");
        setStep(0);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [phase, step, typed, focused]);

  const handleCommand = (cmd) => {
    const c = cmd.trim().toLowerCase();
    let out = "";
    let cls = "";
    if (c === "stop music" || c === "music stop" || c === "pause music") {
      if (window.__musicControl) {
        window.__musicControl.pause();
        out = "♫ music stopped";
        cls = "warn";
      } else {
        out = "no music player found";
        cls = "warn";
      }
    } else if (c === "play music" || c === "music play" || c === "start music") {
      if (window.__musicControl) {
        window.__musicControl.play();
        out = "♫ music playing";
        cls = "ok";
      } else {
        out = "no music player found";
        cls = "warn";
      }
    } else if (c === "help") {
      out = "commands: whoami, stop music, play music, help, clear";
      cls = "ok";
    } else if (c === "clear") {
      setHistory([]);
      return;
    } else if (c === "whoami") {
      out = "Full Stack Engineer · 4 yrs · ASP.NET Core · React.js";
      cls = "ok";
    } else if (c === "") {
      return;
    } else {
      out = `zsh: command not found: ${cmd.trim()}`;
      cls = "warn";
    }
    setHistory(prev => [...prev.slice(-4), { cmd: cmd.trim(), out, cls }]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(userInput);
      setUserInput("");
    }
  };

  const focusInput = (e) => {
    if (e.target.tagName === "INPUT") return;
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="window prop-miniterm" onClick={focusInput}>
      <div className="window-bar">
        <div className="lights"><span className="light"></span><span className="light y"></span><span className="light g"></span></div>
        <div className="title" style={{ fontSize: 10 }}>mihir@gandhinagar — zsh</div>
        <div style={{ width: 30 }}></div>
      </div>
      <div className="window-body">
        {/* auto-typing demo line */}
        {!focused && (
          <React.Fragment>
            <div className="prompt-line">
              <span className="prompt"><span className="arrow">$</span></span>
              <span className="cmd">{typed}{step === 0 && <span className="cursor"></span>}</span>
            </div>
            {step >= 1 && (
              <div className="out ok" style={{ whiteSpace: "pre-line" }}>
                {TYPING_LINES[phase].out}
                {step === 1 && <span className="cursor"></span>}
              </div>
            )}
          </React.Fragment>
        )}
        {/* command history */}
        {history.map((h, i) => (
          <React.Fragment key={i}>
            <div className="prompt-line">
              <span className="prompt"><span className="arrow">$</span></span>
              <span className="cmd">{h.cmd}</span>
            </div>
            <div className={"out " + h.cls}>{h.out}</div>
          </React.Fragment>
        ))}
        {/* user input line */}
        <div className="prompt-line">
          <span className="prompt"><span className="arrow">$</span></span>
          <input
            ref={inputRef}
            className="term-input"
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            onKeyDown={onKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="type a command..."
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}

/* draggable wrapper for any prop */
function Draggable({ children, style, hint, className = "" }) {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [dragging, setDragging] = React.useState(false);
  const startRef = React.useRef({ x: 0, y: 0, px: 0, py: 0 });
  const didDragRef = React.useRef(false);

  const onDown = (e) => {
    if (e.target.tagName === "A" || e.target.tagName === "BUTTON" || e.target.tagName === "INPUT") return;
    // only preventDefault on mouse (not touch) — touch preventDefault kills synthetic click
    if (!e.touches) e.preventDefault();
    const t = e.touches ? e.touches[0] : e;
    didDragRef.current = false;
    setDragging(true);
    startRef.current = { x: t.clientX, y: t.clientY, px: pos.x, py: pos.y };
  };
  React.useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const t = e.touches ? e.touches[0] : e;
      const dx = t.clientX - startRef.current.x;
      const dy = t.clientY - startRef.current.y;
      // mark as a real drag if moved more than 8px
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) didDragRef.current = true;
      setPos({ x: startRef.current.px + dx, y: startRef.current.py + dy });
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging]);

  // suppress click events that follow a real drag
  const onClick = (e) => {
    if (didDragRef.current) {
      e.stopPropagation();
      didDragRef.current = false;
    }
  };

  const baseTransform = (style && style.transform) || "";
  const merged = {
    ...style,
    transform: `${baseTransform} translate(${pos.x}px, ${pos.y}px)`,
    transition: dragging ? "none" : (style?.transition || "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)"),
    zIndex: dragging ? 999 : (style?.zIndex || 2),
  };

  return (
    <div className={"prop " + className} style={merged} onMouseDown={onDown} onTouchStart={onDown} onClickCapture={onClick}>
      {children}
      {hint && <span className="label">{hint}</span>}
    </div>
  );
}

/* prop components */
function Keycap({ char }) { return <div className="prop-keycap-wrap"><div className="prop-keycap">{char}</div></div>; }
function Coffee() {
  return (
    <div className="prop-coffee">
      <div className="steam"></div>
      <div className="steam"></div>
      <div className="steam"></div>
      <div className="cup"></div>
      <div className="handle"></div>
    </div>
  );
}
function Docker() {
  return (
    <div className="prop-docker">
      <div className="containers">
        <div></div><div></div><div></div><div></div>
      </div>
      <div className="body"></div>
      <div className="tail"></div>
      <div className="eye"></div>
    </div>
  );
}
function DotnetHex() {
  return (
    <div className="prop-dotnet">
      <div className="hex"></div>
      <span>.NET</span>
    </div>
  );
}
function AzureCloud() {
  return <div className="prop-azure"><div className="cloud"></div></div>;
}
function Cassette() {
  return (
    <div className="prop-cassette">
      <div className="label">MIHIR · MIXTAPE — VOL.3</div>
      <div className="reel l"></div>
      <div className="reel r"></div>
    </div>
  );
}
function StickyNote({ children, doodle }) {
  return (
    <div className="prop-stickynote">
      {children}
      {doodle && <span className="doodle">{doodle}</span>}
    </div>
  );
}
function Ticket() {
  return (
    <div className="prop-ticket">
      <div className="stub">DEV × DEPLOY</div>
      <div className="body">
        <b>EST. 2022 → NOW</b>
        <div>4 years · .NET · DevOps</div>
        <div style={{ marginTop: 4, fontSize: 9, color: "var(--ink-soft)" }}>seat: backend · row: 7</div>
      </div>
      <span className="stamp">SHIPPED</span>
    </div>
  );
}
function Vinyl() {
  const [playing, setPlaying] = React.useState(false);
  const audioRef = React.useRef(null);

  // create audio element once & autoplay
  React.useEffect(() => {
    const audio = new Audio("https://framerusercontent.com/assets/IW431Kpk1jmXIXFWB8B8DjzDJ0M.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    audio.addEventListener("ended", () => setPlaying(false));

    // expose global music control for MiniTerm commands
    window.__musicControl = {
      pause: () => { audio.pause(); setPlaying(false); },
      play: () => { audio.play().then(() => setPlaying(true)).catch(() => { }); },
      isPlaying: () => !audio.paused,
    };

    // try autoplay — browsers may block it
    const tryPlay = () => {
      audio.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        // blocked by autoplay policy — play on first user interaction
        const resumeOnClick = () => {
          audio.play().then(() => setPlaying(true)).catch(() => { });
          document.removeEventListener("click", resumeOnClick);
          document.removeEventListener("touchstart", resumeOnClick);
        };
        document.addEventListener("click", resumeOnClick, { once: true });
        document.addEventListener("touchstart", resumeOnClick, { once: true });
      });
    };
    tryPlay();

    return () => {
      audio.pause();
      audio.src = "";
      delete window.__musicControl;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => { });
    }
    setPlaying(!playing);
  };

  return (
    <div className="prop-vinyl-wrap" onClick={toggle} style={{ cursor: "pointer" }}>
      <div className={"prop-vinyl-disc" + (playing ? " spinning" : "")}>
        {/* grooves */}
        <div className="groove g1"></div>
        <div className="groove g2"></div>
        <div className="groove g3"></div>
        <div className="groove g4"></div>
        {/* label */}
        <div className="vinyl-label">
          <span>LO-FI</span>
        </div>
      </div>
      {/* tonearm */}
      <div className={"vinyl-arm" + (playing ? " on" : "")}></div>
      {/* play/pause indicator */}
      <div className="vinyl-status">
        {playing ? "♫ playing" : "▶ play"}
      </div>
    </div>
  );
}
function UsbCable() {
  return (
    <div className="prop-usb">
      <svg viewBox="0 0 100 60" fill="none">
        <path d="M5 30 Q25 5 50 30 T 95 30" stroke="#1a1a1f" strokeWidth="2" strokeLinecap="round" />
        <rect x="0" y="26" width="10" height="10" fill="#1a1a1f" />
        <rect x="90" y="26" width="10" height="10" fill="#1a1a1f" />
      </svg>
      <div>git-pushing 24/7</div>
    </div>
  );
}
function MiniPolaroid({ initials, color, cap }) {
  return (
    <div className="prop-polaroid">
      <div className="img" style={{ background: color }}>{initials}</div>
      <div className="cap">{cap}</div>
    </div>
  );
}
function Badge() {
  return (
    <div className="prop-badge">
      <div className="strap"></div>
      <div className="card">
        <div className="ph">MV</div>
        <div className="big">MIHIR<br />VALA</div>
        <div className="sm">SR · ENG · 2026</div>
      </div>
    </div>
  );
}

function GitCommit() {
  return (
    <div className="prop-commit" style={{
      background: "#1a1a1f",
      border: "2px solid #4d8eff",
      borderRadius: 8,
      padding: "12px 16px",
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      color: "#4d8eff",
      textAlign: "center",
      boxShadow: "0 4px 12px rgba(77, 142, 255, 0.2)",
    }}>
      <div style={{ fontSize: 9, color: "#888", marginBottom: 4 }}>commit</div>
      <div style={{ fontWeight: "bold", letterSpacing: "0.05em" }}>a4f3c2b</div>
      <div style={{ fontSize: 8, color: "#666", marginTop: 6 }}>latest</div>
    </div>
  );
}

function APICard() {
  return (
    <div style={{
      background: "#1a1a1f",
      border: "2px solid #ff6b5b",
      borderRadius: 6,
      padding: "10px 12px",
      fontFamily: "var(--font-mono)",
      fontSize: 9,
      color: "#ff6b5b",
      lineHeight: 1.4,
      boxShadow: "0 0 12px rgba(255, 107, 91, 0.2)",
    }}>
      <div style={{ marginBottom: 4, color: "#666" }}>GET</div>
      <div style={{ fontWeight: "bold" }}>/api/v1/</div>
      <div style={{ color: "#666", fontSize: 8, marginTop: 3 }}>active</div>
    </div>
  );
}

function CPUChip() {
  return (
    <div style={{
      background: "#1a1a1f",
      border: "2px solid #b392f0",
      borderRadius: 4,
      width: 50,
      height: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      boxShadow: "0 0 10px rgba(179, 146, 240, 0.4), inset 0 0 10px rgba(179, 146, 240, 0.1)",
    }}>
      <div style={{
        width: 30,
        height: 30,
        border: "2px solid #b392f0",
        borderRadius: 2,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 3,
        padding: 3,
      }}>
        {[...Array(9)].map((_, i) => (
          <div key={i} style={{
            background: i % 3 === 0 ? "#b392f0" : "transparent",
            borderRadius: 1,
            animation: `pulse 2s ease-in-out infinite ${i * 0.1}s`,
          }}></div>
        ))}
      </div>
      <div style={{
        position: "absolute",
        bottom: 4,
        right: 4,
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "#b392f0",
        animation: "pulse 1.5s ease-in-out infinite",
      }}></div>
    </div>
  );
}

function BuildStatus() {
  return (
    <div style={{
      background: "#1a1a1f",
      border: "2px solid #3fb950",
      borderRadius: 6,
      padding: "8px 12px",
      fontFamily: "var(--font-mono)",
      fontSize: 9,
      textAlign: "center",
      color: "#3fb950",
      boxShadow: "0 0 15px rgba(63, 185, 80, 0.4)",
    }}>
      <div style={{ fontSize: 8, color: "#666", marginBottom: 3 }}>build</div>
      <div style={{ fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
        <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#3fb950", animation: "pulse 1.5s ease-in-out infinite" }}></span>
        SUCCESS
      </div>
    </div>
  );
}

function SecurityLock() {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes lockBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          @keyframes lockGlow {
            0%, 100% { filter: drop-shadow(0 0 4px #ff7b9c); }
            50% { filter: drop-shadow(0 0 12px #ff7b9c); }
          }
          .lock-body { animation: lockBounce 2s ease-in-out infinite; }
          .lock-glow { animation: lockGlow 1.5s ease-in-out infinite; }
        `}</style>
      </defs>
      <g className="lock-glow">
        <g className="lock-body">
          {/* Padlock shackle */}
          <path d="M15 22C15 15 20 10 25 10C30 10 35 15 35 22" stroke="#ff7b9c" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Padlock body */}
          <rect x="14" y="22" width="22" height="18" rx="2" stroke="#ff7b9c" strokeWidth="2.5" fill="none" />
          {/* Keyhole */}
          <circle cx="25" cy="31" r="2.5" fill="#ff7b9c" />
          {/* Light rays */}
          <line x1="8" y1="25" x2="12" y2="25" stroke="#ff7b9c" strokeWidth="1.5" opacity="0.6" />
          <line x1="38" y1="25" x2="42" y2="25" stroke="#ff7b9c" strokeWidth="1.5" opacity="0.6" />
        </g>
      </g>
    </svg>
  );
}

function DeployRocket() {
  return (
    <svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes rocketLift {
            0% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0); }
          }
          @keyframes flamePulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          .rocket { animation: rocketLift 2s ease-in-out infinite; }
          .flame { animation: flamePulse 0.6s ease-in-out infinite; }
        `}</style>
      </defs>
      <g className="rocket">
        {/* Rocket body */}
        <path d="M25 8L30 18L28 40L22 40L20 18Z" fill="#4d8eff" stroke="#4d8eff" strokeWidth="1.5" />
        {/* Nose cone */}
        <polygon points="25,5 22,10 28,10" fill="#ff6b5b" />
        {/* Left fin */}
        <polygon points="20,32 15,42 20,40" fill="#3fb950" />
        {/* Right fin */}
        <polygon points="30,32 35,42 30,40" fill="#3fb950" />
        {/* Window */}
        <circle cx="25" cy="18" r="2.5" fill="#b392f0" />
      </g>
      {/* Flame */}
      <g className="flame">
        <polygon points="23,42 27,42 25,52 24,48" fill="#ff7b5b" opacity="0.9" />
        <polygon points="22,45 28,45 25,54 23,50" fill="#ffb700" opacity="0.7" />
      </g>
    </svg>
  );
}

function ReactAtom() {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes orbitSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes orbitSpin2 {
            0% { transform: rotate(120deg); }
            100% { transform: rotate(480deg); }
          }
          @keyframes orbitSpin3 {
            0% { transform: rotate(240deg); }
            100% { transform: rotate(600deg); }
          }
          .orbit1 { animation: orbitSpin 4s linear infinite; transform-origin: 25px 25px; }
          .orbit2 { animation: orbitSpin2 4s linear infinite; transform-origin: 25px 25px; }
          .orbit3 { animation: orbitSpin3 4s linear infinite; transform-origin: 25px 25px; }
        `}</style>
      </defs>
      {/* Outer orbital paths */}
      <circle cx="25" cy="25" r="20" stroke="#61dafb" strokeWidth="1" fill="none" opacity="0.3" />

      {/* Orbits with electrons */}
      <g className="orbit1">
        <circle cx="45" cy="25" r="2.5" fill="#61dafb" />
      </g>
      <g className="orbit2">
        <circle cx="25" cy="8" r="2.5" fill="#61dafb" />
      </g>
      <g className="orbit3">
        <circle cx="11" cy="38" r="2.5" fill="#61dafb" />
      </g>

      {/* Core nucleus */}
      <circle cx="25" cy="25" r="5" fill="#61dafb" opacity="0.9" />
      <circle cx="25" cy="25" r="5" stroke="#61dafb" strokeWidth="1" fill="none" />
      <circle cx="25" cy="25" r="3" fill="#061e26" />
    </svg>
  );
}

function PerformanceBar() {
  return (
    <div style={{
      background: "#1a1a1f",
      border: "2px solid #f0a72b",
      borderRadius: 6,
      padding: "8px 10px",
      fontFamily: "var(--font-mono)",
      fontSize: 8,
      color: "#f0a72b",
      boxShadow: "0 0 10px rgba(240, 167, 43, 0.3)",
    }}>
      <div style={{ marginBottom: 4, color: "#666" }}>perf</div>
      <div style={{
        width: 60,
        height: 4,
        background: "#333",
        borderRadius: 2,
        overflow: "hidden",
        marginBottom: 4,
      }}>
        <div style={{
          width: "92%",
          height: "100%",
          background: "linear-gradient(90deg, #3fb950, #f0a72b)",
          borderRadius: 2,
          animation: "slideIn 2s ease-in-out infinite",
        }}></div>
      </div>
      <div style={{ fontSize: 7, color: "#666" }}>92% LCP</div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="wrap">
        <div className="hero-stage">
          {/* center: huge handwritten name */}
          <div className="hero-center">
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "var(--ink-soft)",
              marginBottom: 12,
              textTransform: "uppercase",
            }}>
              <span style={{
                display: "inline-block",
                width: 8, height: 8, borderRadius: 4,
                background: "var(--c-green)",
                boxShadow: "0 0 8px var(--c-green)",
                animation: "pulse 1.6s ease-in-out infinite",
              }}></span>
              available · open to work
            </div>
            <h1 className="name">Mihir Vala</h1>
            <div className="tagline">I ship clean code, not just commits</div>
          </div>

          {/* badge with strap (top-left) */}
          <Draggable className="" style={{ top: 60, left: "5%" }} hint="lanyard ↑ drag me">
            <Badge />
          </Draggable>

          {/* keycap */}
          <Draggable style={{ top: 30, left: "30%", transform: "rotate(-8deg)" }} hint="press to refactor">
            <Keycap char="ESC" />
          </Draggable>

          {/* coffee */}
          <Draggable style={{ top: 100, left: "44%" }} hint="caffeinated commits ☕">
            <Coffee />
          </Draggable>

          {/* docker whale (top-right) */}
          <Draggable style={{ top: 40, right: "20%" }} hint="docker compose up 🐳">
            <Docker />
          </Draggable>

          {/* .NET hex */}
          <Draggable style={{ top: 20, right: "5%" }} hint=".NET Core forever">
            <DotnetHex />
          </Draggable>

          {/* mid-left: cassette */}
          <Draggable style={{ top: 280, left: "3%", transform: "rotate(-6deg)" }} hint="press play 🎵">
            <Cassette />
          </Draggable>

          {/* sticky note */}
          <Draggable style={{ top: 290, left: "22%", transform: "rotate(-3deg)" }} hint="2 PRs left, 1 nap needed">
            <StickyNote doodle="✿">
              // TODO:<br />
              ship it<br />
              fix it later
            </StickyNote>
          </Draggable>

          {/* ticket */}
          <Draggable style={{ top: 280, right: "20%", transform: "rotate(4deg)" }} hint="seat: backend, row: 7">
            <Ticket />
          </Draggable>

          {/* azure cloud */}
          <Draggable style={{ top: 320, right: "4%" }} hint="azure devops · CI/CD">
            <AzureCloud />
          </Draggable>

          {/* vinyl bottom-left */}
          <Draggable style={{ bottom: 20, left: "8%" }} hint="lo-fi while debugging">
            <Vinyl />
          </Draggable>

          {/* polaroid: BCA */}
          <Draggable style={{ bottom: 20, left: "26%", transform: "rotate(-4deg)" }} hint="Kadi University · 7.03 CPI">
            <MiniPolaroid initials="BCA" color="linear-gradient(135deg, #4d8eff, #b392f0)" cap="BCA · '21" />
          </Draggable>

          {/* mini terminal bottom-center */}
          <Draggable style={{ bottom: 30, left: "44%", transform: "rotate(-1deg)" }} hint="zsh · type below ↓">
            <MiniTerm />
          </Draggable>

          {/* USB cable */}
          <Draggable style={{ bottom: 60, right: "22%", transform: "rotate(8deg)" }} hint="git push origin main">
            <UsbCable />
          </Draggable>

          {/* polaroid: Tech Ahir */}
          <Draggable style={{ bottom: 10, right: "5%", transform: "rotate(3deg)" }} hint="now @ Tech Ahir">
            <MiniPolaroid initials="TA" color="linear-gradient(135deg, #3fb950, #2d7a3d)" cap="@ Tech Ahir 🟢" />
          </Draggable>

          {/* git commit hash */}
          <Draggable style={{ top: 180, left: "3%", transform: "rotate(-2deg)" }} hint="latest commit">
            <GitCommit />
          </Draggable>

          {/* deploy rocket */}
          <Draggable style={{ top: 140, right: "12%", transform: "rotate(5deg)" }} hint="shipping fast 🚀">
            <DeployRocket />
          </Draggable>

          {/* API endpoint card */}
          <Draggable style={{ top: 320, left: "18%", transform: "rotate(3deg)" }} hint="REST API · active">
            <APICard />
          </Draggable>

          {/* CPU Chip */}
          <Draggable style={{ top: 100, left: "60%", transform: "rotate(6deg)" }} hint="processing power">
            <CPUChip />
          </Draggable>

          {/* Build Status */}
          <Draggable style={{ top: 210, right: "20%", transform: "rotate(4deg)" }} hint="CI/CD pipeline">
            <BuildStatus />
          </Draggable>

          {/* Security Lock */}
          <Draggable style={{ bottom: 180, left: "12%", transform: "rotate(-8deg)" }} hint="secure & encrypted">
            <SecurityLock />
          </Draggable>

          {/* React Atom */}
          <Draggable style={{ top: 200, right: "5%", transform: "rotate(-3deg)" }} hint="React.js powered">
            <ReactAtom />
          </Draggable>

          {/* Performance Bar */}
          <Draggable style={{ bottom: 100, right: "15%", transform: "rotate(3deg)" }} hint="optimized performance">
            <PerformanceBar />
          </Draggable>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "ASP.NET Core", "React.js", "AngularJS", "PostgreSQL", "SQL", "Docker", "Automation",
    "Code Generation", "AI-Assisted Development", "Azure DevOps", "CI/CD",
    "Clean Architecture", "CQRS", "Entity Framework", "Amazon SP-API", "Shopify GraphQL"
  ];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i}><span className="star">✦</span>{it}</span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="section-head">
          <span className="commit">commit a4f3c2b</span>
          <span className="arrow">$</span>
          <h2>cat about.md</h2>
          <span className="gujarati">// who I am</span>
        </div>
        <div className="about-grid">
          <div>
            <div className="bio">
              <p>
                I'm a <span className="hl-blue">full-stack engineer</span> who genuinely
                gets excited about React frontends, clean APIs, CI/CD pipelines, and that perfect moment
                when a 90-line PowerShell script replaces 4 hours of manual deploys.
              </p>
              <p>
                I started at <b>Microvista</b> automating financial compliance reports,
                grew at <b>Codzgarage</b> shipping JWT auth, encrypted file workflows,
                and a Leave Management System, and now I'm at <b>Tech Ahir</b> building React interfaces,
                designing Azure DevOps pipelines, and integrating third-party APIs like Amazon SP-API and Shopify.
              </p>
              <p>
                Outside work: late-night terminal sessions, mechanical keyboards,
                and answering the eternal question of <span className="hand">— is it `tabs vs spaces` or just vibes?</span>
              </p>
            </div>
            <div className="about-extras">
              <div className="stat"><b>4</b><span>YEARS SHIPPING</span></div>
              <div className="stat"><b>90%</b><span>DEPLOY TIME ↓</span></div>
              <div className="stat"><b>0</b><span>GIT MERGE WARS</span></div>
            </div>
          </div>
          <div className="values">
            <div className="value-card">
              <div className="vk"><span className="num">01</span><span>// principle</span></div>
              <h4>Boring code, exciting outcomes</h4>
              <p>SOLID, dependency injection, repository pattern. Predictable code beats clever code, every time.</p>
            </div>
            <div className="value-card">
              <div className="vk"><span className="num">02</span><span>// principle</span></div>
              <h4>Automate the boring stuff</h4>
              <p>If I do it twice, it's a script. If I do it three times, it's a pipeline.</p>
            </div>
            <div className="value-card">
              <div className="vk"><span className="num">03</span><span>// principle</span></div>
              <h4>Tests are documentation</h4>
              <p>XUnit & NUnit. A failing test tells future-me exactly what past-me meant.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const STACK = [
  { name: "Languages & Frameworks", icon: "</>", color: "#4d8eff", tags: ["C#", ".NET Core", "React.js", "JavaScript", "AngularJS"] },
  { name: "Database & ORM", icon: "DB", color: "#3fb950", tags: ["SQL Server", "PostgreSQL", "EF Core", "Dapper", "Stored Procs"] },
  { name: "DevOps & CI/CD", icon: "⚙", color: "#f0a72b", tags: ["Azure DevOps", "Docker", "PowerShell", "IIS", "Git", "GitHub"] },
  { name: "Architecture", icon: "▲", color: "#b392f0", tags: ["Clean Arch", "CQRS", "Repository", "SOLID", "DI"] },
  { name: "Testing", icon: "✓", color: "#56d4dd", tags: ["XUnit", "NUnit", "MSTest", "Integration"] },
  { name: "Auth & Security", icon: "🔐", color: "#ff7b9c", tags: ["JWT", "Refresh tokens", "OTP flows", "SMTP"] },
  { name: "Third-Party APIs", icon: "🔗", color: "#ff6b5b", tags: ["Amazon SP-API", "Shopify GraphQL", "REST/GraphQL"] },
  { name: "Currently learning", icon: "↗", color: "#4d8eff", tags: ["Kubernetes", "Microservices", "Redis", "RabbitMQ"] },
];

function Stack() {
  return (
    <section id="stack">
      <div className="wrap">
        <div className="section-head">
          <span className="commit">commit f9a1d4e</span>
          <span className="arrow">$</span>
          <h2>ls -la stack/</h2>
          <span className="gujarati">// what I work with</span>
        </div>
        <div className="stack-grid">
          {STACK.map((s, i) => (
            <div className="stack-card" key={i}>
              <span className="corner">0{i + 1}.cs</span>
              <div className="head">
                <div className="icon" style={{ background: s.color, color: s.color === "#f0a72b" ? "#1a1a1f" : "white" }}>
                  {s.icon}
                </div>
                <h4>{s.name}</h4>
              </div>
              <div className="tags">
                {s.tags.map(t => <span className="tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// kept for compat — older Sticker usage
function Sticker({ className, style, children }) {
  return <Draggable style={style} className={className}>{children}</Draggable>;
}

Object.assign(window, { Hero, Marquee, About, Stack, Sticker, Draggable, GitCommit, APICard, CPUChip, BuildStatus, SecurityLock, ReactAtom, PerformanceBar });
