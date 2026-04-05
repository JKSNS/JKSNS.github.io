# JSOS Portfolio — Handoff Guide

This is an OS-style portfolio built with Next.js. If you want to fork it and make it your own, here's what to change.

---

## Quick Start

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`.

---

## What to Personalize

### 1. Your Identity

| File | What to change |
|------|---------------|
| `src/features/os/desktop/AboutSystemModal.tsx` | Name, version, kernel name |
| `src/features/apps/about/ProfileSidebar.tsx` | Name, title, avatar image, social links |
| `src/features/apps/about/TabContent.tsx` | Overview text, experience entries, projects |
| `src/features/apps/terminal/use-terminal-state.ts` | `about` command output, VFS file contents |
| `src/features/apps/terminal/TerminalApp.tsx` | Welcome banner version string |
| `src/lib/seo/metadata.ts` | Site title, description, OpenGraph tags |
| `src/lib/seo/entity.ts` | Structured data (name, job title, URLs) |
| `app/layout.tsx` | Favicon paths, metadata |

### 2. Desktop Folders & Files

| File | What to change |
|------|---------------|
| `src/features/os/filesystem/files.ts` | Desktop folder contents (what appears in Projects/Competitions folders) |
| `src/features/os/filesystem/index.ts` | Folder IDs and registry |
| `src/features/apps/terminal/use-terminal-state.ts` | The `VFS` object — terminal filesystem tree and file contents |
| `public/readmes/*.md` | Markdown files opened when clicking desktop folder items |

### 3. Dock & Apps

| File | What to change |
|------|---------------|
| `src/features/os/desktop/dock/dock-config.tsx` | Which apps appear in the dock, icons, order |
| `src/features/os/store/types.ts` | `AppID` enum — add/remove app identifiers |
| `src/features/os/window/app-registry.tsx` | Maps AppIDs to React components |
| `src/features/apps/yield/YieldApp.tsx` | URL of your embedded project (iframe) |
| `src/features/apps/debate/DebateApp.tsx` | URL of your embedded project (iframe) |
| `src/features/apps/passfx/PassFXApp.tsx` | URL of your embedded project (iframe) |

### 4. Wallpapers

| File | What to change |
|------|---------------|
| `public/assets/wallpapers/` | Drop in your own .jpg files |
| `src/features/os/desktop/wallpapers.ts` | Register them with names and dominant colors |
| `src/features/os/store/system-store.ts` | Default wallpaper path |

### 5. System Manual (FAQ)

| File | What to change |
|------|---------------|
| `public/system-manual/about.md` | About section content |
| `public/system-manual/projects-tech.md` | Technology Q&A |
| `public/system-manual/using-this-portfolio.md` | Usage guide Q&A |
| `public/system-manual/terms.md` | Terms of use |
| `public/system-manual/privacy.md` | Privacy policy |

### 6. Terminal Commands

All commands live in `src/features/apps/terminal/use-terminal-state.ts` in the `COMMAND_REGISTRY` object. Add, remove, or modify any command there.

Games are separate components:
- `src/features/apps/terminal/SnakeGame.tsx`
- `src/features/apps/terminal/TetrisGame.tsx`
- `src/features/apps/terminal/Game2048.tsx`

### 7. Favicon

Replace `public/favicon.ico` with your own. Also update `public/assets/web_assets/favicon-96x96.png` and the references in `app/layout.tsx`.

### 8. Boot Animation

| File | What to change |
|------|---------------|
| `src/features/os/boot/constants.ts` | Boot duration, logo |
| `src/features/os/boot/BootScreen.tsx` | Boot screen appearance |
| `src/features/os/boot/WelcomeOverlay.tsx` | Post-boot welcome screen |

---

## Architecture at a Glance

```
src/
  features/
    apps/           # Each app is a self-contained folder
      about/        # About Me app (profile sidebar + tabs)
      terminal/     # Terminal emulator with VFS, games, easter eggs
      settings/     # System preferences (wallpaper, dock, terminal color)
      folder/       # Finder-style folder viewer
      system-manual/ # System manual / FAQ viewer
      markdown/     # Markdown file viewer
      contact/      # Contact form
      yield/        # Iframe embed app (project 1)
      debate/       # Iframe embed app (project 2)
      passfx/       # Iframe embed app (project 3)
    os/
      boot/         # Boot animation sequence
      desktop/      # Desktop, dock, system bar, wallpaper, icons
      window/       # Window management (drag, resize, minimize, fullscreen)
      store/        # Zustand stores (system state, notifications)
      filesystem/   # Virtual filesystem for desktop folders
      notification/ # macOS-style notification pills
  lib/
    seo/            # Metadata, structured data, URL routing
    analytics.ts    # Event tracking
```

State management: **Zustand** with `persist` middleware (wallpaper, dock config, and terminal font color survive page reloads via localStorage).

Styling: **Tailwind CSS** with glassmorphism (`bg-black/60 backdrop-blur-xl`) on all windows.

---

## Deployment

This is a standard Next.js app. Deploy to Vercel, Netlify, or any Node.js host:

```bash
npm run build
npm start
```

Or export as static if you don't need server features:

```bash
npm run build
# Output in .next/
```

---

## Easter Eggs

Hidden terminal commands (not shown in `help`):
`sl`, `matrix`, `cowsay`, `fortune`, `apt moo`, `rev`, `neofetch`, `ping`, `coffee`, `sudo`, `rm -rf`
