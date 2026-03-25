# 🖥️ DevOps Prompt Studio

> Build and preview production-grade Bash/Zsh terminal prompts for DevOps environments — live, in the browser.

[![Live Demo](https://img.shields.io/badge/demo-live-50fa7b?style=flat-square&logo=github)](https://youness-oujdid.github.io/devops-prompt-studio/)
[![GitHub Pages](https://img.shields.io/badge/hosted-GitHub%20Pages-57c7ff?style=flat-square&logo=github)](https://youness-oujdid.github.io/devops-prompt-studio/)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-f1fa8c?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/license-MIT-ff79c6?style=flat-square)](./LICENSE)

---

## ✨ Features

- **Live PS1 Preview** — See exactly how your prompt looks in a real terminal, with scenario switching (Normal Work, CI/CD Pipeline, Incident Response)
- **Interactive Prompt Builder** — Toggle Git branch, Kubernetes context, and AWS profile indicators on/off
- **Multi-theme Support** — Choose between Dracula, Nord, and Solarized color schemes
- **One-click Copy** — Instantly copy the generated `PS1` string to your clipboard
- **Bash Helpers** — Ready-to-use shell functions for `git_branch()`, `kube_context()`, and `aws_profile()`
- **Realistic Scenarios** — Simulates real DevOps workflows including error exit codes, dirty git states, and multi-context environments

---

## 📸 Preview

| Terminal Preview | Prompt Builder |
|---|---|
| Live terminal with Git, k8s & AWS indicators | Toggle features and copy the PS1 string |

---

## 🚀 Live Demo

👉 **[youness-oujdid.github.io/devops-prompt-studio](https://youness-oujdid.github.io/devops-prompt-studio/)**

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI components & state management |
| Vite 5 | Build tool & dev server |
| GitHub Actions | CI/CD pipeline |
| GitHub Pages | Static site hosting |

---

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/youness-oujdid/devops-prompt-studio.git
cd devops-prompt-studio

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder.

---

## 🎨 Prompt Color Reference

| Color | Meaning |
|---|---|
| 🟢 Green | Username |
| 🔵 Cyan | Hostname |
| 🔷 Blue | Working directory |
| 🟡 Yellow | Dirty git branch (uncommitted changes) |
| 🟣 Magenta | Kubernetes context |
| 🟠 Orange | AWS profile |
| 🔴 Red | Non-zero exit code |

---

## 📋 Usage

### Using the Generated PS1

After building your prompt in the **Prompt Builder**, click **Copy PS1** and paste it into your `~/.bashrc` or `~/.zshrc`:

```bash
# Add to ~/.bashrc
git_branch() {
  git branch 2>/dev/null | grep '*' | sed 's/* //'
}

kube_context() {
  kubectl config current-context 2>/dev/null
}

aws_profile() {
  echo $AWS_PROFILE
}

# Paste your generated PS1 here
PS1='...'
```

Then reload your shell:

```bash
source ~/.bashrc
```

---

## 🔄 CI/CD

This project uses **GitHub Actions** to automatically build and deploy to GitHub Pages on every push to `main`.

```
push to main → build → deploy to GitHub Pages
```

Workflow file: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feat/my-feature`)
3. Commit your changes (`git commit -m 'feat: add my feature'`)
4. Push to the branch (`git push origin feat/my-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**Youness Oujdid**

- GitHub: [@youness-oujdid](https://github.com/youness-oujdid)

---

<p align="center">Made with ❤️ for the DevOps community</p>
