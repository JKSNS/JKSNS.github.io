"use client";

import { ExternalLink, RefreshCw, WifiOff } from "lucide-react";
import { memo, useCallback, useRef, useState } from "react";

import { BrowserChrome } from "@/apps/yield/BrowserChrome";
import { AnalyticsEvent, trackEvent } from "@/lib/analytics";

const DEBATE_LAB_URL = "https://debatelab.jackson.stephens.sh";

type LoadState = "loading" | "loaded" | "error";

// Embeds Debate Lab in a browser chrome iframe
export const DebateApp = memo(function DebateApp() {
	const [loadState, setLoadState] = useState<LoadState>("loading");
	const [iframeKey, setIframeKey] = useState(0);
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const loadStartTimeRef = useRef<number>(Date.now());

	const handleLoad = useCallback(() => {
		const loadTime = Date.now() - loadStartTimeRef.current;
		setLoadState("loaded");

		trackEvent(AnalyticsEvent.IFRAME_LOADED, {
			project_id: "debate_lab",
			success: true,
			load_time_ms: loadTime,
		});
	}, []);

	const handleError = useCallback(() => {
		setLoadState("error");

		trackEvent(AnalyticsEvent.IFRAME_LOADED, {
			project_id: "debate_lab",
			success: false,
		});
	}, []);

	const handleRefresh = useCallback(() => {
		trackEvent(AnalyticsEvent.IFRAME_REFRESHED, {
			project_id: "debate_lab",
		});

		loadStartTimeRef.current = Date.now();
		setLoadState("loading");
		setIframeKey((prev) => prev + 1);
	}, []);

	const handleOpenExternal = useCallback(() => {
		trackEvent(AnalyticsEvent.EXTERNAL_PROJECT_CLICKED, {
			app_id: "debate_lab",
			destination_url: DEBATE_LAB_URL,
		});
		window.open(DEBATE_LAB_URL, "_blank", "noopener,noreferrer");
	}, []);

	return (
		<div className="flex h-full flex-col">
			<BrowserChrome
				url={DEBATE_LAB_URL}
				onRefresh={handleRefresh}
				isLoading={loadState === "loading"}
			/>

			<div className="relative flex-1 overflow-hidden">
				{/* Loading State */}
				{loadState === "loading" && (
					<div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background">
						<div className="relative">
							<div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground-muted border-t-accent" />
						</div>
						<p className="font-mono text-sm text-foreground-muted">
							Connecting to debatelab.jackson.stephens.sh...
						</p>
					</div>
				)}

				{/* Error State */}
				{loadState === "error" && (
					<div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-background p-8">
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
							<WifiOff size={32} className="text-red-400" />
						</div>
						<div className="text-center">
							<h3 className="mb-2 font-mono text-sm font-medium text-foreground">
								Connection Refused
							</h3>
							<p className="max-w-xs text-xs text-foreground-muted">
								Unable to establish a secure connection to the application.
							</p>
						</div>
						<div className="flex gap-3">
							<button
								type="button"
								onClick={handleRefresh}
								className="flex items-center gap-2 rounded-md bg-white/5 px-4 py-2 font-mono text-xs text-foreground-subtle transition-colors hover:bg-white/10"
							>
								<RefreshCw size={14} />
								Retry
							</button>
							<button
								type="button"
								onClick={handleOpenExternal}
								className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-mono text-xs text-white transition-colors hover:bg-accent/90"
							>
								<ExternalLink size={14} />
								Open in New Tab
							</button>
						</div>
					</div>
				)}

				{/* Iframe */}
				<iframe
					key={iframeKey}
					ref={iframeRef}
					src={DEBATE_LAB_URL}
					title="National CCDC"
					className="h-full w-full border-0"
					sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
					loading="lazy"
					onLoad={handleLoad}
					onError={handleError}
				/>
			</div>
		</div>
	);
});
