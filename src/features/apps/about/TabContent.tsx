"use client";

import { AnimatePresence, motion } from "framer-motion";
import { memo, useState } from "react";

import type { AboutTabId } from "./TabNavigation";

export interface TabContentProps {
	activeTab: AboutTabId;
}

const contentVariants = {
	initial: { opacity: 0, y: 8 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -8 },
};

export const TabContent = memo(function TabContent({ activeTab }: TabContentProps) {
	return (
		<div className="flex-1 overflow-auto p-5">
			<AnimatePresence mode="wait">
				<motion.div
					key={activeTab}
					variants={contentVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ duration: 0.15, ease: "easeOut" }}
				>
					{activeTab === "overview" && <OverviewPanel />}
					{activeTab === "projects" && <ProjectsPanel />}
					{activeTab === "experience" && <ExperiencePanel />}
					{activeTab === "manual" && <ManualPanel />}
				</motion.div>
			</AnimatePresence>
		</div>
	);
});

function OverviewPanel() {
	return (
		<div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" className="space-y-4">
			<h2 className="font-mono text-sm font-medium text-white/70">{"// Overview"}</h2>
			<div className="space-y-4 text-sm leading-relaxed text-white/60">
				<p>I like to build cool things, like this website!</p>
			</div>
		</div>
	);
}

function ProjectsPanel() {
	return (
		<div role="tabpanel" id="panel-projects" aria-labelledby="tab-projects" className="space-y-4">
			<h2 className="font-mono text-sm font-medium text-white/70">{"// Projects"}</h2>
			<p className="text-xs text-white/40">Coming soon.</p>
		</div>
	);
}

interface ExperienceEntry {
	company: string;
	role: string;
	period: string;
	highlights: string[];
}

const EXPERIENCE_DATA: ExperienceEntry[] = [
	{
		company: "2025-2026 Season",
		role: "Cybersecurity Competitions",
		period: "2025 - 2026",
		highlights: [
			"RMCCDC Regionals - 2nd Place",
			"RMCCDC Qualifiers - 1st Place",
			"U.S. DoE's CyberForce - Competitor",
			"WRCCDC Invitational #1 - 3rd Place",
			"WRCCDC Invitational #3 - 2nd Place",
			"WRCCDC Invitational #4 - Competitor",
			"WRCCDC Invitational #5 - 3rd Place",
			"MWCCDC Invitational #1 - 2nd Place",
			"MWCCDC Invitational #2 - Competitor",
			"MWCCDC Invitational #3 - 1st Place",
			"Sandia National Laboratories Lab-Wide ML/DL Hackathon - 1st Place",
			"Sandia National Laboratories Internal ML Competition - 1st Place",
			"Sandia National Laboratories TracerFire DFIR CTF - 2nd Place",
			"Lockheed Martin Aerospace Cyber Range DefCon 33 CTF - 1st blood, challenge 12",
		],
	},
	{
		company: "2024-2025 Season",
		role: "Cybersecurity Competitions",
		period: "2024 - 2025",
		highlights: [
			"National CCDC - Competitor",
			"RMCCDC Regionals - 1st Place",
			"RMCCDC Qualifiers - 1st Place",
			"WRCCDC Invitational #3 - Competitor",
			"WRCCDC Invitational #2 - Competitor",
			"MWCCDC Invitational - 2nd Place",
			"eCitadel - Competitor",
			"U.S. DoE's CyberForce - Competitor",
		],
	},
	{
		company: "2023-2024 Season",
		role: "Cybersecurity Competitions",
		period: "2023 - 2024",
		highlights: [
			"National CCDC - Alternate",
			"RMCCDC Regionals - 1st Place (Alternate)",
			"RMCCDC Qualifiers - 1st Place (Alternate)",
			"Hivestorm - Competitor",
		],
	},
];

function ExperiencePanel() {
	return (
		<div
			role="tabpanel"
			id="panel-experience"
			aria-labelledby="tab-experience"
			className="space-y-3"
		>
			{EXPERIENCE_DATA.map((entry, i) => (
				<SeasonCard key={entry.company} entry={entry} defaultOpen={i === 0} />
			))}
		</div>
	);
}

function SeasonCard({ entry, defaultOpen }: { entry: ExperienceEntry; defaultOpen: boolean }) {
	const [open, setOpen] = useState(defaultOpen);

	return (
		<div className="rounded-lg border border-white/[0.06] overflow-hidden">
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-white/[0.03]"
			>
				<span className="text-xs font-medium text-white/80">{entry.company}</span>
				<span className="text-xs text-white/30 transition-transform" style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>
					&#9654;
				</span>
			</button>
			{open && (
				<div className="border-t border-white/[0.06] px-4 py-3">
					<div className="space-y-1.5">
						{entry.highlights.map((highlight) => (
							<div key={highlight}>
								<span className="text-xs text-white/50">{highlight}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

function ManualPanel() {
	return (
		<div
			role="tabpanel"
			id="panel-manual"
			aria-labelledby="tab-manual"
			className="space-y-5"
		>
			{/* Quick Info Cards */}
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				<ManualCard label="What is JSOS?" value="A portfolio that runs like an operating system. Open apps, explore folders, use the terminal." />
				<ManualCard label="Easter eggs?" value="A few... Explore! :)" />
				<ManualCard label="Built with" value="Next.js, TypeScript, Tailwind CSS, Framer Motion, Zustand" />
				<ManualCard
					label="Source code"
					value="github.com/JKSNS"
					href="https://github.com/JKSNS/JKSNS.github.io"
				/>
			</div>

			{/* Collapsible Legal Sections */}
			<ManualCollapsible title="Privacy Policy" subtitle="Effective March 22, 2026">
				<ManualParagraph title="Overview" text="This Privacy Policy explains how jackson.stephens.sh handles information. This is a personal portfolio with no commercial data collection. We take privacy seriously and collect as little as possible." />
				<ManualParagraph title="Automatically Collected" text="This site does not use third-party analytics or tracking scripts. No cookies are set for tracking or advertising purposes." />
				<ManualParagraph title="Browser Local Storage" text="Your interface preferences (such as wallpaper selection) are stored in your browser's Local Storage. This data never leaves your device, is not transmitted to any server, and is used solely to preserve your UI settings between visits. You can delete it at any time by clearing your browser's site data for this domain." />
				<ManualParagraph title="No Personal Data Collection" text="We do not collect, store, or process personally identifiable information such as names, email addresses, or IP addresses unless you voluntarily contact us." />
				<ManualParagraph title="Cookies" text="This site does not use cookies." />
				<ManualParagraph title="Third-Party Services" text="This site is hosted on GitHub Pages. GitHub may collect standard server-side access logs (IP address, request timestamp, browser user agent) as part of their infrastructure. No advertising networks, analytics platforms, or data brokers are used on this site." />
				<ManualParagraph title="Children's Privacy" text="This site is not directed at children under 13 and does not knowingly collect information from them." />
				<ManualParagraph title="Data Security" text="All traffic between your browser and this site is encrypted via HTTPS. Since we collect no personal data beyond Local Storage (which stays on your device), there is minimal data security risk from our side." />
				<ManualParagraph title="Your Rights" text="Since we collect no personal data, there is generally nothing to access, correct, or delete. You can clear Local Storage at any time in your browser settings. For any questions, contact jackson@stephens.sh." />
				<ManualParagraph title="Changes to This Policy" text="We may update this policy to reflect changes to the site. Any updates will be posted here with a revised effective date." />
			</ManualCollapsible>

			<ManualCollapsible title="Terms of Use" subtitle="Effective March 22, 2026">
				<ManualParagraph title="Overview" text="This website (jackson.stephens.sh) is a personal portfolio operated by Jackson Stephens. By accessing this site you agree to these terms. If you do not agree, do not use the site." />
				<ManualParagraph title="Permitted Use" text="You may access this site for personal, non-commercial purposes. You may view content, interact with the interface, and browse project documentation." />
				<div className="space-y-1">
					<h4 className="text-xs font-medium text-white/50">Prohibited Conduct</h4>
					<ul className="space-y-0.5 pl-3">
						{[
							"Use the site for any unlawful purpose.",
							"Attempt to probe, scan, or test vulnerabilities in the site or its infrastructure.",
							"Scrape, crawl, or otherwise extract content using automated means without prior written consent.",
							"Transmit spam, malware, or any malicious code through any interactive feature.",
							"Misrepresent your identity or affiliation.",
							"Interfere with or disrupt the site or servers connected to it.",
						].map((item) => (
							<li key={item} className="text-xs leading-relaxed text-white/40">
								<span className="mr-1.5 text-white/20">-</span>{item}
							</li>
						))}
					</ul>
				</div>
				<ManualParagraph title="Intellectual Property" text="All content on this site — including text, design, graphics, and code — is owned by or licensed to Jackson Stephens and protected by applicable intellectual property law. The source code is available publicly under its repository license. Nothing here transfers any ownership rights to you beyond the limited license to view and interact with the site." />
				<ManualParagraph title="Third-Party Links" text="This site may link to third-party services (GitHub, LinkedIn, etc.). We have no control over those sites and are not responsible for their content or practices." />
				<ManualParagraph title="Disclaimer of Warranties" text='This site is provided "as is" and "as available" without any warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the site will be uninterrupted, error-free, or free of harmful components.' />
				<ManualParagraph title="Limitation of Liability" text="To the fullest extent permitted by law, Jackson Stephens shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use this site." />
				<ManualParagraph title="Modifications" text="These terms may be updated at any time. Continued use of the site after changes are posted constitutes acceptance of the updated terms." />
				<ManualParagraph title="Governing Law" text="These terms are governed by the laws of the State of Utah, United States, without regard to conflict of law provisions." />
				<ManualParagraph title="Contact" text="jackson@stephens.sh" />
			</ManualCollapsible>
		</div>
	);
}

function ManualCard({ label, value, href }: { label: string; value: string; href?: string }) {
	return (
		<div className="rounded-lg bg-white/[0.04] px-4 py-3 transition-colors hover:bg-white/[0.06]">
			<p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-white/30">{label}</p>
			{href ? (
				<a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400/80 hover:text-blue-400 underline underline-offset-2">
					{value}
				</a>
			) : (
				<p className="text-sm leading-relaxed text-white/60">{value}</p>
			)}
		</div>
	);
}

function ManualCollapsible({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
	const [open, setOpen] = useState(false);
	return (
		<div className="rounded-lg border border-white/[0.06] overflow-hidden">
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-white/[0.03]"
			>
				<div>
					<h3 className="text-xs font-medium text-white/70">{title}</h3>
					<p className="text-[10px] text-white/30">{subtitle}</p>
				</div>
				<span className="text-xs text-white/30 transition-transform" style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>
					&#9654;
				</span>
			</button>
			{open && (
				<div className="space-y-3 border-t border-white/[0.06] px-4 py-3">
					{children}
				</div>
			)}
		</div>
	);
}

function ManualParagraph({ title, text }: { title: string; text: string }) {
	return (
		<div className="space-y-1">
			<h4 className="text-sm font-medium text-white/50">{title}</h4>
			<p className="text-xs leading-relaxed text-white/40">{text}</p>
		</div>
	);
}
