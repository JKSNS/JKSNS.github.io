"use client";

import { ArrowLeft, ArrowRight, Lock, Plus, X } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";

import { AppID, useSystemStore } from "@/os/store";

import { BLOG_POSTS, type BlogPost } from "./blog-data";

const BLOG_URL = "blog.jackson.stephens.sh";

interface Tab {
	id: string;
	slug: string | null;
	label: string;
}

let tabCounter = 0;
function createTab(slug: string | null, label: string): Tab {
	tabCounter += 1;
	return { id: `tab-${tabCounter}`, slug, label };
}

function getReadTime(content: string): string {
	const words = content.trim().split(/\s+/).length;
	const minutes = Math.max(1, Math.round(words / 230));
	return `${minutes} min read`;
}

function formatDate(dateStr: string): string {
	const date = new Date(`${dateStr}T00:00:00`);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

function renderInlineLinks(text: string): React.ReactNode {
	const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
	const parts: React.ReactNode[] = [];
	let lastIndex = 0;
	let match: RegExpExecArray | null;

	while ((match = linkRegex.exec(text)) !== null) {
		if (match.index > lastIndex) {
			parts.push(text.slice(lastIndex, match.index));
		}
		parts.push(
			<a
				key={match.index}
				href={match[2]}
				target="_blank"
				rel="noopener noreferrer"
				className="text-blue-400 hover:underline"
			>
				{match[1]}
			</a>,
		);
		lastIndex = match.index + match[0].length;
	}

	if (lastIndex < text.length) {
		parts.push(text.slice(lastIndex));
	}

	return parts.length > 0 ? parts : text;
}

function renderContent(content: string) {
	const blocks = content.split("\n\n");
	return blocks.map((block, i) => {
		const trimmed = block.trim();
		if (!trimmed) return null;

		if (trimmed === "---") {
			return <hr key={i} className="my-6 border-white/10" />;
		}

		if (trimmed.startsWith("## ")) {
			return (
				<h2 key={i} className="mb-3 mt-8 text-xl font-bold text-white first:mt-0">
					{trimmed.slice(3)}
				</h2>
			);
		}

		if (trimmed.startsWith("# ")) {
			return (
				<h1 key={i} className="mb-4 mt-8 text-2xl font-bold text-white first:mt-0">
					{trimmed.slice(2)}
				</h1>
			);
		}

		if (trimmed.startsWith("- ")) {
			const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
			return (
				<ul key={i} className="mb-4 list-disc space-y-1 pl-6 text-white/70">
					{items.map((item, j) => (
						<li key={j}>{renderInlineLinks(item.slice(2))}</li>
					))}
				</ul>
			);
		}

		if (trimmed.startsWith("```")) {
			const lines = trimmed.split("\n");
			const code = lines.slice(1, -1).join("\n");
			return (
				<pre key={i} className="mb-4 overflow-x-auto rounded-lg bg-black/60 p-4 font-mono text-sm text-green-400">
					{code}
				</pre>
			);
		}

		return (
			<p key={i} className="mb-4 leading-relaxed text-white/70">
				{renderInlineLinks(trimmed)}
			</p>
		);
	});
}

interface TabBarProps {
	tabs: Tab[];
	activeTabId: string;
	onSelectTab: (id: string) => void;
	onCloseTab: (id: string) => void;
	onNewTab: () => void;
}

function TabBar({ tabs, activeTabId, onSelectTab, onCloseTab, onNewTab }: TabBarProps) {
	return (
		<div className="flex h-9 shrink-0 items-end bg-[#202124] px-2 pt-1">
			{tabs.map((tab) => {
				const isActive = tab.id === activeTabId;
				return (
					<div
						key={tab.id}
						className={`flex h-8 max-w-[180px] items-center gap-2 rounded-t-lg px-3 cursor-pointer ${
							isActive ? "bg-[#323639]" : "bg-[#202124] hover:bg-[#2a2a2e]"
						}`}
						onClick={() => onSelectTab(tab.id)}
						onKeyDown={() => {}}
						role="tab"
						aria-selected={isActive}
						tabIndex={0}
					>
						<span className="min-w-0 flex-1 truncate text-xs text-white/80">
							{tab.label}
						</span>
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								onCloseTab(tab.id);
							}}
							className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white/40 hover:bg-white/10 hover:text-white/60"
							aria-label={`Close ${tab.label}`}
						>
							<X size={10} />
						</button>
					</div>
				);
			})}
			<button
				type="button"
				onClick={onNewTab}
				className="ml-1 mb-0.5 flex h-6 w-6 items-center justify-center rounded-full text-white/40 hover:bg-white/10"
				aria-label="New tab"
			>
				<Plus size={14} />
			</button>
		</div>
	);
}

interface AddressBarProps {
	url: string;
	canGoBack: boolean;
	onBack: () => void;
}

function AddressBar({ url, canGoBack, onBack }: AddressBarProps) {
	return (
		<div className="flex h-10 shrink-0 items-center gap-2 border-b border-white/5 bg-[#323639] px-3">
			<div className="flex items-center gap-1">
				<button
					type="button"
					onClick={onBack}
					disabled={!canGoBack}
					className="flex h-7 w-7 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 disabled:opacity-30"
					aria-label="Back"
				>
					<ArrowLeft size={16} />
				</button>
				<button
					type="button"
					disabled
					className="flex h-7 w-7 items-center justify-center rounded-full text-white/50 opacity-30"
					aria-label="Forward"
				>
					<ArrowRight size={16} />
				</button>
			</div>

			<div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-[#202124] px-3 py-1.5">
				<Lock size={12} className="shrink-0 text-white/40" />
				<span className="truncate font-mono text-xs text-white/60">
					https://{url}
				</span>
			</div>
		</div>
	);
}

interface BlogListProps {
	posts: BlogPost[];
	onSelectPost: (slug: string) => void;
}

function BlogList({ posts, onSelectPost }: BlogListProps) {
	return (
		<div className="mx-auto max-w-2xl px-6 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight text-white">Blog</h1>
				<p className="mt-2 text-sm text-white/50">
					Thoughts on security, engineering, and building things.
				</p>
			</div>

			<div className="space-y-4">
				{posts.map((post) => (
					<button
						key={post.slug}
						type="button"
						onClick={() => onSelectPost(post.slug)}
						className="group block w-full rounded-xl border border-white/5 bg-white/[0.02] p-5 text-left transition-all hover:border-white/10 hover:bg-white/[0.05]"
					>
						<div className="flex items-center gap-2 text-xs text-white/40">
							<time>{formatDate(post.date)}</time>
							<span>·</span>
							<span>{getReadTime(post.content)}</span>
						</div>
						<h2 className="mt-1 text-lg font-semibold text-white group-hover:text-blue-400">
							{post.title}
						</h2>
						<p className="mt-2 text-sm leading-relaxed text-white/50">
							{post.excerpt}
						</p>
						<span className="mt-3 inline-block text-xs font-medium text-blue-400">
							Read more
						</span>
					</button>
				))}
			</div>
		</div>
	);
}

interface BlogPostViewProps {
	post: BlogPost;
}

function BlogPostView({ post }: BlogPostViewProps) {
	return (
		<article className="mx-auto max-w-2xl px-6 py-8">
			<div className="flex items-center gap-2 text-xs text-white/40">
				<time>{formatDate(post.date)}</time>
				<span>·</span>
				<span>{getReadTime(post.content)}</span>
			</div>
			<h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
				{post.title}
			</h1>

			{post.tldr && (
				<p className="mt-4 text-sm italic leading-relaxed text-white/50">
					<span className="not-italic font-medium text-white/60">TL;DR: </span>{post.tldr}
				</p>
			)}

			<hr className="my-6 border-white/10" />
			<div className="prose-invert">{renderContent(post.content)}</div>
		</article>
	);
}

export const BrowserApp = memo(function BrowserApp() {
	const closeWindow = useSystemStore((s) => s.closeWindow);

	const [tabs, setTabs] = useState<Tab[]>([createTab(null, "Blog")]);
	const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? "");

	const activeTab = useMemo(() => tabs.find((t) => t.id === activeTabId), [tabs, activeTabId]);
	const activePost = useMemo(
		() => (activeTab?.slug ? BLOG_POSTS.find((p) => p.slug === activeTab.slug) ?? null : null),
		[activeTab],
	);

	const currentUrl = useMemo(() => {
		if (activeTab?.slug) return `${BLOG_URL}/${activeTab.slug}`;
		return BLOG_URL;
	}, [activeTab]);

	const handleSelectPost = useCallback(
		(slug: string) => {
			const post = BLOG_POSTS.find((p) => p.slug === slug);
			if (!post) return;

			const existing = tabs.find((t) => t.slug === slug);
			if (existing) {
				setActiveTabId(existing.id);
				return;
			}

			const newTab = createTab(slug, post.title);
			setTabs((prev) => [...prev, newTab]);
			setActiveTabId(newTab.id);
		},
		[tabs],
	);

	const handleCloseTab = useCallback(
		(id: string) => {
			if (tabs.length === 1) {
				closeWindow(AppID.Browser);
				return;
			}

			const idx = tabs.findIndex((t) => t.id === id);
			const remaining = tabs.filter((t) => t.id !== id);
			setTabs(remaining);

			if (activeTabId === id) {
				const next = remaining[Math.min(idx, remaining.length - 1)];
				if (next) setActiveTabId(next.id);
			}
		},
		[tabs, activeTabId, closeWindow],
	);

	const handleNewTab = useCallback(() => {
		const newTab = createTab(null, "Blog");
		setTabs((prev) => [...prev, newTab]);
		setActiveTabId(newTab.id);
	}, []);

	const handleBack = useCallback(() => {
		if (!activeTab) return;
		setTabs((prev) =>
			prev.map((t) => (t.id === activeTab.id ? { ...t, slug: null, label: "Blog" } : t)),
		);
	}, [activeTab]);

	return (
		<div className="flex h-full flex-col bg-[#1a1a1e]">
			<TabBar
				tabs={tabs}
				activeTabId={activeTabId}
				onSelectTab={setActiveTabId}
				onCloseTab={handleCloseTab}
				onNewTab={handleNewTab}
			/>
			<AddressBar
				url={currentUrl}
				canGoBack={!!activeTab?.slug}
				onBack={handleBack}
			/>
			<div className="flex-1 overflow-y-auto">
				{activeTab && !activeTab.slug && (
					<BlogList posts={BLOG_POSTS} onSelectPost={handleSelectPost} />
				)}
				{activeTab?.slug && activePost && (
					<BlogPostView post={activePost} />
				)}
			</div>
		</div>
	);
});
