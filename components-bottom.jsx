/* Projects (VS Code), Experience timeline, Live terminal, Contact, Footer */

const PROJECTS = [
  {
    id: "bolt-spec",
    initials: "BS",
    cap: "Bolt-Spec ⚡",
    photoCls: "bolt",
    label: "API · 2024",
    title: "Bolt-Spec",
    role: "Full-stack API platform",
    chips: [".NET Core", "JWT + Refresh", "SMTP", "Dapper"],
    bullets: [
      "JWT auth + refresh tokens, OTP-encrypted file flow",
      "SMTP notification service with templates",
      "Leave Management with automated task reassignment",
      "Dapper + stored procs cut data-access latency",
    ],
  },
  {
    id: "cart-sync",
    initials: "CS",
    cap: "Cart Sync 🛒",
    photoCls: "sync",
    label: "API · 2024",
    title: "Cart Sync Platform",
    role: "Multi-platform product sync",
    chips: ["Amazon SP-API", "Shopify GraphQL", "React.js", ".NET Core"],
    bullets: [
      "Real-time product sync across custom cart, Amazon, Shopify",
      "Amazon SP-API for inventory & order management",
      "Shopify GraphQL for product & order synchronization",
      "Automatic sync on product add/update across all platforms",
    ],
  },
  {
    id: "careplus",
    initials: "C+",
    cap: "CarePlus 🩺",
    photoCls: "care",
    label: "WEB · 2023",
    title: "CarePlus",
    role: "Kanban + healthcare ops",
    chips: ["AngularJS", "Drag & Drop", "XUnit", "REST"],
    bullets: [
      "AngularJS Kanban with drag-and-drop transitions",
      "State-machine guards for status changes",
      "XUnit suites covering edge cases & business rules",
    ],
  },
  {
    id: "upvoit",
    initials: "UV",
    cap: "Upvoit 💸",
    photoCls: "upvoit",
    label: "DB · 2024",
    title: "Upvoit",
    role: "Subscription billing schema",
    chips: ["PostgreSQL", "EF Core", "XUnit", "REST APIs"],
    bullets: [
      "Subscription schema: plans, addons, proration, renewals",
      "Management APIs with conventions enforced via XUnit",
      "Clean separation between billing & catalog domains",
    ],
  },
  {
    id: "compliance",
    initials: "₹X",
    cap: "NSE/BSE Compliance 📈",
    photoCls: "compliance",
    label: "FIN · 2022",
    title: "Regulatory Automation",
    role: "Financial market reports",
    chips: ["Excel ↔ XML", ".NET", "Validation"],
    bullets: [
      "Excel validation + XML generation for NSE/BSE",
      "Automated multiple manual report types",
      "Eliminated hours of repetitive submission work",
    ],
  },
];

function Polaroid({ p, flipped, onClick }) {
  return (
    <div className={"polaroid" + (flipped ? " flipped" : "")} onClick={onClick}>
      <div className={"photo " + p.photoCls}>
        <div className="corner-tl">{p.label}</div>
        <div className="badge">tap to flip</div>
        <div className="big">{p.title}</div>
        <div className="corner-br">{p.role.toUpperCase()}</div>
      </div>
      <div className="cap">{p.cap}</div>
      <div className="meta">
        {p.chips.map(c => <span key={c}>{c}</span>)}
      </div>
      <div className="back">
        <h5>{p.title} — notes</h5>
        <ul>
          {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
        <div style={{ marginTop: 12, fontSize: 11, color: "var(--ink-soft)" }}>
          // tap again to flip back
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [flipped, setFlipped] = React.useState({});
  return (
    <section id="projects">
      <div className="wrap">
        <div className="section-head">
          <span className="commit">commit 7c2bf91</span>
          <span className="arrow">$</span>
          <h2>open projects/</h2>
          <span className="gujarati">// pinned to the corkboard</span>
        </div>

        <div className="bulletin">
          <div className="bulletin-corner-pin tl"></div>
          <div className="bulletin-corner-pin tr"></div>
          <div className="bulletin-corner-pin bl"></div>
          <div className="bulletin-corner-pin br"></div>
          <div className="polaroid-grid">
            {PROJECTS.map((p, i) => (
              <Polaroid
                key={p.id}
                p={p}
                flipped={!!flipped[p.id]}
                onClick={() => setFlipped({ ...flipped, [p.id]: !flipped[p.id] })}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const JOBS = [
  {
    when: "May 2025 — Present",
    role: "Sr. Software Engineer",
    where: "Tech Ahir Pvt Ltd · Gandhinagar",
    sha: "a4f3c2b",
    now: true,
    bullets: [
      "Build dynamic frontend/backend interfaces using React.js and integrated with .NET Core REST APIs across client projects.",
      "Automate IIS deployments via PowerShell — single-click publishing with HTTPS binding & parallel project deploys (~90% manual time saved).",
      "Design and run Azure DevOps CI/CD pipelines with Docker containerization, image builds, env config, and multi-stage releases.",
      "Enforce CQRS, dependency injection, and structured Git branching strategies for maintainability.",
    ],
  },
  {
    when: "June 2023 — Apr 2025",
    role: "Junior Software Engineer",
    where: "Codzgarage Infotech Pvt Ltd · Ahmedabad",
    sha: "7c2bf91",
    bullets: [
      "Designed and maintained RESTful APIs in .NET Core using SOLID, Factory pattern, and DI for testable codebases.",
      "Shipped Bolt-Spec features: JWT auth + refresh tokens, SMTP notification service, Leave Management with automated task reassignment.",
      "Integrated Amazon SP-API and Shopify GraphQL/REST for real-time product sync across multiple e-commerce platforms.",
      "Built OTP-encrypted file attachment flow; optimized data-access latency with Dapper + stored procedures.",
    ],
  },
  {
    when: "June 2022 — May 2023",
    role: "Junior Software Engineer",
    where: "Microvista Technology Pvt Ltd · Ahmedabad",
    sha: "f9a1d4e",
    bullets: [
      "Developed NSE/BSE regulatory compliance modules — Excel validation + XML generation for financial submissions.",
      "Eliminated manual reporting effort across multiple report types.",
    ],
  },
  {
    when: "Nov 2021",
    role: "Bachelor of Computer Applications",
    where: "Kadi University, Gandhinagar · 7.03 CPI",
    sha: "init",
    bullets: ["First commit. Fell in love with C# and never looked back."],
  },
];

function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <div className="section-head">
          <span className="commit">commit b8e22d0</span>
          <span className="arrow">$</span>
          <h2>git log --all</h2>
          <span className="gujarati">// experience timeline</span>
        </div>
        <div className="timeline" style={{ marginLeft: 130 }}>
          {JOBS.map((j, i) => (
            <div className={"timeline-item" + (j.now ? " now" : "")} key={i}>
              <span className="git-log">{j.sha}</span>
              <div className="when">{j.when}</div>
              <h4>{j.role}</h4>
              <div className="where">@ {j.where}</div>
              <ul>
                {j.bullets.map((b, k) => <li key={k}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Live Terminal ---------- */
const HELP = [
  "Available commands:",
  "  about        — quick intro",
  "  skills       — tech stack",
  "  projects     — featured projects",
  "  experience   — work history",
  "  contact      — how to reach me",
  "  resume       — download resume",
  "  social       — github / linkedin / email",
  "  whoami       — quick fact",
  "  date         — current time",
  "  cowsay <msg> — make a cow say something",
  "  sudo         — try it 😏",
  "  matrix       — engage hacker mode",
  "  clear        — clear screen",
  "  help         — this menu",
];

const COMMANDS = {
  about: () => [
    "Mihir Vala · Gandhinagar, Gujarat",
    "Full Stack Engineer @ Tech Ahir Pvt Ltd",
    "4 years building scalable .NET Core APIs & React.js frontends.",
    "Likes: clean code, CI/CD, API integrations (Amazon, Shopify).",
    "Dislikes: 100-line if-else chains.",
  ],
  skills: () => [
    "C#, .NET Core, React.js, JavaScript, AngularJS",
    "SQL Server, PostgreSQL, EF Core, Dapper",
    "Azure DevOps, Docker, PowerShell, IIS",
    "Amazon SP-API, Shopify GraphQL/REST",
    "Clean Architecture, CQRS, SOLID, DI",
    "XUnit, NUnit, MSTest",
  ],
  projects: () => [
    "[1] Bolt-Spec     — JWT auth, SMTP, encrypted files",
    "[2] Cart Sync     — Amazon SP-API + Shopify GraphQL sync",
    "[3] CarePlus      — AngularJS kanban + XUnit",
    "[4] Upvoit        — Subscription schema + APIs",
    "[5] NSE/BSE comp. — Excel→XML automation",
    "→ Scroll up to the projects section for details.",
  ],
  experience: () => [
    "May 2025 — Now    Sr. Software Engineer · Tech Ahir",
    "June 2023 — Apr 2025  Jr. Software Engineer · Codzgarage",
    "June 2022 — May 2023   Jr. Software Engineer · Microvista",
    "Nov 2021          BCA · Kadi University · 7.03 CPI",
  ],
  contact: () => [
    "email     mihirvala86@gmail.com",
    "phone     +91 90334 88140",
    "github    github.com/MihirVala",
    "linkedin  linkedin.com/in/mihir-vala-6b8b6a20a",
    "location  Gandhinagar, Gujarat 🇮🇳",
  ],
  resume: () => {
    setTimeout(() => {
      const a = document.createElement("a");
      a.href = "assets/Mihir-Resume.pdf";
      a.download = "Mihir-Resume.pdf";
      a.click();
    }, 300);
    return ["📄 Downloading Mihir-Resume.pdf ...", "Done. ✓"];
  },
  social: () => [
    "github   → https://github.com/MihirVala",
    "linkedin → https://www.linkedin.com/in/mihir-vala-6b8b6a20a",
    "email    → mihirvala86@gmail.com",
  ],
  whoami: () => ["mihir · backend + frontend engineer · ships React + .NET"],
  date: () => [new Date().toString()],
  help: () => HELP,
  sudo: () => ["mihir is not in the sudoers file. This incident will be reported. 👀"],
  matrix: (out, setMatrix) => { setMatrix(true); setTimeout(() => setMatrix(false), 4000); return ["Engaging hacker mode for 4 seconds..."]; },
  cowsay: (arg) => {
    const msg = arg || "moo";
    const top = " " + "_".repeat(msg.length + 2);
    const bot = " " + "-".repeat(msg.length + 2);
    return [
      top,
      "< " + msg + " >",
      bot,
      "        \\   ^__^",
      "         \\  (oo)\\_______",
      "            (__)\\       )\\/\\",
      "                ||----w |",
      "                ||     ||",
    ];
  },
  ls: () => ["about.md  skills.json  projects/  experience.log  contact.json  resume.pdf"],
  pwd: () => ["/home/mihir/portfolio"],
  exit: () => ["Nice try. There's no escape from this terminal. 😎"],
  rm: () => ["rm: refusing to delete things. Try `clear` instead."],
  hello: () => ["નમસ્તે! Hello! 👋"],
  hi: () => ["નમસ્તે! Hello! 👋"],
};

function LiveTerminal() {
  const [history, setHistory] = React.useState([
    { type: "out", text: "mihir-shell v3.1.4 (built 2026)" },
    { type: "out", text: "Type 'help' for commands, or click a chip below." },
    { type: "out", text: "" },
  ]);
  const [input, setInput] = React.useState("");
  const [hist, setHist] = React.useState([]);
  const [histIdx, setHistIdx] = React.useState(-1);
  const [matrix, setMatrix] = React.useState(false);
  const inputRef = React.useRef(null);
  const bodyRef = React.useRef(null);

  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  const run = (raw) => {
    const cmd = (raw || "").trim();
    if (!cmd) return;
    const newHist = [...history, { type: "cmd", text: cmd }];
    if (cmd === "clear") {
      setHistory([{ type: "out", text: "" }]);
      setHist([cmd, ...hist]);
      setInput("");
      return;
    }
    const [base, ...rest] = cmd.split(/\s+/);
    const fn = COMMANDS[base.toLowerCase()];
    let lines;
    if (fn) {
      lines = fn(rest.join(" "), setMatrix);
    } else {
      lines = [`zsh: command not found: ${base}`, `try 'help' for a list.`];
    }
    setHistory([...newHist, ...lines.map(l => ({ type: "out", text: l }))]);
    setHist([cmd, ...hist]);
    setHistIdx(-1);
    setInput("");
  };

  const onKey = (e) => {
    if (e.key === "Enter") run(input);
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, hist.length - 1);
      setHistIdx(next);
      if (hist[next] !== undefined) setInput(hist[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : hist[next]);
    }
  };

  const focus = () => inputRef.current?.focus();

  return (
    <div className="live-term" onClick={focus}>
      <div className="window-bar">
        <div className="lights"><span className="light"></span><span className="light y"></span><span className="light g"></span></div>
        <div className="title">mihir-shell — interactive · type `help`</div>
        <div style={{ width: 36 }}></div>
      </div>
      <div className="live-term-body" ref={bodyRef} style={matrix ? { background: "#000", color: "#3fb950", filter: "hue-rotate(0deg)" } : {}}>
        {history.map((h, i) => (
          h.type === "cmd" ? (
            <div className="prompt-line" key={i}>
              <span className="prompt"><span>mihir</span><span className="at">@</span><span>shell</span> <span className="path">~</span> <span className="arrow">$</span></span>
              <span className="cmd">{h.text}</span>
            </div>
          ) : (
            <div className="out" key={i} style={{ whiteSpace: "pre" }}>{h.text}</div>
          )
        ))}
        <div className="prompt-line">
          <span className="prompt"><span>mihir</span><span className="at">@</span><span>shell</span> <span className="path">~</span> <span className="arrow">$</span></span>
          <div className="live-term-input" style={{ flex: 1 }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              autoFocus
              spellCheck="false"
              autoComplete="off"
              placeholder="type a command…"
            />
          </div>
        </div>
      </div>
      <div className="helper">
        {["help", "about", "skills", "projects", "contact", "resume", "matrix", "cowsay hi", "sudo", "clear"].map(c => (
          <button key={c} onClick={() => run(c)}>{c}</button>
        ))}
      </div>
    </div>
  );
}

function TerminalSection() {
  return (
    <section id="terminal">
      <div className="wrap">
        <div className="section-head">
          <span className="commit">commit e1f4a8c</span>
          <span className="arrow">$</span>
          <h2>./play.sh</h2>
          <span className="gujarati">// poke around</span>
        </div>
        <div style={{ position: "relative" }}>
          <Sticker className="note pink" style={{ top: -30, right: -10, transform: "rotate(6deg)", zIndex: 6 }}>
            try <b style={{ color: "#4d8eff" }}>cowsay hi</b><br />or <b style={{ color: "#4d8eff" }}>matrix</b> 🟢
          </Sticker>
          <LiveTerminal />
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="section-head">
          <span className="commit">commit ff00aa1</span>
          <span className="arrow">$</span>
          <h2>./connect.sh</h2>
          <span className="gujarati">// say hello</span>
        </div>
        <div className="contact-grid">
          <div>
            <h3 className="contact-big">
              Got a project,<br />
              a coffee idea,<br />
              or a <span className="blink">CI/CD nightmare</span>?<br />
              Let's talk.
            </h3>
            <div style={{ fontFamily: "var(--font-mono)", color: "var(--ink-soft)", fontSize: 13, marginTop: 30 }}>
              <div>// status: ☕ caffeinated · 🟢 open to work</div>
              <div>// timezone: Gandhinagar, IN · GMT+5:30</div>
              <div>// usually replies within 24h</div>
            </div>
          </div>
          <div className="contact-links">
            <a className="contact-link" href="mailto:mihirvala86@gmail.com">
              <span className="glyph">EMAIL</span>
              <div className="what"><b>mihirvala86@gmail.com</b><span>best for project chats</span></div>
              <span className="arr">→</span>
            </a>
            <a className="contact-link" href="https://github.com/MihirVala" target="_blank" rel="noreferrer">
              <span className="glyph">GIT</span>
              <div className="what"><b>github.com/MihirVala</b><span>code I'm not afraid to share</span></div>
              <span className="arr">→</span>
            </a>
            <a className="contact-link" href="https://www.linkedin.com/in/mihir-vala-6b8b6a20a" target="_blank" rel="noreferrer">
              <span className="glyph">IN</span>
              <div className="what"><b>linkedin.com/in/mihir-vala</b><span>polite-mode networking</span></div>
              <span className="arr">→</span>
            </a>
            <a className="contact-link" href="tel:+919033488140">
              <span className="glyph">TEL</span>
              <div className="what"><b>+91 90334 88140</b><span>only for emergencies & friends</span></div>
              <span className="arr">→</span>
            </a>
            <a className="contact-link" href="assets/Mihir-Vala-Resume.pdf" download>
              <span className="glyph">PDF</span>
              <div className="what"><b>Resume.pdf</b><span>the formal version</span></div>
              <span className="arr">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const ASCII = `
   __  __   ___   _   _   ___   ____    __     __    _      _        _     
  |  \\/  | |_ _| | | | | |_ _| |  _ \\   \\ \\   / /   / \\    | |      / \\    
  | |\\/| |  | |  | |_| |  | |  | |_) |   \\ \\ / /   / _ \\   | |     / _ \\   
  | |  | |  | |  |  _  |  | |  |  _ <     \\ V /   / ___ \\  | |    / ___ \\  
  |_|  |_| |___| |_| |_| |___| |_| \\_\\     \\_/   /_/   \\_\\ |___| /_/   \\_\\ 
`;

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <pre className="ascii">{ASCII}</pre>
        <div className="foot-grid">
          <div>
            <div>// <b>built with</b> coffee, .NET docs, and questionable music</div>
            <div>// <b>shipped on</b> a custom HTML scrapbook</div>
            <div>// <b>last commit</b> {new Date().toISOString().slice(0, 10)}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <small>© {new Date().getFullYear()} Mihir Vala · Gandhinagar, IN 🇮🇳</small><br />
            <small>press <kbd style={{ background: "#222", padding: "1px 5px", borderRadius: 3, border: "1px solid #444" }}>?</kbd> for shortcuts · konami code for surprise</small>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Projects, Experience, TerminalSection, Contact, Footer });
