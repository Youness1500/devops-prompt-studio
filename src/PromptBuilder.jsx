import { useState } from "react";

export default function PromptBuilder() {

  const [git, setGit] = useState(true);
  const [kube, setKube] = useState(true);
  const [aws, setAws] = useState(false);
  const [theme, setTheme] = useState("dracula");

  const themes = {
    dracula: {
      user: "#50fa7b",
      host: "#8be9fd",
      path: "#57c7ff"
    },
    nord: {
      user: "#a3be8c",
      host: "#88c0d0",
      path: "#81a1c1"
    },
    solarized: {
      user: "#859900",
      host: "#268bd2",
      path: "#b58900"
    }
  };

  const generatePS1 = () => {
    let ps1 = "\\[\\e[32m\\]\\u\\[\\e[0m\\]";
    ps1 += "@";
    ps1 += "\\[\\e[36m\\]\\h\\[\\e[0m\\] ";
    ps1 += "\\[\\e[34m\\]\\w\\[\\e[0m\\] ";

    if (git) ps1 += "\\[\\e[33m\\]$(git_branch)\\[\\e[0m\\] ";
    if (kube) ps1 += "\\[\\e[35m\\]$(kube_context)\\[\\e[0m\\] ";
    if (aws) ps1 += "\\[\\e[38;5;208m\\]$(aws_profile)\\[\\e[0m\\] ";

    ps1 += "❯ ";

    return `PS1='${ps1}'`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatePS1());
    alert("PS1 copied to clipboard!");
  };

  return (
    <div style={{
      marginTop: "40px",
      background: "#1e1f29",
      padding: "24px",
      borderRadius: "10px",
      maxWidth: "700px",
      marginLeft: "auto",
      marginRight: "auto"
    }}>

      <h2 style={{marginBottom:"20px"}}>Prompt Builder</h2>

      {/* Theme selector */}
      <div style={{marginBottom:"20px"}}>
        <label style={{marginRight:"10px"}}>Theme:</label>
        <select
          value={theme}
          onChange={(e)=>setTheme(e.target.value)}
        >
          <option value="dracula">Dracula</option>
          <option value="nord">Nord</option>
          <option value="solarized">Solarized</option>
        </select>
      </div>

      {/* Feature toggles */}

      <div style={{display:"flex",gap:"20px",marginBottom:"20px"}}>

        <label>
          <input
            type="checkbox"
            checked={git}
            onChange={()=>setGit(!git)}
          />
          Git Branch
        </label>

        <label>
          <input
            type="checkbox"
            checked={kube}
            onChange={()=>setKube(!kube)}
          />
          Kubernetes Context
        </label>

        <label>
          <input
            type="checkbox"
            checked={aws}
            onChange={()=>setAws(!aws)}
          />
          AWS Profile
        </label>

      </div>

      {/* Generated PS1 */}

      <div style={{
        background:"#111",
        padding:"16px",
        borderRadius:"8px",
        fontFamily:"monospace",
        fontSize:"14px",
        marginBottom:"15px"
      }}>
        {generatePS1()}
      </div>

      {/* Copy button */}

      <button
        onClick={copyToClipboard}
        style={{
          padding:"10px 18px",
          background:"#50fa7b",
          border:"none",
          borderRadius:"6px",
          fontWeight:"bold",
          cursor:"pointer"
        }}
      >
        Copy PS1
      </button>

      {/* Bash helpers */}

      <div style={{
        marginTop:"25px",
        background:"#111",
        padding:"16px",
        borderRadius:"8px",
        fontFamily:"monospace",
        fontSize:"13px"
      }}>
        <strong>Add these helpers to your .bashrc:</strong>

        <pre style={{marginTop:"10px"}}>{`
git_branch() {
 git branch 2>/dev/null | grep '*' | sed 's/* //'
}

kube_context() {
 kubectl config current-context 2>/dev/null
}

aws_profile() {
 echo $AWS_PROFILE
}
        `}</pre>
      </div>

    </div>
  );
}
