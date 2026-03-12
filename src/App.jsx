import PS1Preview from "./PS1Preview";
import PromptBuilder from "./PromptBuilder";

export default function App() {
  return (
    <div style={{
      background:"#0f1117",
      minHeight:"100vh",
      color:"#e6edf3",
      fontFamily:"system-ui",
      padding:"40px"
    }}>
      
      <h1 style={{textAlign:"center"}}>
        DevOps Prompt Studio
      </h1>

      <p style={{textAlign:"center", opacity:.7}}>
        Build and preview modern Bash/Zsh prompts for DevOps environments
      </p>

      <PS1Preview />

      <PromptBuilder />
    </div>
  );
}
