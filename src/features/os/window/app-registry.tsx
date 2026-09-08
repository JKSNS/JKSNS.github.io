import { type ComponentType, lazy } from "react";

import { AboutApp } from "@/apps/about";
import { AppID, type WindowProps } from "@/os/store";

// Lazy-loaded for code splitting — only fetched when the app window opens
const DebateApp = lazy(() => import("@/apps/debate").then((m) => ({ default: m.DebateApp })));
const FolderApp = lazy(() => import("@/apps/folder").then((m) => ({ default: m.FolderApp })));
const MarkdownViewerApp = lazy(() =>
	import("@/apps/markdown").then((m) => ({ default: m.MarkdownViewerApp })),
);
const PassFXApp = lazy(() => import("@/apps/passfx").then((m) => ({ default: m.PassFXApp })));
const SettingsApp = lazy(() => import("@/apps/settings").then((m) => ({ default: m.SettingsApp })));
const TerminalApp = lazy(() => import("@/apps/terminal").then((m) => ({ default: m.TerminalApp })));
const BrowserApp = lazy(() => import("@/apps/browser").then((m) => ({ default: m.BrowserApp })));
const YieldApp = lazy(() => import("@/apps/yield").then((m) => ({ default: m.YieldApp })));

export interface AppComponentProps {
	windowProps?: WindowProps;
}

export interface AppManifest {
	name: string;
	component: ComponentType<AppComponentProps>;
}

// CUSTOMIZE: Map each AppID to its display name and component.
// Add new apps here after defining them in AppID enum and creating the component.
export const APP_REGISTRY: Record<AppID, AppManifest> = {
	[AppID.Yield]: {
		name: "RMCCDC",
		component: YieldApp,
	},
	[AppID.Debate]: {
		name: "National CCDC",
		component: DebateApp,
	},
	[AppID.PassFX]: {
		name: "CyberForce",
		component: PassFXApp,
	},
	[AppID.Terminal]: {
		name: "Terminal",
		component: TerminalApp,
	},
	[AppID.About]: {
		name: "About",
		component: AboutApp,
	},
	[AppID.Settings]: {
		name: "Settings",
		component: SettingsApp,
	},
	[AppID.Browser]: {
		name: "Browser",
		component: BrowserApp,
	},
	[AppID.FolderProjects]: {
		name: "Projects",
		component: FolderApp,
	},
	[AppID.FolderExperience]: {
		name: "Competitions",
		component: FolderApp,
	},
	[AppID.MarkdownViewer]: {
		name: "Markdown",
		component: MarkdownViewerApp,
	},
};

export function getAppManifest(appId: AppID): AppManifest {
	const manifest = APP_REGISTRY[appId];
	if (!manifest) {
		throw new Error(`App not registered: ${appId}`);
	}
	return manifest;
}
