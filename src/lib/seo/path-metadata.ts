
import type { Metadata } from "next";
import { SITE_CONFIG } from "./metadata";
import {
	getExperienceFileBySlug,
	getProjectFileBySlug,
	isValidExperienceSlug,
	isValidProjectSlug,
} from "./path-routing";

/**
 * Route configuration for metadata generation.
 */
interface RouteMetadata {
	title: string;
	description: string;
	ogImage?: string;
}

/**
 * Default homepage metadata (extracted for type safety).
 */
const DEFAULT_METADATA: RouteMetadata = {
	title: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
	description: SITE_CONFIG.description,
};

/**
 * Static route metadata configurations.
 */
const ROUTE_METADATA: Record<string, RouteMetadata> = {
	"/": DEFAULT_METADATA,
	"/about": {
		title: "About",
		description: "",
	},
	"/resume": {
		title: "Resume",
		description: "",
	},
	"/projects": {
		title: "Projects",
		description: "",
	},
	"/projects/rmccdc": {
		title: "RMCCDC",
		description: "",
	},
	"/projects/nccdc": {
		title: "National CCDC",
		description: "",
	},
	"/projects/cyberforce": {
		title: "DOE CyberForce",
		description: "",
	},
	"/experience": {
		title: "Competitions",
		description: "",
	},
};

/**
 * File-specific metadata for project markdown files.
 */
const PROJECT_FILE_METADATA: Record<string, RouteMetadata> = {};

/**
 * File-specific metadata for experience markdown files.
 */
const EXPERIENCE_FILE_METADATA: Record<string, RouteMetadata> = {};

/**
 * Generate the canonical URL for a given path.
 */
function getCanonicalUrl(path: string): string {
	const normalizedPath = path === "/" ? "" : path;
	return `${SITE_CONFIG.baseUrl}${normalizedPath}`;
}

/**
 * Build complete metadata object from route metadata.
 */
function buildMetadata(path: string, meta: RouteMetadata): Metadata {
	const canonicalUrl = getCanonicalUrl(path);
	const ogImage = meta.ogImage ?? SITE_CONFIG.ogImage;

	return {
		title: meta.title,
		description: meta.description,
		alternates: {
			canonical: canonicalUrl,
		},
		openGraph: {
			title: `${meta.title} | ${SITE_CONFIG.siteName}`,
			description: meta.description,
			url: canonicalUrl,
			siteName: SITE_CONFIG.siteName,
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: `${meta.title} - ${SITE_CONFIG.siteName}`,
				},
			],
			type: "website",
			locale: "en_US",
		},
		twitter: {
			card: "summary_large_image",
			title: `${meta.title} | ${SITE_CONFIG.siteName}`,
			description: meta.description,
			images: [ogImage],
		},
	};
}

/**
 * Generate metadata for a static route.
 *
 * @param path - The route path (e.g., "/about", "/projects/yield")
 * @returns Next.js Metadata object
 */
export function generatePathMetadata(path: string): Metadata {
	const normalizedPath = path.toLowerCase().replace(/\/$/, "") || "/";

	// Check static routes first
	const staticMeta = ROUTE_METADATA[normalizedPath];
	if (staticMeta) {
		return buildMetadata(normalizedPath, staticMeta);
	}

	// Check dynamic project file routes
	const projectMatch = normalizedPath.match(/^\/projects\/(.+)$/);
	if (projectMatch) {
		const slug = projectMatch[1];
		if (slug && !["rmccdc", "nccdc", "cyberforce"].includes(slug)) {
			const fileMeta = PROJECT_FILE_METADATA[slug];
			if (fileMeta) {
				return buildMetadata(normalizedPath, fileMeta);
			}
			// Fallback for valid project files without custom metadata
			const file = getProjectFileBySlug(slug);
			if (file) {
				return buildMetadata(normalizedPath, {
					title: file.title,
					description: "",
				});
			}
		}
	}

	// Check dynamic experience file routes
	const experienceMatch = normalizedPath.match(/^\/experience\/(.+)$/);
	if (experienceMatch) {
		const slug = experienceMatch[1];
		if (slug) {
			const fileMeta = EXPERIENCE_FILE_METADATA[slug];
			if (fileMeta) {
				return buildMetadata(normalizedPath, fileMeta);
			}
			// Fallback for valid experience files without custom metadata
			const file = getExperienceFileBySlug(slug);
			if (file) {
				return buildMetadata(normalizedPath, {
					title: file.title,
					description: "",
				});
			}
		}
	}

	// Fallback to default homepage metadata
	return buildMetadata("/", DEFAULT_METADATA);
}

/**
 * Generate metadata for a project file route.
 *
 * @param slug - The project file slug
 * @returns Next.js Metadata object or null if invalid slug
 */
export function generateProjectFileMetadata(slug: string): Metadata | null {
	if (!isValidProjectSlug(slug)) return null;

	// Project apps have static metadata
	if (["rmccdc", "nccdc", "cyberforce"].includes(slug)) {
		return generatePathMetadata(`/projects/${slug}`);
	}

	const path = `/projects/${slug}`;
	const fileMeta = PROJECT_FILE_METADATA[slug];
	if (fileMeta) {
		return buildMetadata(path, fileMeta);
	}

	const file = getProjectFileBySlug(slug);
	if (file) {
		return buildMetadata(path, {
			title: file.title,
			description: "",
		});
	}

	return null;
}

/**
 * Generate metadata for an experience file route.
 *
 * @param slug - The experience file slug
 * @returns Next.js Metadata object or null if invalid slug
 */
export function generateExperienceFileMetadata(slug: string): Metadata | null {
	if (!isValidExperienceSlug(slug)) return null;

	const path = `/experience/${slug}`;
	const fileMeta = EXPERIENCE_FILE_METADATA[slug];
	if (fileMeta) {
		return buildMetadata(path, fileMeta);
	}

	const file = getExperienceFileBySlug(slug);
	if (file) {
		return buildMetadata(path, {
			title: file.title,
			description: "",
		});
	}

	return null;
}
