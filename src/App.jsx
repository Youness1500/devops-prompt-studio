import { useState, useEffect, useRef } from "react";
import PS1Preview from "./PS1Preview";
import PromptBuilder from "./PromptBuilder";

const CYAN = "#7fdbff";
const GREEN = "#50fa7b";
const YELLOW = "#f1fa8c";
const GRAY = "#6272a4";
const DIM = "#3a3d52";
const BG = "#0d0e14";
const SURFACE = "#13141f";

/* ── Typing effect ── */
function Typewriter({ lines, speed = 38 }) {
  const [displayed, setDisplayed] = useState([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIdx >= lines.length) { setDone(true); return; }
    if (charIdx < lines[lineIdx].length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed(d => [...d, lines[lineIdx]]);
        setLineIdx(l => l + 1);
        setCharIdx(0);
      }, 180);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, lines, speed]);

  const current = lineIdx < lines.length ? lines[lineIdx].slice(0, charIdx) : "";

  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(13px, 2vw, 15px)", lineHeight: 2 }}>
      {displayed.map((l, i) => <TermLine key={i} text={l} />)}
      {!done && <TermLine text={current} cursor />}
    </div>
  );
}

function TermLine({ text, cursor }) {
  const colorize = (t) => {
    if (t.startsWith("#")) return <span style={{ color: GRAY }}>{t}</span>;
    if (t.startsWith("$ ")) return (
      <>
        <span style={{ color: GREEN, fontWeight: "bold" }}>❯ </span>
        <span style={{ color: "#e6edf3" }}>{t.slice(2)}</span>
      </>
    );
    if (t.startsWith("→ ")) return <span style={{ color: CYAN }}>{t}</span>;
    if (t.startsWith("✔ ")) return <span style={{ color: GREEN }}>{t}</span>;
    if (t === "") return <span>&nbsp;</span>;
    return <span style={{ color: "#c8d0e0" }}>{t}</span>;
  };

  return (
    <div style={{ display: "flex", alignItems: "center", minHeight: "1.8em" }}>
      <span>{colorize(text)}</span>
      {cursor && (
        <span style={{
          display: "inline-block", width: 9, height: 16, background: GREEN,
          marginLeft: 2, animation: "blink 1s step-end infinite", verticalAlign: "middle"
        }} />
      )}
    </div>
  );
}

/* ── Badge ── */
function Badge({ label, color = CYAN }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: color + "18", border: `1px solid ${color}44`,
      color: color, borderRadius: 4, padding: "3px 10px",
      fontFamily: "monospace", fontSize: 12, fontWeight: "bold",
      letterSpacing: "0.5px"
    }}>
      {label}
    </span>
  );
}

/* ── Section header ── */
function SectionHeader({ prefix, title }) {
  return (
    <div style={{ marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ color: GREEN, fontFamily: "monospace", fontWeight: "bold", fontSize: 14 }}>{prefix}</span>
      <h2 style={{
        margin: 0, fontSize: "clamp(18px, 3vw, 24px)",
        fontFamily: "'JetBrains Mono', monospace",
        color: "#e6edf3", letterSpacing: "-0.5px"
      }}>{title}</h2>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${DIM}, transparent)` }} />
    </div>
  );
}

/* ── Stat card ── */
function Stat({ value, label }) {
  return (
    <div style={{
      background: SURFACE, border: `1px solid ${DIM}`, borderRadius: 8,
      padding: "16px 24px", textAlign: "center"
    }}>
      <div style={{ fontSize: 28, fontWeight: "bold", color: GREEN, fontFamily: "monospace" }}>{value}</div>
      <div style={{ fontSize: 12, color: GRAY, marginTop: 4, fontFamily: "monospace" }}>{label}</div>
    </div>
  );
}

/* ── Main ── */
export default function App() {
  const [showTool, setShowTool] = useState(false);
  const toolRef = useRef(null);

  const bootLines = [
    "# whoami",
    "$ yo980328",
    "",
    "# cat profile.txt",
    "→ DevOps Engineer  |  Platform Builder  |  Terminal Nerd",
    "→ Automating pipelines, taming Kubernetes, crafting shell prompts.",
    "→ Currently obsessed with: GitOps · Observability · Developer Experience",
    "",
    "✔ System ready.",
  ];

  const techStack = [
    { label: "Kubernetes", color: "#326ce5" },
    { label: "Docker", color: "#2496ed" },
    { label: "GitHub Actions", color: GREEN },
    { label: "Terraform", color: "#7b42bc" },
    { label: "AWS", color: "#ff9900" },
    { label: "Bash / Zsh", color: CYAN },
    { label: "React", color: "#61dafb" },
    { label: "Vite", color: YELLOW },
    { label: "Prometheus", color: "#e6522c" },
    { label: "Helm", color: "#0f1689" },
  ];

  const scrollToTool = () => {
    setShowTool(true);
    setTimeout(() => toolRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#e6edf3", overflowX: "hidden" }}>

      {/* ── Scanline overlay ── */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
      }} />

      {/* ── Grid background ── */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.06,
        backgroundImage: `linear-gradient(${DIM} 1px, transparent 1px), linear-gradient(90deg, ${DIM} 1px, transparent 1px)`,
        backgroundSize: "48px 48px"
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>

        {/* ── NAV ── */}
        <nav style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "24px 0", borderBottom: `1px solid ${DIM}`, marginBottom: 0
        }}>
          <span style={{ fontFamily: "monospace", color: GREEN, fontWeight: "bold", fontSize: 15 }}>
            ~/youness-oujdid
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            {[
              { label: "github", href: "https://github.com/youness-oujdid" },
              { label: "tool", onClick: scrollToTool },
            ].map(({ label, href, onClick }) => (
              <a key={label} href={href} onClick={onClick}
                target={href ? "_blank" : undefined}
                rel={href ? "noopener noreferrer" : undefined}
                style={{
                  color: GRAY, fontFamily: "monospace", fontSize: 13,
                  textDecoration: "none", cursor: "pointer",
                  transition: "color 0.2s"
                }}
                onMouseEnter={e => e.target.style.color = CYAN}
                onMouseLeave={e => e.target.style.color = GRAY}
              >
                ./{label}
              </a>
            ))}
          </div>
        </nav>

        {/* ── HERO ── */}
        <section style={{ padding: "80px 0 60px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: GREEN + "14", border: `1px solid ${GREEN}30`,
            borderRadius: 4, padding: "4px 12px", marginBottom: 28
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: GREEN, display: "inline-block", boxShadow: `0 0 8px ${GREEN}` }} />
            <span style={{ fontFamily: "monospace", fontSize: 12, color: GREEN }}>available for new opportunities</span>
          </div>

          <h1 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(32px, 6vw, 58px)",
            fontWeight: 800, margin: "0 0 8px",
            color: "#e6edf3", letterSpacing: "-1.5px", lineHeight: 1.1
          }}>
            yo980328
          </h1>
          <h1 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(32px, 6vw, 58px)",
            fontWeight: 800, margin: "0 0 32px",
            background: `linear-gradient(135deg, ${CYAN}, ${GREEN})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "-1.5px", lineHeight: 1.1
          }}>
            DevOps Engineer.
          </h1>

          {/* Terminal card */}
          <div style={{
            background: "#0a0b10", border: `1px solid ${DIM}`, borderRadius: 10,
            overflow: "hidden", maxWidth: 560,
            boxShadow: `0 0 40px rgba(80,250,123,0.05), 0 24px 60px rgba(0,0,0,0.5)`
          }}>
            <div style={{
              background: "#13141f", padding: "10px 16px",
              display: "flex", alignItems: "center", gap: 7,
              borderBottom: `1px solid ${DIM}`
            }}>
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5555" }} />
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: YELLOW }} />
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: GREEN }} />
              <span style={{ color: GRAY, fontSize: 11, marginLeft: "auto", fontFamily: "monospace" }}>zsh — youness-oujdid@dev</span>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <Typewriter lines={bootLines} />
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
            <button onClick={scrollToTool} style={{
              background: GREEN, color: "#0d0e14", border: "none",
              borderRadius: 6, padding: "12px 24px", fontWeight: "bold",
              fontFamily: "monospace", fontSize: 14, cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: `0 0 20px ${GREEN}40`
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              $ launch tool ❯
            </button>
            <a href="https://github.com/youness-oujdid" target="_blank" rel="noopener noreferrer"
              style={{
                background: "transparent", color: CYAN,
                border: `1px solid ${DIM}`, borderRadius: 6,
                padding: "12px 24px", fontWeight: "bold",
                fontFamily: "monospace", fontSize: 14, cursor: "pointer",
                textDecoration: "none", transition: "all 0.2s", display: "inline-block"
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = CYAN; e.currentTarget.style.background = CYAN + "10"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = DIM; e.currentTarget.style.background = "transparent"; }}
            >
              ./github ↗
            </a>
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{ padding: "20px 0 60px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14 }}>
            <Stat value="3+" label="years DevOps" />
            <Stat value="10+" label="tools shipped" />
            <Stat value="∞" label="pipelines fixed" />
            <Stat value="k8s" label="daily driver" />
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section style={{ padding: "0 0 60px" }}>
          <SectionHeader prefix="01." title="tech_stack" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {techStack.map(({ label, color }) => <Badge key={label} label={label} color={color} />)}
          </div>
        </section>

        {/* ── PROJECT ── */}
        <section style={{ padding: "0 0 60px" }}>
          <SectionHeader prefix="02." title="featured_project" />
          <div style={{
            background: SURFACE, border: `1px solid ${DIM}`, borderRadius: 10,
            padding: "24px", marginBottom: 24,
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            flexWrap: "wrap", gap: 16
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontFamily: "monospace", color: GREEN, fontSize: 18, fontWeight: "bold" }}>ps1-preview</span>
                <Badge label="live" color={GREEN} />
                <Badge label="open source" color={CYAN} />
              </div>
              <p style={{ margin: "0 0 16px", color: GRAY, fontSize: 14, lineHeight: 1.7, maxWidth: 500 }}>
                Interactive DevOps PS1 prompt builder & previewer. Build and preview production-grade
                Bash/Zsh prompts with Git branch, Kubernetes context, and AWS profile indicators.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Badge label="React" color="#61dafb" />
                <Badge label="Vite" color={YELLOW} />
                <Badge label="GitHub Actions" color={GREEN} />
                <Badge label="GitHub Pages" color={GRAY} />
              </div>
            </div>
            <button onClick={scrollToTool} style={{
              background: "transparent", border: `1px solid ${GREEN}`,
              color: GREEN, borderRadius: 6, padding: "10px 18px",
              fontFamily: "monospace", fontSize: 13, cursor: "pointer",
              fontWeight: "bold", whiteSpace: "nowrap", transition: "all 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.background = GREEN + "15"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >
              launch demo ❯
            </button>
          </div>
        </section>

        {/* ── LIVE TOOL ── */}
        <section ref={toolRef} style={{ padding: "0 0 40px" }}>
          <SectionHeader prefix="03." title="live_demo" />
          <button onClick={() => setShowTool(s => !s)} style={{
            background: "transparent", border: `1px solid ${DIM}`,
            color: GRAY, borderRadius: 6, padding: "8px 16px",
            fontFamily: "monospace", fontSize: 13, cursor: "pointer",
            marginBottom: 20, transition: "all 0.2s"
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = CYAN; e.currentTarget.style.color = CYAN; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = DIM; e.currentTarget.style.color = GRAY; }}
          >
            {showTool ? "▾ collapse tool" : "▸ expand tool"}
          </button>
          {showTool && (
            <div style={{
              border: `1px solid ${DIM}`, borderRadius: 10, overflow: "hidden",
              animation: "fadeIn 0.3s ease"
            }}>
              <PS1Preview />
              <PromptBuilder />
            </div>
          )}
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          borderTop: `1px solid ${DIM}`, padding: "28px 0", marginTop: 20,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12
        }}>
          <span style={{ fontFamily: "monospace", fontSize: 12, color: GRAY }}>
            © 2025 youness-oujdid — built with React + Vite + ☁ GitHub Pages
          </span>
          <a href="https://github.com/youness-oujdid/ps1-preview" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "monospace", fontSize: 12, color: GRAY, textDecoration: "none" }}
            onMouseEnter={e => e.target.style.color = GREEN}
            onMouseLeave={e => e.target.style.color = GRAY}
          >
            view source ↗
          </a>
        </footer>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap');
        * { box-sizing: border-box; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${BG}; }
        ::-webkit-scrollbar-thumb { background: ${DIM}; border-radius: 3px; }
      `}</style>
    </div>
  );
}
