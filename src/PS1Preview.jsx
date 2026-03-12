import { useState } from "react";

const ANSI = {
  green: "#50fa7b",
  cyan: "#8be9fd",
  blue: "#57c7ff",
  yellow: "#f1fa8c",
  magenta: "#ff79c6",
  orange: "#ffb86c",
  gray: "#6272a4",
  red: "#ff5555",
  white: "#f8f8f2",
  bg: "#1e1f29",
  bgLine: "#282a36",
};

const TerminalLine = ({ user, host, path, branch, dirty, kube, aws, exitCode, time, command, output }) => {
  return (
    <div style={{ marginBottom: "18px", fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: "13px", lineHeight: "1.7" }}>
      {/* Line 1 */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
        <span style={{ color: ANSI.green, fontWeight: "bold" }}>{user}</span>
        <span style={{ color: ANSI.gray }}>@</span>
        <span style={{ color: ANSI.cyan, fontWeight: "bold" }}>{host}</span>
        <span style={{ color: ANSI.gray }}>in</span>
        <span style={{ color: ANSI.blue, fontWeight: "bold" }}>{path}</span>
        {branch && (
          <>
            <span style={{ color: ANSI.gray }}>on</span>
            <span style={{ color: dirty ? ANSI.yellow : ANSI.green, fontWeight: "bold" }}>
               {branch} {dirty ? "✗" : "✔"}
            </span>
          </>
        )}
        {kube && (
          <span style={{ color: ANSI.magenta, fontWeight: "bold", background: "#3d1f4e", padding: "1px 7px", borderRadius: "4px" }}>
            ⎈ {kube}
          </span>
        )}
        {aws && (
          <span style={{ color: ANSI.orange, fontWeight: "bold", background: "#3d2a0a", padding: "1px 7px", borderRadius: "4px" }}>
            ☁ {aws}
          </span>
        )}
      </div>
      {/* Line 2 */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ color: ANSI.gray }}>{time}</span>
        {exitCode === 0
          ? <span style={{ color: ANSI.green, fontWeight: "bold", fontSize: "15px" }}>❯</span>
          : <span style={{ color: ANSI.red, fontWeight: "bold" }}>✘[{exitCode}]</span>}
        <span style={{ color: ANSI.white }}>{command}</span>
      </div>
      {output && (
        <div style={{ color: ANSI.gray, paddingLeft: "24px", marginTop: "2px", fontSize: "12px" }}>
          {output}
        </div>
      )}
    </div>
  );
};

export default function PS1Preview() {
  const [scenario, setScenario] = useState(0);

  const scenarios = [
    {
      label: "Normal Work",
      lines: [
        { user: "ahmed", host: "prod-server", path: "~/projects/api", branch: "main", dirty: false, kube: null, aws: null, exitCode: 0, time: "09:15:42", command: "git status", output: "nothing to commit, working tree clean" },
        { user: "ahmed", host: "prod-server", path: "~/projects/api", branch: "feat/deploy", dirty: true, kube: "prod-cluster:backend", aws: "production", exitCode: 0, time: "09:16:03", command: "kubectl get pods", output: "api-pod-7d9f   1/1   Running   0   2d" },
        { user: "ahmed", host: "prod-server", path: "~/projects/api", branch: "feat/deploy", dirty: true, kube: "prod-cluster:backend", aws: "production", exitCode: 127, time: "09:16:31", command: "deploi status", output: "bash: deploi: command not found" },
      ]
    },
    {
      label: "CI/CD Pipeline",
      lines: [
        { user: "ci-bot", host: "runner-01", path: "~/workspace/myapp", branch: "release/v2.4", dirty: false, kube: "staging:default", aws: "staging", exitCode: 0, time: "14:00:01", command: "docker build -t myapp:v2.4 .", output: "Successfully built a1b2c3d4" },
        { user: "ci-bot", host: "runner-01", path: "~/workspace/myapp", branch: "release/v2.4", dirty: false, kube: "staging:default", aws: "staging", exitCode: 0, time: "14:03:18", command: "helm upgrade myapp ./charts", output: "Release 'myapp' has been upgraded. Happy Helming!" },
      ]
    },
    {
      label: "Incident Response",
      lines: [
        { user: "ops", host: "bastion-01", path: "/var/log", branch: null, kube: "prod-cluster:monitoring", aws: "production", exitCode: 0, time: "02:41:05", command: "tail -f app.log | grep ERROR", output: "[ERROR] DB connection timeout after 30s" },
        { user: "ops", host: "bastion-01", path: "/var/log", branch: null, kube: "prod-cluster:monitoring", aws: "production", exitCode: 1, time: "02:42:11", command: "systemctl restart postgres", output: "Failed to restart postgres.service: Permission denied" },
        { user: "ops", host: "bastion-01", path: "/var/log", branch: null, kube: "prod-cluster:monitoring", aws: "production", exitCode: 0, time: "02:42:19", command: "sudo systemctl restart postgres", output: "● postgres.service: active (running)" },
      ]
    }
  ];

  const current = scenarios[scenario];

  return (
    <div style={{ minHeight: "100vh", background: "#13141f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 16px", fontFamily: "sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <div style={{ color: ANSI.cyan, fontFamily: "monospace", fontSize: "22px", fontWeight: "bold", letterSpacing: "2px" }}>
          $ DevOps PS1 Preview
        </div>
        <div style={{ color: ANSI.gray, fontSize: "13px", marginTop: "6px" }}>Interactive terminal prompt showcase</div>
      </div>

      {/* Scenario Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {scenarios.map((s, i) => (
          <button key={i} onClick={() => setScenario(i)} style={{
            background: scenario === i ? ANSI.cyan : "#282a36",
            color: scenario === i ? "#13141f" : ANSI.gray,
            border: "none", borderRadius: "6px", padding: "6px 14px",
            cursor: "pointer", fontWeight: "bold", fontSize: "12px",
            transition: "all 0.2s"
          }}>{s.label}</button>
        ))}
      </div>

      {/* Terminal */}
      <div style={{ width: "100%", maxWidth: "780px", background: ANSI.bg, borderRadius: "10px", boxShadow: "0 8px 40px rgba(0,0,0,0.6)", overflow: "hidden" }}>
        {/* Title bar */}
        <div style={{ background: "#21222c", padding: "10px 16px", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid #383a4a" }}>
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5555", display: "inline-block" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#f1fa8c", display: "inline-block" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#50fa7b", display: "inline-block" }} />
          <span style={{ color: ANSI.gray, fontSize: "12px", marginLeft: "auto", fontFamily: "monospace" }}>bash — 80×24</span>
        </div>
        {/* Content */}
        <div style={{ padding: "20px 24px" }}>
          {current.lines.map((line, i) => <TerminalLine key={i} {...line} />)}
          {/* blinking cursor */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: ANSI.gray, fontFamily: "monospace", fontSize: "13px" }}>
              {current.lines[current.lines.length - 1].time.split(":").map((p, i, a) => {
                const t = new Date();
                return i === 2 ? String(t.getSeconds()).padStart(2, "0") : p;
              }).join(":")}
            </span>
            <span style={{ color: ANSI.green, fontWeight: "bold", fontSize: "15px" }}>❯</span>
            <span style={{
              display: "inline-block", width: "8px", height: "16px",
              background: ANSI.white, animation: "blink 1s step-end infinite",
              verticalAlign: "middle"
            }} />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" }}>
        {[
          { color: ANSI.green, label: "user" },
          { color: ANSI.cyan, label: "hostname" },
          { color: ANSI.blue, label: "path" },
          { color: ANSI.yellow, label: "dirty git" },
          { color: ANSI.magenta, label: "k8s context" },
          { color: ANSI.orange, label: "aws profile" },
          { color: ANSI.red, label: "exit error" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, display: "inline-block" }} />
            <span style={{ color: ANSI.gray, fontSize: "12px", fontFamily: "monospace" }}>{label}</span>
          </div>
        ))}
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}
