export interface BlogPost {
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	tldr: string;
	content: string;
}

export const BLOG_POSTS: BlogPost[] = [
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
