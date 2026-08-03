export interface BlogPost {
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	tldr: string;
	content: string;
	/** When set, the post body embeds this PDF instead of (or alongside) markdown content. */
	pdfUrl?: string;
	/** Paper / release version stamped on the post. */
	version?: string;
	/** External source repo for the paper. */
	sourceUrl?: string;
}

export const BLOG_POSTS: BlogPost[] = [
	{
		slug: "claude-preflight",
		title: "Directing Intelligence with Governed Agents",
		date: "2026-08-03",
		version: "v0.9.9",
		pdfUrl: "/papers/claude_preflight_v0.9.9.pdf",
		sourceUrl: "https://github.com/JKSNS/claude_preflight",
		excerpt:
			"Technical report on claude_preflight: a fail-closed Cedar policy gate, human ratification, and an anti-forgetting session bundle for frontier coding agents.",
		tldr: "Agents are good at features and bad at holding a whole project in view. Preflight attacks that mechanically: authorize every tool call, ratify rule changes with a human, re-inject the design spine after compaction, and make system claims executable so they cannot quietly drift.",
		content: `## What this is

A self-published technical report on [claude_preflight](https://github.com/JKSNS/claude_preflight) — the harness I use to keep coding agents governed and coherent across a real project.

## The short version

Modern frontier agents produce decent scoped features and struggle to hold the rest of the project in view while they do it. That costs contradicted decisions, repeated mistakes, wasted tokens, and safety: an agent that cannot see the whole will still run a destructive command if nothing stops it.

Preflight attacks four of those problems mechanically:

- Authorize every tool call before it runs (fail-closed Cedar policy gate)
- Require a human to ratify changes to the rules themselves
- Re-inject the design spine after context compaction
- Make the system's claims about itself executable so they cannot quietly drift

The PDF below is the full report (v0.9.9):

---

Source: [JKSNS/claude_preflight](https://github.com/JKSNS/claude_preflight) · Paper: [claude_preflight_v0.9.9.pdf](https://github.com/JKSNS/claude_preflight/blob/main/paper/claude_preflight_v0.9.9.pdf)`,
	},
	{
		slug: "project-kraken",
		title: "Kraken: A Cascade CTF-Autosolver",
		date: "2026-08-03",
		version: "v0.2.5",
		pdfUrl: "/papers/project_kraken-v0.2.5.pdf",
		sourceUrl: "https://github.com/JKSNS/project_kraken",
		excerpt:
			"Technical report on project_kraken: a cheapest-first cascade CTF auto-solver that spends compute before tokens, with a deterministic flag oracle and a closed-loop optimizer.",
		tldr: "Tools produce artifacts; models reason about them. Kraken routes each challenge through a cheapest-first cascade that tries to find the flag with deterministic tooling first, escalating to model reasoning only when computation runs out. A deterministic validator is the sole oracle.",
		content: `## What this is

A full technical report on [project_kraken](https://github.com/JKSNS/project_kraken) — a capture-the-flag auto-solver built around a cascade, not a single model call.

## The short version

Rather than tossing a challenge binary at a language model and hoping, Kraken routes each challenge through a cheapest-first cascade: deterministic tooling first, model reasoning only when computation runs out. A deterministic validator is the sole oracle, so the system never reports a hallucinated flag as a win. A closed-loop optimizer learns from every solve and re-orders the cascade so winning tools run first.

The report covers the 20-node LangGraph engine, classification and specialists, the tool library, the flag validator, the manager's anti-thrash guards, the learned-experience optimizer, attack-defense, evaluation, and an honest account of what did not work.

---

Source: [JKSNS/project_kraken](https://github.com/JKSNS/project_kraken) · Paper: [project_kraken-v0.2.5.pdf](https://github.com/JKSNS/project_kraken/blob/main/paper/project_kraken-v0.2.5.pdf)`,
	},
	{
		slug: "building-jsos",
		title: "I built an OS in the browser for my portfolio",
		date: "2026-03-23",
		excerpt:
			"Built a browser-based OS as a portfolio site. Next.js, static export, no backend.",
		tldr: "Portfolio site that runs like a desktop OS. Draggable windows, working terminal, virtual filesystem, customizable themes. Next.js + Tailwind + Zustand, fully static on GitHub Pages.",
		content: `## The Idea

Found an OS-style portfolio built with Next.js. The concept made sense. Everyone knows how to use a desktop. Draggable windows, a dock, a terminal. What a great way to show off my portfolio projects, right?

## The Stack

- Next.js 16, React 19, static export for GitHub Pages
- Tailwind CSS v4 for glassmorphism
- Framer Motion for window management and transitions
- Zustand for persistent state via localStorage
- TypeScript, strict mode

No backend. No database. Fully static. Shipped with GitHub Pages.

## How It Works

JSOS boots with a loading sequence, then drops you into a desktop with draggable, resizable windows. The dock launches apps. Settings let you swap wallpapers, change icon colors, and pick terminal themes. All preferences persist across sessions.

The terminal has a real virtual filesystem. You can cd into directories, cat files, browse competition results, and more. I wonder if you can find the easter eggs...

---

Check out the project [here](https://github.com/JKSNS/JKSNS.github.io).`,
	},
];
